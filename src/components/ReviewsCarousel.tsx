import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

type Review = {
  name: string;
  role: string;
  company: string;
  stars: number;
  text: string;
};

const REVIEWS: Review[] = [
  {
    name: "Priya Nair",
    role: "Founder",
    company: "Loopcart",
    stars: 5,
    text:
      "They rebuilt our checkout in six weeks and it has not gone down since. Clear communication, no drama, real engineering.",
  },
  {
    name: "Daniel Ortiz",
    role: "CTO",
    company: "Northbeam Logistics",
    stars: 5,
    text:
      "Our legacy dispatch system finally feels modern. Deploys went from monthly panic to a few times a day.",
  },
  {
    name: "Aisha Rahman",
    role: "Head of Product",
    company: "Finlyte",
    stars: 5,
    text:
      "The AI document pipeline they shipped cut manual review time by 70%. They cared about evaluation, not demos.",
  },
  {
    name: "Kenji Sato",
    role: "VP Engineering",
    company: "Orbital Health",
    stars: 4,
    text:
      "A small senior team that behaves like partners. Their infrastructure work made our audits painless.",
  },
  {
    name: "Marta Kowalski",
    role: "Operations Lead",
    company: "Verdo",
    stars: 5,
    text:
      "Every milestone landed on time and the handover documentation was better than anything we had internally.",
  },
];

export function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((delta: number) => {
    setDir(delta);
    setIndex((i) => (i + delta + REVIEWS.length) % REVIEWS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(1), 5000);
    return () => window.clearInterval(id);
  }, [paused, go]);

  const review = REVIEWS[index]!;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-8 backdrop-blur md:p-12">
        <Quote className="absolute right-6 top-6 h-16 w-16 text-primary/10" />
        <div className="relative min-h-[190px] sm:min-h-[160px]">
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.blockquote
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir * -60, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full flex-col justify-between gap-6"
            >
              <p className="font-display text-lg leading-relaxed md:text-2xl">"{review.text}"</p>
              <footer className="flex flex-wrap items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-mono text-sm text-primary">
                  {review.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <span className="text-sm">
                  <span className="font-medium">{review.name}</span>
                  <span className="text-muted-foreground">
                    {" "}
                    — {review.role}, {review.company}
                  </span>
                </span>
                <span className="ml-auto flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < review.stars
                          ? "h-4 w-4 fill-primary text-primary"
                          : "h-4 w-4 text-muted-foreground/40"
                      }
                    />
                  ))}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <motion.div
          key={`bar-${index}-${paused}`}
          className="absolute bottom-0 left-0 h-0.5 bg-primary/70"
          initial={{ width: "0%" }}
          animate={{ width: paused ? "0%" : "100%" }}
          transition={{ duration: paused ? 0.2 : 5, ease: "linear" }}
        />
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => go(-1)}
          className="rounded-full border border-border/60 p-2 text-muted-foreground transition hover:bg-card hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2">
          {REVIEWS.map((r, i) => (
            <button
              key={r.name}
              type="button"
              aria-label={`Show review from ${r.name}`}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-7 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next review"
          onClick={() => go(1)}
          className="rounded-full border border-border/60 p-2 text-muted-foreground transition hover:bg-card hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
