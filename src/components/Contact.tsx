"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "d0c42da1-8078-4bfe-b84d-cf2fde074ad6",
          ...formData
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        
        // Reset status after a few seconds
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      } else {
        console.error("Submission failed", result);
        setStatus("idle");
      }
    } catch (error) {
      console.error("Submission error", error);
      setStatus("idle");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-24 px-6 relative z-10" id="summon-me">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-off-white font-bold mb-4">Summon Me</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-celestial-purple rounded-full mx-auto"></div>
          <p className="text-muted-silver mt-6">
            Seeking a developer to weave magic into your next project? Cast your message below.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-silver mb-2">True Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-deep-space/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 text-off-white transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-silver mb-2">Ethereal Address (Email)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-deep-space/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 text-off-white transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-silver mb-2">Incantation (Message)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-deep-space/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-cyan/50 text-off-white transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status !== "idle"}
              className="w-full relative overflow-hidden group py-4 rounded-lg bg-white/5 border border-neon-cyan/30 text-neon-cyan font-medium transition-all hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <AnimatePresence mode="wait">
                {status === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.div>
                )}
                
                {status === "submitting" && (
                  <motion.div
                    key="submitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Loader2 size={20} className="animate-spin text-celestial-purple" />
                    <span>Casting Spell...</span>
                  </motion.div>
                )}

                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 text-soft-gold"
                  >
                    <CheckCircle2 size={20} />
                    <span>Summoning Complete</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>

          {/* Toast Notification */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute -bottom-20 left-0 right-0 mx-auto w-max px-6 py-3 bg-deep-space border border-soft-gold/50 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.2)] flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-soft-gold animate-pulse" />
                <p className="text-off-white text-sm">Summoning ritual complete. I will manifest in your inbox soon.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
