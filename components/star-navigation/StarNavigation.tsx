/**
 * StarNavigation Component
 * Main star-shaped navigation that appears on the home page.
 * Client component - requires Framer Motion animations and router.
 */

"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { StarShape } from "./StarShape";
import { TipLine } from "./TipLine";
import { NavigationButton } from "./NavigationButton";
import { generateStarPoints, generateTipPoints } from "./utils";
import { 
  NAVIGATION_ROUTES,
  BASE_SVG_SIZE,
  SIZE_MULTIPLIER,
  OUTER_RADIUS_RATIO,
  INNER_RADIUS_RATIO,
  ANIMATION_DURATION, 
  SCALE_FACTOR
} from "./constants";
import type { Point } from "./types";

/**
 * Static Star Component
 * Shows a faded star in the background when on overlay pages.
 */
interface StaticStarProps {
  svgSize: number;
  starPoints: Point[];
  tipPoints: Point[];
}

function StaticStar({ svgSize, starPoints, tipPoints }: Readonly<StaticStarProps>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: svgSize,
        height: svgSize,
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <svg 
        width={svgSize} 
        height={svgSize} 
        style={{ 
          position: "absolute", 
          top: 0,
          left: 0
        }}
      >
        <StarShape points={starPoints} svgSize={svgSize} />
        
        {tipPoints.map((tip, idx) => (
          <TipLine
            key={`static-tip-${NAVIGATION_ROUTES[idx]?.path || idx}`}
            tip={tip}
            index={idx}
            isActive={false}
            svgSize={svgSize}
          />
        ))}
      </svg>
    </motion.div>
  );
}

export default function StarNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [svgSize, setSvgSize] = useState(BASE_SVG_SIZE * SIZE_MULTIPLIER);
  
  // Only show interactive star on home page
  const isHomePage = pathname === "/";

  // SSR-safe: Client-side'da gerçek ekran boyutunu hesapla
  useEffect(() => {
    const calculateSize = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight);
      const newSize = Math.round(minDimension * 0.75 * SIZE_MULTIPLIER);
      setSvgSize(newSize);
    };

    calculateSize();
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
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

  const handleNavigate = (index: number, path: string) => {
    setActiveIndex(index);
    setIsAnimating(true);
    
    // Animasyon bittikten sonra yönlendir
    setTimeout(() => {
      router.push(path);
    }, ANIMATION_DURATION);
  };
  
  // Pathname değiştiğinde animasyonu resetle
  useEffect(() => {
    if (!isHomePage) {
      setIsAnimating(false);
      setActiveIndex(null);
    }
  }, [pathname, isHomePage]);

  // Home dışında static yıldız göster
  if (!isHomePage) {
    return (
      <AnimatePresence mode="wait">
        <StaticStar 
          key={pathname}
          svgSize={svgSize}
          starPoints={starPoints}
          tipPoints={tipPoints}
        />
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {!isAnimating && (
        <motion.div
          initial={{ scale: 1, opacity: 1 }}
          exit={{ scale: SCALE_FACTOR, opacity: 0 }}
          transition={{ 
            duration: ANIMATION_DURATION / 1000, 
            ease: [0.68, -0.55, 0.27, 1.55] 
          }}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
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
              left: 0
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
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              svgSize={svgSize}
              tipIndex={idx}
            />
          ))}

          {/* Center name - shown when no navigation is hovered */}
          <AnimatePresence>
            {activeIndex === null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "fixed",
                  top: "43%",
                  left: "33%",
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
