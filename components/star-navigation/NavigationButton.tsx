import React from "react";
import { Point } from "./types";

interface NavigationButtonProps {
  tip: Point;
  label: string;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  svgSize: number;
  tipIndex: number;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  tip,
  label,
  isActive,
  onClick,
  onMouseEnter,
  onMouseLeave,
  svgSize,
  tipIndex,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  // Responsive button ve label boyutu
  const scale = svgSize / 300;
  const buttonSize = 48 * scale;
  const fontSize = 0.875 * scale;
  const svgCenter = svgSize / 2;

  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={handleKeyDown}
      aria-label={label}
      style={{
        position: "absolute",
        left: tip.x - buttonSize / 2,
        top: tip.y - buttonSize / 2,
        width: buttonSize,
        height: buttonSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 10,
        background: "transparent",
        border: "none",
        padding: 0,
      }}
    >
      <span
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          fontSize: `${fontSize}rem`,
          fontWeight: 300,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          opacity: isActive ? 1 : 0,
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          whiteSpace: "nowrap",
          zIndex: 20,
        }}
      >
        {label}
      </span>
    </button>
  );
};
