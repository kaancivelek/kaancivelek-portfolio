import React, { type ReactNode } from "react";
import { CloseButton } from "./CloseButton";
import { OVERLAY_STYLES } from "./constants";

interface PageOverlayLayoutProps {
  children: ReactNode;
  title?: string;
  onClose: () => void;
}

/**
 * Layout Component - Statik overlay layout ve styling
 * onClose prop'u PageOverlayWrapper'dan gelir (client component)
 */
export function PageOverlayLayout({ children, title, onClose }: Readonly<PageOverlayLayoutProps>) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `rgba(0, 0, 0, ${OVERLAY_STYLES.backdropOpacity})`,
        backdropFilter: `blur(${OVERLAY_STYLES.backdropBlur}px)`,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: OVERLAY_STYLES.containerPadding,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1200,
          maxHeight: "90vh",
          background: "#1a1a1a",
          borderRadius: 24,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          overflow: "auto",
          padding: 48,
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
        className="hide-scrollbar"
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
      </div>

      <CloseButton onClose={onClose} size={OVERLAY_STYLES.closeButtonSize} />
    </div>
  );
}
