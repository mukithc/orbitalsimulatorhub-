/**
 * Clawbot Money Engine - Product Management
 */

const { db } = require('./db');

function addProduct(title, description, image, affiliateLink, category) {
  const stmt = db.prepare(`
    INSERT INTO products (title, description, image, affiliate_link, category)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    title || '',
    description || '',
    image || '',
    affiliateLink || '',
    category || ''
  );
  return result.lastInsertRowid;
}

function getProducts(category = null) {
  if (category) {
    return db.prepare('SELECT * FROM products WHERE category = ? ORDER BY created_at DESC').all(category);
  }
  return db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
}

function getProduct(id) {
  return db.prepare('SELECT * FROM products WHERE id = ?').get(id);
}

function deleteProduct(id) {
  return db.prepare('DELETE FROM products WHERE id = ?').run(id);
}

function getProductsForContent() {
  return db.prepare(`
    SELECT * FROM products 
    WHERE affiliate_link IS NOT NULL AND affiliate_link != ''
    ORDER BY RANDOM()
    LIMIT 10
  `).all();
}

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  getProductsForContent
};
