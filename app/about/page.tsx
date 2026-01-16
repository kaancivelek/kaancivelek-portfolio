"use client";

import { PageOverlayWrapper } from "@/components/page-overlay/PageOverlayWrapper";
import { useData } from "@/contexts/DataContext";

export default function AboutPage() {
  const { about, aboutBioHtml } = useData();

  if (!about) {
    return (
      <PageOverlayWrapper title="About">
        <div style={{ color: "#fff" }}>Loading...</div>
      </PageOverlayWrapper>
    );
  }

  return (
    <PageOverlayWrapper title="About">
      <div style={{ color: "#fff", lineHeight: 1.8 }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16, fontWeight: 400 }}>
            {about.name}
          </h2>
          <p style={{ color: "#999", marginBottom: 24 }}>{about.title}</p>

          <div
            style={{ marginBottom: 0 }}
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: aboutBioHtml }}
          />
        </div>
      </div>
    </PageOverlayWrapper>
  );
}

