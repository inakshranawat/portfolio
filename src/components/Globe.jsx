"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
const MOVEMENT_DAMPING = 1400;

// Zinc color palette (Tailwind: zinc-900, zinc-700, zinc-400, zinc-200, zinc-50)
const ZINC_COLORS = {
  // Deepest shadow/night
  dark: [0.10, 0.11, 0.13],      // #18181b (zinc-900)
  // Land (darker zinc)
  land: [0.20, 0.22, 0.25],      // #27272a (zinc-800)
  // Ocean (mid zinc)
  base: [0.36, 0.37, 0.40],      // #5b5b60 (zinc-600)
  // Ice/snow (light zinc)
  ice: [0.82, 0.83, 0.86],       // #d4d4d8 (zinc-300)
  // Marker highlight (keep yellow for contrast)
  marker: [0.98, 0.78, 0.08],    // yellow
  // Glow color (very light zinc/white)
  glow: [0.95, 0.96, 0.98],      // #f4f4f5 (zinc-100)
};

// Helper: realistic map color function for cobe, with dark color for night side
function realisticMapColor(lat, lon, { night = false } = {}) {
  if (night) {
    return ZINC_COLORS.dark;
  }
  // Polar regions = ice
  if (Math.abs(lat) > 70) {
    return ZINC_COLORS.ice;
  }
  // Fake some continents: rough approximation for demo
  // Africa/Europe/Asia
  if (
    (lat > -35 && lat < 60 && lon > -20 && lon < 120) ||
    // Americas
    (lat > -60 && lat < 70 && lon > -120 && lon < -30) ||
    // Australia
    (lat > -45 && lat < -10 && lon > 110 && lon < 155)
  ) {
    return ZINC_COLORS.land;
  }
  // Else, ocean
  return ZINC_COLORS.base;
}

// Helper: returns a function for cobe's mapColor that adds a dark/night side
function mapColorWithNight(phi) {
  return (lat, lon) => {
    const phiDeg = (phi * 180) / Math.PI;
    let lonNorm = ((lon - phiDeg + 540) % 360) - 180;
    if (Math.abs(lonNorm) > 90) {
      return ZINC_COLORS.dark;
    }
    return realisticMapColor(lat, lon);
  };
}

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0.8, // More shadow for zinc
  diffuse: 0.6, // More light diffusion for highlight
  mapSamples: 16000,
  mapBrightness: 1.15,
  baseColor: ZINC_COLORS.base,
  markerColor: ZINC_COLORS.marker,
  glowColor: ZINC_COLORS.glow,
  mapColor: realisticMapColor,
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export function Globe({ className, config = GLOBE_CONFIG }) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    let currentPhi = phi;
    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      // Use a mapColor function that adds a dark/night side
      mapColor: (lat, lon) => mapColorWithNight(currentPhi + rs.get())(lat, lon),
      baseColor: config.baseColor || ZINC_COLORS.base,
      markerColor: config.markerColor || ZINC_COLORS.marker,
      glowColor: config.glowColor || ZINC_COLORS.glow,
      dark: config.dark !== undefined ? config.dark : 0.8,
      diffuse: config.diffuse !== undefined ? config.diffuse : 0.6,
      mapBrightness: config.mapBrightness !== undefined ? config.mapBrightness : 1.15,
      onRender: (state) => {
        if (!pointerInteracting.current) currentPhi += 0.005;
        state.phi = currentPhi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => (canvasRef.current.style.opacity = "1"), 0);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div
      className={twMerge(
        // Shift the globe to the left using flex and justify-start
        "flex justify-start aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
    >
      <canvas
        className={twMerge(
          // Optionally, add a negative left margin for more shift if needed
          "size-[30rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size] -ml-8",
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
