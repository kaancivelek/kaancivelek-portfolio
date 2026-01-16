"use client";

import React from "react";
import { motion } from "framer-motion";

interface CloseButtonProps {
  onClose: () => void;
  size?: number;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClose, size = 48 }) => {
  const iconSize = size * 0.4;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClose}
      aria-label="Close"
      style={{
        position: "fixed",
        top: 32,
        right: 32,
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "50%",
        cursor: "pointer",
        zIndex: 1001,
        backdropFilter: "blur(8px)",
      }}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L15 15M15 1L1 15"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
};
