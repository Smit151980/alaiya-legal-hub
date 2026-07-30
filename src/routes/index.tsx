import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Terminal as TerminalIcon, Cloud, Sparkles, Code2, Database, Shield, GitBranch, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { Terminal } from "@/components/Terminal";
import { TechMarquee } from "@/components/TechMarquee";
import { CodeRain } from "@/components/CodeRain";
import { TechBadges } from "@/components/TechBadges";
import { CursorGlow } from "@/components/CursorGlow";
import { Counter } from "@/components/Counter";
import { TiltCard } from "@/components/TiltCard";
import { GlitchText } from "@/components/GlitchText";
import { CircuitLines } from "@/components/CircuitLines";
import { StatusPanel } from "@/components/StatusPanel";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alaiya Technologies — Engineering tomorrow's software" },
      { name: "description", content: "Alaiya Technologies designs and builds cloud platforms, AI products, and custom software for modern businesses." },
      { property: "og:title", content: "Alaiya Technologies" },
      { property: "og:description", content: "Cloud platforms, AI products, and custom software." },
    ],
  }),
  component: Index,
});

const SERVICE_ICONS = [Cloud, Sparkles, Code2, GitBranch];

function Index() {
  const { t } = useI18n();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 140]), { stiffness: 120, damping: 24 });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(6px)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);


  const services = [
    { title: t("s1.t"), desc: t("s1.d") },
    { title: t("s2.t"), desc: t("s2.d") },
    { title: t("s3.t"), desc: t("s3.d") },
    { title: t("s4.t"), desc: t("s4.d") },
  ];
  const stats = [
    { k: "10+", v: t("stat.exp") },
    { k: "30+", v: t("stat.ship") },
    { k: "12", v: t("stat.country") },
    { k: "99.9%", v: t("stat.uptime") },
  ];

  const workflow = [
    { icon: TerminalIcon, k: "01", t: "Discover", d: "Deep-dive workshops, tech audits, and roadmap alignment." },
    { icon: Code2, k: "02", t: "Prototype", d: "Rapid spikes with production-grade primitives from day one." },
    { icon: GitBranch, k: "03", t: "Ship", d: "Continuous delivery pipelines, feature flags, observability baked in." },
    { icon: Shield, k: "04", t: "Scale", d: "SRE playbooks, security hardening, cost & performance tuning." },
  ];

  return (
    <>
      <CursorGlow />
      <section ref={heroRef} className="gradient-hero relative">
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <div className="absolute inset-0 dot-grid opacity-40" aria-hidden />
        <CodeRain />
        <CircuitLines className="opacity-60" />
        <div className="blob left-[-10%] top-[-10%] h-[380px] w-[380px]" style={{ background: "var(--color-primary)" }} aria-hidden />
        <div className="blob right-[-8%] top-[20%] h-[420px] w-[420px]" style={{ background: "var(--color-accent)", animationDelay: "-6s" }} aria-hidden />

        <motion.div style={{ y, opacity, scale, filter: blur }} className="mx-auto max-w-6xl px-6 py-24 md:py-28 relative">

          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur px-3 py-1 text-xs font-mono font-medium text-primary"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                {t("hero.badge")}
              </motion.span>
              <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">
                {t("hero.title.a").split(" ").map((w, i) => (
                  <motion.span key={i} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }} className="inline-block mr-2">{w}</motion.span>
                ))}
                <motion.span initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-gradient inline-block">{t("hero.title.b")}</motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>{t("hero.title.c")}</motion.span>
              </h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="mt-6 text-lg text-muted-foreground md:text-xl">
                {t("hero.desc")}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="mt-8 flex flex-wrap gap-3">
                <motion.a whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} href="#services" className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30">
                  {t("hero.cta.services")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} href="tel:+919106158544" className="inline-flex items-center gap-2 rounded-md border border-border bg-card/80 backdrop-blur px-5 py-3 text-sm font-medium text-foreground">
                  <TerminalIcon className="h-4 w-4" />
                  {t("hero.cta.call")}
                </motion.a>
              </motion.div>
              <div className="mt-8">
                <TechBadges />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40, rotateY: -12 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
              style={{ transformPerspective: 1000 }}
            >
              <Terminal />
              <StatusPanel />
            </motion.div>

          </div>
        </motion.div>
      </section>

      <TechMarquee />

      <section id="services" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">// services</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              <GlitchText text={t("services.title")} />
            </h2>

            <p className="mt-4 text-muted-foreground">{t("services.sub")}</p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <TiltCard className="group neon-border relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                  <div className="scanline opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ rotate: 12, scale: 1.12 }}
                        transition={{ type: "spring", stiffness: 320, damping: 14 }}
                        className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30"
                      >
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </motion.div>
                      <span className="font-mono text-xs text-muted-foreground blink">0{i + 1}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    <div className="mt-6 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
                  </div>
                </TiltCard>
              </Reveal>

            );
          })}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border/60 bg-card/30">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="mx-auto max-w-6xl px-6 py-24 relative">
          <Reveal>
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">// workflow</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">How we build</h2>
              <p className="mt-4 text-muted-foreground">A pragmatic engineering loop tuned for velocity without cutting corners.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {workflow.map((w, i) => (
              <Reveal key={w.k} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative rounded-xl border border-border bg-background/70 backdrop-blur p-6 h-full"
                >
                  <div className="flex items-center justify-between">
                    <w.icon className="h-5 w-5 text-primary" />
                    <span className="font-mono text-xs text-muted-foreground">{w.k}</span>
                  </div>
                  <h3 className="mt-4 font-semibold">{w.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.d}</p>
                  {i < workflow.length - 1 && (
                    <div className="absolute -right-2 top-1/2 hidden md:block">
                      <ArrowRight className="h-4 w-4 text-primary/40" />
                    </div>
                  )}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary">// impact</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{t("cta.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("cta.desc")}</p>
              <div className="mt-8 flex gap-4">
                <Link to="/terms" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">{t("nav.terms")} <ArrowRight className="h-3 w-3" /></Link>
                <Link to="/privacy" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">{t("nav.privacy")} <ArrowRight className="h-3 w-3" /></Link>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.v} delay={i * 0.08}>
                <motion.div whileHover={{ scale: 1.04, y: -3 }} className="relative overflow-hidden rounded-xl border border-border bg-card p-6">
                  <Database className="absolute -right-3 -bottom-3 h-16 w-16 text-primary/5" />
                  <div className="font-display text-3xl font-bold text-gradient">{stat.k}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.v}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
