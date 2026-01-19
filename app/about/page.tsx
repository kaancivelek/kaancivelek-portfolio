/**
 * About Page
 * Displays personal information and bio using SSR data fetching.
 */

import { Metadata } from "next";
import { PageOverlayWrapper } from "@/components/page-overlay/PageOverlayWrapper";
import { getAboutData } from "@/lib/content";
import { pageMetadata } from "@/config";

export const metadata: Metadata = pageMetadata.about;

export default async function AboutPage() {
  const about = await getAboutData();

  return (
    <PageOverlayWrapper title="About">
      <div style={{ color: "#fff", lineHeight: 1.8 }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16, fontWeight: 400 }}>
            {about.name}
          </h2>
          <p style={{ color: "#999", marginBottom: 24 }}>{about.title}</p>

          <div
            style={{ marginBottom: 0 }}
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: about.bioHtml || "" }}
          />
        </div>
      </div>
    </PageOverlayWrapper>
  );
}

