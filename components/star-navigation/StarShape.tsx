import React from "react";
import { Point } from "./types";

interface StarShapeProps {
  points: Point[];
  svgSize: number;
}

export const StarShape: React.FC<StarShapeProps> = ({ points, svgSize }) => {
  // Responsive stroke width: base 300px için 2px
  const strokeWidth = (svgSize / 300) * 2;
  
  return (
    <polygon
      points={points.map((p) => `${p.x},${p.y}`).join(" ")}
      fill="none"
      stroke="#fff"
      strokeWidth={strokeWidth}
      style={{ 
        filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))" 
      }}
    />
  );
};
