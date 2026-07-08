#!/usr/bin/env node
/**
 * Auto-deploy script - runs after blog posts are added
 * Usage: node scripts/auto-deploy-after-post.js
 * 
 * This script:
 * 1. Regenerates RSS feed
 * 2. Builds the client
 * 3. Optionally triggers deployment (Vercel/GitHub Pages)
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🚀 Starting auto-deploy after blog post...\n');

try {
  // Step 1: Regenerate RSS feed
  console.log('📡 Step 1: Regenerating RSS feed...');
  execSync('npm run generate:rss', {
    cwd: rootDir,
    stdio: 'inherit'
  });
  console.log('✅ RSS feed regenerated\n');

  // Step 2: Build client
  console.log('🔨 Step 2: Building client...');
  execSync('npm run build:client', {
    cwd: rootDir,
    stdio: 'inherit'
  });
  console.log('✅ Client built\n');

  // Step 3: Check if Vercel CLI is available
  const vercelPath = execSync('which vercel', { encoding: 'utf-8', stdio: 'pipe' }).trim();
  if (vercelPath && existsSync(vercelPath)) {
    console.log('🌐 Step 3: Deploying to Vercel...');
    try {
      execSync('vercel --prod', {
        cwd: rootDir,
        stdio: 'inherit'
      });
      console.log('✅ Deployed to Vercel\n');
    } catch (e) {
      console.log('⚠️  Vercel deployment skipped (not configured or failed)\n');
    }
  } else {
    console.log('ℹ️  Step 3: Vercel CLI not found. Skipping deployment.');
    console.log('   To enable auto-deploy, install Vercel CLI: npm i -g vercel\n');
  }

  console.log('✅ Auto-deploy completed successfully!');
  console.log('\n📝 Next steps:');
  console.log('   - Review the new blog post');
  console.log('   - If using GitHub Pages, push to trigger deployment');
  console.log('   - If using Vercel, it should auto-deploy on git push\n');

} catch (error) {
  console.error('❌ Auto-deploy failed:', error.message);
  process.exit(1);
}
