/**
 * Global Not Found Page
 * Displayed when a route is not found (404).
 */

import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
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
          fontSize: "8rem",
          fontWeight: 200,
          marginBottom: "0.5rem",
          letterSpacing: "-0.05em",
          background: "linear-gradient(135deg, #fff 0%, #666 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 400,
          marginBottom: "1rem",
          color: "#999",
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          fontSize: "1rem",
          color: "#999",
          marginBottom: "2rem",
          maxWidth: "400px",
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className={styles.link}>
        ← Back to Home
      </Link>
    </div>
  );
}
