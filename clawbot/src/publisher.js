/**
 * Clawbot Money Engine - Blog Publisher
 * Generates HTML blog files and saves to /public/posts/
 */

const fs = require('fs');
const path = require('path');
const { db } = require('./db');
const generator = require('./generator');

const POSTS_DIR = path.join(process.cwd(), 'public', 'posts');
const SITE_URL = process.env.SITE_URL || 'https://bot.hub-depot.com';

function ensurePostsDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

function getHtmlTemplate(title, content, slug) {
  const date = new Date().toISOString().split('T')[0];
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(title)} - Clawbot Money Engine">
  <link rel="canonical" href="${SITE_URL}/posts/${slug}.html">
</head>
<body>
  <article>
    <header>
      <h1>${escapeHtml(title)}</h1>
      <time datetime="${date}">${date}</time>
    </header>
    <div class="content">
      ${content}
    </div>
  </article>
</body>
</html>`;
}

function escapeHtml(text) {
  if (!text) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

function publishPost(postId) {
  ensurePostsDir();
  const post = generator.getPost(postId);
  if (!post) throw new Error('Post not found');

  const html = getHtmlTemplate(post.title, post.content, post.slug);
  const filePath = path.join(POSTS_DIR, `${post.slug}.html`);

  fs.writeFileSync(filePath, html, 'utf8');
  generator.updatePostStatus(postId, 'published');

  return { slug: post.slug, path: filePath };
}

function publishAllDrafts() {
  ensurePostsDir();
  const drafts = db.prepare('SELECT * FROM posts WHERE status = ?').all('draft');
  const results = [];

  for (const post of drafts) {
    try {
      const result = publishPost(post.id);
      results.push({ id: post.id, slug: result.slug, success: true });
    } catch (err) {
      results.push({ id: post.id, success: false, error: err.message });
    }
  }

  return results;
}

function publishLatestDraft() {
  const draft = db.prepare('SELECT * FROM posts WHERE status = ? ORDER BY created_at DESC LIMIT 1').get('draft');
  if (!draft) return null;
  return publishPost(draft.id);
}

function getPublishedPosts() {
  ensurePostsDir();
  return fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.html'))
    .map(f => ({
      filename: f,
      slug: f.replace('.html', '')
    }));
}

module.exports = {
  publishPost,
  publishAllDrafts,
  publishLatestDraft,
  getPublishedPosts,
  ensurePostsDir,
  getHtmlTemplate
};
