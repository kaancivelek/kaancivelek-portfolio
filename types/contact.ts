/**
 * Contact Types
 * Type definitions for contact page data structures.
 */

/**
 * Social link entry for contact page
 */
export interface SocialLink {
  platform: string;
  url: string;
  username: string;
}

/**
 * Contact information
 */
export interface ContactInfo {
  email: string;
  availability: string;
  timezone: string;
  preferredContact: string;
  responseTime: string;
}

/**
 * Contact data from JSON
 */
export interface Contact {
  contact: ContactInfo;
  socialLinks: SocialLink[];
  callToAction?: string;
}

/**
 * Contact with resolved markdown CTA
 */
export interface ContactWithContent extends Contact {
  ctaHtml?: string;
}
