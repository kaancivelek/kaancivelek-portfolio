/**
 * Project Server Actions
 * CRUD operations for projects via Server Actions.
 */

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/** Ensures the caller is authenticated. */
async function requireAuth() {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
}

export async function createProject(formData: FormData) {
  await requireAuth();

  const tags = (formData.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const linksLive = formData.get("linksLive") as string;
  const linksGithub = formData.get("linksGithub") as string;
  const links: Record<string, string> = {};
  if (linksLive) links.live = linksLive;
  if (linksGithub) links.github = linksGithub;

  const count = await prisma.project.count();

  await prisma.project.create({
    data: {
      slug: formData.get("slug") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      detailedDescription: (formData.get("detailedDescription") as string) || "",
      image: (formData.get("image") as string) || null,
      tags: JSON.stringify(tags),
      featured: formData.get("featured") === "on",
      year: parseInt(formData.get("year") as string, 10),
      status: (formData.get("status") as string) || "completed",
      links: Object.keys(links).length > 0 ? JSON.stringify(links) : null,
      sortOrder: count,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAuth();

  const tags = (formData.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const linksLive = formData.get("linksLive") as string;
  const linksGithub = formData.get("linksGithub") as string;
  const links: Record<string, string> = {};
  if (linksLive) links.live = linksLive;
  if (linksGithub) links.github = linksGithub;

  await prisma.project.update({
    where: { id },
    data: {
      slug: formData.get("slug") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      detailedDescription: (formData.get("detailedDescription") as string) || "",
      image: (formData.get("image") as string) || null,
      tags: JSON.stringify(tags),
      featured: formData.get("featured") === "on",
      year: parseInt(formData.get("year") as string, 10),
      status: (formData.get("status") as string) || "completed",
      links: Object.keys(links).length > 0 ? JSON.stringify(links) : null,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAuth();

  await prisma.project.delete({ where: { id } });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
