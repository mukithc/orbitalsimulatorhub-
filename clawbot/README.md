# 🔥 Clawbot Money Engine

A fully automated affiliate marketing system that generates passive income through SEO blog posts, automatic publishing, and GitHub deployment.

## Tech Stack

- **Backend:** Node.js + Express
- **Database:** SQLite (easy upgrade to PostgreSQL)
- **Hosting:** Render
- **Domain:** Cloudflare (bot.hub-depot.com)
- **Scheduler:** node-cron (every 6 hours)

---

## STEP 1: Install

```bash
cd clawbot
npm install
```

---

## STEP 2: Run Locally

1. Copy environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your values:
   - `ADMIN_PASSWORD` - Your admin login password
   - `OPENAI_API_KEY` - For AI content generation
   - `GITHUB_TOKEN`, `GITHUB_REPO`, `GITHUB_BRANCH` - For auto push
   - `AGENT_SECRET` - For `/agent/push` API security

3. Start the server:
   ```bash
   npm start
   ```

4. Open admin dashboard: http://localhost:3000/admin  
   Login: `admin` / your `ADMIN_PASSWORD`

---

## STEP 3: Deploy to Render

1. Push your code to GitHub.

2. Go to [Render Dashboard](https://dashboard.render.com) → New → Web Service.

3. Connect your GitHub repo.

4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Add all variables from `.env`:
     - `ADMIN_PASSWORD`
     - `OPENAI_API_KEY`
     - `GITHUB_TOKEN`
     - `GITHUB_REPO`
     - `GITHUB_BRANCH` (optional, default: main)
     - `AGENT_SECRET`
     - `SITE_URL` (https://bot.hub-depot.com)

5. Deploy. Render uses `process.env.PORT` automatically.

**Note:** Render's free tier has ephemeral storage. Your SQLite database resets on redeploy. To persist data, add a [Persistent Disk](https://render.com/docs/disks) (paid) and set `DATABASE_URL` to the disk path, or re-enter affiliate data after each deploy.

---

## STEP 4: Connect Cloudflare Domain

1. In Render: Settings → Custom Domain → Add `bot.hub-depot.com`

2. In Cloudflare:
   - Add CNAME record: `bot` → `your-app.onrender.com`
   - Or use Render's provided DNS instructions

3. Health check: https://bot.hub-depot.com/health

---

## STEP 5: Enable Auto Mode

1. Go to Admin → Auto Mode
2. Click **Enable Auto Mode**
3. Every 6 hours the system will:
   - Generate a new SEO blog post
   - Publish it to `/public/posts/`
   - Push changes to GitHub (triggers Render redeploy)

---

## Features

| Feature | Description |
|---------|-------------|
| **Affiliate Programs** | Store program name, commission, links |
| **Affiliate Links** | Individual links with notes |
| **Products** | Manual entry: title, description, image, affiliate link, category |
| **AI Generator** | Blog posts, reviews, top 10 lists, ad copy (OpenAI) |
| **Publisher** | Converts drafts to HTML, saves to `/public/posts/` |
| **GitHub Push** | `POST /agent/push` - receives changes, commits, pushes |
| **Auto Mode** | Cron every 6 hours: generate → publish → push |

---

## API Endpoints

### Public
- `GET /health` - Health check (no auth)
- `GET /posts/:slug` - View published blog post

### Admin (Basic Auth: admin / ADMIN_PASSWORD)
- `GET /admin` - Dashboard
- `GET/POST /api/programs` - Affiliate programs
- `GET/POST /api/links` - Affiliate links
- `GET/POST /api/products` - Products
- `POST /api/generate/blog` - Generate blog post
- `POST /api/generate/review` - Generate review
- `POST /api/generate/top10` - Generate top 10 list
- `POST /api/generate/adcopy` - Generate ad copy
- `GET /api/posts` - List posts
- `POST /api/publish` - Publish draft(s)
- `GET/POST /api/auto-mode` - Toggle auto mode
- `GET /api/logs` - View logs

### Agent (Header: `x-agent-secret: AGENT_SECRET`)
- `POST /agent/push` - Push file changes to GitHub
  - Body: `{ "changes": [{ "path": "public/posts/x.html", "content": "..." }] }`
  - Guardrails: max 50 files, allowed folders only (public, src, data), blocks `..`

---

## Project Structure

```
/clawbot
├── server.js          # Main Express app
├── package.json
├── .env.example
├── /src
│   ├── db.js          # SQLite database
│   ├── affiliate.js   # Affiliate management
│   ├── products.js    # Product management
│   ├── generator.js   # AI content (OpenAI)
│   ├── publisher.js   # HTML blog publisher
│   ├── scheduler.js   # 6-hour cron
│   └── githubPush.js  # Git commit + push
├── /public
│   ├── /admin         # Admin dashboard
│   └── /posts         # Published HTML blogs
└── README.md
```

---

## Security

- Admin: Basic auth with `ADMIN_PASSWORD` from `.env`
- Agent API: `x-agent-secret` header must match `AGENT_SECRET`
- GitHub push: Path validation, no `..`, max 50 files, allowed folders only

---

## Upgrade to PostgreSQL

Set `DATABASE_URL` in `.env` to your PostgreSQL connection string.  
(Schema migration script needed - current version uses SQLite.)
