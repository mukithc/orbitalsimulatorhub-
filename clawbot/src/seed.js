/**
 * Clawbot Money Engine - Seed Sample Affiliate Data
 * Quick-start demo data for affiliate marketing
 */

const affiliate = require('./affiliate');
const products = require('./products');

const SAMPLE_PROGRAMS = [
  { name: 'Amazon Associates', commission: '1-10%', link: 'https://affiliate-program.amazon.com/', notes: 'Replace with your affiliate link' },
  { name: 'ShareASale', commission: '5-30%', link: 'https://www.shareasale.com/', notes: 'Popular affiliate network' },
  { name: 'CJ Affiliate', commission: '5-25%', link: 'https://www.cj.com/', notes: 'Commission Junction' },
  { name: 'HubDepot Affiliates', commission: '15%', link: 'https://hub-depot.com/affiliate', notes: 'Your own program' }
];

const SAMPLE_PRODUCTS = [
  { title: 'Best Wireless Earbuds 2024', description: 'Top-rated wireless earbuds for work and travel', category: 'Electronics', link: 'https://example.com/earbuds' },
  { title: 'Project Management Software', description: 'All-in-one tool for teams', category: 'Software', link: 'https://example.com/pm' },
  { title: 'SEO Course for Beginners', description: 'Learn SEO from scratch', category: 'Courses', link: 'https://example.com/seo' }
];

function seed() {
  const programs = affiliate.getPrograms();
  const prods = products.getProducts();

  if (programs.length > 0 && prods.length > 0) {
    return { message: 'Data already exists', programs: programs.length, products: prods.length };
  }

  const programIds = [];
  for (const p of SAMPLE_PROGRAMS) {
    const id = affiliate.addProgram(p.name, p.commission, p.link, p.notes);
    programIds.push(id);
  }

  for (const p of SAMPLE_PRODUCTS) {
    products.addProduct(p.title, p.description, '', p.link, p.category);
  }

  if (programIds.length > 0) {
    affiliate.addLink(programIds[0], 'Amazon Home', 'https://amazon.com/?tag=YOUR_TAG', 'Replace YOUR_TAG');
    affiliate.addLink(programIds[0], 'Amazon Electronics', 'https://amazon.com/electronics?tag=YOUR_TAG', 'Replace YOUR_TAG');
  }

  return {
    message: 'Sample data loaded',
    programs: SAMPLE_PROGRAMS.length,
    products: SAMPLE_PRODUCTS.length,
    links: 2
  };
}

module.exports = { seed };
