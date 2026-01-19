/**
 * Site Configuration
 * Central configuration for site-wide settings, branding, and social links.
 */

export const siteConfig = {
  // Core identity
  name: "Kaan Civelek",
  title: "Software Engineering Student & Full-Stack Developer",
  description:
    "Portfolio of Kaan Civelek – a software engineering student specializing in React, Next.js, TypeScript, and full-stack development.",

  // URLs
  url: "https://kaancivelek.com",
  ogImage: "/og-image.jpg",

  // Location & Contact
  location: "Turkey",
  timezone: "Europe/Istanbul",
  email: "businesskaancivelek@gmail.com",

  // Social Links
  links: {
    github: "https://github.com/kaancivelek",
    linkedin: "https://linkedin.com/in/kaan-civelek",
    twitter: "https://twitter.com/kaancivelek17",
  },

  // Technical
  locale: "en-US",
  themeColor: "#000000",

  // Navigation routes (used by star navigation)
  routes: [
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/experience", label: "Experience" },
    { path: "/skills", label: "Skills" },
    { path: "/contact", label: "Contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
