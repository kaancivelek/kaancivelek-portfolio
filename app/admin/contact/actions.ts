/**
 * Contact Server Actions
 */

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

async function requireAuth() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
}

export async function updateContact(formData: FormData) {
  await requireAuth();

  const socialLinksRaw = formData.get("socialLinks") as string;
  let socialLinks: Array<{ platform: string; url: string; username: string }> = [];
  try {
    socialLinks = JSON.parse(socialLinksRaw);
  } catch {
    // keep existing
  }

  const existing = await prisma.contact.findFirst();

  const data = {
    email: formData.get("email") as string,
    availability: formData.get("availability") as string,
    timezone: formData.get("timezone") as string,
    preferredContact: formData.get("preferredContact") as string,
    responseTime: formData.get("responseTime") as string,
    callToAction: (formData.get("callToAction") as string) || "",
    socialLinks: JSON.stringify(socialLinks),
  };

  if (existing) {
    await prisma.contact.update({ where: { id: existing.id }, data });
  } else {
    await prisma.contact.create({ data });
  }

  revalidatePath("/admin/contact");
  revalidatePath("/contact");
}
