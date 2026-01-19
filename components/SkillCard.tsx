/**
 * SkillCard Component
 * Displays a skill badge with primary/secondary variants.
 * Server component using CSS modules for hover effects.
 */

import styles from "./SkillCard.module.css";

interface SkillCardProps {
  readonly skill: string;
  readonly isPrimary?: boolean;
}

export function SkillCard({ skill, isPrimary = false }: SkillCardProps) {
  if (isPrimary) {
    return (
      <div className={styles.primaryCard}>
        <span className={styles.primaryLabel}>{skill}</span>
      </div>
    );
  }

  return <span className={styles.secondaryCard}>{skill}</span>;
}
