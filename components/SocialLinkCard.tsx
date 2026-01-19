/**
 * SocialLinkCard Component
 * Displays a social media link card with platform and username.
 * Server component using CSS modules for hover effects.
 */

import styles from "./SocialLinkCard.module.css";

interface SocialLinkCardProps {
  readonly link: {
    platform: string;
    url: string;
    username: string;
  };
}

export function SocialLinkCard({ link }: SocialLinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <span className={styles.platform}>{link.platform}</span>
      <span className={styles.username}>{link.username}</span>
    </a>
  );
}
