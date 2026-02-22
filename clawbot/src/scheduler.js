/**
 * Clawbot Money Engine - Auto Mode Scheduler
 * Runs every 6 hours: generate content, publish, push to GitHub
 */

const cron = require('node-cron');
const { db } = require('./db');
const generator = require('./generator');
const publisher = require('./publisher');
const githubPush = require('./githubPush');

function log(level, message, meta = null) {
  const stmt = db.prepare('INSERT INTO logs (level, message, meta) VALUES (?, ?, ?)');
  stmt.run(level, message, meta ? JSON.stringify(meta) : null);
}

function getAutoMode() {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get('auto_mode');
  return row?.value === 'on';
}

function setAutoMode(on) {
  const stmt = db.prepare('UPDATE settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?');
  stmt.run(on ? 'on' : 'off', 'auto_mode');
  return getAutoMode();
}

async function runAutoCycle() {
  log('info', 'Auto cycle started');

  try {
    const topics = [
      'Best affiliate marketing strategies for beginners',
      'How to choose the right products for your niche',
      'Passive income ideas that actually work',
      'Top tools for content creators in 2024',
      'SEO tips for affiliate blogs'
    ];
    const topic = topics[Math.floor(Math.random() * topics.length)];

    log('info', 'Generating content', { topic });
    await generator.generateBlogPost(topic, 'affiliate marketing, passive income');

    log('info', 'Publishing latest draft');
    const published = publisher.publishLatestDraft();
    if (published) {
      log('info', 'Post published', { slug: published.slug });
    }

    if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
      log('info', 'Pushing to GitHub');
      const result = githubPush.pushCurrentState('Clawbot auto-mode: new content published');
      if (result.pushed) {
        log('info', 'GitHub push successful');
      } else {
        log('info', 'GitHub: nothing to commit');
      }
    }
  } catch (err) {
    log('error', 'Auto cycle failed', { error: err.message });
    throw err;
  }

  log('info', 'Auto cycle completed');
}

function startScheduler() {
  cron.schedule('0 */6 * * *', async () => {
    if (!getAutoMode()) return;
    try {
      await runAutoCycle();
    } catch (err) {
      console.error('Scheduler error:', err);
    }
  });
  console.log('Clawbot scheduler: every 6 hours (when auto_mode is on)');
}

function getLogs(limit = 50) {
  return db.prepare('SELECT * FROM logs ORDER BY created_at DESC LIMIT ?').all(limit);
}

module.exports = {
  startScheduler,
  runAutoCycle,
  getAutoMode,
  setAutoMode,
  getLogs,
  log
};
