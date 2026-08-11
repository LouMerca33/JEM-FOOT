'use client';

import { useEffect, useRef } from 'react';

const COLORS = ['#e8d5a3', '#f2e8c6', '#7a1f3d', '#9c2b4f', '#f8f6f2'];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
}

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationId: number;
    let running = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    function burst(x: number, y: number) {
      const count = 46;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 3.5 + Math.random() * 4.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 2 + Math.random() * 2.5,
          life: 0,
          maxLife: 55 + Math.random() * 25,
        });
      }
    }

    // Deux ou trois salves espacées pour un effet plus vivant.
    const w = window.innerWidth;
    const h = window.innerHeight;
    const bursts = [
      { x: w * 0.28, y: h * 0.32, delay: 0 },
      { x: w * 0.72, y: h * 0.26, delay: 250 },
      { x: w * 0.5, y: h * 0.4, delay: 500 },
    ];
    const timers = bursts.map((b) => setTimeout(() => burst(b.x, b.y), b.delay));

    function tick() {
      if (!running || !ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.life < p.maxLife);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gravité légère
        p.life += 1;
        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[60] pointer-events-none"
      aria-hidden="true"
    />
  );
}
