// Animasyon süreleri
export const ANIMATION_DURATION = 1.5;

// Overlay stilleri
export const OVERLAY_STYLES = {
  backdropBlur: 20,
  backdropOpacity: 0.8,
  containerPadding: 40,
  closeButtonSize: 48,
} as const;

// Animasyon varyantları
export const ANIMATION_VARIANTS = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  content: {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
    },
  },
} as const;
