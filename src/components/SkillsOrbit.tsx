import { FC } from 'react';
import { motion } from 'framer-motion';
import { useGravity } from '../context/GravityContext';

const orbitCategories = [
  { name: 'Mobile', color: 'from-green-400 to-green-600', angle: 0, distance: 110 },
  { name: 'Software', color: 'from-blue-400 to-blue-600', angle: 72, distance: 150 },
  { name: 'Backend', color: 'from-orange-400 to-red-500', angle: 144, distance: 130 },
  { name: 'AI', color: 'from-purple-400 to-pink-600', angle: 216, distance: 170 },
  { name: 'Core', color: 'from-yellow-400 to-orange-500', angle: 288, distance: 120 },
];

const skillGroups = [
  {
    title: '📱 Mobile Development',
    skills: ['Android Development', 'Java & Kotlin', 'UI/UX Design Principles']
  },
  {
    title: '⚙️ Software & Tools Development',
    skills: ['C++ Programming', 'Qt / QML (UI Development)', 'PySide6 (Python GUI)']
  },
  {
    title: '🌐 Backend & Web',
    skills: ['Firebase', 'MongoDB', 'REST APIs', 'Web Dev (HTML, CSS, JS)']
  },
  {
    title: '🤖 AI & Integration',
    skills: ['AI Chatbot Development', 'API Integration', 'Building Intelligent Systems']
  },
  {
    title: '🧠 Core Strengths',
    skills: ['Problem Solving', 'Logical Thinking', 'System Design', 'Performance Optimization']
  }
];

export const SkillsOrbit: FC = () => {
  const { gravityEnabled } = useGravity();

  return (
    <section id="skills" className="min-h-screen py-24 px-6 md:px-12 relative z-10 flex flex-col items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
          My Orbit & Skills
        </h2>
        <p className="mt-4 text-gray-400 text-lg">Technologies and principles revolving in my universe.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 w-full max-w-6xl">
        {/* Orbital Animation */}
        <div className="relative w-full max-w-[350px] aspect-square flex items-center justify-center shrink-0">
          {/* Orbital rings */}
          <div className="absolute w-[220px] h-[220px] rounded-full border border-white/5 border-dashed"></div>
          <div className="absolute w-[280px] h-[280px] rounded-full border border-white/10"></div>
          <div className="absolute w-[340px] h-[340px] rounded-full border border-white/5 border-dashed"></div>

          {/* Central Node */}
          <motion.div
            animate={gravityEnabled ? { y: [0, -10, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 p-1 shadow-[0_0_30px_rgba(0,255,255,0.4)]"
          >
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <span className="font-bold text-lg text-white">ME</span>
            </div>
          </motion.div>

          {/* Orbiting Categories */}
          {orbitCategories.map((cat, i) => (
            <motion.div
              key={cat.name}
              className="absolute rounded-full"
              animate={gravityEnabled ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                duration: 25 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                width: cat.distance * 2,
                height: cat.distance * 2,
              }}
            >
              <motion.div
                className={`absolute top-0 left-1/2 -mt-6 -ml-6 w-12 h-12 rounded-full bg-gradient-to-br ${cat.color} p-0.5 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)] group`}
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${cat.angle}deg) translateY(-${cat.distance}px) rotate(-${cat.angle}deg)`
                }}
                whileHover={{ scale: 1.2 }}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[9px] font-bold text-white text-center leading-tight">
                  {cat.name}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400 mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.skills.map(skill => (
                  <li key={skill} className="flex items-center text-gray-300 text-sm md:text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3 shrink-0"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
