/**
 * Admin Projects Page
 * List all projects with edit/delete actions.
 */

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { DeleteProjectButton } from "./DeleteProjectButton";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Projects
          </h1>
          <p className="text-sm text-white/40 mt-1">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
        >
          Add Project
        </Link>
      </div>

      <div className="space-y-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-medium text-white truncate">
                  {project.title}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                    project.status === "active"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : project.status === "completed"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-white/5 text-white/40"
                  }`}
                >
                  {project.status}
                </span>
                {project.featured && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-amber-500/10 text-amber-400">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xs text-white/30 mt-1 truncate">
                {project.description}
              </p>
            </div>

            <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="px-3 py-1.5 rounded-md bg-white/5 text-white/60 text-xs hover:bg-white/10 hover:text-white transition-colors"
              >
                Edit
              </Link>
              <DeleteProjectButton id={project.id} title={project.title} />
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-12 text-white/30 text-sm">
            No projects yet. Add your first project above.
          </div>
        )}
      </div>
    </div>
  );
}
