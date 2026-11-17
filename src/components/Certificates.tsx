"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FileText, ShieldCheck, Sparkles } from "lucide-react";

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  tag: string;
  category: "cloud" | "systems" | "enterprise" | "analytics";
  date: string;
  score?: string;
  certId: string;
  skills: string[];
  pdfUrl: string;
  previewImg: string;
  verifyUrl?: string;
  accent: string;
}

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "nptel-cloud",
    title: "Cloud Computing",
    issuer: "NPTEL · IIT",
    tag: "NPTEL",
    category: "cloud",
    date: "Jul–Oct 2026",
    score: "87% (Elite)",
    certId: "NPTEL26CS150MANUAL0020816",
    skills: ["Distributed Systems", "Hypervisors & Virtualization", "Cloud Storage Protocols", "Serverless & SLA"],
    pdfUrl: "/certificates/cloud-computing-nptel.pdf",
    previewImg: "/certificates/previews/cloud-computing-nptel.png",
    accent: "#00b4d8",
  },
  {
    id: "oracle-fnd",
    title: "OCI Certified Foundations Associate",
    issuer: "Oracle",
    tag: "Oracle",
    category: "enterprise",
    date: "17 Sept 2026",
    certId: "102926422OCI26FNDCFA",
    skills: ["OCI Core Services", "Virtual Cloud Network", "Compute & Storage", "Identity & Governance"],
    pdfUrl: "/certificates/oracle-cloud-infrastructure-foundations.pdf",
    previewImg: "/certificates/previews/oracle-cloud-infrastructure-foundations.png",
    accent: "#f80000",
  },
  {
    id: "nptel-mkt",
    title: "Marketing Analytics",
    issuer: "NPTEL · IIT",
    tag: "NPTEL",
    category: "analytics",
    date: "Jan–Apr 2026",
    score: "90% (Elite · Gold)",
    certId: "NPTEL26MG33S1052403096",
    skills: ["Statistical Modeling", "Predictive Analytics", "K-Means Clustering", "Conjoint Analysis"],
    pdfUrl: "/certificates/marketing-analytics.pdf",
    previewImg: "/certificates/previews/marketing-analytics.png",
    accent: "#ff7700",
  },
  {
    id: "google-it",
    title: "Google IT Support Professional",
    issuer: "Google Career Certificates",
    tag: "Google",
    category: "systems",
    date: "02 Feb 2026",
    certId: "ET2H2Avf",
    skills: ["Operating Systems", "Linux & CLI", "Active Directory", "System Defense"],
    pdfUrl: "/certificates/google-it-support.pdf",
    previewImg: "/certificates/previews/google-it-support.png",
    verifyUrl: "https://www.credly.com/go/ET2H2Avf",
    accent: "#4285f4",
  },
  {
    id: "google-net",
    title: "The Bits & Bytes of Computer Networking",
    issuer: "Google · Coursera",
    tag: "Google",
    category: "systems",
    date: "15 Nov 2025",
    certId: "OA0HK850IQDX",
    skills: ["TCP/IP Model", "CIDR Subnetting", "Routing & DNS", "Packet Analysis"],
    pdfUrl: "/certificates/bits-and-bytes-computer-networking.pdf",
    previewImg: "/certificates/previews/bits-and-bytes-computer-networking.png",
    verifyUrl: "https://coursera.org/verify/OA0HK850IQDX",
    accent: "#34a853",
  },
  {
    id: "oracle-ai",
    title: "OCI Certified AI Foundations Associate",
    issuer: "Oracle",
    tag: "Oracle",
    category: "enterprise",
    date: "18 Oct 2025",
    certId: "102926422OCI25AICFA",
    skills: ["Enterprise AI", "Deep Learning & ML", "Vector Embeddings", "Generative AI & LLMs"],
    pdfUrl: "/certificates/oracle-certified-ai-foundations.pdf",
    previewImg: "/certificates/previews/oracle-certified-ai-foundations.png",
    accent: "#c74634",
  },
  {
    id: "aws-ccp",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    tag: "AWS",
    category: "cloud",
    date: "17 Sept 2025",
    certId: "AWS-CCP-2025-VR9812",
    skills: ["Cloud Architecture", "Security & IAM", "EC2 / S3 / RDS", "Billing & Economics"],
    pdfUrl: "/certificates/aws-certified-cloud-practitioner.pdf",
    previewImg: "/certificates/previews/aws-certified-cloud-practitioner.png",
    accent: "#ff9900",
  },
  {
    id: "aws-te",
    title: "AWS Technical Essentials",
    issuer: "Amazon Web Services",
    tag: "AWS",
    category: "cloud",
    date: "17 Sept 2025",
    certId: "AWS-TE-2025-VR4410",
    skills: ["Compute (EC2)", "Storage (S3 / EBS)", "Networking (VPC)", "Database (RDS)"],
    pdfUrl: "/certificates/aws-technical-essentials.pdf",
    previewImg: "/certificates/previews/aws-technical-essentials.png",
    accent: "#ff9900",
  },
  {
    id: "deloitte-sim",
    title: "Deloitte Technology Job Simulation",
    issuer: "Deloitte · Forage",
    tag: "Deloitte",
    category: "enterprise",
    date: "04 July 2025",
    certId: "8WExfxS2YXNx6f6CQ",
    skills: ["Software Architecture", "Technology Consulting", "Client Solutions", "Forensic Code Review"],
    pdfUrl: "/certificates/deloitte-technology-job-simulation.pdf",
    previewImg: "/certificates/previews/deloitte-technology-job-simulation.png",
    accent: "#86bc25",
  },
  {
    id: "mathworks-matlab",
    title: "MATLAB Onramp",
    issuer: "MathWorks",
    tag: "MathWorks",
    category: "analytics",
    date: "23 Aug 2023",
    score: "100% Complete",
    certId: "MATHWORKS-MATLAB-2023",
    skills: ["Scientific Computing", "Matrix Operations", "Data Visualization", "Numerical Analysis"],
    pdfUrl: "/certificates/matlab-onramp.pdf",
    previewImg: "/certificates/previews/matlab-onramp.png",
    accent: "#d9381e",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredCerts =
    activeCategory === "all"
      ? CERTIFICATES_DATA
      : CERTIFICATES_DATA.filter((c) => c.category === activeCategory);

  const filterButtons = [
    { label: "All Credentials", value: "all", count: CERTIFICATES_DATA.length },
    {
      label: "Cloud (AWS & NPTEL)",
      value: "cloud",
      count: CERTIFICATES_DATA.filter((c) => c.category === "cloud").length,
    },
    {
      label: "Systems & Google",
      value: "systems",
      count: CERTIFICATES_DATA.filter((c) => c.category === "systems").length,
    },
    {
      label: "Enterprise & Oracle",
      value: "enterprise",
      count: CERTIFICATES_DATA.filter((c) => c.category === "enterprise").length,
    },
    {
      label: "Analytics & Computing",
      value: "analytics",
      count: CERTIFICATES_DATA.filter((c) => c.category === "analytics").length,
    },
  ];

  return (
    <section id="certificates" className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-widest font-mono text-zinc-400">
              04 — Medals &amp; Credentials
            </span>
            <span className="w-8 h-px bg-zinc-700" />
            <span className="text-xs font-serif text-amber-500/80">証・栄誉</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-zinc-100 flex items-center gap-3">
            My Certificates.
            <Sparkles className="w-5 h-5 text-amber-400/80 hidden sm:inline" />
          </h2>
          <p className="mt-3 text-sm md:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Rigorous credentials spanning cloud architecture, operating systems, enterprise database foundations, predictive analytics, and scientific computing. Formally validated by AWS, Google, Oracle, Deloitte, NPTEL (IITs), and MathWorks.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs text-zinc-300 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>10 Verified Accreditations · Date Sorted</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {filterButtons.map((btn) => {
          const isActive = activeCategory === btn.value;
          return (
            <button
              key={btn.value}
              type="button"
              onClick={() => setActiveCategory(btn.value)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                isActive
                  ? "bg-zinc-100 text-zinc-900 shadow-sm"
                  : "bg-zinc-900/70 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-zinc-800/80"
              }`}
            >
              <span>{btn.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-zinc-300 text-zinc-900" : "bg-zinc-800 text-zinc-400"}`}>
                {btn.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Certificate Cards Grid */}
      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.id}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-md p-5 hover:border-zinc-700 transition-colors"
            >
              <div>
                {/* Real Certificate Image Preview */}
                <div className="relative w-full aspect-[4/2.8] rounded-lg overflow-hidden border border-zinc-800/80 bg-zinc-900/70 mb-4 group-hover:border-amber-500/30 transition-colors shadow-inner">
                  <img
                    src={cert.previewImg}
                    alt={cert.title}
                    className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                {/* Header Row */}
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <span
                    className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded border"
                    style={{
                      color: cert.accent,
                      borderColor: `${cert.accent}40`,
                      backgroundColor: `${cert.accent}12`,
                    }}
                  >
                    {cert.tag}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">{cert.date}</span>
                </div>

                {/* Title & Issuer */}
                <h3 className="text-base font-medium text-zinc-100 group-hover:text-white transition-colors mb-1 leading-snug">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-3.5">
                  <span>{cert.issuer}</span>
                  {cert.score && (
                    <>
                      <span className="text-zinc-600">·</span>
                      <span className="font-mono text-amber-400/90 font-medium">{cert.score}</span>
                    </>
                  )}
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900/80 text-zinc-300 border border-zinc-800/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3.5 border-t border-zinc-800/60 flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[130px]">
                  ID: {cert.certId}
                </span>

                <div className="flex items-center gap-2">
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-200 hover:text-white px-3 py-1.5 rounded-md bg-zinc-800/70 hover:bg-zinc-700/80 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View PDF</span>
                  </a>

                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-amber-400 hover:text-amber-300 px-2.5 py-1.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-colors"
                      title="Verify Credential Online"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verify</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
