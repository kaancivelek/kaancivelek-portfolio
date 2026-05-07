"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import styles from "./OrbitalSystem.module.css";

const PLANET_COLORS = [
  0xa9a9a9, 0xc1440e, 0xe8cda0, 0x7de8e8, 0xc88b3a, 0xe4d191, 0x4b70dd,
  0xb5b5b5, 0xa3c96e, 0xd47de8, 0xe87d7d, 0x7de8b0,
];

// Gezegen başına material fine-tuning: [roughness, metalness]
const PLANET_MATERIAL: [number, number][] = [
  [0.6, 0.1],
  [0.9, 0],
  [0.7, 0.05],
  [0.5, 0.3],
  [0.8, 0],
  [0.6, 0.05],
  [0.4, 0.2],
  [0.95, 0],
  [0.75, 0.1],
  [0.5, 0.15],
  [0.85, 0],
  [0.6, 0.1],
];

const BASE_ORBIT_R = 5;
const ORBIT_STEP = 3.5;
const BASE_SPEED = 0.9;
const SPEED_DECAY = 0.82;

// Procedural soft-circle texture for stars & glow sprites
function makeCircleTexture(size = 64): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const r = size / 2;
  const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.6)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function makeGlowTexture(color: string, size = 128): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const r = size / 2;
  const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
  grad.addColorStop(0, `${color}ff`);
  grad.addColorStop(0.3, `${color}88`);
  grad.addColorStop(0.7, `${color}22`);
  grad.addColorStop(1, `${color}00`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

interface PlanetMesh {
  mesh: THREE.Mesh;
  project: Project;
  angle: number;
  orbitR: number;
  speed: number;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  year: number;
  description?: string;
  tags?: string[];
  status?: string;
  featured?: boolean;
}

interface Spherical {
  theta: number;
  phi: number;
  r: number;
}

interface HoverState {
  project: Project;
  screenX: number;
  screenY: number;
}

interface OrbitalSystemProps {
  projects: Project[];
}

export default function OrbitalSystem({
  projects,
}: Readonly<OrbitalSystemProps>) {
  const router = useRouter();
  const mountRef = useRef<HTMLDivElement>(null);
  const meshesRef = useRef<PlanetMesh[]>([]);

  const [hover, setHover] = useState<HoverState | null>(null);

  const speedRef = useRef(1);
  const pausedRef = useRef(false);

  const handlePlanetClick = useCallback(
    (project: Project) => {
      router.push(`/projects/${project.slug}`);
    },
    [router],
  );

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || projects.length === 0) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // ── Renkli yıldızlar ───────────────────────────────────────────────────
    const starCount = 2000;
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starColor = new THREE.Color();
    const starTemps = [0xfff4e8, 0xffffff, 0xc8d8ff]; // sıcak / nötr / soğuk

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 200;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 200;
      starColor.setHex(starTemps[Math.floor(Math.random() * 3)]);
      starColors[i * 3] = starColor.r;
      starColors[i * 3 + 1] = starColor.g;
      starColors[i * 3 + 2] = starColor.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const circleTex = makeCircleTexture(64);
    scene.add(
      new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({
          size: 0.18,
          sizeAttenuation: true,
          vertexColors: true,
          map: circleTex,
          alphaMap: circleTex,
          transparent: true,
          depthWrite: false,
        }),
      ),
    );

    // ── Camera ────────────────────────────────────────────────────────────
    const isPortrait = window.innerHeight > window.innerWidth;
    const totalSpread =
      BASE_ORBIT_R + ORBIT_STEP * (projects.length ?? 1) * (isPortrait ? 3.5 : 1);
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);

    camera.position.set(0, totalSpread * 0.6, totalSpread * 0.9);
    camera.lookAt(0, 0, 0);
    console.log(totalSpread);

    // ── Renderer + tone mapping ───────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 4;
    mount.appendChild(renderer.domElement);

    // ── Lighting ──────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x21214a, 1.5)); // soğuk space ambient
    const sunLight = new THREE.PointLight(0xfffbe0, 15, 350);
    scene.add(sunLight);

    // ── Sun ───────────────────────────────────────────────────────────────
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(2, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0xffd060 }),
    );
    scene.add(sun);

    // Sprite glow katmanları (sahte bloom)
    const glowTex = makeGlowTexture("#ff9000");
    const glowSizes = [12, 20, 32];
    const glowOpacities = [0.35, 0.18, 0.08];
    glowSizes.forEach((s, i) => {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTex,
          color: 0xff8800,
          transparent: true,
          opacity: glowOpacities[i],
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      sprite.scale.setScalar(s);
      scene.add(sprite); // güneş origin'de sabit
    });

    // ── Planets ───────────────────────────────────────────────────────────
    const planetMeshes: PlanetMesh[] = [];

    projects.forEach((project, i) => {
      const orbitR = BASE_ORBIT_R + ORBIT_STEP * i;
      const speed = BASE_SPEED * Math.pow(SPEED_DECAY, i);
      const color = PLANET_COLORS[i % PLANET_COLORS.length];
      const radius = project.featured ? 0.65 : 0.38;
      const [roughness, metalness] =
        PLANET_MATERIAL[i % PLANET_MATERIAL.length];

      const orbit = new THREE.Mesh(
        new THREE.RingGeometry(orbitR - 0.015, orbitR + 0.015, 128),
        new THREE.MeshBasicMaterial({
          color: 0x334466,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.4,
        }),
      );
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);

      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 64, 64), // 32 → 64
        new THREE.MeshStandardMaterial({ color, roughness, metalness }),
      );
      mesh.userData = { projectId: project.id };
      scene.add(mesh);

      if (project.featured) {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(radius * 1.4, radius * 2, 64),
          new THREE.MeshBasicMaterial({
            color: 0xffd060,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3,
          }),
        );
        ring.rotation.x = Math.PI / 2.5;
        mesh.add(ring);
      }

      planetMeshes.push({
        mesh,
        project,
        angle: Math.random() * Math.PI * 2,
        orbitR,
        speed,
      });
    });

    meshesRef.current = planetMeshes;

    // ── Raycaster ─────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const projectMap = new Map(planetMeshes.map((p) => [p.mesh.uuid, p]));
    const meshList = planetMeshes.map((p) => p.mesh);

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = ((e.clientY - rect.top) / rect.height) * -2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(meshList);
      if (hits.length > 0) {
        const hit = projectMap.get(hits[0].object.uuid);
        if (hit) {
          mount.style.cursor = "pointer";
          setHover({
            project: hit.project,
            screenX: e.clientX,
            screenY: e.clientY,
          });
          return;
        }
      }
      mount.style.cursor = "grab";
      setHover(null);
    };

    const onClick = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = ((e.clientY - rect.top) / rect.height) * -2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(meshList);
      if (hits.length > 0) {
        const hit = projectMap.get(hits[0].object.uuid);
        if (hit) handlePlanetClick(hit.project);
      }
    };

    mount.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("click", onClick);

    // ── Orbit controls ────────────────────────────────────────────────────
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const spherical: Spherical = {
      theta: 0,
      phi: Math.PI / 4,
      r: totalSpread * 1.4,
    };

    const toCart = (s: Spherical) => ({
      x: s.r * Math.sin(s.phi) * Math.sin(s.theta),
      y: s.r * Math.cos(s.phi),
      z: s.r * Math.sin(s.phi) * Math.cos(s.theta),
    });

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging = false;
    };
    const onDrag = (e: MouseEvent) => {
      if (!isDragging) return;
      spherical.theta -= (e.clientX - prevMouse.x) * 0.005;
      spherical.phi = Math.max(
        0.1,
        Math.min(
          Math.PI / 2.1,
          spherical.phi - (e.clientY - prevMouse.y) * 0.005,
        ),
      );
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onWheel = (e: WheelEvent) => {
      spherical.r = Math.max(
        10,
        Math.min(
          (totalSpread / projects.length) * 9,
          spherical.r + e.deltaY * 0.08,
        ),
      );
      e.preventDefault();
    };

    mount.addEventListener("mousedown", onMouseDown);
    globalThis.addEventListener("mouseup", onMouseUp);
    mount.addEventListener("mousemove", onDrag);
    mount.addEventListener("wheel", onWheel, { passive: false });

    // ── Animation loop ────────────────────────────────────────────────────
    let frameId: number;
    let last = performance.now();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;

      if (!pausedRef.current) {
        planetMeshes.forEach((p) => {
          p.angle += p.speed * speedRef.current * dt * 0.3;
          p.mesh.position.set(
            p.orbitR * Math.cos(p.angle),
            0,
            p.orbitR * Math.sin(p.angle),
          );
          p.mesh.rotation.y += dt * 0.35;
        });
        sun.rotation.y += dt * 0.05;
      }

      const pos = toCart(spherical);
      camera.position.set(pos.x, pos.y, pos.z);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    globalThis.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      globalThis.removeEventListener("resize", onResize);
      globalThis.removeEventListener("mouseup", onMouseUp);
      mount.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("mousemove", onDrag);
      mount.removeEventListener("mousedown", onMouseDown);
      mount.removeEventListener("click", onClick);
      mount.removeEventListener("wheel", onWheel);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [projects, handlePlanetClick]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.title}>Projects</span>
          <span className={styles.subtitle}>
            {projects.length} projects · click the planets
          </span>
        </div>
        <div className={styles.headerRight}>
          {hover && (
            <span className={styles.hoveredLabel}>{hover.project.title}</span>
          )}
          <button
            className={styles.closeBtn}
            onClick={() => router.push("/")}
            aria-label="Ana sayfaya dön"
            title="Ana sayfaya dön"
          >
            ✕
          </button>
        </div>
      </header>
      <div ref={mountRef} className={styles.canvas} />

      {hover && (
        <div
          className={styles.projectCard}
          style={{ left: hover.screenX, top: hover.screenY }}
        >
          <p className={styles.cardTitle}>{hover.project.title}</p>
          <p className={styles.cardDesc}>{hover.project.description}</p>
          {hover.project.tags && hover.project.tags.length > 0 && (
            <div className={styles.cardTags}>
              {hover.project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.cardTag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className={styles.cardYear}>{hover.project.year}</p>
          <p className={styles.cardCta}>click → go to project</p>
        </div>
      )}

      <div className={styles.bottomBar}>
        <div className={styles.legend}>
          {projects.map((project, i) => (
            <button
              key={project.id}
              className={styles.legendItem}
              onClick={() => router.push(`/projects/${project.slug}`)}
              title={project.title}
            >
              <span
                className={styles.legendDot}
                style={{
                  background: `#${PLANET_COLORS[i % PLANET_COLORS.length].toString(16).padStart(6, "0")}`,
                }}
              />
              <span className={styles.legendName}>{project.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
