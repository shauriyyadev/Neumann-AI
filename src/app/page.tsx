import Link from "next/link";
import Workspace from "@/components/Workspace";
import DemoForm from "@/components/DemoForm";
import UseCaseSelector from "@/components/UseCaseSelector";
import HeroAbstract from "@/components/HeroAbstract";
import FaqList from "@/components/FaqList";
import SignalBand from "@/components/SignalBand";

export const metadata = {
  title: "Neumann — AI agents that do real work",
  description:
    "Neumann runs multi-step AI workflows in your own tools, with human approval before anything irreversible and a record of every run.",
  openGraph: {
    title: "Neumann — AI agents that do real work",
    description:
      "Run multi-step AI workflows in your own tools — with human approval before anything irreversible and a record of every run.",
    type: "website",
    siteName: "Neumann",
    locale: "en_US",
  },
};

export default function Home() {
  return (
    <>
      {/* ---------------- hero / product ---------------- */}
      <section
        id="product"
        className="sec-lit relative overflow-hidden pt-6 pb-12 md:pt-4 md:pb-16"
      >
        <HeroAbstract />
        <div className="relative mx-auto max-w-4xl px-5">
          <div className="reveal text-center">
            <span className="capsule mb-5 inline-flex">
              <span className="pip" aria-hidden="true" />
              SOC 2 Type II · SSO &amp; SCIM
            </span>
            <h1 className="font-display t-hero mx-auto max-w-[22ch]">
              AI agents that{" "}
              <em className="italic text-accent-text">do real work.</em>
            </h1>
            <p className="lede hero-lede mx-auto mt-5 max-w-3xl">
              Neumann runs the work between your tools — and pauses for a
              person before anything irreversible.
            </p>
            <div className="mx-auto mt-6 flex w-full max-w-[20rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
              <a href="#demo" className="btn btn-primary">
                Start free trial
              </a>
              <a href="#security" className="btn btn-ghost">
                See how it works
              </a>
            </div>
          </div>
        </div>

        {/* the product surface is deliberately held back from the punchline */}
        <div className="relative mx-auto mt-[15.5vh] max-w-6xl px-5 reveal">
          <Workspace />
        </div>
      </section>

      {/* ---------------- use cases ---------------- */}
      <section id="use-cases" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl reveal">
            <div className="eyebrow">
              <span className="n">02</span> / Use cases
            </div>
            <h2 className="font-display font-semibold t-l mt-3">
              Where teams start
            </h2>
          </div>
          <UseCaseSelector />
        </div>
      </section>

      {/* ---------------- signals ---------------- */}
      <SignalBand />

      {/* ---------------- security ---------------- */}
      <section
        id="security"
        className="sec-lit relative overflow-hidden bg-band border-y border-line py-20 md:py-28"
      >
        <span className="amb amb-b" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] gap-x-14 gap-y-12 items-start">
            <div className="reveal">
              <div className="eyebrow">
                <span className="n">04</span> / Security
              </div>
              <h2 className="font-display font-semibold t-l mt-3 max-w-[18ch]">
                Agents see only what you grant.
              </h2>

              <dl className="mt-9 border-b border-line">
                {[
                  [
                    "Access",
                    "Read-only by default. Writes are scoped per tool and checked on every run.",
                  ],
                  [
                    "Audit",
                    "An immutable log of what ran, what it read, and who approved it. Export any time.",
                  ],
                  [
                    "Data",
                    "US or EU, encrypted in transit and at rest. Never used to train models.",
                  ],
                  [
                    "Compliance",
                    "SOC 2 Type II, SSO & SCIM, DPA and custom SLA on Enterprise.",
                  ],
                ].map(([k, v], i) => (
                  <div
                    key={k}
                    className="grid grid-cols-[2rem_minmax(0,1fr)] sm:grid-cols-[2rem_7rem_minmax(0,1fr)] gap-x-4 border-t border-line py-4"
                  >
                    <span className="font-mono text-[0.6875rem] tabular-nums text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <dt className="text-[0.9375rem] font-medium text-ink">
                      {k}
                    </dt>
                    <dd className="col-start-2 mt-1 text-[0.9375rem] leading-relaxed text-muted sm:col-start-3 sm:mt-0">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link href="/security" className="btn btn-ghost btn-sm mt-7">
                Security details
              </Link>
            </div>

            <figure className="reveal lg:mt-14">
              <div className="mb-2.5 flex items-center justify-between gap-4 border-b border-line pb-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
                <span>A typical grant</span>
              </div>
              <div className="grant">
                <div className="g-line flex items-center justify-between gap-4 border-b px-4 py-3">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] g-muted">
                    Finance / Refunds
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] g-ok">
                    <span className="h-1 w-1 rounded-full bg-current" />
                    Scoped
                  </span>
                </div>

                <div className="px-4 pt-4">
                  <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] g-faint">
                    Tool scope
                  </p>
                  <ul className="mt-2">
                    {[
                      ["stripe.charges.read", "Read", "Granted", "g-ok"],
                      ["stripe.refunds.write", "Write", "Approval", "g-wait"],
                      ["netsuite.journal.read", "Read", "Granted", "g-ok"],
                      ["payroll.runs.write", "Write", "Denied", "g-err"],
                    ].map(([tool, access, status, tone]) => (
                      <li
                        key={tool}
                        className="g-line grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 border-t py-2.5 first:border-t-0"
                      >
                        <span className="truncate font-mono text-[0.6875rem] g-muted">
                          {tool}
                        </span>
                        <span
                          className={`font-mono text-[0.5625rem] uppercase tracking-[0.12em] ${tone}`}
                        >
                          {status}
                        </span>
                        <span className="col-start-1 font-mono text-[0.5625rem] uppercase tracking-[0.12em] g-faint">
                          {access}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="g-gate mt-4 px-4 py-3">
                  <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] g-wait">
                    Gate
                  </p>
                  <p className="mt-1 text-[0.75rem] leading-relaxed g-muted">
                    refund.issue waits for a named approver — every time, not
                    only above a threshold.
                  </p>
                </div>

                <p className="g-line border-t px-4 py-3 font-mono text-[0.5625rem] uppercase tracking-[0.12em] g-faint">
                  Permissions are read at each step
                </p>
              </div>
            </figure>
          </div>

          <div
            data-rule-strip
            className="mt-14 grid gap-x-10 gap-y-7 border-t border-line pt-8 md:grid-cols-3 lg:mt-16"
          >
            {[
              [
                "The rule",
                "Nothing irreversible runs without a named approver — refunds, contract edits, payroll.",
              ],
              [
                "Where it stops",
                "At the step you choose, not at the end.",
              ],
              [
                "What is left behind",
                "One record per run: what it read, what changed, who signed off.",
              ],
            ].map(([label, line]) => (
              <div key={label} className="reveal">
                <div className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
                  {label}
                </div>
                <p className="mt-2 font-display text-[1.2rem] leading-snug text-ink">
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- company story ---------------- */}
      <section id="company" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 grid lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] gap-8 lg:gap-16 items-start">
          <div className="reveal">
            <div className="eyebrow">
              <span className="n">05</span> / Company
            </div>
            <h2 className="font-display font-semibold t-l mt-3 max-w-[16ch]">
              Automation you could build — never trust.
            </h2>
            <Link
              href="/about"
              className="mt-5 inline-flex items-center gap-2 text-sm text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-text"
            >
              Read the longer story
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="reveal">
            <p className="dropcap max-w-2xl text-[.9375rem] leading-relaxed text-muted">
              We were running operations at two companies that had automated
              themselves into a corner: thousands of brittle zaps, no record of
              what ran, and a standing rule that nobody touched production on
              Fridays. So we built the thing we wanted — agents that work in the
              open, one run at a time, with a pause before anything you cannot
              undo.
            </p>

            <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 border-t border-line pt-5">
              {[
                ["Founded", "2024"],
                ["Team", "23 people, 6 countries"],
                ["Offices", "San Francisco + Berlin"],
                ["Funding", "Bootstrapped"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                    {k}
                  </dt>
                  <dd className="mt-1.5 text-[0.8125rem] leading-snug text-ink">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------------- why neumann ---------------- */}
      <section
        id="why"
        className="bg-band border-y border-line py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl reveal">
            <div className="eyebrow">
              <span className="n">06</span> / Why Neumann
            </div>
            <h2 className="font-display font-semibold t-l mt-3">
              Three words we design against
            </h2>
          </div>
          <div className="mt-12 flex flex-col">
            {[
              {
                word: "Execute",
                body: "Agents do the work — reads, drafts, writes — across your tools, step by step, in the open.",
              },
              {
                word: "Control",
                body: "You decide what needs a person. Approval gates sit in front of anything irreversible.",
              },
              {
                word: "Understand",
                body: "Every run is a record: what was read, what changed, how long it took — readable by the person who owns the process.",
              },
            ].map((w, i) => (
              <div
                key={w.word}
                data-why-row
                style={{ transitionDelay: `${i * 80}ms` }}
                className="reveal grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-x-10 gap-y-4 py-9 border-t border-line last:border-b last:pb-10 items-start"
              >
                <div className="flex items-baseline gap-4">
                  <span className="hidden font-mono text-[0.5625rem] tabular-nums tracking-[0.16em] text-muted md:inline">
                    0{i + 1}
                  </span>
                  <span className="font-display font-medium text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.05] tracking-[-0.015em] text-ink">
                    {w.word}
                  </span>
                </div>
                <div className="md:pt-1.5">
                  <p className="max-w-[46ch] text-[1rem] leading-[1.7] text-muted">
                    {w.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-10 grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-x-10 gap-y-3">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
              The test we apply
            </p>
            <div>
              <p className="font-display text-[clamp(1.3rem,2.3vw,1.9rem)] leading-[1.28] tracking-tight text-ink">
                If a run cannot be explained to the person who owns the
                process, it is not finished.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- pricing (compact) ---------------- */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6 reveal">
            <div className="max-w-2xl">
              <div className="eyebrow">
                <span className="n">07</span> / Pricing
              </div>
              <h2 className="font-display font-semibold t-l mt-3">
                Per workspace, not per seat
              </h2>
              <p className="lede mt-3 max-w-xl">
                Approval gates, the run record, and unlimited reviewers are in
                every plan. Start with 14 days free.
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <div
                className="inline-flex gap-0.5 rounded-full border border-line-strong p-0.5"
                role="group"
                aria-label="Billing cycle"
              >
                <button
                  type="button"
                  className="cycle-btn on"
                  data-cycle="monthly"
                  aria-pressed="true"
                >
                  Monthly
                </button>
                <button
                  type="button"
                  className="cycle-btn"
                  data-cycle="annual"
                  aria-pressed="false"
                >
                  Annual <span className="text-accent-text">−20%</span>
                </button>
              </div>
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-muted">
                Prices in USD · per workspace
              </span>
            </div>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              {
                name: "Starter",
                desc: "For one team automating its first workflows.",
                price: "$29",
                monthly: "29",
                annual: "23",
                features: ["3 agents", "2,000 runs per month", "30-day run history"],
                cta: "Start free trial",
                primary: false,
              },
              {
                name: "Team",
                desc: "For operations running agents in production.",
                price: "$99",
                monthly: "99",
                annual: "79",
                features: [
                  "15 agents",
                  "20,000 runs per month",
                  "Approvals & audit log",
                  "SSO",
                ],
                cta: "Start free trial",
                primary: true,
              },
              {
                name: "Enterprise",
                desc: "For companies with residency and review needs.",
                price: "Custom",
                features: ["Unlimited agents & runs", "Regional data residency", "DPA, SLA, dedicated environments"],
                cta: "Compare plans",
                primary: false,
              },
            ].map((p, i) => (
              <div
                key={p.name}
                className={`plan-card card relative p-7 flex flex-col ${p.primary ? "plan-featured" : ""} reveal`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
                    Plan {String(i + 1).padStart(2, "0")}
                  </span>
                  {p.primary && (
                    <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-accent-text">
                      Most teams
                    </span>
                  )}
                </div>
                <h3 className="font-display text-[1.65rem] mt-4">{p.name}</h3>
                <p className="mt-1.5 text-sm text-muted min-h-[2.6rem]">
                  {p.desc}
                </p>
                <div className="mt-5 border-b border-line pb-5">
                  <div className="font-display text-[2.75rem] leading-none num">
                    {p.monthly ? (
                      <span
                        className="price num"
                        data-monthly={p.monthly}
                        data-annual={p.annual}
                      >
                        {p.price}
                      </span>
                    ) : (
                      p.price
                    )}
                  </div>
                  <div className="mt-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                    {p.monthly ? (
                      <>
                        per month ·{" "}
                        <span className="billing-note">billed monthly</span>
                      </>
                    ) : (
                      "annual contract"
                    )}
                  </div>
                </div>
                <ul className="mt-1 flex-1 text-sm text-muted">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-2.5 border-b border-line py-2.5 last:border-b-0"
                    >
                      <span className="text-accent-text" aria-hidden="true">
                        —
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={p.primary ? "/#demo" : "/pricing"}
                  className={`btn mt-6 w-full ${p.primary ? "btn-primary" : "btn-ghost"}`}
                >
                  {p.cta}
                </a>
              </div>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-line pt-5 text-[0.8125rem] text-muted reveal">
            {[
              "Approval gates on every write",
              "Append-only audit log",
              "Unlimited reviewers",
              "14-day trial, no card",
              "SOC 2 Type II",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-accent-text" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-t border-line pt-5 reveal">
            <div className="max-w-xl space-y-2">
              <p className="text-sm text-muted">
                A run is one task completed end to end. Paused runs do not count.
              </p>
              <p className="text-xs leading-relaxed text-muted">
                Need more capacity? Extra runs are $12 per 1,000 on Starter and
                Team.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-sm text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-text"
            >
              Full pricing and limits
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section
        id="faq"
        className="bg-band border-y border-line py-20 md:py-28"
      >
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] gap-10 lg:gap-16 items-start">
            <div className="reveal lg:sticky lg:top-28">
              <div className="eyebrow">
                <span className="n">08</span> / FAQ
              </div>
              <h2 className="font-display font-semibold t-l mt-3">Questions</h2>

              <div className="mt-8 max-w-sm border-t border-line pt-5">
                <a
                  href="#demo"
                  className="inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink transition-colors hover:text-accent-text"
                >
                  Book a 30-minute demo
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <FaqList
              className="reveal lg:mt-8"
              items={[
                {
                  id: "faq-capabilities",
                  q: "What can an agent actually do?",
                  a: "Anything your tools' APIs allow: read records, draft replies, update fields, route work. Agents run step by step and stop wherever you set an approval.",
                },
                {
                  id: "faq-approvals",
                  q: "How do approvals work?",
                  a: "You choose which steps need a person. When a run reaches one, it pauses and shows the inputs and the proposed action. Nothing irreversible runs without sign-off.",
                },
                {
                  id: "faq-difference",
                  q: "How is this different from a workflow tool?",
                  a: "A workflow tool connects apps. A Neumann agent reads the situation, decides the next step, acts across several tools, and stops for a person when the path is unclear or the action cannot be undone.",
                },
                {
                  id: "faq-tools",
                  q: "Which tools connect today?",
                  a: "Slack, Zendesk, HubSpot, Salesforce, Stripe, NetSuite, GitHub, Postgres, Notion, and any REST API through webhooks. Custom connectors usually take a day.",
                },
                {
                  id: "faq-data",
                  q: "Where does our data live?",
                  a: "US or EU, encrypted in transit and at rest. Your data is never used to train models, and runs can be exported or deleted at any time.",
                },
                {
                  id: "faq-failures",
                  q: "What happens when a run fails?",
                  a: "The agent stops, keeps its partial work, and posts to the channel you chose. Retry from the failed step or take over by hand.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ---------------- final cta ---------------- */}
      <section id="demo" className="closing relative py-20 md:py-28">
        <span className="crosshair -top-1 left-5" aria-hidden="true" />
        <span className="crosshair -top-1 right-5" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] gap-12 lg:gap-16 items-end">
            <div className="reveal">
              <div className="eyebrow">
                <span className="n">09</span> / Get started
              </div>
              <h2 className="font-display font-semibold t-l mt-3 max-w-[14ch]">
                Start with one workflow.
              </h2>
              <p className="lede mt-4 max-w-md">
                Bring one repetitive process. We will show you exactly how it
                would run.
              </p>
            </div>

            <div className="reveal">
              <p className="border-t border-[var(--border)] pt-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
                Start a trial
              </p>
              <DemoForm />
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
                Prefer a walkthrough? Start the trial and we will set up the
                first workflow with you — 30 minutes, no slides.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

