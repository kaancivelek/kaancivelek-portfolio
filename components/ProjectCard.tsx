/**
 * ProjectCard Component
 * Displays a project preview card with title, description, tags, and year.
 * Server component using CSS modules for hover effects.
 */

import Link from "next/link";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  readonly project: {
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

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={styles.link}
    >
      <div className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.title}>{project.title}</h3>
          {project.featured && (
            <span className={styles.featuredBadge}>Featured</span>
          )}
        </div>

        <p className={styles.description}>{project.description}</p>

        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.meta}>
            {project.year} • {project.status}
          </span>
          <span className={styles.viewDetails}>View Details →</span>
        </div>
      </div>
    </Link>
  );
}
