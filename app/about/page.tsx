"use client";

import { useRouter } from "next/navigation";
import PageOverlay from "@/components/page-overlay/PageOverlay";

export default function AboutPage() {
  const router = useRouter();

  return (
    <PageOverlay
      title="About"
      onClose={() => router.push("/")}
    >
      <div style={{ color: "#fff", lineHeight: 1.8 }}>
        <p style={{ marginBottom: 16 }}>
          Ben Kaan Civelek. Full-stack developer olarak çalışıyorum.
        </p>
        <p style={{ marginBottom: 16 }}>
          React, Next.js, TypeScript ve modern web teknolojileri ile projeler geliştiriyorum.
        </p>
        <p>
          Bu portföy sitesi yıldız navigasyonu ve modal overlay sistemi ile tasarlanmıştır.
        </p>
      </div>
    </PageOverlay>
  );
}

