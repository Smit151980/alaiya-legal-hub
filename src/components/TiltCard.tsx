import type { ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const srx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 18 });
  const sry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 18 });

  return (
    <motion.div
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={`spotlight ${className}`}
    >
      {children}
    </motion.div>
  );
}
