"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function OverlayUI() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const topRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slideOut = () => {
      if (topRef.current) {
        gsap.to(topRef.current, { x: -300, opacity: 0, duration: 2.5, ease: "power2.inOut" });
      }
      if (bottomLeftRef.current) {
        gsap.to(bottomLeftRef.current, { x: -300, opacity: 0, duration: 2.5, ease: "power2.inOut" });
      }
      if (bottomRightRef.current) {
        gsap.to(bottomRightRef.current, { x: 300, opacity: 0, duration: 2.5, ease: "power2.inOut" });
      }
    };

    // If we're leaving the home page normally
    if (!isHomePage) {
      slideOut();
    } else {
      // Animate them back in when returning to home page
      if (topRef.current) {
        gsap.to(topRef.current, { x: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 });
      }
      if (bottomLeftRef.current) {
        gsap.to(bottomLeftRef.current, { x: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 });
      }
      if (bottomRightRef.current) {
        gsap.to(bottomRightRef.current, { x: 0, opacity: 0.15, duration: 1, ease: "power2.out", delay: 0.5 });
      }
    }

    // Listen for early navigation start event from StarNavigation
    window.addEventListener("navigation-start", slideOut);
    return () => window.removeEventListener("navigation-start", slideOut);
  }, [isHomePage]);

  return (
    <div className="fixed inset-0 pointer-events-none text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.9), 0 0 16px rgba(255,255,255,0.3)", fontFamily: "var(--font-aldrich), sans-serif", zIndex: 10 }}>
      {/* TOP LEFT - Manifesto */}
      <div ref={topRef} className="absolute top-6 left-6 max-w-sm text-xs leading-relaxed">
        I merge engineering with imagination.<br />
        Systems are not built but they are composed.<br />
        Every interaction is a structure of intent.
      </div>

      {/* BOTTOM LEFT - Hint */}
      <div ref={bottomLeftRef} className="absolute bottom-6 left-6 text-sm">
        Hover over a star node to explore
      </div>

      {/* BOTTOM RIGHT - Copyright */}
      <div ref={bottomRightRef} className="absolute bottom-6 right-6 text-xs opacity-15" style={{ fontFamily: "var(--font-aldrich), sans-serif" }}>
        © {new Date().getFullYear()} All systems reserved
      </div>
    </div>
  );
}
