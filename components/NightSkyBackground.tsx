"use client";

import { useState } from "react";

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

const starColors = [
  "255, 255, 255",
  "255, 250, 250",
  "255, 255, 240",
  "240, 248, 255",
  "255, 245, 238",
];

function generateStars(count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const sizeRandom = Math.random();
    let size: number;
    if (sizeRandom < 0.6)       size = 0.5 + Math.random() * 0.5;
    else if (sizeRandom < 0.85) size = 1   + Math.random() * 0.5;
    else if (sizeRandom < 0.95) size = 1.5 + Math.random() * 0.5;
    else                        size = 2   + Math.random() * 1;

    const opacityRandom = Math.random();
    let opacity: number;
    if (opacityRandom < 0.3)      opacity = 0.2 + Math.random() * 0.2;
    else if (opacityRandom < 0.7) opacity = 0.4 + Math.random() * 0.3;
    else                          opacity = 0.7 + Math.random() * 0.3;

    stars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size,
      opacity,
      twinkleDelay:    Math.random() * 5,
      twinkleDuration: 2 + Math.random() * 4,
      colorIndex: Math.floor(Math.random() * starColors.length),
    });
  }
  return stars;
}

export function NightSkyBackground() {
  const [stars] = useState<Star[]>(() => generateStars(200));

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000",
        overflow: "hidden",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @media (prefers-reduced-motion: reduce) {
          .night-sky-star { animation: none !important; }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(10, 15, 30, 0.3) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {stars.map((star) => (
        <div
          key={star.id}
          className="night-sky-star"
          style={{
            position:        "absolute",
            left:            `${star.x}%`,
            top:             `${star.y}%`,
            width:           `${star.size}px`,
            height:          `${star.size}px`,
            borderRadius:    "50%",
            backgroundColor: `rgba(${starColors[star.colorIndex]}, ${star.opacity})`,
            boxShadow:       star.size > 1.5
              ? `0 0 ${star.size * 2}px rgba(${starColors[star.colorIndex]}, ${star.opacity * 0.5})`
              : "none",
            animation: `twinkle ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite`,
            willChange: "opacity",
          }}
        />
      ))}
    </div>
  );
}