/**
 * Contact Page
 * Displays contact information and social links using SSR data fetching.
 */

import { Metadata } from "next";
import { PageOverlayWrapper } from "@/components/page-overlay/PageOverlayWrapper";
import { SocialLinkCard } from "@/components/SocialLinkCard";
import { getContactData } from "@/lib/content";
import { pageMetadata } from "@/config";

export const metadata: Metadata = pageMetadata.contact;

export default async function ContactPage() {
  const contact = await getContactData();

  return (
    <PageOverlayWrapper title="Contact">
      <div style={{ color: "#fff" }}>
        <div
          className="markdown-content"
          style={{ marginBottom: 32 }}
          dangerouslySetInnerHTML={{ __html: contact.ctaHtml || "" }}
        />

        <div
          style={{
            padding: 24,
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: 12,
            marginBottom: 32,
          }}
        >
          <h3 style={{ fontSize: "1.25rem", marginBottom: 16, fontWeight: 400 }}>
            Contact Details
          </h3>
          <div style={{ lineHeight: 1.8, color: "#ccc" }}>
            <p>
              📧 <strong>Email:</strong> {contact.contact.email}
            </p>
            <p>
              ⏰ <strong>Timezone:</strong> {contact.contact.timezone}
            </p>
            <p>
              ⚡ <strong>Response Time:</strong> {contact.contact.responseTime}
            </p>
            <p style={{ marginTop: 12, color: "#4ade80" }}>
              ✨ {contact.contact.availability}
            </p>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "1.25rem", marginBottom: 16, fontWeight: 400 }}>
            Social Media
          </h3>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {contact.socialLinks?.map((link) => (
              <SocialLinkCard key={link.platform} link={link} />
            ))}
          </div>
        </div>
      </div>
    </PageOverlayWrapper>
  );
}
