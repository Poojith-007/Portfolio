import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Satellite } from 'lucide-react';

const COLORS = ['#00ffff', '#ffa500', '#ffffff', '#87cefa', '#ffcc00'];

export const SatelliteBeam: React.FC = () => {
  const { theme } = useTheme();

  // Create an array of 30 rays with varying thicknesses, colors, angles, and pulse timings
  const rays = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    angle: -(30 + Math.random() * 40), // Angles between -30 and -70 degrees (down-left)
    length: 100 + Math.random() * 150, // Length in view width percentage
    thickness: 1 + Math.random() * 6, // Random thickness up to 7px
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 0.2 + Math.random() * 0.8,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 3,
  }));

  // Create fast-moving light particles shooting down the beam
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    angle: 35 + Math.random() * 20, // Tighter spray for particles
    size: 2 + Math.random() * 4,
    color: COLORS[Math.floor(Math.random() * 3)], // mostly cyan/orange/white
    delay: Math.random() * 5,
    duration: 1.5 + Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {theme === 'light' && (
          <motion.div
            key="satellite-beam-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="absolute inset-0 w-full h-full"
          >
            {/* The base wide glow (Blue/Cyan Core) */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 right-0 w-[200vw] h-[200vh]"
              style={{
                transformOrigin: 'top right',
                transform: 'rotate(45deg)',
                background: 'radial-gradient(circle at top right, rgba(150, 255, 255, 0.4) 0%, rgba(50, 200, 255, 0.1) 40%, transparent 70%)',
                clipPath: 'polygon(100% 0, 0% 100%, 70% 100%)'
              }}
            />

            {/* Render distinct multi-colored rays */}
            {rays.map(ray => (
              <motion.div
                key={`ray-${ray.id}`}
                className="absolute top-0 right-0"
                style={{
                  width: `${ray.length}vw`,
                  height: `${ray.thickness}px`,
                  backgroundColor: ray.color,
                  transformOrigin: 'top right',
                  transform: `rotate(${ray.angle}deg)`,
                  boxShadow: `0 0 ${ray.thickness * 4}px ${ray.color}`,
                  background: `linear-gradient(to left, ${ray.color}ff 0%, ${ray.color}00 100%)`
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: [0, 1, 1], 
                  opacity: [0, ray.opacity, ray.opacity * 0.3, ray.opacity] 
                }}
                transition={{
                  scaleX: { duration: 1.5, ease: "easeOut" },
                  opacity: {
                    duration: ray.duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: ray.delay,
                  }
                }}
              />
            ))}

            {/* Render shooting particles/sparks */}
            {particles.map(p => (
              <motion.div
                key={`particle-${p.id}`}
                className="absolute top-0 right-0 rounded-full"
                style={{
                  width: `${p.size * 5}px`, // elongated spark
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  boxShadow: `0 0 10px ${p.color}, 0 0 20px ${p.color}`,
                  transformOrigin: 'center'
                }}
                initial={{ right: '0%', top: '0%', opacity: 0 }}
                animate={{ 
                  right: [`${Math.cos(p.angle * Math.PI / 180) * 150}vw`],
                  top: [`${Math.sin(p.angle * Math.PI / 180) * 150}vw`],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: p.delay,
                }}
              />
            ))}

            {/* The Satellite / Dish Icon */}
            <motion.div 
              initial={{ x: 100, y: -100, rotate: -45 }}
              animate={{ x: -20, y: 20, rotate: 0 }}
              exit={{ x: 100, y: -100, rotate: -45 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
              className="absolute top-0 right-0 p-4"
            >
              {/* Core intense light embedded in satellite */}
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full blur-[20px] z-10" 
              />
              <motion.div 
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 rounded-full blur-[40px] z-0" 
              />
              
              <Satellite size={96} className="text-white relative z-20 drop-shadow-[0_0_15px_#ffffff]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
