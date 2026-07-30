import { motion } from "framer-motion";

const PATHS = [
  "M0 40 H120 L160 80 H320 L360 40 H520",
  "M0 120 H80 L120 80 H260 L300 120 H520",
  "M0 200 H180 L220 160 H380 L420 200 H520",
];

export function CircuitLines({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 520 240"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      preserveAspectRatio="none"
    >
      {PATHS.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="var(--color-primary)" strokeOpacity="0.12" strokeWidth="1.2" />
          <motion.path
            d={d}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="40 480"
            initial={{ strokeDashoffset: 520 }}
            animate={{ strokeDashoffset: -520 }}
            transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: "linear", delay: i * 0.8 }}
          />
        </g>
      ))}
    </svg>
  );
}
