/**
 * Experience Types
 * Type definitions for work experience data structures.
 */

/**
 * Employment type
 */
export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Internship"
  | "Freelance"
  | "Contract";

/**
 * Work experience entry
 */
export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  type: EmploymentType;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  achievements: string[];
  technologies: string[];
}

/**
 * Experience with resolved markdown content
 */
export interface ExperienceWithContent extends Experience {
  descriptionHtml?: string;
}

/**
 * Experiences data structure from JSON file
 */
export interface ExperiencesData {
  experiences: Experience[];
}
