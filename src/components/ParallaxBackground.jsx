import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ParallaxBackground = () => {
  // Track full-page scroll progress
  const { scrollYProgress } = useScroll();

  // Smooth scroll progress using a spring
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 100,
  });

  // Transform scroll into motion values
  const mountain3Y = useTransform(smoothProgress, [0, 0.5], ["0%", "70%"]);
  const planetsX    = useTransform(smoothProgress, [0, 0.5], ["0%", "-20%"]);
  const mountain2Y = useTransform(smoothProgress, [0, 0.5], ["0%", "30%"]);
  const mountain1Y = useTransform(smoothProgress, [0, 0.5], ["0%", "0%"]);

  return (
    <section className="absolute inset-0 bg-black/40">
      <div className="relative h-screen overflow-y-hidden">
        {/* Sky background */}
        <div
          className="absolute inset-0 -z-50 bg-cover bg-bottom"
          style={{ backgroundImage: "url(/assets/sky.jpg)" }}
        />

        {/* Parallax layers */}
        <motion.div
          className="absolute inset-0 -z-40 bg-cover bg-bottom"
          style={{ backgroundImage: "url(/assets/mountain-3.png)", y: mountain3Y }}
        />

        <motion.div
          className="absolute inset-0 -z-30 bg-cover bg-bottom"
          style={{ backgroundImage: "url(/assets/planets.png)", x: planetsX }}
        />

        <motion.div
          className="absolute inset-0 -z-20 bg-cover bg-bottom"
          style={{ backgroundImage: "url(/assets/mountain-2.png)", y: mountain2Y }}
        />

        <motion.div
          className="absolute inset-0 -z-10 bg-cover bg-bottom"
          style={{ backgroundImage: "url(/assets/mountain-1.png)", y: mountain1Y }}
        />
      </div>
    </section>
  );
};

export default ParallaxBackground;
