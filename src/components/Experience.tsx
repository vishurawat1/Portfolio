"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineData = [
  {
    type: "education",
    role: "B.Tech in Computer Science and Engineering",
    company: "VIT Bhopal University",
    duration: "2023 – 2027",
    details: [
      "CGPA: 7.9",
      "Coursework: Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks."
    ]
  },
  {
    role: "Core Technical Member",
    company: "Health-o-Tech Club, VIT Bhopal",
    duration: "2023 – 2024",
    details: [
      "Created reusable responsive UI components using React.js and Tailwind CSS.",
      "Contributed to frontend development workshops attended by 50+ students."
    ]
  },
  {
    type: "experience",
    role: "Technical Lead",
    company: "Health-o-Tech Club, VIT Bhopal",
    duration: "2024 – Present",
    details: [
      "Led a 10-member Technical team delivering platforms for registrations and onboarding.",
      "Reviewed and optimized 30+ pull requests focused on responsiveness and performance.",
      "Mentored junior developers on React.js, Git workflows, and reusable UI architecture."
    ]
  },
  {
    type: "achievement",
    role: "Achievements & Certifications",
    company: "Various",
    duration: "Ongoing",
    details: [
      "Solved 150+ DSA problems across LeetCode and competitive programming platforms.",
      "Finalist at HackIndore 2025 for developing a municipality management dashboard.",
      "Oracle Certified Foundations Associate in Artificial Intelligence."
    ]
  },
  {
    type: "experience",
    role: "Software Engineering Intern",
    company: "DDPI Groups",
    duration: "May 2026 – Present",
    details: [
      "Developed, tested, and deployed a robust full-stack web platform using Next.js, Node.js, Express, and MongoDB.",
      "Engineered stateful RESTful APIs with JWT-based authentication mechanisms.",
      "Architected data pipelines with MongoDB, reducing database response latency by 15%.",
      "Managed deployment workflows utilizing Vercel and AWS infrastructure with CI/CD pipelines."
    ]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 px-6 relative z-10" id="quest-log">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-serif text-off-white font-bold mb-4">The Quest Log</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-celestial-purple to-neon-cyan rounded-full mx-auto md:mx-0"></div>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Background Line */}
          <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-white/10 rounded-full" />
          
          {/* Glowing Animated Line */}
          <motion.div 
            className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-0 w-1 bg-neon-cyan shadow-[0_0_15px_#00f0ff] rounded-full origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-16">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-start md:justify-between w-full pl-12 md:pl-0`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 mt-1.5 w-3 h-3 rounded-full bg-celestial-purple border-2 border-neon-cyan shadow-[0_0_10px_#00f0ff] z-10" />

                  {/* Content Container */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                    className={`md:w-[45%] p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-colors`}
                  >
                    <div className="flex flex-col mb-4">
                      <span className="text-neon-cyan font-mono text-sm mb-2">{item.duration}</span>
                      <h3 className="text-xl font-serif text-off-white font-bold">{item.role}</h3>
                      <h4 className="text-soft-gold text-sm font-medium">{item.company}</h4>
                    </div>
                    
                    <ul className="space-y-2">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="text-muted-silver text-sm flex items-start">
                          <span className="text-celestial-purple mr-2 mt-1 opacity-80 text-xs">▹</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  {/* Empty space for alternative side on desktop */}
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
