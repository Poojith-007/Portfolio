import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Satellite } from 'lucide-react';

export const SatelliteBeam: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {theme === 'light' && (
          <motion.div
            key="satellite-beam"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Spotlight Cone 1 - Main Core */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-0 right-0 w-[150vw] h-[150vh]"
              style={{
                transformOrigin: 'top right',
                transform: 'rotate(25deg)',
                background: 'radial-gradient(circle at top right, rgba(200, 255, 255, 0.9) 0%, rgba(100, 255, 255, 0.15) 50%, transparent 80%)',
                clipPath: 'polygon(100% 0, 0% 100%, 60% 100%)'
              }}
            />
            {/* Spotlight Cone 2 - Wide Glow */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
              className="absolute top-0 right-0 w-[150vw] h-[150vh]"
              style={{
                transformOrigin: 'top right',
                transform: 'rotate(15deg)',
                background: 'linear-gradient(to bottom left, rgba(150, 200, 255, 0.4) 0%, rgba(50, 150, 255, 0.05) 50%, transparent 100%)',
                clipPath: 'polygon(100% 0, -20% 100%, 80% 100%)'
              }}
            />

            {/* The satellite icon */}
            <motion.div 
              initial={{ x: 100, y: -100, rotate: -45 }}
              animate={{ x: -20, y: 20, rotate: 0 }}
              exit={{ x: 100, y: -100, rotate: -45 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
              className="absolute top-0 right-0 p-4 drop-shadow-[0_0_30px_rgba(0,255,255,1)]"
            >
              <Satellite size={80} className="text-cyan-200" />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full blur-[15px]" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
