"use client";

/**
 * ShootingStarEffect Component
 * Creates shooting star effects on click events.
 * Client component - requires event handlers and animations.
 */

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  directionX: number;
  directionY: number;
}

export function ShootingStarEffect() {
  const [stars, setStars] = useState<Star[]>([]);
  const canClickRef = useRef(true);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeTimersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const handleClick = useCallback((e: MouseEvent) => {
    if (!canClickRef.current) return;

    // Random angle: between -45 and +45 degrees (downward direction)
    const angle = (Math.random() * 90 - 45) * (Math.PI / 180);
    const distance = 400;

    const newStar: Star = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      directionX: Math.sin(angle) * distance,
      directionY: Math.cos(angle) * distance,
    };

    setStars((prev) => [...prev, newStar]);
    canClickRef.current = false;

    // 1 second cooldown
    cooldownTimerRef.current = setTimeout(() => {
      canClickRef.current = true;
      cooldownTimerRef.current = null;
    }, 1000);

    // Remove star after 2 seconds
    const removeTimer = setTimeout(() => {
      setStars((prev) => prev.filter((star) => star.id !== newStar.id));
      removeTimersRef.current.delete(newStar.id);
    }, 2000);
    removeTimersRef.current.set(newStar.id, removeTimer);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    
    return () => {
      document.removeEventListener("click", handleClick);
      // Clear cooldown timer
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
      // Clear all remove timers
      removeTimersRef.current.forEach((timerId) => clearTimeout(timerId));
      removeTimersRef.current.clear();
    };
  }, [handleClick]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ x: star.x, y: star.y, opacity: 1, scale: 1 }}
            animate={{
              x: star.x + star.directionX,
              y: star.y + star.directionY,
              opacity: 0,
              scale: 0.5,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: "4px",
              height: "4px",
              background: "white",
              borderRadius: "50%",
              boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.8)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
