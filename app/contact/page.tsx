"use client";

import { useRouter } from "next/navigation";
import PageOverlay from "@/components/page-overlay/PageOverlay";

export default function ContactPage() {
  const router = useRouter();

  return (
    <PageOverlay
      title="Contact"
      onClose={() => router.push("/")}
    >
      <div style={{ color: "#fff", lineHeight: 1.8 }}>
        <p>Telefon: 0591 231 28 73</p>
        <p>Email: kaan@example.com</p>
      </div>
    </PageOverlay>
  );
}
