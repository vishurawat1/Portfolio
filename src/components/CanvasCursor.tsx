"use client";

import { useEffect, useRef } from "react";

export default function CanvasCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;
    let frame = 1;

    function Oscillator(this: any, e: any) {
      this.init(e || {});
    }

    Oscillator.prototype = {
      init: function (e: any) {
        this.phase = e.phase || 0;
        this.offset = e.offset || 0;
        this.frequency = e.frequency || 0.001;
        this.amplitude = e.amplitude || 1;
      },
      update: function () {
        this.phase += this.frequency;
        return this.offset + Math.sin(this.phase) * this.amplitude;
      },
      value: function () {
        return this.offset + Math.sin(this.phase) * this.amplitude;
      },
    };

    function Node(this: any) {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
    }

    function Line(this: any, e: any) {
      this.init(e || {});
    }

    Line.prototype = {
      init: function (e: any) {
        this.spring = e.spring + 0.1 * Math.random() - 0.02;
        this.friction = E.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];
        for (let t, n = 0; n < E.size; n++) {
          t = new (Node as any)();
          t.x = pos.x;
          t.y = pos.y;
          this.nodes.push(t);
        }
      },
      update: function () {
        let e = this.spring,
          t = this.nodes[0];
        t.vx += (pos.x - t.x) * e;
        t.vy += (pos.y - t.y) * e;
        for (let n, i = 0, a = this.nodes.length; i < a; i++) {
          t = this.nodes[i];
          if (i > 0) {
            n = this.nodes[i - 1];
            t.vx += (n.x - t.x) * e;
            t.vy += (n.y - t.y) * e;
            t.vx += n.vx * E.dampening;
            t.vy += n.vy * E.dampening;
          }
          t.vx *= this.friction;
          t.vy *= this.friction;
          t.x += t.vx;
          t.y += t.vy;
          e *= E.tension;
        }
      },
      draw: function () {
        let e, t;
        let n = this.nodes[0].x,
          i = this.nodes[0].y;
        ctx!.beginPath();
        ctx!.moveTo(n, i);
        let a;
        for (a = 1; a < this.nodes.length - 2; a++) {
          e = this.nodes[a];
          t = this.nodes[a + 1];
          n = 0.5 * (e.x + t.x);
          i = 0.5 * (e.y + t.y);
          ctx!.quadraticCurveTo(e.x, e.y, n, i);
        }
        e = this.nodes[a];
        t = this.nodes[a + 1];
        ctx!.quadraticCurveTo(e.x, e.y, t.x, t.y);
        ctx!.stroke();
        ctx!.closePath();
      },
    };

    let f: any;
    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let lines: any[] = [];
    let E = {
      debug: true,
      friction: 0.5,
      trails: 40,
      size: 40,
      dampening: 0.25,
      tension: 0.98,
    };

    function onMousemove(e: MouseEvent | TouchEvent) {
      if (!lines.length) {
        for (let i = 0; i < E.trails; i++) {
          lines.push(new (Line as any)({ spring: 0.4 + (i / E.trails) * 0.025 }));
        }
      }
      if ("touches" in e) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      } else {
        pos.x = (e as MouseEvent).clientX;
        pos.y = (e as MouseEvent).clientY;
      }
    }

    function render() {
      if (running) {
        ctx!.globalCompositeOperation = "source-over";
        ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
        ctx!.globalCompositeOperation = "lighter";
        
        // Cycle hue between cyan (180) and purple (270)
        let hue = Math.round(f.update());
        ctx!.strokeStyle = `hsla(${hue}, 100%, 60%, 0.15)`;
        ctx!.lineWidth = 2;
        
        for (let t = 0; t < E.trails; t++) {
          if (lines[t]) {
            lines[t].update();
            lines[t].draw();
          }
        }
        frame++;
        window.requestAnimationFrame(render);
      }
    }

    function resizeCanvas() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    f = new (Oscillator as any)({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 45, // To fluctuate between 180 and 270
      frequency: 0.01,
      offset: 225, // Base hue (midpoint between cyan and purple)
    });

    resizeCanvas();
    render();

    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("touchmove", onMousemove, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    return () => {
      running = false;
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("touchmove", onMousemove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 w-full h-full"
    />
  );
}
