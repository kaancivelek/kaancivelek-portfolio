"use client";

import { PageOverlayWrapper } from "@/components/page-overlay/PageOverlayWrapper";
import { useData } from "@/contexts/DataContext";
import { notFound } from "next/navigation";
import { ProjectLinkButton } from "@/components/ProjectLinkButton";
import { use } from "react";

export default function ProjectDetailPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = use(params);
  const { projects, projectDetails } = useData();
  
  if (!projects || !projectDetails) {
    return (
      <PageOverlayWrapper title="Loading...">
        <div style={{ color: "#fff" }}>Loading...</div>
      </PageOverlayWrapper>
    );
  }
  
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    notFound();
  }

  const detailHtml = projectDetails[slug] || "<p>Project details are being updated...</p>";

  return (
    <PageOverlayWrapper title={project.title}>
      <div style={{ color: "#fff" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
          {project.tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              style={{
                padding: "6px 12px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: 6,
                fontSize: "0.875rem",
              }}
            >
              {tag}
            </span>
          ))}
          <span style={{ marginLeft: "auto", color: "#666" }}>
            {project.year} • {project.status}
          </span>
        </div>

        {project.links && (
          <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
            {project.links.live && (
              <ProjectLinkButton href={project.links.live} type="live">
                🚀 Live Demo
              </ProjectLinkButton>
            )}
            {project.links.github && (
              <ProjectLinkButton href={project.links.github} type="github">
                💻 GitHub
              </ProjectLinkButton>
            )}
          </div>
        )}

        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: detailHtml }}
        />
      </div>
    </PageOverlayWrapper>
  );
}