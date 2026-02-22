/**
 * Clawbot Money Engine - AI Content Generator
 * Uses OpenAI API for SEO blog posts, reviews, top 10 lists, ad copy
 */

const { db } = require('./db');
const affiliate = require('./affiliate');
const products = require('./products');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

async function callOpenAI(prompt, maxTokens = 1500) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not set in environment');
  }

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: maxTokens,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function injectAffiliateLinks(content, count = 2) {
  let result = content;
  const link = affiliate.getRandomAffiliateLink();
  if (!link) return content;

  // Find paragraphs and inject affiliate links naturally
  const paragraphs = result.split(/\n\n+/);
  let injected = 0;
  const maxInject = Math.min(count, Math.ceil(paragraphs.length / 3));

  for (let i = 1; i < paragraphs.length && injected < maxInject; i += 3) {
    const idx = Math.min(i, paragraphs.length - 1);
    const p = paragraphs[idx];
    if (p.length > 50 && !p.includes('href=')) {
      const insertPoint = Math.floor(p.length / 2);
      const before = p.slice(0, insertPoint);
      const after = p.slice(insertPoint);
      paragraphs[idx] = `${before} <a href="${link}" target="_blank" rel="nofollow noopener">Check it out here</a> ${after}`;
      injected++;
    }
  }

  return paragraphs.join('\n\n');
}

async function generateBlogPost(topic, keywords = '') {
  const productsList = products.getProductsForContent();
  const productContext = productsList.length > 0
    ? `\n\nConsider mentioning these products (include affiliate links where relevant): ${JSON.stringify(productsList.map(p => ({ title: p.title, link: p.affiliate_link })))}`
    : '';

  const prompt = `Write a comprehensive SEO-optimized blog post (800-1200 words) about: "${topic}"
${keywords ? `Target keywords to include naturally: ${keywords}` : ''}
${productContext}

Requirements:
- Use proper HTML formatting (h2, h3, p, ul, li)
- Write engaging, helpful content
- Include a compelling introduction and conclusion
- Use markdown-style formatting that converts to HTML (headers with ##, ###, paragraphs, lists)
- Do NOT include affiliate links - they will be added automatically
- Make it valuable for readers`;

  const content = await callOpenAI(prompt, 2000);
  const htmlContent = markdownToHtml(content);
  const withLinks = injectAffiliateLinks(htmlContent, 2);

  const title = topic;
  const slug = slugify(topic) + '-' + Date.now().toString(36);

  const stmt = db.prepare(`
    INSERT INTO posts (title, slug, content, content_type, status)
    VALUES (?, ?, ?, 'blog', 'draft')
  `);
  stmt.run(title, slug, withLinks);

  return { title, slug, content: withLinks };
}

async function generateReview(productTitle, productDescription = '') {
  const link = affiliate.getRandomAffiliateLink();

  const prompt = `Write an honest, detailed product review article (600-900 words) for: "${productTitle}"
${productDescription ? `Product details: ${productDescription}` : ''}

Requirements:
- Use HTML formatting (h2, h3, p, ul, li)
- Include: Introduction, Key Features, Pros and Cons, Who It's For, Verdict
- Be balanced and trustworthy
- Use markdown-style that converts to HTML
- Do NOT include affiliate links - they will be added
- End with a clear recommendation`;

  const content = await callOpenAI(prompt, 1800);
  const htmlContent = markdownToHtml(content);
  const withLinks = injectAffiliateLinks(htmlContent, 2);

  const slug = slugify(productTitle) + '-review-' + Date.now().toString(36);

  const stmt = db.prepare(`
    INSERT INTO posts (title, slug, content, content_type, status)
    VALUES (?, ?, ?, 'review', 'draft')
  `);
  stmt.run(`${productTitle} - Honest Review`, slug, withLinks);

  return { title: `${productTitle} - Honest Review`, slug, content: withLinks };
}

async function generateTop10(topic, category = '') {
  const productsList = products.getProductsForContent();

  const prompt = `Write a "Top 10 ${topic}" listicle article (800-1000 words)
${category ? `Category: ${category}` : ''}
${productsList.length > 0 ? `You may include these products in your list: ${productsList.map(p => p.title).join(', ')}` : ''}

Requirements:
- Number each item 1-10
- Use HTML: h2 for title, h3 for each item, p for descriptions
- Markdown-style formatting
- Brief intro and conclusion
- No affiliate links - added automatically`;

  const content = await callOpenAI(prompt, 2000);
  const htmlContent = markdownToHtml(content);
  const withLinks = injectAffiliateLinks(htmlContent, 3);

  const title = `Top 10 ${topic}`;
  const slug = slugify(`top-10-${topic}`) + '-' + Date.now().toString(36);

  const stmt = db.prepare(`
    INSERT INTO posts (title, slug, content, content_type, status)
    VALUES (?, ?, ?, 'listicle', 'draft')
  `);
  stmt.run(title, slug, withLinks);

  return { title, slug, content: withLinks };
}

async function generateAdCopy(productName, tone = 'persuasive') {
  const prompt = `Write 5 short ad copy variations (each 1-2 sentences, max 100 chars) for: "${productName}"
Tone: ${tone}

Format as JSON array of strings. Example: ["Copy 1", "Copy 2", ...]
No affiliate links.`;

  const content = await callOpenAI(prompt, 300);
  try {
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [content];
  } catch {
    return content.split('\n').filter(Boolean).slice(0, 5);
  }
}

function markdownToHtml(md) {
  if (!md) return '';
  let html = md
    .replace(/^### (.*)$/gim, '<h3>$1</h3>')
    .replace(/^## (.*)$/gim, '<h2>$1</h2>')
    .replace(/^# (.*)$/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
  const lines = html.split('\n');
  const out = [];
  let inList = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^<h[123]>/.test(line)) {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(line);
    } else if (/^- /.test(line)) {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push('<li>' + line.replace(/^- /, '') + '</li>');
    } else {
      if (inList) { out.push('</ul>'); inList = false; }
      if (line.trim()) out.push('<p>' + line + '</p>');
    }
  }
  if (inList) out.push('</ul>');
  return out.join('\n');
}

function getPosts(status = null) {
  if (status) {
    return db.prepare('SELECT * FROM posts WHERE status = ? ORDER BY created_at DESC').all(status);
  }
  return db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
}

function getPost(id) {
  return db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
}

function getPostBySlug(slug) {
  return db.prepare('SELECT * FROM posts WHERE slug = ?').get(slug);
}

function updatePostStatus(id, status) {
  const publishedAt = status === 'published' ? new Date().toISOString() : null;
  return db.prepare(`
    UPDATE posts SET status = ?, published_at = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(status, publishedAt, id);
}

module.exports = {
  generateBlogPost,
  generateReview,
  generateTop10,
  generateAdCopy,
  getPosts,
  getPost,
  getPostBySlug,
  updatePostStatus,
  injectAffiliateLinks,
  slugify
};
