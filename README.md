# Alen Joseph — Portfolio

> A modern, animated personal portfolio built with React, TypeScript, and Vite.

[![Live Demo](https://img.shields.io/badge/Live-Demo-6c47ff?style=for-the-badge&logo=vercel)](https://iam-alenjoseph.github.io/alenportfolio/)
[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)](https://vite.dev/)

---

## ✨ Features

- **Hero Section** — Animated intro with resume modal
- **About** — Personal background and skills overview
- **Projects** — Showcases of real-world builds
- **Contact** — Get-in-touch form
- **Cursor Glow** — Custom animated cursor effect
- **Scroll Reveal** — Smooth section entrance animations
- **Dark / Light Theme** — System-aware theme toggle
- **Responsive Design** — Mobile-first layout

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS |
| Animations | Framer Motion, GSAP, Lenis |
| 3D | Three.js + React Three Fiber |
| UI Components | shadcn/ui + Radix UI |
| Component Library | Lightswind |
| Forms | React Hook Form + Zod |
| Routing | React Router DOM v6 |
| Testing | Vitest + Testing Library |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or bun

### Installation

```bash
# Clone the repo
git clone https://github.com/iam-alenjoseph/portfolio.git
cd portfolio

# Install dependencies
npm install
# or
bun install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is placed in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
npm run test
```

---

## 📁 Project Structure

```
alenportfolio/
├── public/               # Static assets (images, resume, favicon)
├── src/
│   ├── assets/           # Internal assets (hero images, etc.)
│   ├── components/
│   │   ├── portfolio/    # Page sections (Hero, About, Projects, Contact…)
│   │   ├── lightswind/   # Animation & UI primitives
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility helpers
│   ├── pages/            # Route-level pages
│   └── main.tsx          # App entry point
├── dist/                 # Production build output
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🤝 Contact

**Alen Joseph**
- GitHub: [@iam-alenjoseph](https://github.com/iam-alenjoseph)

---

<p align="center">Built with ❤️ by Alen Joseph</p>
