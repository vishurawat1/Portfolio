"use client";

import { useEffect, useRef } from "react";

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; life: number; color: string }[] = [];
    const ripples: { x: number; y: number; radius: number; life: number }[] = [];
    const stars: { x: number; y: number; size: number; twinkleSpeed: number; alpha: number }[] = [];

    // Initialize background stars
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 1.5,
        twinkleSpeed: 0.02 + Math.random() * 0.03,
        alpha: Math.random(),
      });
    }

    const mouse = { x: -1000, y: -1000 };
    let lastMouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const dist = Math.hypot(mouse.x - lastMouse.x, mouse.y - lastMouse.y);

      // Add trail particles
      const particleCount = Math.min(Math.floor(dist * 0.5), 10); // Scale based on speed, max 10
      for (let i = 0; i < (particleCount > 0 ? particleCount : 2); i++) {
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 10,
          y: mouse.y + (Math.random() - 0.5) * 10,
          size: Math.random() * 2.5 + 1,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5 - 0.5, // Slight upward float
          life: 1,
          color: Math.random() > 0.5 ? "#00f0ff" : "#ffd700", // Cyan and Gold
        });
      }

      // Add ripple occasionally or when moving fast
      if (Math.random() > 0.8 || dist > 30) {
        ripples.push({
          x: mouse.x,
          y: mouse.y,
          radius: 5,
          life: 1,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      // Clear the canvas each frame with deep space gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, "#0a0712"); // deep space
      bgGradient.addColorStop(1, "#050308"); // deep space end
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0) {
          star.twinkleSpeed *= -1;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243, 241, 246, ${Math.abs(star.alpha) * 0.6})`;
        ctx.fill();
      });

      // Draw Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 2.5; // Expanding speed
        r.life -= 0.015; // Fade out speed

        if (r.life <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(112, 0, 255, ${r.life * 0.4})`; // Celestial purple
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${r.life * 0.2})`; // Neon cyan inner
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.02;
        p.size *= 0.95; // Shrink over time

        if (p.life <= 0 || p.size <= 0.1) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        
        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        
        // Reset glow
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-deep-space"
    />
  );
}
