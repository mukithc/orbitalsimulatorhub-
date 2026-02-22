/**
 * Clawbot Money Engine - GitHub Auto Push System
 * Receives changes, writes files, commits, pushes to GitHub
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ALLOWED_FOLDERS = ['public', 'src', 'data'];
const MAX_FILES = 50;

function validatePath(filePath) {
  if (!filePath || typeof filePath !== 'string') return false;
  if (filePath.includes('..')) return false;
  if (path.isAbsolute(filePath)) return false;
  const normalized = path.normalize(filePath);
  if (normalized.startsWith('..')) return false;
  const parts = normalized.split(path.sep);
  const firstPart = parts[0];
  return ALLOWED_FOLDERS.includes(firstPart);
}

function processChanges(changes) {
  if (!Array.isArray(changes) || changes.length > MAX_FILES) {
    throw new Error(`Invalid changes: must be array with max ${MAX_FILES} files`);
  }

  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!repo || !token) {
    throw new Error('GITHUB_REPO and GITHUB_TOKEN must be set');
  }

  const rootDir = process.cwd();
  const written = [];
  const errors = [];

  for (const change of changes) {
    const { path: filePath, content, action = 'write' } = change;

    if (!validatePath(filePath)) {
      errors.push({ path: filePath, error: 'Invalid or disallowed path' });
      continue;
    }

    const fullPath = path.join(rootDir, filePath);

    try {
      if (action === 'delete') {
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          written.push({ path: filePath, action: 'deleted' });
        }
      } else {
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(fullPath, content || '', 'utf8');
        written.push({ path: filePath, action: 'written' });
      }
    } catch (err) {
      errors.push({ path: filePath, error: err.message });
    }
  }

  if (written.length === 0 && errors.length > 0) {
    throw new Error('No files could be written: ' + errors.map(e => e.error).join('; '));
  }

  try {
    const authUrl = `https://${token}@github.com/${repo}.git`;
    execSync('git add -A', { cwd: rootDir });
    execSync(`git config user.email "clawbot@hub-depot.com"`, { cwd: rootDir });
    execSync(`git config user.name "Clawbot"`, { cwd: rootDir });
    execSync(`git commit -m "Clawbot auto-push: ${written.length} files updated"`, { cwd: rootDir });
    execSync(`git push ${authUrl} ${branch}`, { cwd: rootDir });
  } catch (err) {
    throw new Error('Git push failed: ' + err.message);
  }

  return { written, errors };
}

function pushCurrentState(message = 'Clawbot auto-push') {
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!repo || !token) {
    throw new Error('GITHUB_REPO and GITHUB_TOKEN must be set');
  }

  const rootDir = process.cwd();
  const authUrl = `https://${token}@github.com/${repo}.git`;

  execSync('git add -A', { cwd: rootDir });
  execSync('git config user.email "clawbot@hub-depot.com"', { cwd: rootDir });
  execSync('git config user.name "Clawbot"', { cwd: rootDir });
  execSync(`git status --porcelain`, { cwd: rootDir });
  try {
    execSync(`git commit -m "${message}"`, { cwd: rootDir });
  } catch (e) {
    if (e.message && e.message.includes('nothing to commit')) {
      return { pushed: false, message: 'Nothing to commit' };
    }
    throw e;
  }
  execSync(`git push ${authUrl} ${branch}`, { cwd: rootDir });
  return { pushed: true };
}

module.exports = { processChanges, validatePath, pushCurrentState };
