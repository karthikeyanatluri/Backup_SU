import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  tilt: number;
  tiltSpeed: number;
  opacity: number;
  color: string;
}

const SAKURA_COLORS = [
  'rgba(255, 183, 197, 0.70)', // Classic Cherry Blossom Pink
  'rgba(255, 192, 203, 0.65)', // Soft Rose
  'rgba(255, 218, 224, 0.70)', // Pale Pearl Pink
  'rgba(244, 114, 182, 0.60)', // Vivid Sakura
  'rgba(251, 207, 232, 0.70)', // Light Blossom
];

export const SakuraCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Responsive petal population: 22 on mobile/tablet, 42 on large screens
    const isMobile = window.innerWidth < 768;
    const PETAL_COUNT = isMobile ? 22 : 42;
    const petals: Petal[] = [];

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 5 + 6, // 6px to 11px
        speedY: Math.random() * 0.7 + 0.7, // Steady gentle fall
        speedX: (Math.random() - 0.5) * 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        tilt: Math.random() * Math.PI,
        tiltSpeed: Math.random() * 0.02 + 0.01,
        opacity: Math.random() * 0.3 + 0.45,
        color: SAKURA_COLORS[Math.floor(Math.random() * SAKURA_COLORS.length)],
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.tilt), 1);

      ctx.fillStyle = p.color;
      ctx.beginPath();

      // Notched sakura petal geometry
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(-p.size * 0.8, -p.size * 0.5, -p.size * 0.9, p.size * 0.6, 0, p.size);
      ctx.bezierCurveTo(p.size * 0.9, p.size * 0.6, p.size * 0.8, -p.size * 0.5, 0, -p.size);
      ctx.fill();

      // Subtle translucent vein
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.lineTo(0, p.size * 0.5);
      ctx.stroke();

      ctx.restore();
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 0.015;

      const gentleSway = Math.sin(tick) * 0.35 + 0.15;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + gentleSway;
        p.rotation += p.rotationSpeed;
        p.tilt += p.tiltSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = width + 20;
        }

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};

export default React.memo(SakuraCanvas);
