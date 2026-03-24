import { FC } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, Send } from 'lucide-react';

export const Contact: FC = () => {
  return (
    <section id="contact" className="min-h-[70vh] py-24 px-6 md:px-12 relative z-10 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl text-center"
      >
        <h2 className="text-4xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
          Contact
        </h2>
        <p className="text-gray-400 mb-12 text-xl">
          Let’s connect and build something amazing together.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <a href="mailto:gudavallipujith@gmail.com" className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-cyan-400/50 transition-all group w-full md:w-auto justify-center">
            <Mail className="text-gray-400 group-hover:text-cyan-400 transition-colors" size={20} />
            <span className="font-medium">gudavallipujith@gmail.com</span>
          </a>
          <a href="https://linkedin.com/in/gudavalli-poojith" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-purple-400/50 transition-all group w-full md:w-auto justify-center">
            <Linkedin className="text-gray-400 group-hover:text-purple-400 transition-colors" size={20} />
            <span className="font-medium">LinkedIn</span>
          </a>
          <a href="https://github.com/Poojith-007" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-gray-300/50 transition-all group w-full md:w-auto justify-center">
            <Github className="text-gray-400 group-hover:text-gray-300 transition-colors" size={20} />
            <span className="font-medium">GitHub</span>
          </a>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="#" className="inline-flex relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <button className="relative px-8 py-4 bg-black rounded-full leading-none flex items-center justify-center gap-3">
              <Download className="text-cyan-400" size={20} />
              <span className="text-white text-lg font-bold">Download Resume</span>
            </button>
          </a>
          
          <a href="mailto:gudavallipujith@gmail.com" className="inline-flex relative group">
            <button className="relative px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full leading-none flex items-center justify-center gap-3 transition-all duration-200">
              <Send className="text-purple-400" size={20} />
              <span className="text-white text-lg font-bold">Contact Me</span>
            </button>
          </a>
        </div>
      </motion.div>
      
      <div className="absolute bottom-10 flex flex-col items-center justify-center gap-2">
        <div className="text-white/40 text-sm font-medium tracking-widest uppercase">
          Crafted by Poojith
        </div>
        <div className="text-white/30 text-xs">
          Focused on building secure and reliable systems.
        </div>
      </div>
    </section>
  );
};
