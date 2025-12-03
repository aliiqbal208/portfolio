# Muhammad Ali - Portfolio

![Portfolio Preview](https://res.cloudinary.com/daeki8yrd/image/upload/v1764756241/Screenshot_2025-12-03_at_3.03.39_PM_dl7pas.png)

> Modern portfolio website for a **Senior Full-Stack AI Engineer** built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## ✨ Features

🎨 Dark/Light theme • 📊 Live GitHub contributions • 📝 Dynamic projects via Gist • 💼 Experience timeline • 🎓 Certifications • 📱 Fully responsive

## 🛠️ Tech Stack

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui  
**Backend:** GitHub GraphQL API, Next.js API Routes  
**Deploy:** Vercel

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/aliiqbal208/portfolio.git
cd portfolio

# Install
pnpm install

# Setup environment
cp .env.example .env
# Add your GITHUB_TOKEN, GITHUB_USERNAME, and NEXT_PUBLIC_PROJECTS_GIST_ID

# Run
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Variables

```env
GITHUB_TOKEN=ghp_xxxxx                      # GitHub personal access token (read:user scope)
GITHUB_USERNAME=aliiqbal208                  # Your GitHub username
NEXT_PUBLIC_PROJECTS_GIST_ID=xxxxx          # Gist ID containing projects.json
NEXT_PUBLIC_IS_LOCAL_JSON=true              # true=local, false=Gist
```

**Get GitHub Token:** [Settings → Tokens](https://github.com/settings/tokens) → Generate (classic) → `read:user` scope

## 📝 Customization

### Update Projects

**Local:** Edit `/public/data/projects.json`  
**Production:** Update your [GitHub Gist](https://gist.github.com/)

### Update Personal Info

Edit `app/page.tsx`:
- Profile image, name, title, location
- Social links (GitHub, LinkedIn, Twitter, Email)
- Tech stack arrays
- Certifications array

## 🚢 Deploy to Vercel

Set `NEXT_PUBLIC_IS_LOCAL_JSON=false` in production to use GitHub Gist.

## 📁 Structure

```
app/          # Pages & API routes
components/   # React components
public/       # Static assets & local JSON
lib/          # Types & utilities
```

## 👤 Author

**Muhammad Ali** - Senior Full-Stack AI Engineer  
📍 Lahore, Pakistan 🇵🇰

- GitHub: [@aliiqbal208](https://github.com/aliiqbal208)
- LinkedIn: [aliiqbal208](https://www.linkedin.com/in/aliiqbal208/)
- Email: codewithmuhammadali@gmail.com
- Twitter: [@aliiqbal208](https://x.com/aliiqbal208)

## 📄 License

MIT License - Feel free to use this project as inspiration!

---

Built with ❤️ by Muhammad Ali • ⭐ Star if you like it!
  
