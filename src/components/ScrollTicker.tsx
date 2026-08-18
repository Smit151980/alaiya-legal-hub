import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

/** Oversized headline strip that skews and drifts with scroll velocity. */
export function ScrollTicker({ text }: { text: string }) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 90, damping: 30 });
  const skew = useTransform(smooth, [-2000, 0, 2000], [-6, 0, 6], { clamp: true });
  const x = useTransform(smooth, [-2000, 0, 2000], ["6%", "0%", "-6%"], { clamp: true });

  const items = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="relative overflow-hidden border-y border-border/50 bg-background/40 py-6">
      <motion.div style={{ skewX: skew, x }} className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex shrink-0 items-center gap-10"
        >
          {[...items, ...items].map((i) => (
            <span
              key={i}
              className="font-display text-4xl font-bold uppercase tracking-tight text-transparent md:text-6xl"
              style={{ WebkitTextStroke: "1px oklch(from var(--foreground) l c h / 0.28)" }}
            >
              {text}
              <span className="mx-6 text-primary" style={{ WebkitTextStroke: "0" }}>
                /
              </span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
