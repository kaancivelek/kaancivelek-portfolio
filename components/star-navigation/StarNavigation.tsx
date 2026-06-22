/**
 * StarNavigation Component
 * Main star-shaped navigation that appears on the home page.
 * Client component - requires Framer Motion animations and router.
 */

"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import gsap from "gsap";
import { useRouter, usePathname } from "next/navigation";
import { StarShape } from "./StarShape";
import { TipLine } from "./TipLine";
import { NavigationButton } from "./NavigationButton";
import { generateStarPoints, generateTipPoints } from "./utils";
import { getAudioManager } from "@/lib/audioManager";
import { 
  NAVIGATION_ROUTES,
  BASE_SVG_SIZE,
  SIZE_MULTIPLIER,
  OUTER_RADIUS_RATIO,
  INNER_RADIUS_RATIO,
  ANIMATION_DURATION, 
  SCALE_FACTOR
} from "./constants";

/**
 * Static Star Component
 * Shows a faded star in the background when on overlay pages.
 */




export default function StarNavigation() {
  
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [svgSize, setSvgSize] = useState(BASE_SVG_SIZE * SIZE_MULTIPLIER);
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    return getAudioManager().isMuted();
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Only show interactive star on home page
  const isHomePage = pathname === "/";

  // SSR-safe: Client-side'da gerçek ekran boyutunu hesapla
  useEffect(() => {
    const calculateSize = () => {
      const minDimension = Math.min(globalThis.innerWidth, globalThis.innerHeight);
      const newSize = Math.round(minDimension * 0.75 * SIZE_MULTIPLIER);
      setSvgSize(newSize);
    };

    calculateSize();
    globalThis.addEventListener('resize', calculateSize);
    return () => globalThis.removeEventListener('resize', calculateSize);
  }, []);

  const outerRadius = svgSize * OUTER_RADIUS_RATIO;
  const innerRadius = svgSize * INNER_RADIUS_RATIO;
  const svgCenter = svgSize / 2;

  const starPoints = useMemo(
    () => generateStarPoints(svgSize, outerRadius, innerRadius), 
    [svgSize, outerRadius, innerRadius]
  );
  const tipPoints = useMemo(
    () => generateTipPoints(svgSize, outerRadius), 
    [svgSize, outerRadius]
  );

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    NAVIGATION_ROUTES.forEach((route) => {
      router.prefetch(route.path);
    });
  }, [isHomePage, router]);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const prefersReducedMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isHomePage && isAnimating) {
      return;
    }

    gsap.killTweensOf(element);

    if (isHomePage) {
      if (isAnimating) {
        gsap.set(element, { opacity: 1 });
        return;
      }

      gsap.fromTo(
        element,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: prefersReducedMotion ? 0 : ANIMATION_DURATION / 1000,
          ease: "power3.out",
        }
      );
      return;
    }

    gsap.fromTo(
      element,
      { opacity: 0, scale: 0.98 },
      {
        opacity: 0.15,
        scale: 1,
        duration: prefersReducedMotion ? 0 : 0.75,
        ease: "power2.out",
      }
    );
  }, [isHomePage, isAnimating, pathname, svgSize]);



  useEffect(() => {
    const element = containerRef.current;

    if (!element || !isHomePage || isAnimating) {
      return;
    }

    gsap.to(element, {
      scale: activeIndex === null ? 1 : 1.02,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [activeIndex, isHomePage, isAnimating]);

  const handleNavigate = (index: number, path: string) => {
    const audio = getAudioManager();
    const element = containerRef.current;

    if (!element) {
      audio.playClick();
      setTimeout(() => {
        router.push(path);
      }, 120);
      return;
    }

    audio.playClick();
    setActiveIndex(index);
    setIsAnimating(true);
    
    // Dispatch an event so OverlayUI can start sliding out immediately
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("navigation-start"));
    }

    const tip = tipPoints[index];
    if (tip) {
      gsap.set(element, { transformOrigin: `${tip.x}px ${tip.y}px` });
    }

    gsap.to(element, {
      scale: SCALE_FACTOR,
      opacity: 0,
      duration: ANIMATION_DURATION / 1000,
      ease: "power2.inOut",
      onComplete: () => {
        setTimeout(() => {
          router.push(path);
        }, 120);
      },
    });
  };
  
  // Pathname değiştiğinde animasyonu resetle
  useEffect(() => {
    if (isHomePage) {
      return;
    }

    const resetFrame = globalThis.requestAnimationFrame(() => {
      setIsAnimating(false);
      setActiveIndex(null);
    });

    return () => globalThis.cancelAnimationFrame(resetFrame);
  }, [pathname, isHomePage]);

  // Home dışında static yıldız göster
  if (!isHomePage) {
    return (
      <></>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: svgSize,
        height: svgSize,
        zIndex: 100,
        transformOrigin:
          activeIndex === null
            ? `${svgCenter}px ${svgCenter}px`
            : `${tipPoints[activeIndex]?.x ?? svgCenter}px ${tipPoints[activeIndex]?.y ?? svgCenter}px`,
      }}
    >
      <svg 
        width={svgSize} 
        height={svgSize} 
        style={{ 
          position: "absolute", 
          top: 0,
          left: 0,
          overflow: "visible"
        }}
      >
        <StarShape points={starPoints} svgSize={svgSize} />
        
        {tipPoints.map((tip, idx) => (
          <TipLine
            key={`tip-${NAVIGATION_ROUTES[idx]?.path || idx}`}
            tip={tip}
            index={idx}
            isActive={activeIndex === idx}
            svgSize={svgSize}
          />
        ))}
      </svg>

      {NAVIGATION_ROUTES.map((route, idx) => (
        <NavigationButton
          key={route.path}
          tip={tipPoints[idx]}
          label={route.label}
          isActive={activeIndex === idx}
          onClick={() => handleNavigate(idx, route.path)}
          onMouseEnter={() => {
            setActiveIndex(idx);
            const audio = getAudioManager();
            audio.playHover();
            audio.setAmbientTarget(0.2);
          }}
          onMouseLeave={() => {
            setActiveIndex(null);
            const audio = getAudioManager();
            audio.setAmbientTarget(0.4);
          }}
          svgSize={svgSize}
          tipIndex={idx}
        />
      ))}

      <button
        type="button"
        onClick={() => {
          const audio = getAudioManager();
          setIsMuted(audio.toggleMuted());
        }}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        style={{
          position: "fixed",
          top: 24,
          right: 24,
          zIndex: 110,
          padding: "10px 14px",
          background: "rgba(0, 0, 0, 0.45)",
          color: "#fff",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          cursor: "pointer",
          backdropFilter: "blur(6px)",
        }}
      >
        {isMuted ? "Sound: off" : "Sound: on"}
      </button>

      {/* Center name - shown when no navigation is hovered */}
      {activeIndex === null && (
        <div
          style={{
            position: "fixed",
            top: "47%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            fontSize: `${0.65 * (svgSize / 300)}rem`,
            fontFamily: "var(--font-aldrich), sans-serif",
            fontWeight: 400,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
            zIndex: 20,
          }}
        >
          Kaan Civelek
        </div>
      )}
    </div>
  );
}
