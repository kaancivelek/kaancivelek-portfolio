/**
 * ProjectTimeline Component
 * Displays projects in a vertical timeline layout with scroll animations.
 * Client component - requires Framer Motion for animations.
 */

"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion";

/** Project data structure for timeline display */
interface Project {
  id: string;
  title: string;
  slug: string;
  year: number;
  description?: string;
  tags?: string[];
  status?: string;
}

interface ProjectTimelineProps {
  projects: Project[];
}

export function ProjectTimeline({ projects }: Readonly<ProjectTimelineProps>) {
  // Sort projects by year descending (newest first)
  const sortedProjects = [...projects].sort((a, b) => b.year - a.year);

  return (
    <div style={{ minHeight: "400px", padding: "20px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        {/* Vertical timeline line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "2px",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            zIndex: 0,
          }}
        />

        {/* Project cards */}
        {sortedProjects.map((project, index) => (
          <TimelineCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

interface TimelineCardProps {
  project: Project;
  index: number;
}

const TimelineCard = ({ project, index }: TimelineCardProps) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: isLeft ? "row" : "row-reverse",
        marginBottom: "48px",
        position: "relative",
      }}
    >
      {/* Card */}
      <div style={{ width: "50%", padding: isLeft ? "0 32px 0 0" : "0 0 0 32px" }}>
        <Link
          href={`/projects/${project.slug}`}
          style={{ textDecoration: "none", color: "inherit", display: "block" }}
        >
          <motion.div
            whileHover={{ scale: 1.03, y: -4, boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "24px",
              cursor: "pointer",
              outline: "2px solid transparent",
              outlineOffset: "2px",
              transition: "outline 0.2s",
            }}
          >
            {/* Title and year */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <h3
                style={{
                  color: "#fff",
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  margin: 0,
                  letterSpacing: "0.02em",
                }}
              >
                {project.title}
              </h3>
            <span
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "1rem",
                fontWeight: 500,
                marginLeft: "16px",
                flexShrink: 0,
              }}
            >
              {project.year}
            </span>
          </div>

          {/* Description */}
          {project.description && (
            <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.95rem", lineHeight: "1.6" }}>
              {project.description}
            </p>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "6px 14px",
                    background: "rgba(102, 126, 234, 0.15)",
                    border: "1px solid rgba(102, 126, 234, 0.3)",
                    borderRadius: "8px",
                    fontSize: "0.8rem",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Status */}
          {project.status && (
            <div
              style={{
                marginTop: "16px",
                display: "inline-block",
                padding: "6px 12px",
                background: project.status === "active" ? "rgba(76, 175, 80, 0.2)" : "rgba(66, 165, 245, 0.2)",
                borderRadius: "8px",
                fontSize: "0.75rem",
                color: project.status === "active" ? "rgba(129, 199, 132, 1)" : "rgba(144, 202, 249, 1)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {project.status}
            </div>
          )}
        </motion.div>
        </Link>
      </div>

      {/* Center dot with glow animation */}
      <div style={{ width: "40px", display: "flex", justifyContent: "center", zIndex: 10 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            border: "4px solid rgba(0, 0, 0, 0.9)",
          }}
        />
      </div>
Empty space for layout
      {/* Boş alan */}
      <div style={{ width: "50%" }} />
    </motion.div>
  );
};


