import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useGravity } from '../context/GravityContext';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
}

const GITHUB_USERNAME = "Poojith-007";

const TiltCard: React.FC<{ project: Project }> = ({ project }) => {
  const { gravityEnabled } = useGravity();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gravityEnabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={gravityEnabled ? { y: [0, -10, 0] } : {}}
      transition={gravityEnabled ? { duration: 4, repeat: Infinity, ease: "easeInOut", delay: (project.id % 5) * 0.2 } : {}}
      className="relative group cursor-pointer"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative p-6 bg-black border border-white/10 rounded-2xl h-full flex flex-col justify-between overflow-hidden">
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        
        <div>
          <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
          <p className="text-gray-400 mb-6 text-sm leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-cyan-200">
                {t}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-auto relative z-10">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
            <Github size={20} />
          </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // @ts-ignore
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        let endpoint = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;
        const headers: HeadersInit = {};

        // If a token is provided in the .env.local file, fetch both public and private repositories
        if (token) {
          endpoint = `https://api.github.com/user/repos?sort=updated&affiliation=owner&per_page=100`;
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(endpoint, { headers });
        if (response.ok) {
          const data = await response.json();
          // Filter to limit to 6 to keep layout clean, or change as needed
          const formattedProjects = data.slice(0, 6).map((repo: any) => ({
            id: repo.id,
            title: repo.name,
            description: repo.description || `An open-source application developed in ${repo.language || 'code'}.`,
            tech: repo.language ? [repo.language] : ['Various'],
            github: repo.html_url,
            demo: repo.homepage || repo.html_url,
          }));
          setProjects(formattedProjects);
        }
      } catch (error) {
        console.error("Failed to fetch projects from GitHub", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="min-h-screen py-24 px-6 md:px-12 relative z-10 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-16 text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Featured Projects
          </h2>
        </motion.div>
        
        {isLoading ? (
          <div className="text-center text-white/50 text-xl animate-pulse">Fetching live repositories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map(p => (
              <TiltCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
