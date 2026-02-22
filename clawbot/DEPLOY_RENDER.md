# Deploy Clawbot to Render (5 minutes)

## Step 1: Create GitHub repo

1. Open: **https://github.com/new?name=clawbot-money-engine**
2. Name: `clawbot-money-engine` (or leave default)
3. Visibility: **Public**
4. **Do NOT** add README, .gitignore, or license
5. Click **Create repository**

---

## Step 2: Push code

Run in terminal (from `clawbot` folder):

```powershell
cd c:\Users\mukit\OneDrive\Desktop\HUBDEPOT\clawbot
git push -u origin hubdepot
```

---

## Step 3: Create Render Web Service

1. Go to **https://dashboard.render.com**
2. **New** → **Web Service**
3. Connect GitHub → select **clawbot-money-engine**
4. Configure:
   - **Name:** clawbot-money-engine
   - **Branch:** `hubdepot` (or `main` if you prefer)
   - **Root Directory:** leave blank
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click **Advanced** → Add **Environment Variables**:

| Key | Value |
|-----|-------|
| ADMIN_PASSWORD | (choose a strong password) |
| OPENAI_API_KEY | sk-... (from platform.openai.com) |
| GITHUB_TOKEN | ghp_... (optional, for auto-push) |
| GITHUB_REPO | mukithc/clawbot-money-engine |
| AGENT_SECRET | (random string) |
| SITE_URL | https://clawbot-money-engine.onrender.com |

6. Click **Create Web Service**

---

## Step 4: Add custom domain (optional)

After deploy, in Render:
- **Settings** → **Custom Domain** → Add `bot.hub-depot.com`
- Point Cloudflare CNAME: `bot` → `clawbot-money-engine.onrender.com`

---

## Done

- **App URL:** https://clawbot-money-engine.onrender.com (or your custom domain)
- **Admin:** https://your-app.onrender.com/admin
- **Health:** https://your-app.onrender.com/health
