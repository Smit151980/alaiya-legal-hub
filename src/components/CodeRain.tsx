import { useEffect, useRef } from "react";

export function CodeRain({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const chars = "01<>/{}[]=+-*αβΔΣ01アカサタナ".split("");
    let cols = 0;
    let drops: number[] = [];
    let width = 0, height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(width / 16);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    const draw = (t: number) => {
      if (t - last > 60) {
        last = t;
        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(0, 0, width, height);
        ctx.font = "13px ui-monospace, monospace";
        for (let i = 0; i < cols; i++) {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          const x = i * 16;
          const y = drops[i] * 16;
          const isHead = Math.random() > 0.975;
          ctx.fillStyle = isHead
            ? "oklch(0.85 0.18 220 / 0.9)"
            : "oklch(0.7 0.17 220 / 0.55)";
          ctx.fillText(ch, x, y);
          if (y > height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full opacity-[0.18] ${className}`} />;
}
