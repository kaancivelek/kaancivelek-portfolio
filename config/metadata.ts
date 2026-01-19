/**
 * Metadata Configuration
 * Config-based SEO metadata for all pages.
 * Uses Next.js Metadata API for optimal SEO.
 */

import type { Metadata } from "next";
import { siteConfig } from "./site";

/**
 * Base metadata shared across all pages
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Kaan Civelek",
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Web Development",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@kaancivelek17",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

/**
 * Page-specific metadata configurations
 */
export const pageMetadata = {
  home: {
    title: siteConfig.name,
    description: siteConfig.description,
  },
  about: {
    title: "About",
    description: `Learn more about ${siteConfig.name} – background, skills, and journey in software engineering.`,
  },
  projects: {
    title: "Projects",
    description: `Explore projects by ${siteConfig.name} – web apps, tools, and experiments in modern web development.`,
  },
  experience: {
    title: "Experience",
    description: `Professional experience and career journey of ${siteConfig.name}.`,
  },
  skills: {
    title: "Skills",
    description: `Technical skills and technologies used by ${siteConfig.name} in software development.`,
  },
  contact: {
    title: "Contact",
    description: `Get in touch with ${siteConfig.name} for collaborations, opportunities, or just to say hello.`,
  },
} as const;

/**
 * Generate metadata for a project detail page
 */
export function generateProjectMetadata(project: {
  title: string;
  description: string;
  slug: string;
  image?: string;
}): Metadata {
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${siteConfig.url}/projects/${project.slug}`,
      images: project.image
        ? [{ url: project.image, width: 1200, height: 630, alt: project.title }]
        : undefined,
    },
    twitter: {
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  };
}
