/**
 * PageOverlay Component
 * Full-screen modal overlay with blur backdrop.
 * - Handles ESC key to close
 * - Animates with Framer Motion
 * - Closes on backdrop click
 */

"use client";

import React, { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { CloseButton } from "./CloseButton";
import type { PageOverlayProps } from "./types";
import { ANIMATION_DURATION, OVERLAY_STYLES } from "./constants";

export default function PageOverlay({ children, onClose, title }: Readonly<PageOverlayProps>) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const isClosingRef = useRef(false);

  const handleClose = useCallback(() => {
    const element = overlayRef.current;

    if (!element || isClosingRef.current) {
      onClose();
      return;
    }

    const prefersReducedMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      onClose();
      return;
    }

    isClosingRef.current = true;

    gsap.to(element, {
      opacity: 0,
      scale: 0.98,
      y: 16,
      duration: ANIMATION_DURATION,
      ease: "power2.inOut",
      onComplete: () => {
        isClosingRef.current = false;
        onClose();
      },
    });
  }, [onClose]);

  // Close overlay on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    globalThis.addEventListener("keydown", handleEsc);
    return () => globalThis.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  useEffect(() => {
    const element = overlayRef.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.killTweensOf(element);
    isClosingRef.current = false;

    gsap.fromTo(
      element,
      { opacity: 0, scale: 0.96, y: 18 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: prefersReducedMotion ? 0 : ANIMATION_DURATION,
        ease: "power3.out",
      }
    );

    return () => {
      gsap.killTweensOf(element);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      key={title || "overlay"}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `rgba(0, 0, 0, 0.3)`,
        backdropFilter: `blur(20px) saturate(180%)`,
        WebkitBackdropFilter: `blur(20px) saturate(180%)`,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: OVERLAY_STYLES.containerPadding,
      }}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="page-overlay-content"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1200,
          maxHeight: "90vh",
          background: "rgba(26, 26, 26, 0.7)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          borderRadius: "clamp(12px, 3vw, 24px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
          overflow: "auto",
          padding: "clamp(16px, 4vw, 48px)",
          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        {title && (
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(1.5rem, 5vw, 2rem)",
              fontWeight: 300,
              marginBottom: "clamp(16px, 3vw, 32px)",
              letterSpacing: "0.05em",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {title}
          </h1>
        )}
        {children}
      </div>

      <CloseButton onClose={handleClose} size={OVERLAY_STYLES.closeButtonSize} />
    </div>
  );
}
