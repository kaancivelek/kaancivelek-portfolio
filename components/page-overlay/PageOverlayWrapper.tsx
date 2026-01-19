/**
 * PageOverlayWrapper Component
 * Client component that handles overlay interactions and animations.
 * - Handles ESC key to close
 * - Animates overlay with Framer Motion
 * - Uses router for navigation
 */

"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, type ReactNode, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ANIMATION_DURATION, ANIMATION_VARIANTS } from "./constants";
import { PageOverlayLayout } from "./PageOverlayLayout";

interface PageOverlayWrapperProps {
  children: ReactNode;
  title?: string;
}

export function PageOverlayWrapper({ children, title }: Readonly<PageOverlayWrapperProps>) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClose = () => {
    router.push("/");
  };

  // Close overlay on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    globalThis.addEventListener("keydown", handleEsc);
    return () => globalThis.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={ANIMATION_VARIANTS.backdrop}
        transition={{ duration: ANIMATION_DURATION }}
        style={{ position: "fixed", inset: 0 }}
      >
        <PageOverlayLayout title={title} onClose={handleClose}>
          <motion.div
            variants={ANIMATION_VARIANTS.content}
            transition={{
              duration: ANIMATION_DURATION,
              ease: [0.68, -0.55, 0.27, 1.55],
            }}
          >
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
          </motion.div>
        </PageOverlayLayout>
      </motion.div>
    </AnimatePresence>
  );
}
