import { motion } from "framer-motion";
import { Cpu, Cloud, Braces, Database, Shield, Zap, GitBranch, Bot } from "lucide-react";

const BADGES = [
  { icon: Cloud, label: "Multi-cloud" },
  { icon: Bot, label: "AI-native" },
  { icon: Braces, label: "Type-safe" },
  { icon: Database, label: "Realtime" },
  { icon: Shield, label: "SOC2-ready" },
  { icon: Zap, label: "Edge-first" },
  { icon: GitBranch, label: "CI/CD" },
  { icon: Cpu, label: "GPU inference" },
];

export function TechBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      {BADGES.map((b, i) => (
        <motion.span
          key={b.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 + i * 0.05 }}
          whileHover={{ scale: 1.06, y: -2 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 backdrop-blur px-2.5 py-1 text-xs font-mono text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
        >
          <b.icon className="h-3 w-3" />
          {b.label}
        </motion.span>
      ))}
    </div>
  );
}
