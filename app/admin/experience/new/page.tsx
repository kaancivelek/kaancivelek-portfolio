/**
 * New Experience Page
 */

import { createExperience } from "../actions";
import { ExperienceForm } from "../ExperienceForm";
import Link from "next/link";

export default function NewExperiencePage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/experience"
          className="p-1.5 rounded-md hover:bg-white/5 text-white/40 hover:text-white/70 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            New Experience
          </h1>
          <p className="text-sm text-white/40 mt-0.5">
            Add a new work experience entry
          </p>
        </div>
      </div>

      <ExperienceForm action={createExperience} submitLabel="Create Experience" />
    </div>
  );
}
