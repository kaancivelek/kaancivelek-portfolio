/**
 * Experience Page
 * Displays work experience using SSR data fetching.
 */

import { Metadata } from "next";
import { PageOverlayWrapper } from "@/components/page-overlay/PageOverlayWrapper";
import { getExperiences } from "@/lib/content";
import { pageMetadata } from "@/config";

export const metadata: Metadata = pageMetadata.experience;

/**
 * Formats a date string (YYYY-MM) to readable format (Mon YYYY).
 */
function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[Number.parseInt(month) - 1]} ${year}`;
}

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <PageOverlayWrapper title="Experience">
      <div style={{ color: "#fff" }}>
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            style={{
              marginBottom: 32,
              paddingBottom: index < experiences.length - 1 ? 32 : 0,
              borderBottom:
                index < experiences.length - 1
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                marginBottom: 8,
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    marginBottom: 4,
                  }}
                >
                  {exp.position}
                </h3>
                <p style={{ color: "#999", fontSize: "1.1rem" }}>
                  {exp.company} • {exp.location}
                </p>
              </div>
              {exp.current && (
                <span
                  style={{
                    padding: "4px 12px",
                    background: "rgba(74, 222, 128, 0.2)",
                    color: "#4ade80",
                    borderRadius: 6,
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  Current
                </span>
              )}
            </div>

            <p
              style={{ color: "#666", fontSize: "0.875rem", marginBottom: 16 }}
            >
              {formatDate(exp.startDate)} -{" "}
              {exp.endDate ? formatDate(exp.endDate) : "Present"} • {exp.type}
            </p>

            <div style={{ marginBottom: 16 }}>
              <h4
                style={{ fontSize: "1rem", marginBottom: 8, fontWeight: 500 }}
              >
                Key Achievements:
              </h4>
              <ul
                style={{ paddingLeft: "1.5rem", lineHeight: 1.8, color: "#ccc" }}
              >
                {exp.achievements.map((achievement) => (
                  <li key={achievement} style={{ marginBottom: 6 }}>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                style={{ fontSize: "1rem", marginBottom: 8, fontWeight: 500 }}
              >
                Technologies:
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "4px 10px",
                      background: "rgba(255, 255, 255, 0.05)",
                      borderRadius: 6,
                      fontSize: "0.8rem",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageOverlayWrapper>
  );
}
