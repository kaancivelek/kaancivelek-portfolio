/**
 * Global Error Page
 * Handles unexpected errors in the application.
 */

"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

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
          fontWeight: 300,
          marginBottom: "1rem",
          color: "#ff6b6b",
        }}
      >
        Oops!
      </h1>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 400,
          marginBottom: "1.5rem",
          color: "#999",
        }}
      >
        Something went wrong
      </h2>
      <p
        style={{
          fontSize: "1rem",
          color: "#666",
          marginBottom: "2rem",
          maxWidth: "400px",
        }}
      >
        An unexpected error occurred. Please try again or return to the home page.
      </p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => reset()}
          type="button"
          style={{
            padding: "12px 24px",
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "all 0.2s",
          }}
        >
          Try Again
        </button>
        <a
          href="/"
          style={{
            padding: "12px 24px",
            background: "#fff",
            border: "none",
            borderRadius: "8px",
            color: "#000",
            textDecoration: "none",
            fontSize: "1rem",
            transition: "all 0.2s",
          }}
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
