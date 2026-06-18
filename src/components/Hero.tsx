"use client";

import { motion, Variants } from "framer-motion";
import { Mail } from "lucide-react";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative z-10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl w-full text-center md:text-left flex flex-col items-center md:items-start"
      >
        <motion.p variants={itemVariants} className="text-neon-cyan font-mono mb-4 tracking-wider">
          Hello, I am
        </motion.p>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-serif text-off-white font-bold mb-6 leading-tight">
          Vishwajeet <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-celestial-purple">Singh Rawat</span>
        </motion.h1>
        
        <motion.h2 variants={itemVariants} className="text-2xl md:text-4xl text-muted-silver font-medium mb-8">
          Full Stack Developer & Software Engineer
        </motion.h2>
        
        <motion.p variants={itemVariants} className="text-lg text-muted-silver max-w-2xl mb-12 leading-relaxed text-center md:text-left">
          Building AI-powered web applications, scalable data pipelines, and highly responsive UI architectures. With a strong foundation in competitive programming and cloud infrastructure, I engineer solutions that are as performant as they are magical.
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-6">
          <a href="https://github.com/vishurawat1" target="_blank" rel="noreferrer" className="text-muted-silver hover:text-neon-cyan hover:scale-110 transition-all duration-300">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
          </a>
          <a href="https://linkedin.com/in/vishwajeet-rawat1" target="_blank" rel="noreferrer" className="text-muted-silver hover:text-neon-cyan hover:scale-110 transition-all duration-300">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="mailto:rawatvishwajeet784@gmail.com" className="text-muted-silver hover:text-neon-cyan hover:scale-110 transition-all duration-300">
            <Mail size={28} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
