# Deploy to Cloudflare Pages via GitHub

Deploy DataNextGenProfile to `cv.danieltarazona.com` using GitHub integration.

## Step 1: Push to GitHub

```bash
cd /Users/data/Projects/DataNextGenProfile
git init
git add .
git commit -m "Initial commit"
git remote add origin git@github.com:danieltarazona/DataNextGenProfile.git
git push -u origin main
```

## Step 2: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages**
2. Click **Create** → **Pages** → **Connect to Git**
3. Select **GitHub** and authorize Cloudflare
4. Choose repository: `danieltarazona/DataNextGenProfile`
5. Configure build settings:

| Setting | Value |
|---------|-------|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` |

6. Click **Save and Deploy**

## Step 3: Add Custom Domain

1. Go to your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `cv.danieltarazona.com`
4. Click **Activate domain**

Cloudflare auto-configures DNS for domains on your account.

## Step 4: Verify

After ~2 minutes your site is live at:

- 🌐 **https://cv.danieltarazona.com**
- 🔗 https://datanextgenprofile.pages.dev

## Auto-Deploy

Every push to `main` triggers automatic deployment.

```bash
git add .
git commit -m "Update CV editor"
git push
# → Cloudflare deploys automatically
```
