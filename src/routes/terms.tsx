import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Alaiya Technologies" },
      { name: "description", content: "The terms governing use of the Alaiya Technologies website and services." },
      { property: "og:title", content: "Terms of Service — Alaiya Technologies" },
      { property: "og:description", content: "Terms governing use of Alaiya Technologies services." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      <header className="mb-12">
        <p className="text-sm text-muted-foreground">Last updated: January 2025</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-muted-foreground">
          These terms govern your use of the website and services provided by Alaiya Technologies (Sole Proprietorship) ("Alaiya", "we", "us"). By using our site or services, you agree to these terms.
        </p>
      </header>

      <div className="space-y-10 text-foreground">
        <Section title="1. Use of services">
          <p>You agree to use our website and services only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment.</p>
        </Section>
        <Section title="2. Accounts">
          <p>If a service requires an account, you are responsible for safeguarding your credentials and for activity under your account. Notify us promptly of any unauthorized use.</p>
        </Section>
        <Section title="3. Intellectual property">
          <p>All content on this site — including text, graphics, logos, and software — is the property of Alaiya Technologies or its licensors and is protected by applicable intellectual property laws.</p>
        </Section>
        <Section title="4. Service deliverables">
          <p>Project-specific deliverables, ownership terms, and warranties are governed by the separate written agreement (Statement of Work or Master Services Agreement) signed with the client. In case of conflict, the signed agreement controls.</p>
        </Section>
        <Section title="5. Fees and payment">
          <p>Where services are paid, fees, schedules, and payment terms will be set out in the applicable order or agreement. Late payments may incur interest or suspension of services as permitted by law.</p>
        </Section>
        <Section title="6. Disclaimer">
          <p>The website and any free informational materials are provided "as is" without warranty of any kind. We do not warrant that the site will be uninterrupted or error-free.</p>
        </Section>
        <Section title="7. Limitation of liability">
          <p>To the maximum extent permitted by law, Alaiya Technologies shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website.</p>
        </Section>
        <Section title="8. Changes to terms">
          <p>We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.</p>
        </Section>
        <Section title="9. Governing law">
          <p>These terms are governed by the laws of India, the jurisdiction in which Alaiya Technologies (Sole Proprietorship) is registered, without regard to its conflict of law provisions.</p>
        </Section>
        <Section title="10. Contact">
          <p>For questions about these terms, call Alaiya Technologies (Sole Proprietorship) at <a className="text-primary hover:underline" href="tel:+919106158544">+91 91061 58544</a>.</p>
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
