/**
 * About Types
 * Type definitions for about/profile data structures.
 */

/**
 * Social media links
 */
export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

/**
 * Skills categorization by domain
 */
export type Skills = Record<string, string[]>;

/**
 * About/Profile data from JSON
 */
export interface About {
  name: string;
  title: string;
  bio?: string;
  location: string;
  email: string;
  social: SocialLinks;
  skills: Skills;
}

/**
 * About with resolved markdown bio
 */
export interface AboutWithContent extends About {
  bioHtml?: string;
}
