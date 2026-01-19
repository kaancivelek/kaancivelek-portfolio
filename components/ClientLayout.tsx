/**
 * ClientLayout Component
 * Wraps the application with client-side features:
 * - NightSkyBackground for ambient visual effects
 * - Loading state for initial hydration
 */

"use client";

import { useEffect, useState, type ReactNode } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { NightSkyBackground } from "@/components/NightSkyBackground";

export function ClientLayout({ children }: Readonly<{ children: ReactNode }>) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Brief delay for initial hydration and background setup
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <NightSkyBackground />
      {children}
    </>
  );
}
