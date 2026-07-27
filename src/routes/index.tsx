import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

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

function Index() {
  const { t } = useI18n();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

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

  return (
    <>
      <section ref={heroRef} className="gradient-hero relative">
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <div className="blob left-[-10%] top-[-10%] h-[380px] w-[380px]" style={{ background: "var(--color-primary)" }} aria-hidden />
        <div className="blob right-[-8%] top-[20%] h-[420px] w-[420px]" style={{ background: "var(--color-accent)", animationDelay: "-6s" }} aria-hidden />

        <motion.div style={{ y, opacity }} className="mx-auto max-w-6xl px-6 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-border bg-card/80 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground"
            >
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="mt-10 flex flex-wrap gap-3">
              <motion.a whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} href="#services" className="inline-flex rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20">
                {t("hero.cta.services")}
              </motion.a>
              <motion.a whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} href="tel:+919106158544" className="inline-flex rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground">
                {t("hero.cta.call")}
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t("services.title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("services.sub")}</p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <motion.div whileHover={{ rotate: 8, scale: 1.1 }} className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent" />
                  <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
          <Reveal>
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t("cta.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("cta.desc")}</p>
              <div className="mt-8 flex gap-3">
                <Link to="/terms" className="text-sm font-medium text-primary hover:underline">{t("nav.terms")} →</Link>
                <Link to="/privacy" className="text-sm font-medium text-primary hover:underline">{t("nav.privacy")} →</Link>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.v} delay={i * 0.08}>
                <motion.div whileHover={{ scale: 1.04, y: -3 }} className="rounded-xl border border-border bg-background p-6">
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
