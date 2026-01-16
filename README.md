# Kaan Civelek - Interactive Portfolio

A unique portfolio website featuring an interactive star-shaped navigation system built with Next.js 16 and Framer Motion. This project showcases projects, experience, and skills through an innovative user interface that breaks away from traditional navigation patterns.

![Next.js](https://img.shields.io/badge/Next.js-16.1.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.26.2-ff0055?style=flat-square)

## ✨ Features

### 🌟 Star Navigation System
- **Interactive 5-Point Star**: Navigate through portfolio sections using a custom-built star-shaped interface
- **Dynamic Active States**: Visual feedback with animated tip lines highlighting the current section
- **Smooth Animations**: Powered by Framer Motion for fluid transitions and micro-interactions
- **Responsive Design**: Adapts seamlessly to different screen sizes with dynamic SVG scaling

### 📄 Modal Overlay Pages
- **Page Overlays**: All content sections (About, Projects, Experience, Skills, Contact) open as elegant modal overlays
- **Backdrop Blur**: High-quality blur effect (20px) with 85% opacity for focused content viewing
- **Keyboard Navigation**: Full keyboard support with ESC key to close and accessible focus management
- **Smooth Entry/Exit**: Coordinated animations using AnimatePresence for enter and exit transitions

### 🎨 Modern UI/UX
- **Dark Theme**: Minimalist design with `#111` background and carefully crafted color palette
- **Accessible**: WCAG-compliant focus indicators and keyboard navigation
- **Custom Typography**: Uses Aldrich, Geist Sans, and Geist Mono fonts for a unique aesthetic
- **Loading States**: Elegant loading spinner during initial data fetch

### 🏗️ Architecture
- **App Router**: Next.js 16 App Router with server and client components
- **SSR-Safe**: Proper hydration handling with client-side calculations for window-dependent logic
- **API Routes**: RESTful API endpoints for data fetching (`/api/data/*`)
- **Context API**: Centralized data management with React Context
- **Type Safety**: Full TypeScript coverage with strict type checking
- **Modular Components**: Highly organized component structure with clear separation of concerns

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/kaancivelek/kaancivelek-portfolio.git
cd kaancivelek-portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the portfolio.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
kaancivelek-portfolio/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home page (empty - shows star nav only)
│   ├── layout.tsx                # Root layout with fonts and StarNavigation
│   ├── globals.css               # Global styles
│   ├── about/
│   │   └── page.tsx              # About page (server component)
│   ├── projects/
│   │   ├── page.tsx              # Projects list
│   │   └── [slug]/
│   │       └── page.tsx          # Individual project detail pages
│   ├── experience/
│   │   └── page.tsx              # Experience timeline
│   ├── skills/
│   │   └── page.tsx              # Skills showcase
│   ├── contact/
│   │   └── page.tsx              # Contact information
│   └── api/
│       └── data/                 # API routes for data fetching
│           ├── about/route.ts
│           ├── projects/route.ts
│           ├── experience/route.ts
│           └── contact/route.ts
│
├── components/
│   ├── ClientLayout.tsx          # Client-side data loading and provider
│   ├── LoadingSpinner.tsx        # Loading state component
│   ├── ProjectCard.tsx           # Project card with hover states
│   ├── ProjectLinkButton.tsx     # External project links
│   ├── SkillCard.tsx             # Skill display component
│   ├── SocialLinkCard.tsx        # Social media links
│   │
│   ├── star-navigation/          # Star navigation system
│   │   ├── StarNavigation.tsx    # Main navigation component
│   │   ├── StarShape.tsx         # SVG star polygon
│   │   ├── TipLine.tsx           # Active state indicator lines
│   │   ├── NavigationButton.tsx  # Individual nav buttons
│   │   ├── constants.ts          # Configuration constants
│   │   ├── utils.ts              # Star point calculations
│   │   ├── types.ts              # TypeScript types
│   │   └── README.md             # Navigation system docs
│   │
│   └── page-overlay/             # Modal overlay system
│       ├── PageOverlay.tsx       # Animated overlay (legacy)
│       ├── PageOverlayWrapper.tsx # Client wrapper with routing
│       ├── PageOverlayLayout.tsx  # Layout component
│       ├── CloseButton.tsx       # Close button component
│       ├── constants.ts          # Overlay configuration
│       ├── types.ts              # TypeScript types
│       └── index.ts              # Barrel exports
│
├── contexts/
│   └── DataContext.tsx           # Global data context provider
│
├── data/                         # Content management
│   ├── about.json                # Personal information
│   ├── about-bio.md              # Biography markdown
│   ├── projects.json             # Projects metadata
│   ├── experience.json           # Work experience
│   ├── contact.json              # Contact information
│   ├── contact-cta.md            # Contact CTA markdown
│   └── projects/                 # Detailed project descriptions
│       └── portfolio-2026.md
│
├── lib/
│   └── content.ts                # Markdown processing utilities
│
└── public/                       # Static assets
```

## 🛠️ Technology Stack

### Core
- **[Next.js 16.1.2](https://nextjs.org)** - React framework with App Router
- **[React 19.2.3](https://react.dev)** - UI library
- **[TypeScript 5.x](https://www.typescriptlang.org)** - Type safety

### Animation & Styling
- **[Framer Motion 12.26.2](https://www.framer.com/motion/)** - Animation library
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[PostCSS](https://postcss.org)** - CSS processing

### Content Processing
- **[gray-matter 4.0.3](https://github.com/jonschlinkert/gray-matter)** - YAML frontmatter parser
- **[marked 17.0.1](https://marked.js.org)** - Markdown parser and compiler

### Development
- **[ESLint 9](https://eslint.org)** - Code linting
- **[eslint-config-next](https://nextjs.org/docs/app/building-your-application/configuring/eslint)** - Next.js ESLint configuration

## 🎯 Key Technical Implementations

### Star Navigation
The star navigation system uses SVG path calculations to create a perfect 5-point star with interactive buttons at each tip:

- **Dynamic Positioning**: Buttons are positioned using trigonometric calculations based on star tip coordinates
- **Active State Visualization**: Animated lines connect the star center to active navigation points
- **Responsive Sizing**: SVG scales proportionally across different viewport sizes
- **Static Background Star**: When navigating away from home, a static star appears behind overlays

### Server-Side Rendering
- **API Routes**: Data is fetched server-side via Next.js API routes that read JSON and Markdown files
- **Client-Side Hydration**: Data is loaded client-side in `ClientLayout` and provided via Context
- **Loading States**: Minimum 1-second loading animation for smooth UX
- **Error Handling**: Graceful fallbacks for failed data fetches

### Modal Overlay System
- **Framer Motion AnimatePresence**: Coordinated entry/exit animations
- **Backdrop Blur**: CSS `backdrop-filter` with 20px blur for visual depth
- **Click-Outside-to-Close**: Overlay closes when clicking the backdrop
- **ESC Key Support**: Keyboard accessibility with ESC key handler
- **Route Integration**: Uses Next.js router to navigate back to home on close

### Accessibility
- **Keyboard Navigation**: Full support for Tab, Enter, and ESC keys
- **Focus Management**: Visible focus indicators with high-contrast colors
- **ARIA Labels**: Proper labeling for screen readers
- **Semantic HTML**: Correct heading hierarchy and landmark regions

## 📝 Data Management

Content is managed through JSON and Markdown files in the `/data` directory:

### JSON Files
- `about.json` - Personal information, skills, and social links
- `projects.json` - Project metadata, tags, and links
- `experience.json` - Work history and achievements
- `contact.json` - Contact information and CTA

### Markdown Files
- `about-bio.md` - Long-form biography
- `contact-cta.md` - Contact call-to-action message
- `projects/*.md` - Detailed project descriptions with full markdown support

### Adding New Content

**Add a new project:**
1. Add entry to `data/projects.json`
2. Create markdown file in `data/projects/[slug].md`
3. Project will automatically appear in the Projects section

**Update experience:**
1. Edit `data/experience.json`
2. Changes reflect immediately on next page load

## 🎨 Customization

### Colors
Edit color values in component styles and `app/globals.css`

### Navigation Routes
Modify `components/star-navigation/constants.ts`:
```typescript
export const NAVIGATION_ROUTES = [
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  // Add more routes...
];
```

### Animation Timings
Adjust in respective `constants.ts` files:
- `components/star-navigation/constants.ts` - Navigation animations
- `components/page-overlay/constants.ts` - Overlay animations

### Blur Effect
In `components/page-overlay/constants.ts`:
```typescript
export const OVERLAY_STYLES = {
  backdropBlur: 20,        // Blur intensity (px)
  backdropOpacity: 0.85,   // Background darkness (0-1)
  // ...
};
```

## 🐛 Known Issues & Solutions

### Hydration Errors
**Issue**: Using `window` object during SSR causes hydration mismatch

**Solution**: All window-dependent calculations moved to `useEffect` hooks

### Animation Timing
**Issue**: Content renders before animation completes

**Solution**: Used `AnimatePresence` with `mode="wait"` and synchronized `key` props

### Focus Management
**Issue**: Duplicate tab stops on project cards

**Solution**: Removed `tabIndex` from inner divs, focus handlers moved to Link components

## 📄 License

This project is available for use under the following terms:

**You are free to use this code with ONE condition:**
- You must include a footer credit that mentions "Kaan Civelek" with a link to the original repository

See [LICENSE](LICENSE) file for full terms.

## 👤 Author

**Kaan Civelek**

- GitHub: [@kaancivelek](https://github.com/kaancivelek)
- LinkedIn: [kaancivelek](https://linkedin.com/in/kaancivelek)
- Twitter: [@kaancivelek](https://twitter.com/kaancivelek)
- Email: businesskaancivelek@gmail.com

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs) - Excellent framework documentation
- [Framer Motion](https://www.framer.com/motion/) - Powerful animation library
- [Vercel](https://vercel.com) - Hosting and deployment platform

---

**⭐ If you found this project interesting or useful, please consider giving it a star!**
