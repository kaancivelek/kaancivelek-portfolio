/**
 * Project Types
 * Type definitions for project data structures.
 */

/**
 * Project links for external resources
 */
export interface ProjectLinks {
  live?: string;
  github?: string;
  demo?: string;
}

/**
 * Project status indicating current state
 */
export type ProjectStatus = "active" | "completed" | "archived" | "wip";

/**
 * Core project data from JSON
 */
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailedDescription?: string;
  image?: string;
  tags: string[];
  featured: boolean;
  year: number;
  status: ProjectStatus;
  links?: ProjectLinks;
}

/**
 * Project with resolved markdown content
 */
export interface ProjectWithContent extends Project {
  contentHtml?: string;
}

/**
 * Projects data structure from JSON file
 */
export interface ProjectsData {
  projects: Project[];
}
