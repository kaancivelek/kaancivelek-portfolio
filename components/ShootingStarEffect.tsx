"use client";

import { useEffect, useRef } from "react";

interface Trail {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export function ShootingStarEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailsRef = useRef<Trail[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // 🎬 canvas oluştur
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvasRef.current = canvas;

    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      pointerEvents: "none",
      zIndex: "9999",
    });

    document.body.appendChild(canvas);

    // 📐 resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ⭐ spawn logic (deterministic)
    const spawn = () => {
      const angle = (20 + Math.random() * 40) * (Math.PI / 180);
      const speed = 10 + Math.random() * 6;

      trailsRef.current.push({
        x: Math.random() * canvas.width * 0.7,
        y: Math.random() * canvas.height * 0.4,
        vx: Math.sin(angle) * speed,
        vy: Math.cos(angle) * speed,
        life: 0,
        maxLife: 30 + Math.random() * 20,
      });
    };

    // ⏱ spawn scheduler (interval yerine)
    let lastSpawn = 0;
    let spawnDelay = 2000 + Math.random() * 3000;

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 👁 visibility-aware spawn
      if (!document.hidden) {
        if (time - lastSpawn > spawnDelay) {
          spawn();
          lastSpawn = time;
          spawnDelay = 2000 + Math.random() * 4000;
        }
      } else {
        // sekme gizliyken birikmeyi sıfırla
        lastSpawn = time;
      }

      // ✨ trails render + cleanup (tek pass)
      trailsRef.current = trailsRef.current.filter((t) => {
        const progress = t.life / t.maxLife;
        const alpha = 1 - progress;

        const tailLength = 60;

        const tx = t.x - t.vx * tailLength;
        const ty = t.y - t.vy * tailLength;

        const gradient = ctx.createLinearGradient(t.x, t.y, tx, ty);
        gradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.8;     // 🎯 ince çizgi
        ctx.lineCap = "round";   // 🎯 yumuşak uç

        ctx.beginPath();
        ctx.moveTo(t.x, t.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        // hareket
        t.x += t.vx;
        t.y += t.vy;
        t.life++;

        return t.life <= t.maxLife;
      });

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    // 👁 sekme geri gelince burst önleme
    const onVisibility = () => {
      if (!document.hidden) {
        lastSpawn = performance.now();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    // 🧹 cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.remove();
    };
  }, []);

  return null;
}