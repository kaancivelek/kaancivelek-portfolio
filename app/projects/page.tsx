"use client";

import { PageOverlayWrapper } from "@/components/page-overlay/PageOverlayWrapper";
import { ProjectCard } from "@/components/ProjectCard";
import { useData } from "@/contexts/DataContext";

export default function ProjectsPage() {
  const { projects } = useData();

  if (!projects || projects.length === 0) {
    return (
      <PageOverlayWrapper title="Projects">
        <div style={{ color: "#fff" }}>Loading...</div>
      </PageOverlayWrapper>
    );
  }

  return (
    <PageOverlayWrapper title="Projects">
      <div style={{ color: "#fff" }}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </PageOverlayWrapper>
  );
}
