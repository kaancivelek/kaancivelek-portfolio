/**
 * Experience Server Actions
 */

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function createExperience(formData: FormData) {
  await requireAuth();

  const achievements = (formData.get("achievements") as string)
    .split("\n")
    .map((a) => a.trim())
    .filter(Boolean);
  const technologies = (formData.get("technologies") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const count = await prisma.experience.count();

  await prisma.experience.create({
    data: {
      company: formData.get("company") as string,
      position: formData.get("position") as string,
      location: formData.get("location") as string,
      type: formData.get("type") as string,
      startDate: formData.get("startDate") as string,
      endDate: (formData.get("endDate") as string) || null,
      current: formData.get("current") === "on",
      description: (formData.get("description") as string) || "",
      achievements: JSON.stringify(achievements),
      technologies: JSON.stringify(technologies),
      sortOrder: count,
    },
  });

  revalidatePath("/admin/experience");
  revalidatePath("/experience");
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  await requireAuth();

  const achievements = (formData.get("achievements") as string)
    .split("\n")
    .map((a) => a.trim())
    .filter(Boolean);
  const technologies = (formData.get("technologies") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  await prisma.experience.update({
    where: { id },
    data: {
      company: formData.get("company") as string,
      position: formData.get("position") as string,
      location: formData.get("location") as string,
      type: formData.get("type") as string,
      startDate: formData.get("startDate") as string,
      endDate: (formData.get("endDate") as string) || null,
      current: formData.get("current") === "on",
      description: (formData.get("description") as string) || "",
      achievements: JSON.stringify(achievements),
      technologies: JSON.stringify(technologies),
    },
  });

  revalidatePath("/admin/experience");
  revalidatePath("/experience");
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  await requireAuth();
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/admin/experience");
  revalidatePath("/experience");
}
