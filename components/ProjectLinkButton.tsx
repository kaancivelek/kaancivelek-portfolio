"use client";

import { useState } from "react";

interface ProjectLinkButtonProps {
  href: string;
  type: "live" | "github";
  children: React.ReactNode;
}

export function ProjectLinkButton({ href, type, children }: Readonly<ProjectLinkButtonProps>) {
  const [isHovered, setIsHovered] = useState(false);

  const styles = type === "live" 
    ? {
        normal: "rgba(74, 222, 128, 0.2)",
        hover: "rgba(74, 222, 128, 0.3)",
        color: "#4ade80",
        border: "1px solid rgba(74, 222, 128, 0.3)",
      }
    : {
        normal: "rgba(255, 255, 255, 0.05)",
        hover: "rgba(255, 255, 255, 0.1)",
        color: "#fff",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        padding: "10px 20px",
        background: isHovered ? styles.hover : styles.normal,
        color: styles.color,
        borderRadius: 8,
        textDecoration: "none",
        border: styles.border,
        transition: "all 0.2s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </a>
  );
}
