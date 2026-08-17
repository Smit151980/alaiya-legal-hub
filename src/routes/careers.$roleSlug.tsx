import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  Paperclip,
  Phone,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { GlitchText } from "@/components/GlitchText";
import { TiltCard } from "@/components/TiltCard";
import { getRole } from "@/lib/roles";
import { submitApplication } from "@/lib/applications.functions";

export const Route = createFileRoute("/careers/$roleSlug")({
  loader: ({ params }) => {
    const role = getRole(params.roleSlug);
    if (!role) throw notFound();
    return { role };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.role
      ? `${loaderData.role.title} — Careers at Alaiya Technologies`
      : "Role — Careers at Alaiya Technologies";
    const description = loaderData?.role
      ? `${loaderData.role.desc} Apply online with your resume for the ${loaderData.role.title} role at Alaiya Technologies.`
      : "Apply online for open roles at Alaiya Technologies.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: RolePage;
});

const MAX_BYTES = 5 * 1024 * 1024;

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("Could not read the selected file"));
    reader.readAsDataURL(file);
  });
}

function ApplicationForm({ roleSlug, roleTitle }: { roleSlug: string; roleTitle: string }) {
  const submit = useServerFn(submitApplication);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (fullName.trim().length < 2) return setError("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Enter a valid email address.");
    if (!file) return setError("Please attach your resume.");
    if (file.size > MAX_BYTES) return setError("Resume must be smaller than 5MB.");

    setStatus("sending");
    try {
      const resumeBase64 = await fileToBase64(file);
      await submit({
        data: {
          roleSlug,
          roleTitle,
          fullName: fullName.trim(),
          email: email.trim(),
          message: message.trim(),
          resumeName: file.name,
          resumeType: file.type || "application/octet-stream",
          resumeBase64,
        },
      });
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div id="apply" className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur md:p-8">
      <h2 className="font-display text-2xl font-semibold">Apply for this role</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Send your details and resume — we review every application and reply by phone or email.
      </p>

      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 rounded-xl border border-primary/40 bg-primary/10 p-6 text-center"
          >
            <motion.span
              initial={{ scale: 0.4, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16 }}
              className="inline-flex"
            >
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </motion.span>
            <h3 className="mt-4 font-display text-xl font-semibold">Application received</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Thanks {fullName.split(" ")[0]} — your application for {roleTitle} is with our team. We'll
              be in touch at {email} within a few working days.
            </p>
            <Link
              to="/careers"
              className="mt-6 inline-flex rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-background transition"
            >
              Browse other roles
            </Link>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 grid gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Full name</span>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  maxLength={100}
                  required
                  placeholder="Your name"
                  className="rounded-md border border-border bg-background/70 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  required
                  placeholder="you@example.com"
                  className="rounded-md border border-border bg-background/70 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm">
              <span className="font-medium">Resume (PDF or DOC, max 5MB)</span>
              <div className="flex flex-wrap items-center gap-3 rounded-md border border-dashed border-border/80 bg-background/50 px-3 py-3">
                <Paperclip className="h-4 w-4 text-primary" />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="text-xs text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary-foreground"
                />
                {file && (
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                )}
              </div>
            </label>

            <label className="grid gap-2 text-sm">
              <span className="font-medium">Anything else? (optional)</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={1000}
                rows={4}
                placeholder="Links to your work, notice period, or a short intro."
                className="rounded-md border border-border bg-background/70 px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </label>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-destructive"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition disabled:opacity-70"
            >
              {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
              {status === "sending" ? "Submitting…" : "Submit application"}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function RolePage() {
  const { role } = Route.useLoaderData();

  return (
    <div className="relative">
      <section className="border-b border-border/60 dot-grid">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-4 w-4" /> All roles
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl"
          >
            <GlitchText text={role.title} />
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{role.loc}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{role.exp}</span>
            <span className="inline-flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />{role.type}</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.5 }}
            className="mt-6 max-w-2xl text-muted-foreground"
          >
            {role.about}
          </motion.p>
          <div className="mt-6 flex flex-wrap gap-2">
            {role.stack.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="rounded-md border border-border/60 bg-background/60 px-2 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {s}
              </motion.span>
            ))}
          </div>
          <a
            href="#apply"
            className="mt-8 inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Apply now
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <TiltCard className="h-full rounded-xl border border-border/60 bg-card/60 p-6">
              <h2 className="font-display text-lg font-semibold">What you'll do</h2>
              <ul className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
                {role.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2"><span className="text-primary">▹</span>{r}</li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
          <Reveal delay={0.08}>
            <TiltCard className="h-full rounded-xl border border-border/60 bg-card/60 p-6">
              <h2 className="font-display text-lg font-semibold">What we look for</h2>
              <ul className="mt-4 grid gap-2.5 text-sm text-muted-foreground">
                {role.requirements.map((r) => (
                  <li key={r} className="flex gap-2"><span className="text-primary">▹</span>{r}</li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12">
            <ApplicationForm roleSlug={role.slug} roleTitle={role.title} />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Prefer to talk first? Call Alaiya Technologies (Sole Proprietorship) at{" "}
            <a href="tel:+919106158544" className="inline-flex items-center gap-1 text-primary hover:underline">
              <Phone className="h-3.5 w-3.5" /> +91 91061 58544
            </a>
          </p>
        </Reveal>
      </section>
    </div>
  );
}
