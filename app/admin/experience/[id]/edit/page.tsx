/**
 * Edit Experience Page
 */

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateExperience } from "../../actions";
import { ExperienceForm } from "../../ExperienceForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface EditExperiencePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  const { id } = await params;
  const exp = await prisma.experience.findUnique({ where: { id } });

  if (!exp) {
    notFound();
  }

  const achievements = JSON.parse(exp.achievements) as string[];
  const technologies = JSON.parse(exp.technologies) as string[];

  const initialData = {
    company: exp.company,
    position: exp.position,
    location: exp.location,
    type: exp.type,
    startDate: exp.startDate,
    endDate: exp.endDate || "",
    current: exp.current,
    description: exp.description,
    achievements: achievements.join("\n"),
    technologies: technologies.join(", "),
  };

  async function handleUpdate(formData: FormData) {
    "use server";
    await updateExperience(id, formData);
  }

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
            Edit Experience
          </h1>
          <p className="text-sm text-white/40 mt-0.5">{exp.position} at {exp.company}</p>
        </div>
      </div>

      <ExperienceForm
        initialData={initialData}
        action={handleUpdate}
        submitLabel="Update Experience"
      />
    </div>
  );
}
