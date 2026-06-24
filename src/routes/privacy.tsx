import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Alaiya Technologies" },
      { name: "description", content: "How Alaiya Technologies collects, uses, and protects your information." },
      { property: "og:title", content: "Privacy Policy — Alaiya Technologies" },
      { property: "og:description", content: "How Alaiya Technologies handles your data." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <header className="mb-12">
        <p className="text-sm text-muted-foreground">Last updated: January 2025</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          This page is maintained by Alaiya Technologies (Sole Proprietorship) ("Alaiya", "we", "us") to explain how we handle information when you use our website and services.
        </p>
      </header>

      <div className="space-y-10 text-foreground">
        <Section title="1. Information we collect">
          <p>We collect information you provide directly to us — such as your name, email, and any message content — when you contact us, request a proposal, or sign up for a service. We may also collect basic technical information automatically, like browser type, device, and pages visited, to improve our site.</p>
        </Section>
        <Section title="2. How we use information">
          <p>We use the information to respond to inquiries, deliver and improve our services, maintain security, and comply with legal obligations. We do not sell your personal information.</p>
        </Section>
        <Section title="3. Sharing">
          <p>We share information only with trusted service providers who help us operate our business (such as hosting, analytics, and communications), and only to the extent necessary. We may also disclose information when required by law.</p>
        </Section>
        <Section title="4. Data retention">
          <p>We retain personal information for as long as needed to provide services and for legitimate business or legal purposes. You may request deletion at any time.</p>
        </Section>
        <Section title="5. Your rights">
          <p>Depending on your location, you may have rights to access, correct, or delete personal data we hold about you, or to object to certain processing. To exercise these rights, contact us at the address below.</p>
        </Section>
        <Section title="6. Security">
          <p>We take reasonable technical and organizational measures to protect personal information. No method of transmission over the internet is fully secure, and we cannot guarantee absolute security.</p>
        </Section>
        <Section title="7. Changes">
          <p>We may update this policy from time to time. Updates will be reflected by the "Last updated" date at the top of this page.</p>
        </Section>
        <Section title="8. Contact">
          <p>Questions about this policy? Reach Alaiya Technologies (Sole Proprietorship) by phone at <a className="text-primary hover:underline" href="tel:+919106158544">+91 91061 58544</a>.</p>
        </Section>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}
