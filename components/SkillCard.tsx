"use client";

import { useState } from "react";

interface SkillCardProps {
  skill: string;
  isPrimary?: boolean;
}

export function SkillCard({ skill, isPrimary = false }: Readonly<SkillCardProps>) {
  const [isHovered, setIsHovered] = useState(false);

  if (isPrimary) {
    return (
      <div
        style={{
          padding: "16px",
          background: isHovered ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.1)",
          borderRadius: 8,
          textAlign: "center",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          transition: "all 0.2s",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
          outline: "2px solid transparent",
          outlineOffset: "2px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        tabIndex={0}
      >
        <span style={{ fontSize: "1rem", fontWeight: 500 }}>{skill}</span>
      </div>
    );
  }

  return (
    <span
      style={{
        padding: "8px 16px",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: 6,
        fontSize: "0.875rem",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {skill}
    </span>
  );
}
