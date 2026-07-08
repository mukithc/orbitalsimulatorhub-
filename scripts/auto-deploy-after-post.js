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

  // Step 3: Check if Vercel CLI is available and deploy non-interactively when possible
  let vercelPath = '';
  try {
    vercelPath = execSync('which vercel', { encoding: 'utf-8', stdio: 'pipe' }).trim();
  } catch (e) {
    vercelPath = '';
  }

  if (vercelPath && existsSync(vercelPath)) {
    console.log('🌐 Step 3: Vercel CLI detected. Preparing deployment...');
    const token = process.env.VERCEL_TOKEN || process.env.NPM_CONFIG_VERCEL_TOKEN;
    try {
      if (token) {
        console.log('🔐 Using VERCEL_TOKEN for non-interactive deployment');
        execSync(`vercel --prod --token ${token}`, {
          cwd: rootDir,
          stdio: 'inherit'
        });
        console.log('✅ Deployed to Vercel\n');
      } else {
        // Check if user is already logged in (vercel whoami exits non-zero if not)
        try {
          const whoami = execSync('vercel whoami', { cwd: rootDir, stdio: 'pipe', encoding: 'utf-8' }).trim();
          console.log(`✅ Vercel authenticated as: ${whoami}`);
          console.log('🌐 Deploying to Vercel (interactive)...');
          execSync('vercel --prod', {
            cwd: rootDir,
            stdio: 'inherit'
          });
          console.log('✅ Deployed to Vercel\n');
        } catch (err) {
          console.log('⚠️  Vercel CLI is installed but not authenticated or token not provided. Skipping deployment.');
          console.log('   To enable non-interactive deploys, set the VERCEL_TOKEN env var or run `vercel login` locally.\n');
        }
      }
    } catch (e) {
      console.log('⚠️  Vercel deployment skipped (failed)\n');
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
