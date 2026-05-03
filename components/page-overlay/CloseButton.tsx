"use client";

import React, { useRef } from "react";
import gsap from "gsap";

interface CloseButtonProps {
  onClose: () => void;
  size?: number;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClose, size = 48 }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const iconSize = size * 0.4;

  const animateTo = (scale: number) => {
    const element = buttonRef.current;

    if (!element || globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.to(element, {
      scale,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClose}
      onMouseEnter={() => animateTo(1.1)}
      onMouseLeave={() => animateTo(1)}
      onMouseDown={() => animateTo(0.95)}
      onMouseUp={() => animateTo(1.1)}
      onBlur={() => animateTo(1)}
      aria-label="Close"
      className="close-button-responsive"
      style={{
        position: "fixed",
        top: "clamp(12px, 3vw, 32px)",
        right: "clamp(12px, 3vw, 32px)",
        width: `clamp(36px, ${size}px, ${size}px)`,
        height: `clamp(36px, ${size}px, ${size}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    
        borderRadius: "50%",
        cursor: "pointer",
        zIndex: 1001,
      
      }}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L15 15M15 1L1 15"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
