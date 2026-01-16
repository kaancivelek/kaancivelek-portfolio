"use client";

import { PageOverlayWrapper } from "@/components/page-overlay/PageOverlayWrapper";
import { SkillCard } from "@/components/SkillCard";
import { useData } from "@/contexts/DataContext";

export default function SkillsPage() {
  const { about } = useData();

  if (!about?.skills?.primary || !about?.skills?.secondary) {
    return (
      <PageOverlayWrapper title="Skills">
        <div style={{ color: "#fff" }}>Loading...</div>
      </PageOverlayWrapper>
    );
  }

  return (
    <PageOverlayWrapper title="Skills">
      <div style={{ color: "#fff" }}>
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: 20, fontWeight: 400 }}>
            Primary Skills
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
            {about.skills.primary.map((skill) => (
              <SkillCard key={skill} skill={skill} isPrimary />
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "1.5rem", marginBottom: 20, fontWeight: 400 }}>
            Secondary Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {about.skills.secondary.map((skill) => (
              <SkillCard key={skill} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </PageOverlayWrapper>
  );
} 