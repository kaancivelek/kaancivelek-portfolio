"use client";

import { useRouter } from "next/navigation";
import PageOverlay from "@/components/page-overlay/PageOverlay";

export default function SkillsPage() {
  const router = useRouter();

  return (
    <PageOverlay
      title="Skills"
      onClose={() => router.push("/")}
    >
      <div style={{ color: "#fff", lineHeight: 1.8 }}>
        <p>Yeteneklerim ve becerilerim burada listelenecek.</p>
      </div>
    </PageOverlay>
  );
} 