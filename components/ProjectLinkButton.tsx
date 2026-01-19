/**
 * ProjectLinkButton Component
 * External link button for project live demo or GitHub repository.
 * Server component using CSS modules for hover effects.
 */

import styles from "./ProjectLinkButton.module.css";

interface ProjectLinkButtonProps {
  readonly href: string;
  readonly type: "live" | "github";
  readonly children: React.ReactNode;
}

export function ProjectLinkButton({ href, type, children }: ProjectLinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.button} ${styles[type]}`}
    >
      {children}
    </a>
  );
}
