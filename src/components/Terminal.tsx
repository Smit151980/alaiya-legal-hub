import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  { p: "$", t: "alaiya deploy --stack cloud+ai --region global" },
  { p: ">", t: "✓ Provisioning edge nodes across 12 regions..." },
  { p: ">", t: "✓ Building AI inference pipeline (gpt · claude · gemini)" },
  { p: ">", t: "✓ Zero-downtime rollout · 99.99% SLA" },
  { p: "$", t: "status" },
  { p: ">", t: "shipping tomorrow's software, today ▍" },
];

export function Terminal() {
  const [shown, setShown] = useState<string[]>([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    let cancelled = false;
    let i = 0, j = 0;
    async function loop() {
      while (!cancelled) {
        const line = LINES[i];
        j = 0;
        while (j <= line.t.length && !cancelled) {
          setTyping(line.t.slice(0, j));
          await new Promise((r) => setTimeout(r, 18 + Math.random() * 30));
          j++;
        }
        setShown((s) => [...s, `${line.p} ${line.t}`]);
        setTyping("");
        await new Promise((r) => setTimeout(r, 450));
        i++;
        if (i >= LINES.length) {
          await new Promise((r) => setTimeout(r, 1600));
          setShown([]);
          i = 0;
        }
      }
    }
    loop();
    return () => { cancelled = true; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      style={{ perspective: 1000 }}
      className="relative rounded-xl border border-border bg-card/80 backdrop-blur shadow-2xl shadow-primary/10 overflow-hidden"
    >
      <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/50 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">~/alaiya — zsh</span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-relaxed min-h-[220px]">
        {shown.map((l, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className={l.startsWith("$") ? "text-primary" : "text-muted-foreground"}
          >
            {l}
          </motion.div>
        ))}
        {typing && (
          <div className="text-foreground">
            <span className="text-accent">$</span> {typing}
            <span className="inline-block w-2 h-4 -mb-0.5 bg-primary animate-pulse ml-0.5" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
