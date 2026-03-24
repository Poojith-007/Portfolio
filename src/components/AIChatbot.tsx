import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';
import { useGravity } from '../context/GravityContext';

const QA = {
  'projects': "I've built a UPI Payment App using Room DB for caching and comprehensive history tracking, and an AI Chatbot using React, Node, and MongoDB.",
  'skills': "I specialize in Android (Kotlin/Java) but am also proficient with Firebase, MongoDB, React, Node.js and integrating AI APIs.",
  'contact': "You can reach me via email or LinkedIn! Check out the Contact section.",
  'default': "Hi there! I'm Poojith's AI assistant. Ask me about his 'projects', 'skills', or 'contact' details."
};

export const AIChatbot: React.FC = () => {
  const { gravityEnabled } = useGravity();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
    { role: 'ai', text: QA.default }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const query = input.toLowerCase();
    
    setTimeout(() => {
      let reply = QA.default;
      if (query.includes('project')) reply = QA.projects;
      else if (query.includes('skill')) reply = QA.skills;
      else if (query.includes('contact')) reply = QA.contact;

      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    }, 600);
    
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-72 sm:w-80 h-96 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.2)]"
          >
            <div className="bg-gradient-to-r from-cyan-600/30 to-purple-600/30 p-4 border-b border-white/10 flex justify-between items-center">
              <span className="font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                AI Assistant
              </span>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div key={i} className={`max-w-[85%] p-3 rounded-xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-cyan-500/20 border border-cyan-500/30 text-white self-end rounded-br-sm' 
                    : 'bg-white/10 border border-white/10 text-gray-200 self-start rounded-bl-sm'
                }`}>
                  {m.text}
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Ask something..."
                className="flex-1 bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        animate={gravityEnabled ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.4)] relative group ml-auto"
      >
        {isOpen ? <X size={24} className="text-white" /> : <MessageSquare size={24} className="text-white" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
};
