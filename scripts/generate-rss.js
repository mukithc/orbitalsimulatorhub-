#!/usr/bin/env node
/**
 * RSS Feed Generator
 *
 * Generates RSS feed from blogPosts.ts data for both /rss.xml and /blog/rss.xml.
 * Run: npm run generate:rss
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeXml(text = "") {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripHtml(text = "") {
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function buildDescription(excerpt = "", content = "") {
  const text = stripHtml(excerpt || content || "Read the latest space research, missions, and AI developments from OrbitalSimulatorHub.");
  return text.length > 320 ? `${text.slice(0, 317)}...` : text;
}

const blogPostsPath = path.join(__dirname, "../client/src/data/blogPosts.ts");
const blogPostsContent = fs.readFileSync(blogPostsPath, "utf8");

const postRegex = /{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*excerpt:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",\s*date:\s*"([^"]+)",[\s\S]*?tags:\s*\[([^\]]+)\],/g;

const posts = [];
let match;
while ((match = postRegex.exec(blogPostsContent)) !== null) {
  const [, slug, title, excerpt, category, date, tagsStr] = match;
  const tags = tagsStr.split(",").map((tag) => tag.trim().replace(/"/g, ""));
  posts.push({ slug, title, excerpt, category, date, tags });
}

posts.sort((a, b) => b.date.localeCompare(a.date));

const siteUrl = "https://www.orbitalsimulatorhub.com";
const buildDate = new Date().toUTCString();

function buildRssXml(selfHref, feedTitle, feedLink) {
  const rssItems = posts
    .map((post) => {
      const pubDate = new Date(`${post.date}T00:00:00Z`).toUTCString();
      const itemUrl = `${siteUrl}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${itemUrl}</link>
      <guid isPermaLink="true">${itemUrl}</guid>
      <description>${escapeXml(buildDescription(post.excerpt, post.title))}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category)}</category>
      <author>OrbitalSimulatorHub</author>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <link>${feedLink}</link>
    <description>Space technology, orbital mechanics, spacecraft simulation, robotics, artificial intelligence, and Space-AGI research.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <generator>OrbitalSimulatorHub RSS Generator</generator>
    <atom:link href="${selfHref}" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteUrl}/logo.png</url>
      <title>OrbitalSimulatorHub</title>
      <link>${siteUrl}</link>
    </image>
${rssItems}
  </channel>
</rss>`;
}

const rssOutputs = [
  {
    path: path.join(__dirname, "../client/public/rss.xml"),
    xml: buildRssXml(`${siteUrl}/rss.xml`, "OrbitalSimulatorHub", `${siteUrl}/blog`),
  },
  {
    path: path.join(__dirname, "../client/public/blog/rss.xml"),
    xml: buildRssXml(`${siteUrl}/blog/rss.xml`, "OrbitalSimulatorHub Blog", `${siteUrl}/blog`),
  },
];

for (const output of rssOutputs) {
  fs.mkdirSync(path.dirname(output.path), { recursive: true });
  fs.writeFileSync(output.path, output.xml, "utf8");
}

console.log(`✅ Generated RSS feed with ${posts.length} posts`);
console.log("   Saved to: client/public/rss.xml and client/public/blog/rss.xml");
