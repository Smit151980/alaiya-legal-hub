import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, HardDrive, Radio } from "lucide-react";

const METRICS = [
  { icon: Cpu, label: "cpu_load", base: 34 },
  { icon: HardDrive, label: "mem_usage", base: 58 },
  { icon: Activity, label: "req/s", base: 72 },
  { icon: Radio, label: "edge_latency", base: 21 },
];

export function StatusPanel() {
  const [vals, setVals] = useState(METRICS.map((m) => m.base));

  useEffect(() => {
    const id = setInterval(() => {
      setVals((prev) => prev.map((v, i) => Math.max(8, Math.min(96, Math.round(v + (Math.random() - 0.5) * 14 + (METRICS[i].base - v) * 0.2)))));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-xl border border-border bg-background/70 p-5 backdrop-blur">
      <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>system.status</span>
        <span className="flex items-center gap-1.5 text-primary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-primary" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          live
        </span>
      </div>
      <div className="mt-4 space-y-3">
        {METRICS.map((m, i) => (
          <div key={m.label}>
            <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <m.icon className="h-3 w-3 text-accent" />
                {m.label}
              </span>
              <span className="tabular-nums text-foreground">{vals[i]}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                animate={{ width: `${vals[i]}%` }}
                transition={{ type: "spring", stiffness: 90, damping: 18 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
