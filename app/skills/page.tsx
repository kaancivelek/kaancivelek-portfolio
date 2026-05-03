/**
 * Skills Page
 * Displays technical skills using SSR data fetching.
 */

import { Metadata } from "next";
import { PageOverlayWrapper } from "@/components/page-overlay/PageOverlayWrapper";
import { SkillCard } from "@/components/SkillCard";
import { getSkills } from "@/lib/content";
import { pageMetadata } from "@/config";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = pageMetadata.skills;

export default async function SkillsPage() {
  const skills = await getSkills();
  const categories = Object.entries(skills);

  const skillSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Skills | Kaan Civelek",
    inLanguage: ["en", "tr"],
    url: `${siteConfig.url}/skills`,
    description:
      "Technical skills of Kaan Civelek. Kaan Civelek'in teknik yetkinlikleri.",
    itemListElement: categories.map(([category, items], index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "DefinedTermSet",
        name: category,
        hasDefinedTerm: items.map((item) => ({
          "@type": "DefinedTerm",
          name: item,
        })),
      },
    })),
  };

  return (
    <PageOverlayWrapper title="Skills">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skillSchema) }}
      />

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
