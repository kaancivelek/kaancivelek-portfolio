/**
 * Project Not Found Page
 * Displayed when a project slug is not found.
 */

import Link from "next/link";
import styles from "./not-found.module.css";

export default function ProjectNotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        color: "#fff",
        textAlign: "center",
        padding: "2rem",
        background: "#111",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: 200,
          marginBottom: "1rem",
        }}
      >
        Project Not Found
      </h1>
      <p
        style={{
          fontSize: "1rem",
          color: "#999",
          marginBottom: "2rem",
          maxWidth: "400px",
        }}
      >
        This project doesn&apos;t exist or may have been removed.
      </p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link
          href="/projects"
          className={`${styles.link} ${styles.linkSecondary}`}
        >
          View All Projects
        </Link>
        <Link
          href="/"
          className={`${styles.link} ${styles.linkPrimary}`}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
