/**
 * Clawbot Money Engine - Main Server
 * Production-ready affiliate marketing automation system
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const basicAuth = require('express-basic-auth');
const bcrypt = require('bcryptjs');

const affiliate = require('./src/affiliate');
const products = require('./src/products');
const seed = require('./src/seed');
const generator = require('./src/generator');
const publisher = require('./src/publisher');
const scheduler = require('./src/scheduler');
const githubPush = require('./src/githubPush');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Health check - no auth required (Cloudflare, Render)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'clawbot-money-engine', timestamp: new Date().toISOString() });
});

// Public list of published posts (for index page)
app.get('/api/published-public', (req, res) => {
  res.json(publisher.getPublishedPosts());
});

// Admin auth middleware
const adminAuth = basicAuth({
  authorizer: (username, password) => {
    const adminPass = process.env.ADMIN_PASSWORD;
    if (!adminPass) return false;
    return username === 'admin' && (password === adminPass || bcrypt.compareSync(password, adminPass));
  },
  challenge: true,
  realm: 'Clawbot Admin'
});

// Agent secret middleware (for /agent/* endpoints)
function agentAuth(req, res, next) {
  const secret = req.headers['x-agent-secret'] || req.body?.agentSecret;
  if (process.env.AGENT_SECRET && secret !== process.env.AGENT_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// ============ ADMIN ROUTES (require admin auth) ============

app.get(['/admin', '/admin/'], adminAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

// Affiliate programs
app.get('/api/programs', adminAuth, (req, res) => {
  res.json(affiliate.getPrograms());
});

app.post('/api/programs', adminAuth, (req, res) => {
  const { name, commission, affiliate_link, notes } = req.body;
  const id = affiliate.addProgram(name, commission, affiliate_link, notes);
  res.json({ success: true, id });
});

app.delete('/api/programs/:id', adminAuth, (req, res) => {
  affiliate.deleteProgram(parseInt(req.params.id));
  res.json({ success: true });
});

// Affiliate links
app.get('/api/links', adminAuth, (req, res) => {
  const programId = req.query.program_id ? parseInt(req.query.program_id) : null;
  res.json(affiliate.getLinks(programId));
});

app.post('/api/links', adminAuth, (req, res) => {
  const { program_id, name, url, notes } = req.body;
  const id = affiliate.addLink(program_id, name, url, notes);
  res.json({ success: true, id });
});

app.delete('/api/links/:id', adminAuth, (req, res) => {
  affiliate.deleteLink(parseInt(req.params.id));
  res.json({ success: true });
});

// Products
app.get('/api/products', adminAuth, (req, res) => {
  res.json(products.getProducts(req.query.category));
});

app.post('/api/products', adminAuth, (req, res) => {
  const { title, description, image, affiliate_link, category } = req.body;
  const id = products.addProduct(title, description, image, affiliate_link, category);
  res.json({ success: true, id });
});

app.delete('/api/products/:id', adminAuth, (req, res) => {
  products.deleteProduct(parseInt(req.params.id));
  res.json({ success: true });
});

// Content generation
app.post('/api/generate/blog', adminAuth, async (req, res) => {
  try {
    const { topic, keywords } = req.body;
    const result = await generator.generateBlogPost(topic || 'Affiliate marketing tips', keywords);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/generate/review', adminAuth, async (req, res) => {
  try {
    const { product_title, product_description } = req.body;
    const result = await generator.generateReview(product_title, product_description);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/generate/top10', adminAuth, async (req, res) => {
  try {
    const { topic, category } = req.body;
    const result = await generator.generateTop10(topic || 'Products', category);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/generate/adcopy', adminAuth, async (req, res) => {
  try {
    const { product_name, tone } = req.body;
    const result = await generator.generateAdCopy(product_name || 'Product', tone);
    res.json({ success: true, copies: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Posts
app.get('/api/posts', adminAuth, (req, res) => {
  res.json(generator.getPosts(req.query.status));
});

app.get('/api/posts/:id', adminAuth, (req, res) => {
  const post = generator.getPost(parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

// Publish
app.post('/api/publish', adminAuth, (req, res) => {
  try {
    const { post_id, all } = req.body;
    if (all) {
      const results = publisher.publishAllDrafts();
      res.json({ success: true, results });
    } else if (post_id) {
      const result = publisher.publishPost(post_id);
      res.json({ success: true, ...result });
    } else {
      const result = publisher.publishLatestDraft();
      res.json({ success: true, result });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/published', adminAuth, (req, res) => {
  res.json(publisher.getPublishedPosts());
});

// Auto mode
app.get('/api/auto-mode', adminAuth, (req, res) => {
  res.json({ auto_mode: scheduler.getAutoMode() });
});

app.post('/api/auto-mode', adminAuth, (req, res) => {
  const { on } = req.body;
  const autoMode = scheduler.setAutoMode(on);
  res.json({ success: true, auto_mode: autoMode });
});

// Logs
app.get('/api/logs', adminAuth, (req, res) => {
  res.json(scheduler.getLogs(parseInt(req.query.limit) || 50));
});

// Seed sample affiliate data (quick start)
app.post('/api/seed', adminAuth, (req, res) => {
  try {
    const result = seed.seed();
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Trigger auto cycle manually
app.post('/api/auto-cycle', adminAuth, async (req, res) => {
  try {
    await scheduler.runAutoCycle();
    res.json({ success: true, message: 'Auto cycle completed' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============ AGENT ROUTES (require AGENT_SECRET) ============

app.post('/agent/push', agentAuth, (req, res) => {
  try {
    const { changes } = req.body;
    const result = githubPush.processChanges(changes || []);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============ PUBLIC ROUTES (blog posts) ============

app.get('/posts/:slug', (req, res) => {
  const slug = req.params.slug.replace(/\.html$/, '');
  const filePath = path.join(__dirname, 'public', 'posts', `${slug}.html`);
  const fs = require('fs');
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Post not found');
  }
});

// Start server
scheduler.startScheduler();
publisher.ensurePostsDir();

app.listen(PORT, () => {
  console.log(`Clawbot Money Engine running on port ${PORT}`);
  console.log(`Admin: /admin | Health: /health`);
});
