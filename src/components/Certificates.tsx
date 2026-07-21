"use client";

import { motion, Variants } from "framer-motion";
import { Award, ExternalLink, Sparkles } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  link: string;
}

const certificates: Certificate[] = [
  {
    title: "Marketing Analytics",
    issuer: "NPTEL",
    date: "April 2026",
    link: "/certificates/marketing-analytics.pdf",
  },
  {
    title: "IT Support Certificate",
    issuer: "Google",
    date: "February 2026",
    link: "/certificates/google-it-support.pdf",
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google",
    date: "November 2025",
    link: "/certificates/bits-and-bytes-computer-networking.pdf",
  },
  {
    title: "Certified Foundation Associate",
    issuer: "Oracle",
    date: "October 2025",
    link: "/certificates/oracle-certified-foundation-associate.pdf",
  },
  {
    title: "AWS Technical Essentials",
    issuer: "AWS",
    date: "17 Sept 2025",
    link: "/certificates/aws-technical-essentials.pdf",
  },
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "AWS",
    date: "17 Sept 2025",
    link: "/certificates/aws-certified-cloud-practitioner.pdf",
  },
  {
    title: "Technology Job Simulation",
    issuer: "Deloitte",
    date: "July 2025",
    link: "/certificates/deloitte-technology-job-simulation.pdf",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.92,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 14,
      mass: 0.8,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 px-6 max-w-6xl mx-auto border-t border-muted-silver/10 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-celestial-purple/10 via-neon-cyan/10 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* Header section with scroll reveal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerVariants}
        className="flex items-center gap-4 mb-16 relative z-10"
      >
        <div className="p-3 rounded-2xl bg-soft-gold/10 border border-soft-gold/20 shadow-[0_0_20px_rgba(255,215,0,0.15)]">
          <Award className="w-8 h-8 text-soft-gold animate-pulse" />
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-serif text-off-white font-bold tracking-wide flex items-center gap-3">
            Medals & Certificates
            <Sparkles className="w-6 h-6 text-neon-cyan/70 hidden md:inline-block" />
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="h-1 w-32 bg-gradient-to-r from-soft-gold via-neon-cyan to-celestial-purple rounded-full origin-left mt-2"
          />
        </div>
      </motion.div>

      {/* Staggered grid reveal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
      >
        {certificates.map((cert, index) => (
          <motion.a
            key={index}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            whileHover={{
              y: -10,
              scale: 1.02,
              boxShadow: "0px 15px 35px rgba(0, 240, 255, 0.25)",
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative p-[1px] rounded-xl overflow-hidden cursor-pointer block text-left"
          >
            {/* Border gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-celestial-purple/50 via-deep-space to-neon-cyan/50 opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Inner Card Container */}
            <div className="relative h-full bg-deep-space/90 backdrop-blur-md p-8 rounded-xl border border-muted-silver/10 flex flex-col items-center text-center group-hover:border-neon-cyan/30 transition-colors duration-300">
              
              {/* Corner External Link icon */}
              <div className="absolute top-4 right-4 text-muted-silver/40 group-hover:text-neon-cyan group-hover:scale-110 transition-all duration-300">
                <ExternalLink className="w-4 h-4" />
              </div>

              {/* Award Icon with subtle glow */}
              <div className="mb-4 p-3 rounded-full bg-soft-gold/5 group-hover:bg-soft-gold/15 transition-colors duration-300">
                <Award className="w-12 h-12 text-soft-gold drop-shadow-[0_0_12px_rgba(255,215,0,0.5)] group-hover:scale-110 transition-transform duration-300" />
              </div>

              <h3 className="text-xl font-serif text-off-white mb-2 group-hover:text-neon-cyan transition-colors duration-300">
                {cert.title}
              </h3>
              
              <p className="text-neon-cyan font-mono text-sm mb-4">{cert.issuer}</p>

              <span className="mt-auto px-4 py-1 rounded-full border border-muted-silver/20 text-muted-silver text-xs group-hover:border-neon-cyan/50 group-hover:text-off-white transition-all duration-300">
                {cert.date}
              </span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}


