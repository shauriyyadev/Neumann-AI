import Link from "next/link";
import FaqList from "@/components/FaqList";

export const metadata = {
  title: "Security",
  description:
    "Scoped permissions, approval gates, and complete run logs. SOC 2 Type II, SSO and SCIM, US/EU residency, no training on your data.",
  openGraph: {
    title: "Security",
    description:
      "Scoped permissions, approval gates, and complete run logs. SOC 2 Type II, SSO and SCIM, US/EU residency, no training on your data.",
    type: "website",
    siteName: "Neumann",
  },
};

const controls = [
  {
    title: "Scoped by default",
    body: "Each connection grants a named scope: read tickets, draft replies, update fields. An agent cannot exceed its scope, and any admin can revoke a connection without contacting us.",
    note: "Checked at run time",
  },
  {
    title: "Approvals before irreversible steps",
    body: "Deletes, refunds, publishes, and outbound sends pause until a person approves. You choose who approves — roles, groups, or named people.",
    note: "Named approver per step",
  },
  {
    title: "Every step on the record",
    body: "Each run logs the input, output, duration, and actor for every step. History is searchable, exportable to CSV and JSON, and retained on your plan’s schedule.",
    note: "Append-only, exportable",
  },
  {
    title: "Separated by workspace",
    body: "Connections, credentials, and run history belong to one workspace. Residency is chosen when the workspace is created and enforced for storage and processing.",
    note: "US or EU at creation",
  },
];

const handling = [
  [
    "Encryption",
    "TLS 1.2 or better in transit, AES-256 at rest. Keys are managed and rotated by our cloud provider.",
  ],
  [
    "Residency",
    "Choose US or EU when the workspace is created. Content and run history stay in that region.",
  ],
  [
    "Model training",
    "Your data is never used to train models — ours or anyone else’s. Model providers process prompts under zero-retention agreements.",
  ],
  [
    "Retention",
    "Run history runs 30 days on Starter, 90 on Team, and on your schedule for Enterprise.",
  ],
  [
    "Deletion",
    "Deletion is immediate. Backups age out within 35 days, and you get written confirmation on request.",
  ],
];

const attestations = [
  ["SOC 2 Type II", "Audited annually", "Report on request"],
  ["Penetration test", "Third-party, annual", "Summary on request"],
  ["SSO & SCIM", "SAML 2.0, Team and up", "SCIM 2.0"],
  ["GDPR & DPA", "Standard on every plan", "EU SCCs"],
  ["Subprocessors", "Published list", "30 days notice"],
];

const questions = [
  [
    "Can we see the SOC 2 report?",
    "Yes — under NDA. Ask through the trial form and our security team sends it within one business day.",
  ],
  [
    "Who at Neumann can see our data?",
    "Production access is limited to a small on-call group, granted just-in-time, and logged. Access reviews run quarterly.",
  ],
  [
    "What happens during an incident?",
    "We confirm, contain, and notify affected workspaces within 72 hours of confirmation, with a timeline of what was affected. Status is posted publicly.",
  ],
  [
    "Who are your subprocessors?",
    "Cloud hosting, model providers under zero-retention terms, payment processing, and transactional email. The list is published in our privacy policy with 30 days notice before changes.",
  ],
];

export default function Page() {
  return (
    <>
      <section className="pt-14 md:pt-20 pb-10 md:pb-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-x-14 gap-y-8 items-end">
            <div className="reveal">
              <div className="eyebrow">
                <span className="n">04</span> / Trust
              </div>
              <h1 className="font-display font-semibold t-l mt-3 max-w-[16ch]">
                Agents see only what you grant.
              </h1>
              <p className="lede mt-4 max-w-2xl">
                Scoped permissions, approval gates, and a complete record of
                every run. Here is exactly how that works — including what we
                cannot do yet.
              </p>
            </div>

            <dl className="reveal grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-5 lg:mt-2">
              {[
                ["Audit", "SOC 2 Type II"],
                ["Identity", "SSO & SCIM"],
                ["Residency", "US / EU"],
                ["Training", "Never"],
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
          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-x-14 gap-y-12 items-start">
            <div className="reveal">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <h2 className="font-display font-semibold t-s">
                  Four controls, every run
                </h2>
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                  01 — 04
                </span>
              </div>

              <dl className="border-b border-line">
                {controls.map((c, i) => (
                  <div
                    key={c.title}
                    className="border-t border-line py-5 first:border-t-0"
                  >
                    <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4">
                      <span className="pt-1 font-mono text-[0.6875rem] tabular-nums text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <dt className="font-display text-[1.25rem] leading-snug text-ink">
                          {c.title}
                        </dt>
                        <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">
                          {c.body}
                        </dd>
                        <dd className="mt-2.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-muted">
                          {c.note}
                        </dd>
                      </div>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <figure className="reveal lg:mt-10">
              <div className="mb-2.5 flex items-center justify-between gap-4 border-b border-line pb-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
                <span>Fig. 01 — a typical grant</span>
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
              <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
                Scopes are checked at run time. Revoking a tool stops the next
                step — it does not erase the record of the last one.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-band border-y border-line py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] gap-8 lg:gap-16 items-start">
            <div className="reveal lg:sticky lg:top-28">
              <div className="eyebrow">Data handling</div>
              <h2 className="font-display font-semibold t-l mt-3 max-w-[13ch]">
                Collected once, enforced everywhere.
              </h2>
              <p className="lede mt-4 max-w-sm">
                One set of rules for storage, processing, and deletion — not a
                setting buried per connector.
              </p>
            </div>

            <dl className="border-t border-line">
              {handling.map(([k, v], i) => (
                <div
                  key={k}
                  className="reveal grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 border-b border-line py-5 sm:grid-cols-[2rem_9rem_minmax(0,1fr)]"
                >
                  <span className="pt-0.5 font-mono text-[0.6875rem] tabular-nums text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <dt className="text-[0.9375rem] font-medium text-ink">{k}</dt>
                  <dd className="col-start-2 mt-1.5 text-[0.9375rem] leading-relaxed text-muted sm:col-start-3 sm:mt-0">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] gap-8 lg:gap-16 items-start">
            <div className="reveal">
              <div className="eyebrow">Attestations</div>
              <h2 className="font-display font-semibold t-l mt-3 max-w-[15ch]">
                Claims with paperwork behind them.
              </h2>
              <p className="lede mt-4 max-w-sm">
                If a badge is not listed here, we do not have it yet. Ask and we
                will say so.
              </p>
            </div>

            <dl className="border-t border-line">
              <div className="hidden grid-cols-[9rem_9.5rem_minmax(0,1fr)] gap-x-6 border-b border-line py-2 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted sm:grid">
                <span>Attestation</span>
                <span>Scope</span>
                <span>Detail</span>
              </div>
              {attestations.map(([name, scope, detail]) => (
                <div
                  key={name}
                  className="reveal grid gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[9rem_9.5rem_minmax(0,1fr)] sm:items-baseline"
                >
                  <dt className="text-[0.9375rem] font-medium text-ink">
                    {name}
                  </dt>
                  <dd className="hidden font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted sm:block">
                    {scope}
                  </dd>
                  <dd className="hidden font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted sm:block">
                    {detail}
                  </dd>
                  <dd className="text-[0.8125rem] leading-relaxed text-muted sm:hidden">
                    {scope} · {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-band border-y border-line py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] gap-10 lg:gap-16 items-start">
            <div className="reveal lg:sticky lg:top-28">
              <div className="eyebrow">Questions</div>
              <h2 className="font-display font-semibold t-l mt-3 max-w-[12ch]">
                The procurement conversation.
              </h2>
              <p className="lede mt-4 max-w-sm">
                Bring the questionnaire. The answers come from the engineers who
                built the controls.
              </p>

              <div className="mt-8 max-w-sm border-t border-line pt-5">
                <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                  Direct
                </p>
                <a
                  href="mailto:security@neumann.example"
                  className="mt-2 inline-flex items-center gap-2 text-sm text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-text"
                >
                  security@neumann.example
                </a>
              </div>
            </div>

            <FaqList
              className="reveal lg:mt-8"
              items={questions.map(([q, a], i) => ({
                id: `security-faq-${i + 1}`,
                q,
                a,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-line">
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-[minmax(0,1.2fr)_auto] items-center gap-8 reveal">
          <div>
            <h2 className="font-display font-semibold t-l max-w-[20ch]">
              Start on a trial. Keep the security review.
            </h2>
            <p className="mt-3 text-muted text-[.9375rem] leading-relaxed max-w-xl">
              Fourteen days, no card, and a written answer to every question on
              your list.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/#demo" className="btn btn-primary">
              Start free trial
            </Link>
            <Link href="/pricing" className="btn btn-ghost">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
