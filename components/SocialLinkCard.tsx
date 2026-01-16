"use client";

import { useState } from "react";

interface SocialLinkCardProps {
  link: {
    platform: string;
    url: string;
    username: string;
  };
}

export function SocialLinkCard({ link }: Readonly<SocialLinkCardProps>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "12px 20px",
        background: isHovered ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
        borderRadius: 8,
        textDecoration: "none",
        transition: "background 0.2s",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ color: "#fff", fontWeight: 500 }}>
        {link.platform}
      </span>
      <span style={{ color: "#999", fontSize: "0.875rem" }}>
        {link.username}
      </span>
    </a>
  );
}
