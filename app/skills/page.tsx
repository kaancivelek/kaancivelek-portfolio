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

  return (
    <PageOverlayWrapper title="Skills">
      <div style={{ color: "#fff" }}>
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: 20, fontWeight: 400 }}>
            Primary Skills
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 12,
            }}
          >
            {skills.primary.map((skill) => (
              <SkillCard key={skill} skill={skill} isPrimary />
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "1.5rem", marginBottom: 20, fontWeight: 400 }}>
            Secondary Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {skills.secondary.map((skill) => (
              <SkillCard key={skill} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </PageOverlayWrapper>
  );
}
