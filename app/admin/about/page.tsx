/**
 * Admin About Page
 * Singleton edit form for profile information.
 */

import { prisma } from "@/lib/prisma";
import { updateAbout } from "./actions";
import { AboutForm } from "./AboutForm";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const about = await prisma.about.findFirst();

  const initialData = about
    ? {
        name: about.name,
        title: about.title,
        bio: about.bio,
        location: about.location,
        email: about.email,
        social: about.social,
        skills: about.skills,
      }
    : undefined;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          About
        </h1>
        <p className="text-sm text-white/40 mt-1">
          Edit your profile information
        </p>
      </div>

      <AboutForm initialData={initialData} action={updateAbout} />
    </div>
  );
}
