/**
 * About Server Actions
 */

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function updateAbout(formData: FormData) {
  await requireAuth();

  const skillsRaw = formData.get("skills") as string;
  let skills: Record<string, string[]> = {};
  try {
    skills = JSON.parse(skillsRaw);
  } catch {
    // If invalid JSON, keep existing
  }

  const socialRaw = formData.get("social") as string;
  let social: Record<string, string> = {};
  try {
    social = JSON.parse(socialRaw);
  } catch {
    // keep existing
  }

  const existing = await prisma.about.findFirst();

  if (existing) {
    await prisma.about.update({
      where: { id: existing.id },
      data: {
        name: formData.get("name") as string,
        title: formData.get("title") as string,
        bio: (formData.get("bio") as string) || "",
        location: formData.get("location") as string,
        email: formData.get("email") as string,
        social: JSON.stringify(social),
        skills: JSON.stringify(skills),
      },
    });
  } else {
    await prisma.about.create({
      data: {
        name: formData.get("name") as string,
        title: formData.get("title") as string,
        bio: (formData.get("bio") as string) || "",
        location: formData.get("location") as string,
        email: formData.get("email") as string,
        social: JSON.stringify(social),
        skills: JSON.stringify(skills),
      },
    });
  }

  revalidatePath("/admin/about");
  revalidatePath("/about");
  revalidatePath("/skills");
}
