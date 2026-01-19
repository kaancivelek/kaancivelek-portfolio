/**
 * PageOverlay Component
 * Full-screen modal overlay with blur backdrop.
 * - Handles ESC key to close
 * - Animates with Framer Motion
 * - Closes on backdrop click
 */

"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseButton } from "./CloseButton";
import type { PageOverlayProps } from "./types";
import { ANIMATION_DURATION, ANIMATION_VARIANTS, OVERLAY_STYLES } from "./constants";

export default function PageOverlay({ children, onClose, title }: Readonly<PageOverlayProps>) {
  // Close overlay on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    globalThis.addEventListener("keydown", handleEsc);
    return () => globalThis.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={title || "overlay"}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={ANIMATION_VARIANTS.backdrop}
        transition={{ duration: ANIMATION_DURATION }}
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
        onClick={onClose}
      >
        <motion.div
          variants={ANIMATION_VARIANTS.content}
          transition={{ 
            duration: ANIMATION_DURATION,
            ease: [0.68, -0.55, 0.27, 1.55]
          }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 1200,
            maxHeight: "90vh",
            background: "rgba(26, 26, 26, 0.7)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            borderRadius: 24,
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
            overflow: "auto",
            padding: 48,
          }}
        >
          {title && (
            <h1
              style={{
                color: "#fff",
                fontSize: "2rem",
                fontWeight: 300,
                marginBottom: 32,
                letterSpacing: "0.05em",
              }}
            >
              {title}
            </h1>
          )}
          {children}
        </motion.div>

        <CloseButton onClose={onClose} size={OVERLAY_STYLES.closeButtonSize} />
      </motion.div>
    </AnimatePresence>
  );
}
