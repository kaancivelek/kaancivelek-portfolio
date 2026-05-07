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
import { ShootingStarEffect } from "./ShootingStarEffect";
import { getAudioManager } from "@/lib/audioManager";
export function ClientLayout({ children }: Readonly<{ children: ReactNode }>) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Brief delay for initial hydration and background setup
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = getAudioManager();
    let raf = 0;

    const loop = () => {
      audio.update();
      raf = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const audio = getAudioManager();
    const unlock = () => {
      audio.start();
      globalThis.removeEventListener("click", unlock);
    };

    globalThis.addEventListener("click", unlock);
    return () => globalThis.removeEventListener("click", unlock);
  }, []);

  if (!isReady) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <NightSkyBackground />
      <ShootingStarEffect />
      {children}
    </>
  );
}
