# Deploy Clawbot to Render

## Option A: Deploy from HUBDEPOT repo (clawbot as subfolder)

If your GitHub repo is `your-username/HUBDEPOT` with clawbot inside:

1. **Push to GitHub** (if not already):
   ```bash
   cd c:\Users\mukit\OneDrive\Desktop\HUBDEPOT
   git init
   git add clawbot
   git commit -m "Add Clawbot Money Engine"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/HUBDEPOT.git
   git push -u origin main
   ```

2. **Create Render Web Service**:
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - **New** → **Web Service**
   - Connect your GitHub account and select **HUBDEPOT** repo
   - Configure:
     - **Name:** clawbot-money-engine
     - **Root Directory:** `clawbot` ← important
     - **Runtime:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`

3. **Add Environment Variables** (Render → Environment):
   | Key | Value |
   |-----|-------|
   | ADMIN_PASSWORD | your-secure-password |
   | OPENAI_API_KEY | sk-your-key |
   | GITHUB_TOKEN | ghp_your-token |
   | GITHUB_REPO | your-username/HUBDEPOT |
   | GITHUB_BRANCH | main |
   | AGENT_SECRET | random-secret |
   | SITE_URL | https://bot.hub-depot.com |

4. **Deploy** → Click **Create Web Service**

---

## Option B: Deploy clawbot as standalone repo

1. **Create new GitHub repo** (e.g. `clawbot-money-engine`)

2. **Push clawbot**:
   ```bash
   cd c:\Users\mukit\OneDrive\Desktop\HUBDEPOT\clawbot
   git init
   git add .
   git commit -m "Clawbot Money Engine"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/clawbot-money-engine.git
   git push -u origin main
   ```

3. **Create Render Web Service**:
   - **New** → **Web Service**
   - Select **clawbot-money-engine** repo
   - Root Directory: leave blank (clawbot is root)
   - Build: `npm install`
   - Start: `npm start`
   - Add env vars as above (GITHUB_REPO = your-username/clawbot-money-engine)

4. **Deploy**

---

## After deploy

- **Health check:** `https://your-app.onrender.com/health`
- **Admin:** `https://your-app.onrender.com/admin`
- **Custom domain:** Render → Settings → Custom Domain → Add `bot.hub-depot.com`
