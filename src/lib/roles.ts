export type Role = {
  slug: string;
  title: string;
  type: string;
  loc: string;
  exp: string;
  stack: string[];
  desc: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
};

export const ROLES: Role[] = [
  {
    slug: "full-stack-engineer",
    title: "Full-Stack Engineer",
    type: "Full-time",
    loc: "Remote / India",
    exp: "2–5 yrs",
    stack: ["TypeScript", "React", "Node", "Postgres"],
    desc: "Own features end to end — from schema design to polished UI — on client and internal products.",
    about:
      "You'll work across the stack on client platforms and internal tooling, shipping small increments to production every week.",
    responsibilities: [
      "Design schemas, APIs, and UI for new product features",
      "Review code and pair with other engineers",
      "Own quality and observability for what you ship",
    ],
    requirements: [
      "Strong TypeScript and React fundamentals",
      "Comfort with relational data modelling",
      "Clear written communication in a remote team",
    ],
  },
  {
    slug: "cloud-devops-engineer",
    title: "Cloud / DevOps Engineer",
    type: "Full-time",
    loc: "Remote / India",
    exp: "3–6 yrs",
    stack: ["AWS", "Terraform", "Kubernetes", "CI/CD"],
    desc: "Build reliable, observable infrastructure and keep deployment pipelines fast and boring.",
    about:
      "You'll own infrastructure-as-code, release pipelines, and the reliability story across client environments.",
    responsibilities: [
      "Automate provisioning with Terraform",
      "Harden CI/CD pipelines and release safety",
      "Set up monitoring, alerting, and cost controls",
    ],
    requirements: [
      "Production AWS or GCP experience",
      "Kubernetes and container fundamentals",
      "Pragmatic approach to on-call and incident review",
    ],
  },
  {
    slug: "ai-ml-engineer",
    title: "AI / ML Engineer",
    type: "Full-time",
    loc: "Remote",
    exp: "2–5 yrs",
    stack: ["Python", "LLMs", "RAG", "Vector DBs"],
    desc: "Ship model-powered features: retrieval pipelines, evals, and production inference.",
    about:
      "You'll take model-powered ideas from prototype to production, with evaluation baked in from the start.",
    responsibilities: [
      "Build retrieval and inference pipelines",
      "Design evaluation harnesses for model quality",
      "Optimise latency and cost of inference",
    ],
    requirements: [
      "Hands-on LLM application experience",
      "Solid Python engineering practices",
      "Healthy scepticism about benchmarks",
    ],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    type: "Contract",
    loc: "Remote",
    exp: "3+ yrs",
    stack: ["Figma", "Design systems", "Prototyping"],
    desc: "Turn complex workflows into interfaces that feel obvious and fast.",
    about:
      "You'll shape product surfaces end to end — flows, systems, and the small interaction details that make software feel good.",
    responsibilities: [
      "Map complex workflows into clear flows",
      "Maintain and extend the design system",
      "Prototype interactions before build",
    ],
    requirements: [
      "Portfolio of shipped product work",
      "Strong systems thinking in Figma",
      "Comfort collaborating directly with engineers",
    ],
  },
  {
    slug: "engineering-intern",
    title: "Engineering Intern",
    type: "Internship",
    loc: "Remote / India",
    exp: "0–1 yr",
    stack: ["JavaScript", "Git", "Curiosity"],
    desc: "Six-month paid internship with real shipping work and senior mentorship.",
    about:
      "A six-month paid internship where you work on real tickets with a senior mentor and ship to production.",
    responsibilities: [
      "Pick up scoped tickets on live products",
      "Write tests and documentation for your work",
      "Join reviews and pairing sessions weekly",
    ],
    requirements: [
      "Working knowledge of JavaScript and Git",
      "Side projects or coursework you can talk through",
      "Strong appetite for feedback",
    ],
  },
  {
    slug: "qa-automation-engineer",
    title: "QA / Automation Engineer",
    type: "Full-time",
    loc: "Remote / India",
    exp: "2–4 yrs",
    stack: ["Playwright", "TypeScript", "API testing"],
    desc: "Own quality: automated suites, release checks, and regression safety nets.",
    about:
      "You'll own the automated safety net that lets a small team ship quickly without breaking things.",
    responsibilities: [
      "Build and maintain Playwright suites",
      "Automate API and regression coverage",
      "Define release readiness checks",
    ],
    requirements: [
      "Experience with modern E2E tooling",
      "TypeScript scripting ability",
      "Eye for edge cases and flaky-test triage",
    ],
  },
];

export function getRole(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}
