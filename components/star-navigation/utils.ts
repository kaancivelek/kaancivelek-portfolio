/**
 * Star Navigation Utilities
 * Helper functions for generating star geometry.
 */

import { Point } from "./types";
import { STAR_POINTS } from "./constants";

/**
 * Generates star polygon points (alternating outer and inner radius)
 */
export const generateStarPoints = (svgSize: number, outerRadius: number, innerRadius: number): Point[] => {
  const points: Point[] = [];
  const center = svgSize / 2;
  
  for (let i = 0; i < STAR_POINTS * 2; i++) {
    const angle = ((Math.PI * 2) / (STAR_POINTS * 2)) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    
    points.push({
      x: Math.cos(angle) * radius + center,
      y: Math.sin(angle) * radius + center,
    });
  }
  
  return points;
};

/**
 * Generates outer tip points of the star
 */
export const generateTipPoints = (svgSize: number, outerRadius: number): Point[] => {
  const center = svgSize / 2;
  return Array.from({ length: STAR_POINTS }, (_, i) => {
    const angle = ((2 * Math.PI) / STAR_POINTS) * i - Math.PI / 2;
    
    return {
      x: Math.cos(angle) * outerRadius + center,
      y: Math.sin(angle) * outerRadius + center,
    };
  });
};

/**
 * Calculates the end point of a line extending from a tip
 */
export const calculateLineEnd = (
  tip: Point,
  index: number,
  length: number
): Point => {
  const angle = ((2 * Math.PI) / STAR_POINTS) * index - Math.PI / 2;
  
  return {
    x: tip.x + Math.cos(angle) * length,
    y: tip.y + Math.sin(angle) * length,
  };
};
