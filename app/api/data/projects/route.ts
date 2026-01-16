import { NextResponse } from "next/server";
import { getJsonData, getMarkdownContent } from "@/lib/content";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  detailedDescription: string;
  tags: string[];
  featured: boolean;
  year: number;
  status: string;
  links?: {
    live?: string;
    github?: string;
  };
}

interface ProjectsData {
  projects: Project[];
}

export async function GET() {
  try {
    const projectsData = await getJsonData<ProjectsData>("projects.json");
    
    // Load all project detail markdown files
    const projectDetails: Record<string, string> = {};
    for (const project of projectsData.projects) {
      try {
        const detailContent = await getMarkdownContent(project.detailedDescription);
        projectDetails[project.slug] = detailContent.content;
      } catch (error) {
        console.error(`Failed to load markdown for project ${project.slug}:`, error);
        projectDetails[project.slug] = `<p>Project details coming soon...</p>`;
      }
    }
    
    return NextResponse.json({
      projects: projectsData.projects,
      projectDetails,
    });
  } catch (error) {
    console.error("Failed to load projects data:", error);
    return NextResponse.json({ error: "Failed to load projects data" }, { status: 500 });
  }
}
