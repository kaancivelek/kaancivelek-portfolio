# Kaan Civelek - Planetary Portfolio

An interactive portfolio that presents projects as planets in a Three.js solar system, with GSAP-driven animations and Howler-managed audio.

![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.184.0-black?style=flat-square&logo=three.js)
![GSAP](https://img.shields.io/badge/GSAP-3.13.0-88CE02?style=flat-square)
![Howler](https://img.shields.io/badge/Howler-2.2.4-222?style=flat-square)

## Features

### Planet System (Three.js)
- Projects are modeled as planets in a starry space scene.
- Planets orbit and navigate to project detail pages on click.
- Lighting, materials, and glow layers create a cinematic look.

### Star Navigation
- 5-point star interface for section navigation.
- Active tip lines and hover feedback.
- Smooth GSAP entry/exit animations.

### Overlay Pages
- About, Projects, Experience, Skills, Contact open as overlays.
- Blur backdrop and ESC-to-close support.
- GSAP transitions for entry/exit.

### Audio Experience (Howler)
- Hover and click sounds.
- Ambient loop and global mute control.

## Setup

### Prerequisites
- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/kaancivelek/kaancivelek-portfolio.git
cd kaancivelek-portfolio
```

2. **Install dependencies**
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. **Start the dev server**
```bash
npm run dev
```

4. **Open in your browser**
[http://localhost:3000](http://localhost:3000)

### Production
```bash
npm run build
npm start
```

## Project Structure (Summary)

```
kaancivelek-portfolio/
├── app/                          # Next.js App Router pages
├── components/                   # UI and interactive components
│   ├── OrbitalSystem.tsx         # Three.js planet scene
│   ├── star-navigation/          # Star navigation system
│   └── page-overlay/             # Overlay page system
├── data/                         # JSON + Markdown content
├── lib/                          # Helpers (content, audio)
├── public/                       # Static assets (audio)
└── docs/                         # Diyagramlar
```

## Tech Stack

### Core
- **Next.js 16.2.4** - App Router
- **React 19.2.3** - UI
- **TypeScript 5.x** - Type safety

### 3D + Animation
- **Three.js 0.184.0** - 3D scene
- **GSAP 3.13.0** - Animations

### Audio
- **Howler 2.2.4** - Audio management

### Content
- **gray-matter 4.0.3** - Frontmatter parser
- **marked 17.0.1** - Markdown parser

## Content Management

- Project list: `data/projects.json`
- Project details: `data/projects/[slug].md`
- About: `data/about.json` + `data/about-bio.md`
- Experience: `data/experience.json`
- Contact: `data/contact.json` + `data/contact-cta.md`

**Add a new project:**
1. Add a new entry to `data/projects.json`.
2. Create `data/projects/[slug].md`.

## Customization Tips

- Navigation routes: `components/star-navigation/constants.ts`
- Overlay animations: `components/page-overlay/constants.ts`
- Planet scene settings: `components/OrbitalSystem.tsx`
- Audio files: `public/audio/`

## SEO and LLM Friendly

- `app/robots.ts` and `app/sitemap.ts` generate the sitemap
- `public/llms.txt` provides LLM crawler guidance

## License

This project can be used under the following condition:

- Include a footer credit with "Kaan Civelek" and a link to the original repository.

See [LICENSE](LICENSE) for details.

## Author

**Kaan Civelek**

- GitHub: [@kaancivelek](https://github.com/kaancivelek)
- LinkedIn: [kaancivelek](https://linkedin.com/in/kaancivelek)
- Twitter: [@kaancivelek](https://twitter.com/kaancivelek)
- Email: businesskaancivelek@gmail.com
