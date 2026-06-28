# Sabin Thapa Magar — Portfolio Website

**Live URL:** https://sabinmgr.com.np (once deployed)

---

## 📁 File Structure

```
sabinportfolio/
├── index.html              ← Main page (all sections)
├── css/
│   └── style.css           ← All styles
├── js/
│   └── main.js             ← All JavaScript (nav, chat, form, animations)
├── netlify.toml            ← Netlify config (headers, caching, redirects)
├── README.md               ← This file
└── blue and white portrait.png   ← Your photo (rename as needed)
```

---

## 🚀 Deploy via GitHub + Netlify (Recommended)

### Step 1 — Create a GitHub Repository

1. Go to https://github.com and sign in (or create an account).
2. Click **"New"** (green button, top left).
3. Repository name: `portfolio` (or any name you prefer).
4. Set to **Public**.
5. Do NOT initialize with README (you already have files).
6. Click **"Create repository"**.

### Step 2 — Push Your Files to GitHub

Open a terminal (Command Prompt / Git Bash on Windows, Terminal on Mac/Linux):

```bash
# Navigate to your portfolio folder
cd path/to/sabinportfolio

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial portfolio deploy"

# Link to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push
git branch -M main
git push -u origin main
```

If you don't have Git installed: https://git-scm.com/downloads

### Step 3 — Connect to Netlify

1. Go to https://netlify.com and sign up (free — use "Sign up with GitHub").
2. Click **"Add new site"** → **"Import an existing project"**.
3. Choose **GitHub** → authorize Netlify → select your `portfolio` repository.
4. Build settings:
   - **Build command:** *(leave empty)*
   - **Publish directory:** `.` (just a dot — your root)
5. Click **"Deploy site"**.

Netlify will give you a URL like `https://your-name-xyz.netlify.app` in ~30 seconds.

### Step 4 — Auto-Deploy on Every Push

After setup, every time you `git push`, Netlify automatically redeploys. No manual steps needed.

---

## 📬 Contact Form (Netlify Forms)

The contact form uses **Netlify Forms** — zero backend, zero cost.

- Submissions appear in your Netlify dashboard under **Forms → contact**.
- You can set up email notifications: Netlify Dashboard → **Forms → contact → Settings → Email notifications**.
- Spam is filtered automatically via the honeypot field already in the HTML.

**No server or backend needed.** It just works when deployed on Netlify.

---

## 🌐 Custom Domain Setup

1. Buy a domain (e.g., `sabinmgr.com.np` — .com.np domains are from Mercantile/NIC Nepal).
2. In Netlify: **Site settings → Domain management → Add custom domain**.
3. Enter your domain, follow the DNS instructions Netlify gives you.
4. Netlify provides **free HTTPS/SSL** automatically (Let's Encrypt).

---

## 🖼️ Adding Your Photo

Place your photo in the root folder with the exact filename:

```
blue and white portrait.png
```

Or update the `<img>` tag in `index.html` (line ~108):

```html
<img src="YOUR_PHOTO_NAME.jpg" alt="Sabin Thapa Magar" loading="eager">
```

Recommended: 600×700px, portrait orientation, JPG/PNG/WebP.

---

## ✏️ Common Edits

| What to change | Where |
|---|---|
| LinkedIn URL | `index.html` — search "linkedin.com" (2 places) |
| Update real LinkedIn URL | Replace `https://linkedin.com` with your actual profile URL |
| Blog posts | Add more `.blog-card` divs in the `#blog` section of `index.html` |
| Skills | Edit `.skill-card` blocks in `#skills` section |
| Footer copyright year | Bottom of `index.html` in `<footer>` |
| Colors / fonts | Top of `css/style.css` (CSS variables under `:root`) |
| Chat answers | `js/main.js` — `chatAnswers` object |

---

## 🔧 Local Preview

No build tools needed. Just open `index.html` in your browser:

- Double-click the file, OR
- Right-click → "Open with" → your browser

For the contact form to work, you must deploy to Netlify (it won't submit locally).

---

## 📌 What Was Removed

- ❌ Admin panel (login, password, dashboard)
- ❌ localStorage analytics (visit counting, message storage)
- ❌ Blog admin (publish/delete posts via UI)
- ❌ All localStorage usage

**Why:** Admin panels in client-side HTML with a hardcoded password (`sabin2024`) are not secure. Anyone can read the source and log in. The contact form now uses Netlify Forms which is secure and reliable.

---

## 🆘 Need Help?

- Netlify Docs: https://docs.netlify.com
- Netlify Forms: https://docs.netlify.com/forms/setup/
- GitHub Docs: https://docs.github.com/en/get-started
- Custom .com.np Domain: https://register.com.np (Mercantile Nepal)
