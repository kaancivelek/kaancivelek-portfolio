/**
 * Database Seed Script
 * Reads existing JSON/MD files from data/ and inserts them into SQLite.
 * Run with: npx prisma db seed
 */

import { PrismaClient } from "@prisma/client";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const dataDir = path.join(process.cwd(), "data");

async function readJson<T>(filename: string): Promise<T> {
  const content = await fs.readFile(path.join(dataDir, filename), "utf8");
  return JSON.parse(content);
}

async function readMd(filename: string): Promise<string> {
  try {
    return await fs.readFile(path.join(dataDir, filename), "utf8");
  } catch {
    return "";
  }
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@kaancivelek.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashed,
      name: "Kaan Civelek",
    },
  });

  console.log(`✓ Admin user seeded: ${email}`);
}

async function seedAbout() {
  const about = await readJson<{
    name: string;
    title: string;
    bio?: string;
    location: string;
    email: string;
    social: Record<string, string>;
    skills: Record<string, string[]>;
  }>("about.json");

  const bio = about.bio ? await readMd(about.bio) : "";

  // Delete existing records and create fresh
  await prisma.about.deleteMany();
  await prisma.about.create({
    data: {
      name: about.name,
      title: about.title,
      bio,
      location: about.location,
      email: about.email,
      social: JSON.stringify(about.social),
      skills: JSON.stringify(about.skills),
    },
  });

  console.log("✓ About data seeded");
}

async function seedProjects() {
  const data = await readJson<{
    projects: Array<{
      id: string;
      title: string;
      slug: string;
      description: string;
      detailedDescription?: string;
      image?: string;
      tags: string[];
      featured: boolean;
      year: number;
      status: string;
      links?: Record<string, string>;
    }>;
  }>("projects.json");

  await prisma.project.deleteMany();

  for (let i = 0; i < data.projects.length; i++) {
    const p = data.projects[i];
    const detailedDescription = p.detailedDescription
      ? await readMd(p.detailedDescription)
      : "";

    await prisma.project.create({
      data: {
        slug: p.slug,
        title: p.title,
        description: p.description,
        detailedDescription,
        image: p.image || null,
        tags: JSON.stringify(p.tags),
        featured: p.featured,
        year: p.year,
        status: p.status,
        links: p.links ? JSON.stringify(p.links) : null,
        sortOrder: i,
      },
    });
  }

  console.log(`✓ ${data.projects.length} projects seeded`);
}

async function seedExperiences() {
  const data = await readJson<{
    experiences: Array<{
      id: string;
      company: string;
      position: string;
      location: string;
      type: string;
      startDate: string;
      endDate?: string;
      current: boolean;
      description?: string;
      achievements: string[];
      technologies: string[];
    }>;
  }>("experience.json");

  await prisma.experience.deleteMany();

  for (let i = 0; i < data.experiences.length; i++) {
    const exp = data.experiences[i];
    const description = exp.description ? await readMd(exp.description) : "";

    await prisma.experience.create({
      data: {
        company: exp.company,
        position: exp.position,
        location: exp.location,
        type: exp.type,
        startDate: exp.startDate,
        endDate: exp.endDate || null,
        current: exp.current,
        description,
        achievements: JSON.stringify(exp.achievements),
        technologies: JSON.stringify(exp.technologies),
        sortOrder: i,
      },
    });
  }

  console.log(`✓ ${data.experiences.length} experiences seeded`);
}

async function seedContact() {
  const data = await readJson<{
    contact: {
      email: string;
      availability: string;
      timezone: string;
      preferredContact: string;
      responseTime: string;
    };
    socialLinks: Array<{ platform: string; url: string; username: string }>;
    callToAction?: string;
  }>("contact.json");

  const callToAction = data.callToAction ? await readMd(data.callToAction) : "";

  await prisma.contact.deleteMany();
  await prisma.contact.create({
    data: {
      email: data.contact.email,
      availability: data.contact.availability,
      timezone: data.contact.timezone,
      preferredContact: data.contact.preferredContact,
      responseTime: data.contact.responseTime,
      callToAction,
      socialLinks: JSON.stringify(data.socialLinks),
    },
  });

  console.log("✓ Contact data seeded");
}

async function main() {
  console.log("🌱 Seeding database...\n");

  await seedAdmin();
  await seedAbout();
  await seedProjects();
  await seedExperiences();
  await seedContact();

  console.log("\n✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
