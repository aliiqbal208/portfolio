"use client";

import { useRef, useMemo, useSyncExternalStore } from "react";
import { Mail, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

/* ── WebGL availability check (hydration-safe) ── */
let webglResult: boolean | null = null;
function checkWebGL() {
  if (webglResult !== null) return webglResult;
  try {
    const c = document.createElement("canvas");
    webglResult = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { webglResult = false; }
  return webglResult;
}
const subscribe = (cb: () => void) => { cb(); return () => {}; };
function useWebGL() {
  return useSyncExternalStore(subscribe, checkWebGL, () => false);
}

/* ── Globe fallback (no WebGL) ── */
function GlobeFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center space-y-2">
        <p className="text-4xl">🌍</p>
        <p className="text-xs text-white/30 font-orbitron tracking-wider">Lahore, Pakistan</p>
      </div>
    </div>
  );
}

/* ── helpers ── */
function latLngToVec3(lat: number, lng: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

/* ── Globe Y-rotation so a given longitude faces +Z (camera) ── */
function lngToYRotation(lng: number) {
  // latLngToVec3 places lng=0 at a specific theta; we compute Lahore's
  // position then work out the Y rotation that brings it to face +Z.
  const p = latLngToVec3(0, lng, 1); // on equator for cleaner angle
  const angle = Math.atan2(p.x, p.z); // current angle from +Z
  return -angle; // negate to rotate it TO +Z
}

/* ── City targets for connection arcs ── */
const CITIES: { name: string; lat: number; lng: number }[] = [
  { name: "New York", lat: 40.7, lng: -74.0 },
  { name: "London", lat: 51.5, lng: -0.1 },
  { name: "Tokyo", lat: 35.7, lng: 139.7 },
  { name: "Singapore", lat: 1.3, lng: 103.8 },
  { name: "Sydney", lat: -33.9, lng: 151.2 },
];

const LAHORE = { lat: 31.5, lng: 74.3 };

/* ── Atmosphere glow shell ── */
function Atmosphere() {
  const mat = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main(){
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }`,
      fragmentShader: `
        varying vec3 vNormal;
        void main(){
          float intensity = pow(0.62 - dot(vNormal, vec3(0.0,0.0,1.0)), 2.5);
          gl_FragColor = vec4(0.035, 0.537, 0.682, 1.0) * intensity * 1.4;
        }`,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
  }, []);
  return (
    <mesh material={mat}>
      <sphereGeometry args={[2.08, 64, 64]} />
    </mesh>
  );
}

/* ── Dots on sphere surface ── */
function DotGlobe({ radius = 1.85 }: { radius?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  /* fibonacci dot distribution */
  const dots = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const count = 2400;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const hash = Math.abs(Math.sin(i * 127.1 + 311.7) * 43758.5453) % 1;
      if (hash < 0.4) positions.push(new THREE.Vector3(x, y, z));
    }
    return positions;
  }, [radius]);

  /* lat/lng grid arcs */
  const arcs = useMemo(() => {
    const lines: Float32Array[] = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts: number[] = [];
      for (let lng = 0; lng <= 360; lng += 3) {
        const v = latLngToVec3(lat, lng, radius + 0.01);
        pts.push(v.x, v.y, v.z);
      }
      lines.push(new Float32Array(pts));
    }
    for (let lng = 0; lng < 360; lng += 30) {
      const pts: number[] = [];
      for (let lat = -90; lat <= 90; lat += 3) {
        const v = latLngToVec3(lat, lng, radius + 0.01);
        pts.push(v.x, v.y, v.z);
      }
      lines.push(new Float32Array(pts));
    }
    return lines;
  }, [radius]);

  /* connection arcs from Lahore to cities */
  const connectionArcs = useMemo(() => {
    return CITIES.map((t) => {
      const pts: number[] = [];
      const steps = 60;
      for (let s = 0; s <= steps; s++) {
        const frac = s / steps;
        const lat = LAHORE.lat + (t.lat - LAHORE.lat) * frac;
        const lng = LAHORE.lng + (t.lng - LAHORE.lng) * frac;
        const arcHeight = 0.35 * Math.sin(frac * Math.PI);
        const v = latLngToVec3(lat, lng, radius + arcHeight);
        pts.push(v.x, v.y, v.z);
      }
      return new Float32Array(pts);
    });
  }, [radius]);

  /* city endpoint positions (dots at arc ends) */
  const cityPositions = useMemo(
    () => CITIES.map((c) => latLngToVec3(c.lat, c.lng, radius + 0.02)),
    [radius]
  );

  const lahorePos = useMemo(() => latLngToVec3(LAHORE.lat, LAHORE.lng, radius + 0.02), [radius]);
  const lahoreLabelPos = useMemo(() => latLngToVec3(LAHORE.lat, LAHORE.lng, radius + 0.14), [radius]);

  useFrame(() => {
    if (ringRef.current) {
      const s = 1 + 0.35 * Math.sin(Date.now() * 0.003);
      ringRef.current.scale.set(s, s, s);
    }
    if (ring2Ref.current) {
      const s = 1 + 0.5 * Math.sin(Date.now() * 0.002 + 1);
      ring2Ref.current.scale.set(s, s, s);
    }
  });

  const dotGeo = useMemo(() => new THREE.SphereGeometry(0.012, 6, 6), []);
  const dotMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#0888ae", transparent: true, opacity: 0.55 }), []);
  const cityDotGeo = useMemo(() => new THREE.SphereGeometry(0.025, 12, 12), []);
  const cityDotMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#ff5722", transparent: true, opacity: 0.9 }), []);

  /* Rotate globe so Lahore faces camera */
  const yRot = useMemo(() => lngToYRotation(LAHORE.lng), []);

  return (
    <group ref={groupRef} rotation={[0.15, yRot, 0]}>
      {/* Dark core sphere */}
      <Sphere args={[radius - 0.03, 64, 64]}>
        <meshStandardMaterial color="#070d1a" roughness={0.9} metalness={0.1} />
      </Sphere>

      {/* Dot field */}
      {dots.map((pos, i) => (
        <mesh key={i} position={pos} geometry={dotGeo} material={dotMat} />
      ))}

      {/* Grid arcs */}
      {arcs.map((arr, i) => (
        <line key={`arc-${i}`}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[arr, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#0888ae" transparent opacity={0.07} />
        </line>
      ))}

      {/* Connection arcs */}
      {connectionArcs.map((arr, i) => (
        <line key={`conn-${i}`}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[arr, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#00d4ff" transparent opacity={0.3} />
        </line>
      ))}

      {/* City endpoint dots */}
      {cityPositions.map((pos, i) => (
        <mesh key={`city-${i}`} position={pos} geometry={cityDotGeo} material={cityDotMat} />
      ))}

      {/* Lahore marker dot */}
      <mesh position={lahorePos}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#00d4ff" />
      </mesh>

      {/* Lahore glow */}
      <pointLight position={lahorePos} color="#00d4ff" intensity={1.5} distance={0.6} />

      {/* Lahore pulse ring 1 */}
      <mesh position={lahorePos} ref={ringRef}>
        <ringGeometry args={[0.07, 0.1, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>

      {/* Lahore pulse ring 2 (outer, offset timing) */}
      <mesh position={lahorePos} ref={ring2Ref}>
        <ringGeometry args={[0.11, 0.13, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Lahore HTML label (always faces camera) */}
      <Html position={lahoreLabelPos} center distanceFactor={5} style={{ pointerEvents: "none" }}>
        <div className="flex flex-col items-center gap-0.5 select-none">
          <span className="text-[9px] font-orbitron font-bold tracking-[0.25em] text-[#00d4ff] uppercase drop-shadow-[0_0_6px_rgba(0,212,255,0.6)]">
            Lahore
          </span>
          <span className="text-[7px] font-orbitron tracking-widest text-white/50 uppercase">
            31.5°N 74.3°E
          </span>
        </div>
      </Html>

      <Atmosphere />

      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} color="#0888ae" />
      <pointLight position={[-4, -2, -4]} intensity={0.3} color="#00d4ff" />
    </group>
  );
}

export default function Contact() {
  const webgl = useWebGL();

  return (
    <section id="contact" className="relative py-20 px-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-7xl md:text-9xl font-bebas text-white mb-6 uppercase leading-none">
              Let&apos;s <br />
              <span className="text-primary italic relative">
                Collaborate
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-primary/30 -skew-x-12" />
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-inter mb-12 max-w-md leading-relaxed mt-10">
              Ready to architect the next big thing? Whether it&apos;s AI, Scalable Ecosystems, or high-performance web solutions, let&apos;s build the future together.
            </p>

            <div className="flex flex-col gap-6">
              <a href="mailto:codewithmuhammadali@gmail.com" className="group flex items-center gap-4 text-white font-orbitron text-lg transition-all hover:pl-2">
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span className="border-b border-white/10 pb-1 group-hover:border-primary/50">codewithmuhammadali@gmail.com</span>
              </a>
              <button className="group flex items-center gap-4 text-white font-orbitron text-lg transition-all hover:pl-2">
                <div className="w-12 h-12 rounded-full border border-secondary/30 flex items-center justify-center group-hover:border-secondary group-hover:bg-secondary/10 transition-colors">
                  <Calendar className="w-5 h-5 text-secondary" />
                </div>
                <span className="border-b border-white/10 pb-1 group-hover:border-secondary/50">Schedule Call</span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { name: "GitHub", url: "https://github.com/aliiqbal208" },
                { name: "LinkedIn", url: "https://www.linkedin.com/in/aliiqbal208/" },
                { name: "X", url: "https://x.com/aliiqbal208" },
                { name: "Instagram", url: "https://www.instagram.com/aliiqbal208/" },
                { name: "Discord", url: "https://discord.com/users/aliiqbal208" },
              ].map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs font-orbitron text-muted-foreground hover:text-primary border border-white/10 hover:border-primary/30 px-3 py-2 rounded-full transition-all duration-300 uppercase tracking-widest">
                  {s.name}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="aspect-square glass-dark rounded-3xl relative flex items-center justify-center p-8 overflow-hidden border border-white/10 group cursor-grab active:cursor-grabbing backdrop-blur-3xl">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center relative">
                {webgl ? (
                  <Canvas
                    camera={{ position: [0, 0.5, 4.8], fov: 45 }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <DotGlobe />
                    <OrbitControls
                      enableZoom={false}
                      enablePan={false}
                      rotateSpeed={0.5}
                      autoRotate={false}
                    />
                  </Canvas>
                ) : (
                  <GlobeFallback />
                )}
                <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
                  <div className="px-4 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[8px] font-orbitron text-white/50 tracking-widest uppercase">
                    Drag to Reorient
                  </div>
                </div>
              </div>
              <div className="absolute top-8 left-8 flex flex-col gap-1">
                <span className="text-[10px] font-orbitron text-primary uppercase tracking-widest">Location</span>
                <span className="text-sm text-white font-bebas tracking-wider">Lahore, Pakistan</span>
              </div>
              <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1">
                <span className="text-[10px] font-orbitron text-secondary uppercase tracking-widest">Availability</span>
                <span className="text-sm text-white font-bebas tracking-wider">Open for Projects</span>
              </div>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary/30 rounded-br-3xl" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl hidden md:block animate-bounce-slow">
              <p className="text-[10px] font-orbitron text-muted-foreground uppercase tracking-widest mb-1">Global Time</p>
              <p className="text-2xl font-bebas text-white tracking-widest">GMT +5:00</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
