import { motion } from "framer-motion";

const STACK = [
  "TypeScript", "React", "Next.js", "Node.js", "Python", "Rust", "Go",
  "PostgreSQL", "Redis", "Kubernetes", "Docker", "AWS", "GCP", "Azure",
  "Terraform", "GraphQL", "tRPC", "Kafka", "PyTorch", "TensorFlow",
  "LangChain", "OpenAI", "Anthropic", "Vercel", "Supabase", "Cloudflare",
];

export function TechMarquee() {
  const items = [...STACK, ...STACK];
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-card/30 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {items.map((s, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 font-mono text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-primary to-accent" />
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
