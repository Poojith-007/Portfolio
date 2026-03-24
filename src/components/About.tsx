import { FC } from 'react';
import { motion } from 'framer-motion';
import { useGravity } from '../context/GravityContext';

export const About: FC = () => {
  const { gravityEnabled } = useGravity();

  return (
    <section id="about" className="min-h-screen py-24 px-6 md:px-12 relative z-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring" }}
        animate={gravityEnabled ? { y: [0, -15, 0] } : {}}
        className="w-full max-w-4xl"
      >
        <div className="relative group p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
          
          <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              
              <div className="w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/5 relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-purple-500/30"></div>
                {/* Fallback image */}
                <div className="w-full h-full bg-[#111] flex items-center justify-center text-4xl font-black text-white/20">
                  P
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">
                  About Me
                </h2>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed font-light">
                  <p>
                    I am a Computer Engineering student passionate about cybersecurity, ethical hacking, and building real-world technology solutions. I am deeply interested in understanding how systems work, how they can be attacked, and how to make them more secure.
                  </p>
                  <p>
                    I enjoy working on practical projects that challenge my thinking and help me grow both as a developer and a security enthusiast.
                  </p>
                  
                  <div className="pt-4">
                    <h3 className="text-xl font-bold text-cyan-300 mb-2">Currently focused on:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Cybersecurity and ethical hacking concepts</li>
                      <li>Developing real-world applications</li>
                      <li>Strengthening my problem-solving and system design skills</li>
                    </ul>
                  </div>
                  
                  <div className="pt-2">
                    <p className="border-l-4 border-purple-500 pl-4 py-1 italic text-white/80">
                      <strong>Goal:</strong> To build and secure powerful digital systems that are both efficient and resilient.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};
