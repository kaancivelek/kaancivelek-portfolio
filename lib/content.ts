/**
 * Content Library
 * Server-side data fetching utilities for SSR.
 * All functions run on the server and can be called directly from page components.
 * Uses Prisma to fetch data from SQLite instead of the file system.
 * Markdown rendering via `marked` is preserved.
 */

import { marked } from "marked";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type {
  AboutWithContent,
  Skills,
  Project,
  ProjectWithContent,
  Experience,
  ContactWithContent,
  SocialLink,
} from "@/types";

// =============================================================================
// Core Utilities
// =============================================================================

/**
 * Converts markdown string to HTML.
 */
async function renderMarkdown(md: string): Promise<string> {
  if (!md) return "";
  return marked.parse(md);
}

// =============================================================================
// About Data
// =============================================================================

/**
 * Fetches about/profile data with resolved bio HTML.
 */
export const getAboutData = cache(async function (): Promise<AboutWithContent> {
  const row = await prisma.about.findFirst();

  if (!row) {
    return {
      name: "",
      title: "",
      location: "",
      email: "",
      social: {},
      skills: {},
      bioHtml: "",
    };
  }

  const bioHtml = await renderMarkdown(row.bio);

  return {
    name: row.name,
    title: row.title,
    bio: row.bio || undefined,
    location: row.location,
    email: row.email,
    social: JSON.parse(row.social),
    skills: JSON.parse(row.skills),
    bioHtml,
  };
});

// =============================================================================
// Projects Data
// =============================================================================

/**
 * Fetches all projects from SQLite.
 */
export async function getProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    detailedDescription: row.detailedDescription || undefined,
    image: row.image || undefined,
    tags: JSON.parse(row.tags),
    featured: row.featured,
    year: row.year,
    status: row.status as Project["status"],
    links: row.links ? JSON.parse(row.links) : undefined,
  }));
}

/**
 * Fetches a single project by slug with resolved markdown content.
 */
export const getProjectBySlug = cache(async function (
  slug: string
): Promise<ProjectWithContent | null> {
  const row = await prisma.project.findUnique({ where: { slug } });

  if (!row) return null;

  const contentHtml = await renderMarkdown(row.detailedDescription);

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    detailedDescription: row.detailedDescription || undefined,
    image: row.image || undefined,
    tags: JSON.parse(row.tags),
    featured: row.featured,
    year: row.year,
    status: row.status as Project["status"],
    links: row.links ? JSON.parse(row.links) : undefined,
    contentHtml,
  };
});

/**
 * Gets all project slugs for static generation.
 */
export const getAllProjectSlugs = cache(async function (): Promise<string[]> {
  const projects = await prisma.project.findMany({
    select: { slug: true },
  });
  return projects.map((p) => p.slug);
});

// =============================================================================
// Experience Data
// =============================================================================

/**
 * Fetches all experiences from SQLite.
 */
export const getExperiences = cache(async function (): Promise<Experience[]> {
  const rows = await prisma.experience.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return rows.map((row) => ({
    id: row.id,
    company: row.company,
    position: row.position,
    location: row.location,
    type: row.type as Experience["type"],
    startDate: row.startDate,
    endDate: row.endDate || undefined,
    current: row.current,
    description: row.description || undefined,
    achievements: JSON.parse(row.achievements),
    technologies: JSON.parse(row.technologies),
  }));
});

// =============================================================================
// Contact Data
// =============================================================================

/**
 * Fetches contact data with resolved CTA HTML.
 */
export const getContactData = cache(
  async function (): Promise<ContactWithContent> {
    const row = await prisma.contact.findFirst();

    if (!row) {
      return {
        contact: {
          email: "",
          availability: "",
          timezone: "",
          preferredContact: "",
          responseTime: "",
        },
        socialLinks: [],
        ctaHtml: "",
      };
    }

    const ctaHtml = await renderMarkdown(row.callToAction);
    const socialLinks: SocialLink[] = JSON.parse(row.socialLinks);

    return {
      contact: {
        email: row.email,
        availability: row.availability,
        timezone: row.timezone,
        preferredContact: row.preferredContact,
        responseTime: row.responseTime,
      },
      socialLinks,
      ctaHtml,
    };
  }
);

// =============================================================================
// Skills Data
// =============================================================================

/**
 * Fetches skills from about data.
 */
export const getSkills = cache(async function (): Promise<Skills> {
  const row = await prisma.about.findFirst();
  if (!row) return {};
  return JSON.parse(row.skills);
});

// =============================================================================
// Legacy exports for backward compatibility
// =============================================================================
export const getJsonData = cache(async function <T>(filename: string): Promise<T> {
  // This function is kept for backward compatibility but now routes through Prisma
  if (filename === "about.json") {
    const about = await getAboutData();
    return about as unknown as T;
  }
  if (filename === "projects.json") {
    const projects = await getProjects();
    return { projects } as unknown as T;
  }
  if (filename === "experience.json") {
    const experiences = await getExperiences();
    return { experiences } as unknown as T;
  }
  if (filename === "contact.json") {
    const contact = await getContactData();
    return contact as unknown as T;
  }
  throw new Error(`Unknown data file: ${filename}`);
});

export const getMarkdownContent = cache(async function (content: string) {
  const htmlContent = await renderMarkdown(content);
  return { frontmatter: {}, content: htmlContent };
});
