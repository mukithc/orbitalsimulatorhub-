/**
 * Clawbot Money Engine - Affiliate Management
 */

const { db } = require('./db');

function addProgram(name, commission, affiliateLink, notes) {
  const stmt = db.prepare(`
    INSERT INTO affiliate_programs (name, commission, affiliate_link, notes)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(name || '', commission || '', affiliateLink || '', notes || '');
  return result.lastInsertRowid;
}

function addLink(programId, name, url, notes) {
  const stmt = db.prepare(`
    INSERT INTO affiliate_links (program_id, name, url, notes)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(programId || null, name || '', url || '', notes || '');
  return result.lastInsertRowid;
}

function getPrograms() {
  return db.prepare('SELECT * FROM affiliate_programs ORDER BY created_at DESC').all();
}

function getLinks(programId = null) {
  if (programId) {
    return db.prepare('SELECT * FROM affiliate_links WHERE program_id = ? ORDER BY created_at DESC').all(programId);
  }
  return db.prepare('SELECT * FROM affiliate_links ORDER BY created_at DESC').all();
}

function getRandomAffiliateLink() {
  const links = db.prepare('SELECT url FROM affiliate_links WHERE url IS NOT NULL AND url != ""').all();
  if (links.length === 0) {
    const programs = db.prepare('SELECT affiliate_link FROM affiliate_programs WHERE affiliate_link IS NOT NULL AND affiliate_link != ""').all();
    if (programs.length === 0) return null;
    return programs[Math.floor(Math.random() * programs.length)].affiliate_link;
  }
  return links[Math.floor(Math.random() * links.length)].url;
}

function deleteProgram(id) {
  db.prepare('DELETE FROM affiliate_links WHERE program_id = ?').run(id);
  return db.prepare('DELETE FROM affiliate_programs WHERE id = ?').run(id);
}

function deleteLink(id) {
  return db.prepare('DELETE FROM affiliate_links WHERE id = ?').run(id);
}

module.exports = {
  addProgram,
  addLink,
  getPrograms,
  getLinks,
  getRandomAffiliateLink,
  deleteProgram,
  deleteLink
};
