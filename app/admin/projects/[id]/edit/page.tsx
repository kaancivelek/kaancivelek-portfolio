/**
 * Edit Project Page
 */

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateProject } from "../../actions";
import { ProjectForm } from "../../ProjectForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    notFound();
  }

  const tags = JSON.parse(project.tags) as string[];
  const links = project.links ? (JSON.parse(project.links) as Record<string, string>) : {};

  const initialData = {
    slug: project.slug,
    title: project.title,
    description: project.description,
    detailedDescription: project.detailedDescription,
    image: project.image || "",
    tags: tags.join(", "),
    featured: project.featured,
    year: project.year,
    status: project.status,
    linksLive: links.live || "",
    linksGithub: links.github || "",
  };

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateProject(id, formData);
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/projects"
          className="p-1.5 rounded-md hover:bg-white/5 text-white/40 hover:text-white/70 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Edit Project
          </h1>
          <p className="text-sm text-white/40 mt-0.5">{project.title}</p>
        </div>
      </div>

      <ProjectForm
        initialData={initialData}
        action={handleUpdate}
        submitLabel="Update Project"
      />
    </div>
  );
}
