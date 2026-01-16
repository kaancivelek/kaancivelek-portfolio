import React from "react";
import { motion } from "framer-motion";
import { Point } from "./types";
import { calculateLineEnd } from "./utils";
import { TIP_LINE_BASE_LENGTH, TIP_LINE_ACTIVE_LENGTH } from "./constants";

interface TipLineProps {
  tip: Point;
  index: number;
  isActive: boolean;
  svgSize: number;
}

export const TipLine: React.FC<TipLineProps> = ({ tip, index, isActive, svgSize }) => {
  // Çizgi uzunluğunu SVG boyutuna göre ölçeklendir
  const scale = svgSize / 300;
  const length = isActive 
    ? TIP_LINE_ACTIVE_LENGTH * scale 
    : TIP_LINE_BASE_LENGTH * scale;
  const endPoint = calculateLineEnd(tip, index, length);
  const gradientId = `lineGradient-${index}`;
  const strokeWidth = scale * 1.5;

  return (
    <>
      <defs>
        <linearGradient 
          id={gradientId} 
          x1={tip.x} 
          y1={tip.y} 
          x2={endPoint.x} 
          y2={endPoint.y}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#fff" stopOpacity={isActive ? 0.9 : 0.6} />
          <stop offset="100%" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.line
        x1={tip.x}
        y1={tip.y}
        x2={endPoint.x}
        y2={endPoint.y}
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ opacity: 1 }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          filter: isActive 
            ? "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))" 
            : "none",
        }}
      />
    </>
  );
};
