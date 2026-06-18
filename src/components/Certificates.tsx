"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

const certificates = [
  {
    title: "Master of Magical Development",
    issuer: "Sorcery Tech Institute",
    date: "2025",
  },
  {
    title: "Advanced React & WebGL",
    issuer: "Frontend Alchemists",
    date: "2024",
  },
  {
    title: "Hackathon Champion",
    issuer: "BVP IEEE",
    date: "2023",
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 px-6 max-w-6xl mx-auto border-t border-muted-silver/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-16"
      >
        <Award className="w-8 h-8 text-soft-gold" />
        <h2 className="text-3xl md:text-5xl font-serif text-off-white font-bold tracking-wide">
          Medals & Certificates
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, boxShadow: "0px 10px 30px rgba(112,0,255,0.3)" }}
            className="group relative p-[1px] rounded-xl overflow-hidden cursor-default"
          >
            {/* Border glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-celestial-purple/50 via-deep-space to-neon-cyan/50 opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative h-full bg-deep-space/90 backdrop-blur-md p-8 rounded-xl border border-muted-silver/10 flex flex-col items-center text-center">
              <Award className="w-12 h-12 text-soft-gold mb-4 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
              <h3 className="text-xl font-serif text-off-white mb-2">{cert.title}</h3>
              <p className="text-neon-cyan font-mono text-sm mb-4">{cert.issuer}</p>
              <span className="mt-auto px-4 py-1 rounded-full border border-muted-silver/20 text-muted-silver text-xs">
                {cert.date}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
