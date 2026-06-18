"use client";

import { motion, Variants } from "framer-motion";

const skills = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "HTML5", "CSS3", "Python", "C++", "Java"]
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "React Router", "Framer Motion"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs"]
  },
  {
    category: "Databases",
    items: ["MongoDB", "Firebase Firestore"]
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Postman", "Axios", "Vercel", "AWS", "Figma"]
  },
  {
    category: "Concepts",
    items: ["OOP", "DBMS", "Operating Systems", "Computer Networks", "Authentication", "Responsive Design"]
  }
];

export default function Skills() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 px-6 relative z-10 bg-black/20" id="skills">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-serif text-off-white font-bold mb-4">Alchemy & Mastered Arts</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-soft-gold rounded-full mx-auto md:mx-0"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skillGroup, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-soft-gold/40 transition-colors"
            >
              <h3 className="text-xl font-serif text-soft-gold mb-6 font-semibold group-hover:text-neon-cyan transition-colors">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((item, i) => (
                  <div 
                    key={i} 
                    className="px-4 py-2 bg-deep-space rounded-md text-sm text-muted-silver border border-white/5 shadow-[0_0_0_transparent] hover:shadow-[0_0_10px_rgba(0,240,255,0.4)] hover:border-neon-cyan/50 hover:text-off-white transition-all cursor-default"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
