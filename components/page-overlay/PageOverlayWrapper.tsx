/**
 * PageOverlayWrapper Component
 * Client component that handles overlay interactions and animations.
 * - Handles ESC key to close
 * - Animates overlay with Framer Motion
 * - Uses router for navigation
 */

"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, type ReactNode, Suspense } from "react";
import gsap from "gsap";
import { ANIMATION_DURATION } from "./constants";
import { PageOverlayLayout } from "./PageOverlayLayout";

interface PageOverlayWrapperProps {
  children: ReactNode;
  title?: string;
}

export function PageOverlayWrapper({ children, title }: Readonly<PageOverlayWrapperProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const isClosingRef = useRef(false);

  const handleClose = useCallback(() => {
    const element = overlayRef.current;

    if (!element || isClosingRef.current) {
      router.push("/");
      return;
    }

    const prefersReducedMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      router.push("/");
      return;
    }

    isClosingRef.current = true;

    gsap.to(element, {
      opacity: 0,
      scale: 0.98,
      y: 16,
      duration: ANIMATION_DURATION,
      ease: "power2.inOut",
      onComplete: () => {
        isClosingRef.current = false;
        router.push("/");
      },
    });
  }, [router]);

  // Close overlay on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    globalThis.addEventListener("keydown", handleEsc);
    return () => globalThis.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  useEffect(() => {
    const element = overlayRef.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.killTweensOf(element);
    isClosingRef.current = false;

    gsap.fromTo(
      element,
      { opacity: 0, scale: 0.96, y: 18 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: prefersReducedMotion ? 0 : ANIMATION_DURATION,
        ease: "power3.out",
      }
    );

    return () => {
      gsap.killTweensOf(element);
    };
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      key={pathname}
      style={{ position: "fixed", inset: 0 }}
    >
      <PageOverlayLayout title={title} onClose={handleClose}>
        <Suspense fallback={
          <div style={{ 
            color: "#666", 
            textAlign: "center", 
            padding: "2rem" 
          }}>
            Loading...
          </div>
        }>
          {children}
        </Suspense>
      </PageOverlayLayout>
    </div>
  );
}
