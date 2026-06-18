"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

interface ProjectProps {
  title: string;
  tech: string[];
  description: string[];
  year: string;
}

const projects: ProjectProps[] = [
  {
    title: "AI Resume Analyzer",
    tech: ["Next.js", "TypeScript", "Firebase", "Groq API", "Gemini API"],
    description: [
      "Engineered an AI-powered ATS resume analyzer supporting PDF and DOCX parsing with real-time evaluation.",
      "Integrated Groq and Gemini APIs with automatic fallback handling for reliable AI inference.",
      "Designed interactive workflows for dynamic resume improvements and visualized ATS scores using Recharts.",
      "Secured serverless API routes with rate limiting and Firebase-based caching."
    ],
    year: "2025"
  },
  {
    title: "Wedding Budget Estimation Platform",
    tech: ["React.js", "Node.js", "MongoDB", "Clerk"],
    description: [
      "Architected a full-stack platform with secure authentication and persistent cloud storage.",
      "Designed a pricing engine supporting 15+ customizable menu configurations and real-time calculations.",
      "Integrated PDF export workflows for downloadable budget reports.",
      "Created reusable frontend components, reducing duplicate UI code by 30%."
    ],
    year: "2025"
  },
  {
    title: "Modern URL Shortener",
    tech: ["React.js", "Node.js", "Express.js", "Recharts"],
    description: [
      "Engineered a URL shortening platform with analytics tracking, QR code generation, and custom aliases.",
      "Designed click tracking pipelines capturing browser, device, and geolocation metadata.",
      "Created analytics dashboards using Recharts to visualize traffic trends.",
      "Secured backend services using Express rate limiting, CORS handling, and NanoID."
    ],
    year: "2025"
  }
];

function ProjectCard({ project }: { project: ProjectProps }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col p-8 rounded-2xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-md group"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(112,0,255,.15), transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 border border-transparent"
        style={{
          opacity,
          WebkitMaskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)`,
          maskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)`,
          background: `linear-gradient(to right, rgba(0,240,255,0.5), rgba(112,0,255,0.5)) border-box`,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-serif text-off-white font-semibold">{project.title}</h3>
          <div className="flex gap-3 text-muted-silver">
            <a href="#" className="hover:text-neon-cyan transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg></a>
            <a href="#" className="hover:text-neon-cyan transition-colors"><ExternalLink size={20} /></a>
          </div>
        </div>
        
        <p className="text-sm text-neon-cyan font-mono mb-4">{project.year}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t, i) => (
            <span key={i} className="text-xs px-3 py-1 rounded-full bg-celestial-purple/20 text-neon-cyan border border-celestial-purple/30">
              {t}
            </span>
          ))}
        </div>
        
        <ul className="space-y-3 flex-grow">
          {project.description.map((desc, i) => (
            <li key={i} className="text-muted-silver text-sm flex items-start">
              <span className="text-soft-gold mr-2 mt-1 opacity-70">✦</span>
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="py-24 px-6 relative z-10" id="spellbook">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-off-white font-bold mb-4">The Spellbook</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-celestial-purple rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
