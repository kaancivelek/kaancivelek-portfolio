/**
 * Projects Page
 * Lists all projects in a timeline format using SSR data fetching.
 */

import { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { pageMetadata } from "@/config";
import { siteConfig } from "@/config/site";
import OrbitalSystem from "@/components/OrbitalSystem";

export const metadata: Metadata = pageMetadata.projects;

export default async function ProjectsPage() {
  const projects = await getProjects();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects | Kaan Civelek",
    inLanguage: ["en", "tr"],
    url: `${siteConfig.url}/projects`,
    description:
      "Software projects by Kaan Civelek. Kaan Civelek'in yazılım projeleri.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareSourceCode",
          name: project.title,
          url: `${siteConfig.url}/projects/${project.slug}`,
          programmingLanguage: project.tags?.join(", "),
        },
      })),
    },
  };
return(
<> <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <OrbitalSystem projects={projects}></OrbitalSystem></>)}

