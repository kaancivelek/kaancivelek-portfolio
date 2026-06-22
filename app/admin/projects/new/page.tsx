/**
 * New Project Page
 */

import { createProject } from "../actions";
import { ProjectForm } from "../ProjectForm";
import Link from "next/link";

export default function NewProjectPage() {
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
            New Project
          </h1>
          <p className="text-sm text-white/40 mt-0.5">
            Add a new portfolio project
          </p>
        </div>
      </div>

      <ProjectForm action={createProject} submitLabel="Create Project" />
    </div>
  );
}
