/**
 * Project Detail Page
 * Displays detailed project information using SSR and static generation.
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageOverlayWrapper } from "@/components/page-overlay/PageOverlayWrapper";
import { ProjectLinkButton } from "@/components/ProjectLinkButton";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/content";
import { generateProjectMetadata } from "@/config";

// Force static generation for all project pages
export const dynamic = "force-static";
export const dynamicParams = false;

interface Props {
  readonly params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all project slugs at build time.
 */
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Generate metadata for each project page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return generateProjectMetadata(project);
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const detailHtml =
    project.contentHtml || "<p>Project details are being updated...</p>";

  return (
    <PageOverlayWrapper title={project.title}>
      <div style={{ color: "#fff" }}>
        <div
          style={{
            display: "flex",
            gap: "clamp(8px, 2vw, 12px)",
            marginBottom: "clamp(16px, 3vw, 24px)",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {project.tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              style={{
                padding: "clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px)",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: 6,
                fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                wordBreak: "break-word",
              }}
            >
              {tag}
            </span>
          ))}
          <span style={{ marginLeft: "auto", color: "#666", fontSize: "clamp(0.75rem, 2vw, 0.875rem)", whiteSpace: "nowrap" }}>
            {project.year} • {project.status}
          </span>
        </div>

        {project.links && (
          <div style={{ display: "flex", gap: "clamp(8px, 2vw, 16px)", marginBottom: "clamp(16px, 3vw, 32px)", flexWrap: "wrap" }}>
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