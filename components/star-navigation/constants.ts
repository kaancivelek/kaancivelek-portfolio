export const STAR_POINTS = 5;

// Base değerler (SSR için varsayılan)
export const BASE_SVG_SIZE = 300;
export const SIZE_MULTIPLIER = 1.2; 

// Oranlar (responsive için)
export const OUTER_RADIUS_RATIO = 0.4; // SVG boyutunun %40'ı
export const INNER_RADIUS_RATIO = 0.167; // SVG boyutunun %16.7'si
export const TIP_LINE_BASE_LENGTH = 16; // Çizgi uzunluk oranı
export const TIP_LINE_ACTIVE_LENGTH = 50; // Aktif çizgi uzunluk oranı

export const ANIMATION_DURATION = 1500;
export const SCALE_FACTOR = 5;

export const NAVIGATION_ROUTES = [
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
  { label: "Skills", path: "/skills" },
  { label: "Experience", path: "/experience" },
] as const;
