"use client";

import { useRouter } from "next/navigation";
import PageOverlay from "@/components/page-overlay/PageOverlay";

export default function ExperiencePage() {
  const router = useRouter();

  return (
    <PageOverlay
      title="Experience"
      onClose={() => router.push("/")}
    >
      <div style={{ color: "#fff", lineHeight: 1.8 }}>
        <p>İş deneyimlerim burada listelenecek.</p>
      </div>
    </PageOverlay>
  );
}
