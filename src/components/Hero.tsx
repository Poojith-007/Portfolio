import { FC } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGravity } from '../context/GravityContext';

export const Hero: FC = () => {
  const { gravityEnabled } = useGravity();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20">
      <motion.div 
        style={{ y: y1, opacity }}
        className="text-center z-10 max-w-4xl"
      >
        <motion.div
          animate={gravityEnabled ? { y: [0, -20, 0] } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-2 tracking-tighter">
            Hi, I’m{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
              Poojith
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-200">
            Computer Engineering Student | Full-Stack Developer
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-10 font-light"
        >
          <p className="text-xl md:text-2xl text-white/70 mb-2">
            Building real-world applications with a focus on security and system design.
          </p>
          <p className="text-lg md:text-xl text-white/50">
            I build real-world applications while exploring how systems work, break, and can be secured.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.a 
            href="#about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
            <button className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600">
              <span className="pr-6 text-white text-lg font-medium">Enter My Universe</span>
              <span className="pl-6 text-cyan-400 group-hover:text-purple-400 transition-colors duration-200">
                →
              </span>
            </button>
          </motion.a>

          <motion.a 
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block relative group"
          >
            <button className="relative px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg leading-none flex items-center transition-all duration-200">
              <span className="text-white text-lg font-medium">View Projects</span>
            </button>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};
