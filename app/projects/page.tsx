"use client";

import { useRouter } from "next/navigation";
import PageOverlay from "@/components/page-overlay/PageOverlay";

export default function ProjectsPage() {
  const router = useRouter();

  return (
    <PageOverlay
      title="Projects"
      onClose={() => router.push("/")}
    >
      <div style={{ color: "#fff", lineHeight: 1.8 }}>
        <p>Projelerim burada listelenecek.</p>
      </div>
    </PageOverlay>
  );
}
