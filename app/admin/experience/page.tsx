/**
 * Admin Experience Page
 */

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { DeleteExperienceButton } from "./DeleteExperienceButton";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            Experience
          </h1>
          <p className="text-sm text-white/40 mt-1">
            {experiences.length} entr{experiences.length !== 1 ? "ies" : "y"}
          </p>
        </div>
        <Link
          href="/admin/experience/new"
          className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
        >
          Add Experience
        </Link>
      </div>

      <div className="space-y-2">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-white truncate">
                {exp.position}
              </h3>
              <p className="text-xs text-white/30 mt-1">
                {exp.company} · {exp.location} · {exp.startDate} — {exp.current ? "Present" : exp.endDate}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                href={`/admin/experience/${exp.id}/edit`}
                className="px-3 py-1.5 rounded-md bg-white/5 text-white/60 text-xs hover:bg-white/10 hover:text-white transition-colors"
              >
                Edit
              </Link>
              <DeleteExperienceButton id={exp.id} position={exp.position} />
            </div>
          </div>
        ))}

        {experiences.length === 0 && (
          <div className="text-center py-12 text-white/30 text-sm">
            No experience entries yet.
          </div>
        )}
      </div>
    </div>
  );
}
