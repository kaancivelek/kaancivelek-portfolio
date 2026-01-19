/**
 * LoadingSpinner Component
 * Displays an animated ASCII loading indicator during initial hydration.
 * Client component - requires useState and useEffect for animation.
 */

"use client";

import { useEffect, useState } from "react";

/** ASCII animation frames for loading indicator */
const LOADING_FRAMES = ["+--", "-+-", "--+", "-+-"];

export function LoadingSpinner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % LOADING_FRAMES.length);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#111",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          fontFamily: "var(--font-geist-mono), monospace",
          color: "#fff",
          letterSpacing: "0.5em",
          marginBottom: "1rem",
          textAlign: "center",
          marginRight: "-0.3em",
        }}
      >
        {LOADING_FRAMES[frame]}
      </div>
      <div
        style={{
          color: "#666",
          fontSize: "0.875rem",
          fontFamily: "var(--font-aldrich), sans-serif",
          letterSpacing: "0.2em",
          textAlign: "center",
        }}
      >
        LOADING
      </div>
    </div>
  );
}
