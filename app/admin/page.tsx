/**
 * Admin Dashboard
 * Overview page with stats and quick links.
 */

import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getStats() {
  const [projectCount, experienceCount, aboutExists, contactExists] =
    await Promise.all([
      prisma.project.count(),
      prisma.experience.count(),
      prisma.about.count(),
      prisma.contact.count(),
    ]);

  return { projectCount, experienceCount, aboutExists, contactExists };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      label: "Projects",
      value: stats.projectCount,
      href: "/admin/projects",
      description: "Manage portfolio projects",
    },
    {
      label: "Experience",
      value: stats.experienceCount,
      href: "/admin/experience",
      description: "Manage work experience",
    },
    {
      label: "About",
      value: stats.aboutExists > 0 ? "Configured" : "Not set",
      href: "/admin/about",
      description: "Edit profile information",
    },
    {
      label: "Contact",
      value: stats.contactExists > 0 ? "Configured" : "Not set",
      href: "/admin/contact",
      description: "Edit contact details",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-white/40 mt-1">
          Portfolio content overview
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-white/50">
                {card.label}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {card.value}
            </div>
            <p className="text-xs text-white/30">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
