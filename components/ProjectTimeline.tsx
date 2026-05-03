"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

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
  const itemRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const item = itemRef.current;

    if (!item) {
      return;
    }

    const prefersReducedMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const initialX = isLeft ? -50 : 50;

    gsap.killTweensOf(item);
    gsap.set(item, {
      opacity: prefersReducedMotion ? 1 : 0,
      x: prefersReducedMotion ? 0 : initialX,
      y: prefersReducedMotion ? 0 : 20,
    });

    if (dotRef.current) {
      gsap.killTweensOf(dotRef.current);
      gsap.set(dotRef.current, {
        opacity: prefersReducedMotion ? 1 : 0,
        scale: prefersReducedMotion ? 1 : 0,
      });
    }

    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        gsap.to(item, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        });

        if (dotRef.current) {
          gsap.to(dotRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: "back.out(1.7)",
            delay: 0.15,
          });
        }

        observer.disconnect();
      },
      {
        threshold: 0.25,
        rootMargin: "-50px",
      }
    );

    observer.observe(item);

    return () => {
      observer.disconnect();
    };
  }, [isLeft]);

  const handleMouseEnter = () => {
    const card = cardRef.current;

    if (!card || globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.to(cardRef.current, {
      scale: 1.03,
      y: -4,
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;

    if (!card || globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={itemRef}
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
          <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
              willChange: "transform, opacity, box-shadow",
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
          </div>
        </Link>
      </div>

      {/* Center dot with glow animation */}
      <div style={{ width: "40px", display: "flex", justifyContent: "center", zIndex: 10 }}>
        <div
          ref={dotRef}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            border: "4px solid rgba(0, 0, 0, 0.9)",
            transform: "scale(0)",
            opacity: 0,
            willChange: "transform, opacity",
          }}
        />
      </div>

      {/* Boş alan */}
      <div style={{ width: "50%" }} />
    </div>
  );
};


