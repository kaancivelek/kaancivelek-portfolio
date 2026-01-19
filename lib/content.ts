/**
 * Content Library
 * Server-side data fetching utilities for SSR.
 * All functions run on the server and can be called directly from page components.
 * Uses React cache for request deduplication and unstable_cache for build-time caching.
 */

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import type {
  About,
  AboutWithContent,
  Project,
  ProjectWithContent,
  Experience,
  Contact,
  ContactWithContent,
} from "@/types";

const dataDirectory = path.join(process.cwd(), "data");

// =============================================================================
// Core Utilities
// =============================================================================

/**
 * Reads and parses a JSON file from the data directory.
 * Cached at build time for static generation.
 * @param filename - Name of the JSON file (e.g., "about.json")
 */
async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDirectory, filename);
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

export const getJsonData = cache(async function <T>(
  filename: string
): Promise<T> {
  return unstable_cache(
    async () => readJsonFile<T>(filename),
    [`json-${filename}`],
    { revalidate: false }
  )();
});

/**
 * Converts a markdown file to HTML.
 * Cached at build time for static generation.
 * @param filename - Path to markdown file relative to data directory
 */
async function readMarkdownFile(filename: string) {
  const filePath = path.join(dataDirectory, filename);
  const fileContents = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const htmlContent = await marked.parse(content);

  return {
    frontmatter: data,
    content: htmlContent,
  };
}

export const getMarkdownContent = cache(async function (filename: string) {
  return unstable_cache(
    async () => readMarkdownFile(filename),
    [`markdown-${filename}`],
    { revalidate: false }
  )();
});

// =============================================================================
// About Data
// =============================================================================

/**
 * Fetches about/profile data with resolved bio HTML.
 * Cached for request deduplication.
 * Use in about page for SSR.
 */
export const getAboutData = cache(async function (): Promise<AboutWithContent> {
  const about = await getJsonData<About>("about.json");

  let bioHtml = "";
  if (about.bio) {
    const { content } = await getMarkdownContent(about.bio);
    bioHtml = content;
  }

  return {
    ...about,
    bioHtml,
  };
});

// =============================================================================
// Projects Data
// =============================================================================

/**
 * Fetches all projects from JSON.
 * Cached for request deduplication.
 * Use in projects list page for SSR.
 */
export const getProjects = cache(async function (): Promise<Project[]> {
  const data = await getJsonData<{ projects: Project[] }>("projects.json");
  return data.projects;
});

/**
 * Fetches a single project by slug with resolved content.
 * Cached for request deduplication.
 * Use in project detail page for SSR.
 * @param slug - Project slug
 * @returns Project with content or null if not found
 */
export const getProjectBySlug = cache(async function (
  slug: string
): Promise<ProjectWithContent | null> {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return null;
  }

  let contentHtml = "";
  if (project.detailedDescription) {
    try {
      const { content } = await getMarkdownContent(project.detailedDescription);
      contentHtml = content;
    } catch {
      // Markdown file may not exist, continue without content
    }
  }

  return {
    ...project,
    contentHtml,
  };
});

/**
 * Gets all project slugs for static generation.
 * Use with generateStaticParams.
 */
export const getAllProjectSlugs = cache(async function (): Promise<string[]> {
  const projects = await getProjects();
  return projects.map((p) => p.slug);
});

// =============================================================================
// Experience Data
// =============================================================================

/**
 * Fetches all experiences from JSON.
 * Cached for request deduplication.
 * Use in experience page for SSR.
 */
export const getExperiences = cache(async function (): Promise<Experience[]> {
  const data = await getJsonData<{ experiences: Experience[] }>(
    "experience.json"
  );
  return data.experiences;
});

// =============================================================================
// Contact Data
// =============================================================================

/**
 * Fetches contact data with resolved CTA HTML.
 * Cached for request deduplication.
 * Use in contact page for SSR.
 */
export const getContactData = cache(
  async function (): Promise<ContactWithContent> {
    const data = await getJsonData<Contact>("contact.json");

    let ctaHtml = "";
    if (data.callToAction) {
      const { content } = await getMarkdownContent(data.callToAction);
      ctaHtml = content;
    }

    return {
      ...data,
      ctaHtml,
    };
  }
);

// =============================================================================
// Skills Data
// =============================================================================

/**
 * Fetches skills from about data.
 * Cached for request deduplication.
 * Use in skills page for SSR.
 */
export const getSkills = cache(async function (): Promise<{
  primary: string[];
  secondary: string[];
}> {
  const about = await getJsonData<About>("about.json");
  return about.skills;
});
