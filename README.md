# Beyond Von Neumann: Neuromorphic Computing and the Future of Intelligent Systems\n\nCreated by PARV AGARWAL

An interactive research presentation web app exploring neuromorphic computing concepts, based on the paper by Schuman et al. published in [Nature Computational Science (2022)](https://www.nature.com/articles/s43588-021-00184-y).

**Presenter:** Parv Agarwal, JRA (Tech)
**Supervisor:** Dr. Asif Ekbal, IIT Patna
**Lab:** AI-NLP-ML Research Group

---

## Overview

This is a 15-slide interactive presentation built with React, TypeScript, Tailwind CSS v4, and Vite. It features:

- **Canvas-based neural animations** as a living background across all slides
- **Recharts visualizations** for data-driven comparisons (energy efficiency, scaling trends, etc.)
- **Motion-powered transitions** (via the `motion` library) for smooth slide animations
- **Interactive elements** including hover explanations, progressive reveals, clickable diagrams, animated spike raster demos, and architecture comparison toggles
- **Keyboard navigation** -- Arrow keys and Space to navigate, ESC for slide overview
- **Royal academic aesthetic** -- Midnight Blue (#191970) background with warm ivory text, gold accents, and glass-like panels

## Slides

| # | Title | Key Content |
|---|-------|-------------|
| 01 | Title | Presenter info, lab logo, paper reference |
| 02 | Classical Computing Crisis | Von Neumann bottleneck, Moore's Law limits |
| 03 | Scaling != Intelligence | Energy/performance comparison charts |
| 04 | Alternatives | Emerging computing paradigms |
| 05 | Brain Computation | Biological neural computation principles |
| 06 | Intro to Neuromorphic | What is neuromorphic computing |
| 07 | Paper Deep Dive | Key findings from the Nature paper |
| 08 | Learning Paradigms | Spike-based learning rules (STDP, etc.) |
| 09 | Non-ML Applications | Optimization, graph algorithms, etc. |
| 10 | Research Gaps | Open challenges in the field |
| 11 | Future Pathways | Where neuromorphic is heading |
| 12 | Quantum Synergy | Neuromorphic + quantum computing |
| 13 | Co-Design | Hardware-software co-design |
| 14 | Paradigm Shift | The broader computing transformation |
| 15 | Closing | Summary quote and thank you |

## Tech Stack

- **React 18** with TypeScript
- **Vite 6** (build tool & dev server)
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **Motion** (formerly Framer Motion) for animations
- **Recharts** for charts and data visualizations
- **Lucide React** for icons
- **HTML5 Canvas** for neural background animations

## Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background | Midnight Blue | `#191970` |
| Primary Text | Warm Ivory | `#E8E4D9` |
| Accents / Navigation | Gold | `#C9A84C` |
| Content Accent 1 | Steel Blue | `#3A6EA5` |
| Content Accent 2 | Sage Teal | `#6BA292` |
| Content Accent 3 | Muted Lavender | `#5B4B8A` |
| Panel Backgrounds | Glass White | `rgba(255,255,255,0.03)` |

---

## Running Locally

### Prerequisites

- **Node.js** >= 18 (recommended: v20+)
- **pnpm** (recommended) or npm/yarn

### Step 1: Download the Project

Clone or download this repository to your local machine.

### Step 2: Handle the Lab Logo Asset (Local)

The project imports a lab logo from a local asset:

```ts
import labLogo from "../../assets/lab-logo.png";
```

This project is configured to run locally without any external asset pipeline.

### Step 3: Install Dependencies

```bash
cd your-project-folder

# Using pnpm (recommended, matches the lock file):
pnpm install

# OR using npm:
npm install

# OR using yarn:
yarn install
```

> **Note:** React and React DOM are listed as peer dependencies. If they're not installed automatically, install them explicitly:
> ```bash
> pnpm add react@18.3.1 react-dom@18.3.1
> ```

### Step 4: Start the Dev Server

```bash
pnpm dev
# or: npm run dev
# or: yarn dev
```

This starts Vite's dev server (usually at `http://localhost:5173`). Open it in your browser.

### Step 5: Build for Production

```bash
pnpm build
# or: npm run build
```

The output goes to the `dist/` folder. You can preview it with:

```bash
pnpm preview
# or: npx vite preview
```

---

## Deploying to GitHub Pages

### Option A: Automated with GitHub Actions (Recommended)

This is the cleanest approach -- push to `main` and your site deploys automatically.

#### 1. Create a GitHub Repository

```bash
cd your-project-folder
git init
git add .
git commit -m "Initial commit: neuromorphic computing presentation"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

#### 2. Update `vite.config.ts` for GitHub Pages

GitHub Pages serves your site at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`, so Vite needs to know the base path:

```ts
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Add this line -- replace YOUR_REPO_NAME with your actual repo name
  base: '/YOUR_REPO_NAME/',

  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
```

> **Important:** If you later use a custom domain, change `base` back to `'/'`.

#### 3. Create the GitHub Actions Workflow

Create the file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 4. Enable GitHub Pages in Repository Settings

1. Go to your repo on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**
4. Push your changes -- the action will run automatically:

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push
```

5. After the action completes (1-2 minutes), your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
   ```

### Option B: Manual Deployment with `gh-pages`

If you prefer manual deployments:

#### 1. Install the `gh-pages` package

```bash
pnpm add -D gh-pages
```

#### 2. Add a deploy script to `package.json`

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "pnpm build && gh-pages -d dist"
  }
}
```

#### 3. Update `vite.config.ts` with the `base` path (same as Option A, Step 2)

#### 4. Deploy

```bash
pnpm deploy
```

#### 5. In GitHub repo Settings > Pages, set Source to **Deploy from a branch** and select the `gh-pages` branch.

---

## Quick-Start Checklist

```
[ ] Clone or download this repository
[ ] Save lab logo PNG to /src/assets/lab-logo.png
[ ] Verify the lab logo path in Slide01Title.tsx
[ ] Run: pnpm install
[ ] Run: pnpm dev (verify it works locally)
[ ] Create GitHub repo and push code
[ ] Set base in vite.config.ts to '/YOUR_REPO_NAME/'
[ ] Add .github/workflows/deploy.yml
[ ] Enable GitHub Pages (Source: GitHub Actions) in repo settings
[ ] Push and wait for deployment
[ ] Visit https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Arrow Right` / `Space` / `PageDown` | Next slide |
| `Arrow Left` / `PageUp` | Previous slide |
| `ESC` | Toggle slide overview grid |

## Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Main app with navigation & slide routing
│   │   └── components/
│   │       ├── NeuralBackground.tsx   # Canvas-based neural network animation
│   │       ├── SlideWrapper.tsx       # Shared slide layout with footer
│   │       ├── slides/
│   │       │   ├── Slide01Title.tsx   # Title slide
│   │       │   ├── Slide02Crisis.tsx  # Through...
│   │       │   └── Slide15Closing.tsx # Closing slide
│   │       └── ui/                    # Reusable UI components (shadcn/ui)
│   └── styles/
│       ├── fonts.css                  # Google Fonts imports
│       ├── index.css                  # CSS entry point
│       ├── tailwind.css               # Tailwind v4 config
│       └── theme.css                  # CSS variables & base styles
├── package.json
├── vite.config.ts
├── postcss.config.mjs
└── README.md
```

## License

This project is an academic research presentation. The content is based on:

> Schuman, C.D., Kulkarni, S.R., Parsa, M. et al. *Opportunities for neuromorphic computing algorithms and applications.* Nat Comput Sci 2, 10-19 (2022). https://doi.org/10.1038/s43588-021-00184-y

---

Built by PARV AGARWAL with React, Vite, and Tailwind CSS.
