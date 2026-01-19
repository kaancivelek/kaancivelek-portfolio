/**
 * NightSkyBackground Component
 * Creates an animated starry night sky with twinkling stars and shooting stars on click.
 * Client component - requires Framer Motion animations and event handlers.
 */

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Static star data for rendering */
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDelay: number;
  twinkleDuration: number;
  colorIndex: number;
}

/** Animated shooting star data */
interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  length: number;
  duration: number;
}

/** Star colors for realistic sky appearance */
const starColors = [
  "255, 255, 255", // White
  "255, 250, 250", // Snow white
  "255, 255, 240", // Warm white
  "240, 248, 255", // Alice blue - cold stars
  "255, 245, 238", // Seashell - warm stars
];

/**
 * Generates random star positions with realistic size distribution.
 * 60% tiny, 25% medium, 10% large, 5% very bright.
 */
function generateStars(count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    // Star size distribution - most small, few large
    const sizeRandom = Math.random();
    let size: number;
    if (sizeRandom < 0.6) {
      size = 0.5 + Math.random() * 0.5; // Very small stars (60%)
    } else if (sizeRandom < 0.85) {
      size = 1 + Math.random() * 0.5; // Medium stars (25%)
    } else if (sizeRandom < 0.95) {
      size = 1.5 + Math.random() * 0.5; // Large stars (10%)
    } else {
      size = 2 + Math.random() * 1; // Very bright stars (5%)
    }

    // Brightness distribution
    const opacityRandom = Math.random();
    let opacity: number;
    if (opacityRandom < 0.3) {
      opacity = 0.2 + Math.random() * 0.2; // Dim
    } else if (opacityRandom < 0.7) {
      opacity = 0.4 + Math.random() * 0.3; // Medium
    } else {
      opacity = 0.7 + Math.random() * 0.3; // Bright
    }

    stars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size,
      opacity,
      twinkleDelay: Math.random() * 5,
      twinkleDuration: 2 + Math.random() * 4,
      colorIndex: Math.floor(Math.random() * starColors.length),
    });
  }
  return stars;
}

export function NightSkyBackground() {
  const [stars] = useState<Star[]>(() => generateStars(200));
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const shootingStarId = useRef(0);
  const lastClickTime = useRef(0);
  const shootingStarTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Helper to track and schedule shooting star removal
  const scheduleStarRemoval = useCallback((starId: number, delay: number) => {
    const timeoutId = setTimeout(() => {
      setShootingStars((prev) => prev.filter((s) => s.id !== starId));
      // Remove this timeout from tracking
      shootingStarTimeoutsRef.current = shootingStarTimeoutsRef.current.filter(
        (id) => id !== timeoutId
      );
    }, delay);
    shootingStarTimeoutsRef.current.push(timeoutId);
  }, []);

  // Automatic shooting stars
  useEffect(() => {
    const createRandomShootingStar = () => {
      const newStar: ShootingStar = {
        id: shootingStarId.current++,
        startX: 10 + Math.random() * 60,
        startY: Math.random() * 40,
        angle: 20 + Math.random() * 40,
        length: 80 + Math.random() * 120,
        duration: 0.8 + Math.random() * 0.6,
      };

      setShootingStars((prev) => [...prev, newStar]);
      scheduleStarRemoval(newStar.id, newStar.duration * 1000 + 500);
    };

    // First shooting star after 5-15 seconds
    const initialDelay = 5000 + Math.random() * 10000;
    const initialTimeout = globalThis.setTimeout(() => {
      createRandomShootingStar();
    }, initialDelay);

    // Subsequent shooting stars at random intervals (15-45 seconds)
    const interval = globalThis.setInterval(
      () => {
        if (Math.random() < 0.4) {
          createRandomShootingStar();
        }
      },
      8000 + Math.random() * 12000
    );

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      // Clear all tracked shooting star timeouts
      shootingStarTimeoutsRef.current.forEach((id) => clearTimeout(id));
      shootingStarTimeoutsRef.current = [];
    };
  }, [scheduleStarRemoval]);

  // Create shooting star at specific coordinates
  const createShootingStarAt = useCallback(
    (x: number, y: number) => {
      const now = Date.now();
      if (now - lastClickTime.current < 1000) return;
      lastClickTime.current = now;

      const newStar: ShootingStar = {
        id: shootingStarId.current++,
        startX: x,
        startY: y,
        angle: -45 + Math.random() * 90,
        length: 100 + Math.random() * 100,
        duration: 0.6 + Math.random() * 0.4,
      };

      setShootingStars((prev) => [...prev, newStar]);
      scheduleStarRemoval(newStar.id, newStar.duration * 1000 + 500);
    },
    [scheduleStarRemoval]
  );

  // Click handler for shooting stars
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      createShootingStarAt(x, y);
    },
    [createShootingStarAt]
  );

  // Keyboard handler - spawn at random position
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        // Spawn at random position within visible area
        const x = 20 + Math.random() * 60;
        const y = 20 + Math.random() * 60;
        createShootingStarAt(x, y);
      }
    },
    [createShootingStarAt]
  );

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000",
        overflow: "hidden",
        zIndex: -1,
        cursor: "crosshair",
      }}
    >
      {/* Twinkle animation keyframes */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      {/* Subtle gradient for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(10, 15, 30, 0.3) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            backgroundColor: `rgba(${starColors[star.colorIndex]}, ${star.opacity})`,
            boxShadow:
              star.size > 1.5
                ? `0 0 ${star.size * 2}px rgba(${starColors[star.colorIndex]}, ${star.opacity * 0.5})`
                : "none",
            animation: `twinkle ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite`,
            willChange: "opacity",
          }}
        />
      ))}

      {/* Shooting stars */}
      <AnimatePresence>
        {shootingStars.map((star) => (
          <motion.div
            key={star.id}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: Math.cos((star.angle * Math.PI) / 180) * star.length,
              y: Math.sin((star.angle * Math.PI) / 180) * star.length,
              opacity: 0,
              scale: 0.5,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: star.duration,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              left: `${star.startX}%`,
              top: `${star.startY}%`,
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              boxShadow: `
                0 0 4px 2px rgba(255, 255, 255, 0.8),
                0 0 8px 4px rgba(255, 255, 255, 0.4),
                ${Math.cos(((star.angle + 180) * Math.PI) / 180) * 30}px ${Math.sin(((star.angle + 180) * Math.PI) / 180) * 30}px 20px rgba(255, 255, 255, 0.3)
              `,
              pointerEvents: "none",
            }}
          >
            {/* Tail effect */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "60px",
                height: "2px",
                background:
                  "linear-gradient(to left, rgba(255,255,255,0.8), transparent)",
                transform: `rotate(${star.angle + 180}deg)`,
                transformOrigin: "left center",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
