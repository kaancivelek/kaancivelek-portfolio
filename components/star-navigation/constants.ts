/**
 * Star Navigation Constants
 * Configuration values for the star-shaped navigation component.
 */

export const STAR_POINTS = 5;

// Base values (SSR defaults)
export const BASE_SVG_SIZE = 300;
export const SIZE_MULTIPLIER = 1.2;

// Ratios for responsive sizing
export const OUTER_RADIUS_RATIO = 0.4; // 40% of SVG size
export const INNER_RADIUS_RATIO = 0.167; // 16.7% of SVG size
export const TIP_LINE_BASE_LENGTH = 16; // Default line length
export const TIP_LINE_ACTIVE_LENGTH = 50; // Extended line length on hover

export const ANIMATION_DURATION = 1500;
export const SCALE_FACTOR = 5;

export const NAVIGATION_ROUTES = [
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
  { label: "Skills", path: "/skills" },
  { label: "Experience", path: "/experience" },
] as const;
