/**
 * Projects Page
 * Lists all projects in a timeline format using SSR data fetching.
 */

import { Metadata } from "next";
import { PageOverlayWrapper } from "@/components/page-overlay/PageOverlayWrapper";
import { ProjectTimeline } from "@/components/ProjectTimeline";
import { getProjects } from "@/lib/content";
import { pageMetadata } from "@/config";

export const metadata: Metadata = pageMetadata.projects;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <PageOverlayWrapper title="Projects">
      <ProjectTimeline projects={projects} />
    </PageOverlayWrapper>
  );
}
