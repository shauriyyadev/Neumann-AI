import Link from "next/link";
import CapabilityMatrix from "@/components/CapabilityMatrix";

export const metadata = {
  title: "Pricing",
  description:
    "Per workspace, not per seat. Starter from $29, Team from $99, Enterprise custom. Every plan starts with a 14-day trial.",
  openGraph: {
    title: "Pricing",
    description:
      "Per workspace, not per seat. Starter from $29, Team from $99, Enterprise custom. Every plan starts with a 14-day trial.",
    type: "website",
    siteName: "Neumann",
  },
};

type Plan = {
  name: string;
  desc: string;
  price: string;
  monthly?: string;
  annual?: string;
  features: string[];
  cta: string;
  primary: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    desc: "For one team automating its first workflows.",
    price: "$29",
    monthly: "29",
    annual: "23",
    features: [
      "3 agents",
      "2,000 runs per month",
      "30-day run history",
      "Slack and email support",
    ],
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
      "Approval workflows and audit log",
      "SSO",
      "Priority support",
    ],
    cta: "Start free trial",
    primary: true,
  },
  {
    name: "Enterprise",
    desc: "For companies with residency and review needs.",
    price: "Custom",
    features: [
      "Unlimited agents and runs",
      "Regional data residency",
      "DPA, custom SLA, dedicated environments",
      "Named support engineer",
    ],
    cta: "Talk to sales",
    primary: false,
  },
];

export default function Page() {
  return (
    <>
      <section className="sec-lit relative overflow-hidden pt-14 md:pt-20 pb-10 md:pb-14">
        <span className="amb" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-5">
          <div className="max-w-3xl reveal">
            <div className="eyebrow">
              <span className="n">08</span> / Plans &amp; limits
            </div>
            <h1 className="font-display font-semibold t-l mt-3">Pricing</h1>
            <p className="lede mt-4 max-w-2xl">
              Per workspace, not per seat. Every plan starts with a 14-day
              trial, and inviting a reviewer never costs extra.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-4 reveal">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
              Billing
            </span>
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
            <span className="ml-auto font-mono text-[0.625rem] uppercase tracking-[0.13em] text-muted">
              Prices in USD
            </span>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="sr-only">Plans</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((p, i) => (
              <div
                key={p.name}
                className={`card relative p-7 flex flex-col reveal ${
                  p.primary ? "plan-featured" : ""
                }`}
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

                <Link
                  href="/#demo"
                  className={`btn mt-6 w-full ${
                    p.primary ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-x-10 gap-y-4 border-t border-line pt-5 reveal">
            <p className="text-xs leading-relaxed text-muted">
              A run is one task completed end to end, however many steps it
              takes. Paused runs waiting for approval do not count.
            </p>
            <p className="text-xs leading-relaxed text-muted">
              Unlimited reviewers on every plan. Annual billing saves 20% —
              $23 and $79 per month. Prices exclude tax.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-6 reveal">
            <div>
              <div className="eyebrow">
                <span className="n">08</span> / Compare
              </div>
              <h2 className="font-display font-semibold t-l mt-3">
                What each plan includes
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Approval gates, the run record, and unlimited reviewers are in
              every plan. Team is where most operations teams start.
            </p>
          </div>
          <div className="mt-8">
            <p className="mb-2 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted md:hidden">
              Swipe to compare →
            </p>
            <CapabilityMatrix />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-band border-t border-line">
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-[minmax(0,1.2fr)_auto] items-center gap-8 reveal">
          <div>
            <h2 className="font-display font-semibold t-l max-w-[18ch]">
              Start with one workflow.
            </h2>
            <p className="mt-3 text-muted text-[.9375rem] leading-relaxed max-w-xl">
              Bring one repetitive process. Most teams have an agent running
              the same day — and you keep the record of every run.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/#demo" className="btn btn-primary">
              Start free trial
            </Link>
            <Link href="/security" className="btn btn-ghost">
              Security details
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
