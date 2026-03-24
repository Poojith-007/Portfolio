import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useGravity } from '../context/GravityContext';
import { Moon, Sun, Orbit, PowerOff } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { gravityEnabled, toggleGravity } = useGravity();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md bg-black/20 border-b border-white/10"
    >
      <div className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        POOJITH
      </div>
      
      <div className="flex items-center gap-6">
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
          <li className="hover:text-cyan-400 transition-colors cursor-pointer">Projects</li>
          <li className="hover:text-purple-400 transition-colors cursor-pointer">Skills</li>
          <li className="hover:text-cyan-400 transition-colors cursor-pointer">About</li>
          <li className="hover:text-purple-400 transition-colors cursor-pointer">Contact</li>
        </ul>
        
        <div className="flex items-center gap-4 border-l border-white/20 pl-6">
          <button 
            onClick={toggleGravity}
            className={`p-2 rounded-full transition-all duration-300 ${gravityEnabled ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.3)]' : 'bg-red-500/20 text-red-400'}`}
            title="Toggle Anti-Gravity"
          >
            {gravityEnabled ? <Orbit size={20} /> : <PowerOff size={20} />}
          </button>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};
