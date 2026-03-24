import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const SatelliteBeam: React.FC = () => {
  const { theme } = useTheme();
  const [beams, setBeams] = useState<number[]>([]);

  useEffect(() => {
    if (theme === 'light') {
      const id = Date.now();
      setBeams(prev => [...prev, id]);
      
      setTimeout(() => {
        setBeams(prev => prev.filter(b => b !== id));
      }, 2000);
    }
  }, [theme]);

  // Use a fixed overlay that ignores pointer events
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {beams.map(id => (
          <motion.div
            key={id}
            initial={{ top: '-10%', left: '-50%', opacity: 0 }}
            animate={{ top: '110%', left: '150%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute w-[200vw] h-[6px] bg-white shadow-[0_0_80px_20px_#ffffff,0_0_30px_5px_#00ffff]"
            style={{ transform: 'rotate(-35deg)', transformOrigin: 'center' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
