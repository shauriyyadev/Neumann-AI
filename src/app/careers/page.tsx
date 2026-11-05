import Link from "next/link";

export const metadata = {
  title: "Careers",
  description:
    "Remote-first, written decisions, and a product people trust with irreversible actions. Three roles open today.",
  openGraph: {
    title: "Careers",
    description:
      "Remote-first, written decisions, and a product people trust with irreversible actions. Three roles open today.",
    type: "website",
    siteName: "Neumann",
  },
};

const principles = [
  {
    title: "Remote-first, not remote-only",
    body: "Four overlapping hours a day, hubs in San Francisco and Berlin, and two weeks a year together in person. The overlap is the point — decisions move in the window when we are all awake.",
  },
  {
    title: "Decisions in writing",
    body: "Proposals before meetings. If it matters, it is a document people can argue with asynchronously, and the argument stays attached to the decision.",
  },
  {
    title: "Everyone talks to customers",
    body: "Engineers and designers take support rotations. You see what broke before it reaches a dashboard, and you hear it in the customer’s own words.",
  },
];

const roles = [
  {
    title: "Product engineer — runs & approvals",
    team: "Engineering",
    type: "Full-time",
    place: "Remote · US / EU",
    subject: "Product%20engineer%20application",
    body: "Own the run timeline, the approval flow, and step logging end to end. You will ship features from proposal to production, debug live runs alongside customers, and keep dense tables legible on every screen.",
    stack: "TypeScript · React · Postgres",
  },
  {
    title: "Design engineer",
    team: "Design",
    type: "Full-time",
    place: "Remote · US / EU",
    subject: "Design%20engineer%20application",
    body: "Split time between the marketing site and product surfaces. You write the CSS you design with, own pages from wireframe to deployed HTML, and care about type, contrast, and empty states as much as the happy path.",
    stack: "CSS · React · Next.js",
  },
  {
    title: "Customer engineer",
    team: "Customer",
    type: "Full-time",
    place: "Remote · US hours",
    subject: "Customer%20engineer%20application",
    body: "Design the first workflow for new teams, in their tools, during implementation calls. You turn one messy process into a running agent, write templates other teams start from, and feed what breaks back to product weekly.",
    stack: "APIs · SQL · implementation calls",
  },
];

const benefits = [
  ["Health cover", "US & EU"],
  ["Co-working", "$200 / month"],
  ["Time off", "4 weeks PTO"],
  ["Learning", "$1,500 / year"],
  ["Retreats", "Two a year"],
  ["Equity", "Every full-time role"],
];

export default function Page() {
  return (
    <>
      <section className="pt-14 md:pt-20 pb-10 md:pb-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-x-14 gap-y-8 items-end">
            <div className="reveal">
              <div className="eyebrow">
                <span className="n">06</span> / Careers
              </div>
              <h1 className="font-display font-semibold t-l mt-3 max-w-[15ch]">
                Small team, real ownership.
              </h1>
              <p className="lede mt-4 max-w-2xl">
                We are 23 people building a product that gets trusted with
                irreversible actions. Three roles are open. We hire slowly and
                answer every application.
              </p>
            </div>

            <dl className="reveal grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-5 lg:mt-2">
              {[
                ["Open roles", "03"],
                ["Team", "23 people"],
                ["Countries", "06"],
                ["Reply time", "5 days"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                    {k}
                  </dt>
                  <dd className="mt-1.5 font-display text-[1.1rem] leading-snug text-ink">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] gap-8 lg:gap-16 items-start">
            <div className="reveal lg:sticky lg:top-28">
              <div className="eyebrow">How we work</div>
              <h2 className="font-display font-semibold t-l mt-3 max-w-[14ch]">
                Three habits, held to.
              </h2>
              <p className="lede mt-4 max-w-sm">
                They are not perks. They are how the work gets done when nobody
                is in the room.
              </p>
            </div>

            <ol className="border-t border-line">
              {principles.map((p, i) => (
                <li
                  key={p.title}
                  className="reveal grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 border-b border-line py-6 first:border-t-0"
                >
                  <span className="pt-1 font-mono text-[0.6875rem] tabular-nums text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.35rem] leading-snug text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        id="roles"
        className="bg-band border-y border-line py-16 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="reveal flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
            <div>
              <div className="eyebrow">Open roles</div>
              <h2 className="font-display font-semibold t-l mt-3">
                Three seats, no queues.
              </h2>
            </div>
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
              Updated September 2026
            </span>
          </div>

          <ul className="border-b border-line">
            {roles.map((r, i) => (
              <li
                key={r.title}
                className="reveal grid gap-x-8 gap-y-4 border-t border-line py-7 first:border-t-0 lg:grid-cols-[2rem_minmax(0,1.25fr)_minmax(0,0.75fr)]"
              >
                <span className="pt-1 font-mono text-[0.6875rem] tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="font-display text-[1.45rem] leading-snug text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
                    {r.body}
                  </p>
                  <p className="mt-3 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-muted">
                    {r.stack}
                  </p>
                </div>

                <div className="flex flex-col gap-4 lg:items-end lg:text-right">
                  <p className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-muted">
                    {r.team} · {r.type} · {r.place}
                  </p>
                  <a
                    href={`mailto:careers@neumann.example?subject=${r.subject}`}
                    className="group inline-flex items-center gap-2 self-start border-b border-line-strong py-2 pb-1 text-sm text-ink transition-colors hover:text-accent-text lg:self-end"
                  >
                    Apply for this role
                    <span
                      aria-hidden="true"
                      className="text-[1rem] text-accent-text transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)]">
            <div className="reveal">
              <div className="eyebrow">What we offer</div>
              <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
                Same package in every country, adjusted only where local law
                requires it.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 border-t border-line sm:grid-cols-3">
              {benefits.map(([k, v]) => (
                <div key={k} className="border-b border-line py-3.5">
                  <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-muted">
                    {k}
                  </dt>
                  <dd className="mt-1 text-[0.875rem] text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-muted reveal">
            Nothing fits? Write to{" "}
            <a
              href="mailto:hello@neumann.example"
              className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-text"
            >
              hello@neumann.example
            </a>{" "}
            anyway — tell us what you would automate first.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-line">
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-[minmax(0,1.2fr)_auto] items-center gap-8 reveal">
          <div>
            <h2 className="font-display font-semibold t-l max-w-[20ch]">
              Not ready to apply, but curious?
            </h2>
            <p className="mt-3 text-muted text-[.9375rem] leading-relaxed max-w-xl">
              Read how we think about approvals, audit trails, and pricing before
              you write a line of code.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/blog" className="btn btn-primary">
              Read the blog
            </Link>
            <Link href="/about" className="btn btn-ghost">
              About the team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
