/**
 * Skills Page
 * Displays technical skills using SSR data fetching.
 */

import { Metadata } from "next";
import { PageOverlayWrapper } from "@/components/page-overlay/PageOverlayWrapper";
import { SkillCard } from "@/components/SkillCard";
import { getSkills } from "@/lib/content";
import { pageMetadata } from "@/config";

export const metadata: Metadata = pageMetadata.skills;

export default async function SkillsPage() {
  const skills = await getSkills();
  const categories = Object.entries(skills);

  return (
    <PageOverlayWrapper title="Skills">
      <div style={{ color: "#fff" }}>
        {categories.map(([category, items], index) => (
          <div key={category} style={{ marginBottom: index < categories.length - 1 ? 32 : 0 }}>
            <h3 style={{ fontSize: "1.25rem", marginBottom: 16, fontWeight: 400 }}>
              {category}
            </h3>
            {index === 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                  gap: 12,
                }}
              >
                {items.map((skill) => (
                  <SkillCard key={skill} skill={skill} isPrimary />
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {items.map((skill) => (
                  <SkillCard key={skill} skill={skill} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </PageOverlayWrapper>
  );
}
