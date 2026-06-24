import { createFileRoute, Link } from "@tanstack/react-router";

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
  const services = [
    { title: "Cloud Engineering", desc: "Scalable infrastructure on AWS, GCP, and Azure built for reliability." },
    { title: "AI & Data Products", desc: "From model integration to data pipelines that drive real outcomes." },
    { title: "Custom Software", desc: "Web and mobile applications tailored to your operations." },
    { title: "Platform Modernization", desc: "Refactor legacy systems into resilient, future-ready platforms." },
  ];

  return (
    <>
      <section className="gradient-hero">
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              A modern software studio
            </span>
            <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">
              Engineering <span className="text-gradient">tomorrow's software</span>, today.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Alaiya Technologies (Sole Proprietorship) partners with founders and enterprises to design, build, and scale the digital products that move their business forward.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#services" className="inline-flex rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">Explore services</a>
              <a href="tel:+919106158544" className="inline-flex rounded-md border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:bg-muted">Call +91 91061 58544</a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What we do</h2>
          <p className="mt-4 text-muted-foreground">Focused capabilities, delivered by a small senior team.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="group rounded-2xl border border-border bg-card p-8 transition hover:border-primary/40 hover:shadow-lg">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-accent opacity-90" />
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/30">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built with care, shipped with confidence.</h2>
            <p className="mt-4 text-muted-foreground">
              We bring together engineers, designers, and product thinkers who care about craft. Every project is an opportunity to solve a real problem and ship something we're proud of.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/terms" className="text-sm font-medium text-primary hover:underline">Terms of Service →</Link>
              <Link to="/privacy" className="text-sm font-medium text-primary hover:underline">Privacy Policy →</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "10+", v: "Years combined experience" },
              { k: "30+", v: "Products shipped" },
              { k: "12", v: "Countries served" },
              { k: "99.9%", v: "Average uptime delivered" },
            ].map((stat) => (
              <div key={stat.v} className="rounded-xl border border-border bg-background p-6">
                <div className="font-display text-3xl font-bold text-gradient">{stat.k}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
