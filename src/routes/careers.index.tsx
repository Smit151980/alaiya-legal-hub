import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { TiltCard } from "../components/TiltCard";
import { GlitchText } from "../components/GlitchText";
import { ROLES } from "../lib/roles";
import { Briefcase, MapPin, Clock, Rocket, Users, Laptop, GraduationCap, Phone } from "lucide-react";

export const Route = createFileRoute("/careers/")({
  head: () => ({
    meta: [
      { title: "Careers — Join Alaiya Technologies" },
      { name: "description", content: "Open engineering, design, and internship roles at Alaiya Technologies. Build cloud, AI, and custom software with a small senior team." },
      { property: "og:title", content: "Careers — Join Alaiya Technologies" },
      { property: "og:description", content: "Open roles in cloud, AI, and product engineering at Alaiya Technologies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Careers,
});

const roles = ROLES;

const perks = [
  { icon: Laptop, t: "Remote-first", d: "Work from anywhere in India, with flexible hours around a light overlap window." },
  { icon: Rocket, t: "Real ownership", d: "Small team, no layers — your work ships to production in days, not quarters." },
  { icon: GraduationCap, t: "Learning budget", d: "Yearly allowance for courses, certifications, and conferences." },
  { icon: Users, t: "Senior mentorship", d: "Weekly pairing and design reviews with engineers who care about craft." },
];

function Careers() {
  return (
    <div className="relative">
      <section className="relative overflow-hidden border-b border-border/60 dot-grid">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            We're hiring — {roles.length} open roles
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6 }}
            className="mt-5 font-display text-4xl font-bold tracking-tight md:text-6xl"
          >
            <GlitchText text="Build things" /> that stay built.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.6 }}
            className="mt-5 max-w-2xl text-muted-foreground"
          >
            Alaiya Technologies (Sole Proprietorship) is a small senior team shipping cloud, AI, and custom software.
            If you like owning problems end to end, we'd like to talk.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#open-roles" className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
              See open roles
            </a>
            <a href="tel:+919106158544" className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-card transition">
              <Phone className="h-4 w-4" /> Call +91 91061 58544
            </a>
          </motion.div>
        </div>
      </section>

      <section id="open-roles" className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Open roles</h2>
          <p className="mt-2 text-muted-foreground">Don't see a match? Call us anyway — we hire for talent, not tickets.</p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {roles.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06}>
              <TiltCard className="group h-full rounded-xl border border-border/60 bg-card/60 p-6 backdrop-blur">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold">{r.title}</h3>
                  <span className="shrink-0 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                    {r.type}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{r.desc}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{r.loc}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{r.exp}</span>
                  <span className="inline-flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />{r.type}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.stack.map((s) => (
                    <span key={s} className="rounded-md border border-border/60 bg-background/60 px-2 py-1 font-mono text-[11px] text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <Link
                  to="/careers/$roleSlug"
                  params={{ roleSlug: r.slug }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  View role &amp; apply <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Why work here</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.07}>
                <TiltCard className="h-full rounded-xl border border-border/60 bg-background/60 p-6">
                  <p.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-display font-semibold">{p.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">How hiring works</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            { n: "01", t: "Reach out", d: "Call us with a short intro and links to your work." },
            { n: "02", t: "Intro chat", d: "A 30-minute conversation about your experience and interests." },
            { n: "03", t: "Practical round", d: "A small, paid, real-world task — no whiteboard trivia." },
            { n: "04", t: "Offer", d: "Decision and offer within a week of the final round." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="relative h-full rounded-xl border border-border/60 bg-card/50 p-6">
                <span className="font-mono text-xs text-primary">{s.n}</span>
                <h3 className="mt-2 font-display font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 rounded-2xl border border-border/60 bg-card/60 p-8 text-center">
            <h3 className="font-display text-2xl font-semibold">Ready to apply?</h3>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Applications to Alaiya Technologies (Sole Proprietorship) are handled over the phone. Call us and mention the role you're interested in.
            </p>
            <a href="tel:+919106158544" className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
              <Phone className="h-4 w-4" /> +91 91061 58544
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
