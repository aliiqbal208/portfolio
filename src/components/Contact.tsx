"use client";

import { useRef, useMemo, useState, useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { Mail, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import content from "@/lib/content";
import { openCalendlyPopup } from "@/lib/calendly";

const { contact } = content;

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

/* ── Instanced dot field — all dots in a single draw call ── */
function DotField({ positions }: { positions: THREE.Vector3[] }) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    positions.forEach((p, i) => {
      m.setPosition(p);
      mesh.setMatrixAt(i, m);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [positions]);

  return (
    <instancedMesh key={positions.length} ref={ref} args={[undefined, undefined, positions.length]}>
      <sphereGeometry args={[0.012, 6, 6]} />
      <meshBasicMaterial color="#0888ae" transparent opacity={0.55} />
    </instancedMesh>
  );
}

/* ── Bright dot traveling along a connection arc ── */
function ArcPulse({ points, offset }: { points: THREE.Vector3[]; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * 0.15 + offset) % 1;
    const idx = t * (points.length - 1);
    const i = Math.floor(idx);
    const next = points[Math.min(i + 1, points.length - 1)];
    ref.current.position.lerpVectors(points[i], next, idx - i);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.022, 8, 8]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.9} />
    </mesh>
  );
}

/* ── Dots on sphere surface ── */
function DotGlobe({ radius = 1.85 }: { radius?: number }) {
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

  /* great-circle connection arcs from Lahore to cities */
  const connectionArcs = useMemo(() => {
    const start = latLngToVec3(LAHORE.lat, LAHORE.lng, 1).normalize();
    return CITIES.map((t) => {
      const end = latLngToVec3(t.lat, t.lng, 1).normalize();
      const pts: THREE.Vector3[] = [];
      const flat: number[] = [];
      const steps = 60;
      for (let s = 0; s <= steps; s++) {
        const frac = s / steps;
        const arcHeight = 0.35 * Math.sin(frac * Math.PI);
        const v = new THREE.Vector3()
          .lerpVectors(start, end, frac)
          .normalize()
          .multiplyScalar(radius + arcHeight);
        pts.push(v);
        flat.push(v.x, v.y, v.z);
      }
      return { pts, flat: new Float32Array(flat) };
    });
  }, [radius]);

  /* city endpoint positions (dots at arc ends) */
  const cityPositions = useMemo(
    () => CITIES.map((c) => latLngToVec3(c.lat, c.lng, radius + 0.02)),
    [radius]
  );

  const lahorePos = useMemo(() => latLngToVec3(LAHORE.lat, LAHORE.lng, radius + 0.02), [radius]);
  const lahoreLabelPos = useMemo(() => latLngToVec3(LAHORE.lat, LAHORE.lng, radius + 0.14), [radius]);

  /* orient pulse rings tangent to the sphere surface at Lahore */
  const lahoreQuat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), lahorePos.clone().normalize()),
    [lahorePos]
  );

  /* radar pulse — rings grow while fading out, phases offset */
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const animate = (mesh: THREE.Mesh | null, phase: number) => {
      if (!mesh) return;
      const p = (t * 0.45 + phase) % 1;
      const s = 1 + p * 1.8;
      mesh.scale.set(s, s, s);
      (mesh.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - p);
    };
    animate(ringRef.current, 0);
    animate(ring2Ref.current, 0.5);
  });

  const cityDotGeo = useMemo(() => new THREE.SphereGeometry(0.025, 12, 12), []);
  const cityDotMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#ff5722", transparent: true, opacity: 0.9 }), []);

  /* Rotate globe so Lahore faces camera */
  const yRot = useMemo(() => lngToYRotation(LAHORE.lng), []);

  return (
    <group rotation={[0.15, yRot, 0]}>
      {/* Dark core sphere */}
      <Sphere args={[radius - 0.03, 64, 64]}>
        <meshStandardMaterial color="#070d1a" roughness={0.9} metalness={0.1} />
      </Sphere>

      {/* Dot field */}
      <DotField positions={dots} />

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
      {connectionArcs.map((arc, i) => (
        <line key={`conn-${i}`}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[arc.flat, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#00d4ff" transparent opacity={0.3} />
        </line>
      ))}

      {/* Pulses traveling along the arcs */}
      {connectionArcs.map((arc, i) => (
        <ArcPulse key={`pulse-${i}`} points={arc.pts} offset={i * 0.2} />
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

      {/* Lahore pulse ring 1 */}
      <mesh position={lahorePos} quaternion={lahoreQuat} ref={ringRef}>
        <ringGeometry args={[0.07, 0.1, 32]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>

      {/* Lahore pulse ring 2 (outer, offset timing) */}
      <mesh position={lahorePos} quaternion={lahoreQuat} ref={ring2Ref}>
        <ringGeometry args={[0.09, 0.11, 32]} />
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
  const globeWrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [interacting, setInteracting] = useState(false);

  /* only render frames while the globe is on screen */
  useEffect(() => {
    const el = globeWrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
            <h2 className="font-bebas text-white mb-6 uppercase leading-[0.85]">
              <span className="block text-6xl md:text-8xl tracking-tight">{contact.heading.line1}</span>
              <span className="mt-2 inline-block bg-primary text-navy text-5xl md:text-7xl px-4 pb-1 tracking-tight">
                {contact.heading.line2}
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-inter mb-10 max-w-md leading-relaxed mt-8">
              {contact.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <a
                href={contact.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openCalendlyPopup(contact.calendlyUrl).then((ok) => {
                    if (!ok) window.open(contact.calendlyUrl, "_blank", "noopener,noreferrer");
                  });
                }}
                className="group inline-flex items-center justify-center gap-2 bg-primary text-navy font-orbitron font-bold text-xs md:text-sm uppercase tracking-[0.15em] px-6 py-4 border-2 border-primary shadow-[6px_6px_0_0_rgba(255,255,255,0.9)] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_rgba(255,255,255,0.9)]"
              >
                <Calendar className="w-4 h-4" />
                {contact.calendlyLabel}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="group inline-flex items-center justify-center gap-2 bg-transparent text-white font-orbitron font-bold text-xs md:text-sm uppercase tracking-[0.15em] px-6 py-4 border-2 border-white shadow-[6px_6px_0_0_rgba(14,165,199,0.9)] transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_rgba(14,165,199,0.9)]"
              >
                <Mail className="w-4 h-4" />
                Email Me
              </a>
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
              <div ref={globeWrapRef} className="w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center relative">
                {webgl ? (
                  <Canvas
                    camera={{ position: [0, 0.5, 4.8], fov: 45 }}
                    dpr={[1, 1.5]}
                    frameloop={inView ? "always" : "never"}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <DotGlobe />
                    <OrbitControls
                      enableZoom={false}
                      enablePan={false}
                      rotateSpeed={0.5}
                      autoRotate={!interacting}
                      autoRotateSpeed={0.4}
                      onStart={() => setInteracting(true)}
                      onEnd={() => setInteracting(false)}
                    />
                  </Canvas>
                ) : (
                  <GlobeFallback />
                )}
                <div className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none">
                  <div className="px-4 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-[8px] font-orbitron text-white/50 tracking-widest uppercase">
                    {contact.globe.dragHint}
                  </div>
                </div>
              </div>
              <div className="absolute top-8 left-8 flex flex-col gap-1">
                <span className="text-[10px] font-orbitron text-primary uppercase tracking-widest">{contact.globe.locationLabel}</span>
                <span className="text-sm text-white font-bebas tracking-wider">{contact.globe.location}</span>
              </div>
              <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1">
                <span className="text-[10px] font-orbitron text-secondary uppercase tracking-widest">{contact.globe.availabilityLabel}</span>
                <span className="text-sm text-white font-bebas tracking-wider">{contact.globe.availability}</span>
              </div>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary/30 rounded-br-3xl" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl hidden md:block animate-bounce-slow">
              <p className="text-[10px] font-orbitron text-muted-foreground uppercase tracking-widest mb-1">{contact.globe.timezoneLabel}</p>
              <p className="text-2xl font-bebas text-white tracking-widest">{contact.globe.timezone}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
