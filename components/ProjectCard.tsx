"use client";

import Link from "next/link";
import { useState } from "react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    slug: string;
    description: string;
    tags: string[];
    featured: boolean;
    year: number;
    status: string;
  };
}

export function ProjectCard({ project }: Readonly<ProjectCardProps>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/projects/${project.slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div
        style={{
          marginBottom: 32,
          padding: 24,
          background: isHovered ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.05)",
          borderRadius: 12,
          border: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"}`,
          cursor: "pointer",
          transition: "all 0.2s",
          outline: isHovered ? "2px solid rgba(255, 255, 255,0.5)" : "2px solid transparent",
          outlineOffset: "2px",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 400 }}>
            {project.title}
          </h3>
          {project.featured && (
            <span
              style={{
                padding: "4px 8px",
                background: "rgba(255, 215, 0, 0.2)",
                color: "#ffd700",
                borderRadius: 4,
                fontSize: "0.75rem",
              }}
            >
              Featured
            </span>
          )}
        </div>

        <p style={{ color: "#999", marginBottom: 16 }}>
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 10px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: 6,
                fontSize: "0.8rem",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, fontSize: "0.875rem", alignItems: "center" }}>
          <span style={{ color: "#666" }}>
            {project.year} • {project.status}
          </span>
          <span style={{ color: "#4ade80", marginLeft: "auto" }}>
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
