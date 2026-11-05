"use client";

import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Step = [string, "done" | "run" | "wait"];

type UC = {
  key: string;
  title: string;
  punch: string;
  body: string;
  stat: string;
  note: string;
  chips: string[];
  status: { label: string; cls: string; dot?: string };
  steps: Step[];
};

const Glyph = ({ s }: { s: "done" | "run" | "wait" }) => (
  <span
    aria-hidden="true"
    className={`w-3 flex-none text-center ${
      s === "done" ? "text-ok" : s === "run" ? "text-accent-text" : "text-muted"
    }`}
  >
    {s === "done" ? "✓" : s === "run" ? "●" : "○"}
  </span>
);

const Ok = { label: "Completed", cls: "st-ok" };
const Run = { label: "Working", cls: "st-run" };
const Wait = { label: "To a human", cls: "st-warn" };
const Queued = { label: "Queued", cls: "", dot: "var(--muted)" };

const useCases: UC[] = [
  {
    key: "support",
    title: "Support triage",
    punch: "Clear the queue before lunch.",
    body: "Classifies new tickets, drafts a reply from your help centre, and routes anything uncertain to a person.",
    stat: "68%",
    note: "of this queue cleared without a human",
    chips: ["Zendesk", "Slack"],
    status: Run,
    steps: [
      ["Read ticket", "done"],
      ["Search knowledge", "done"],
      ["Check account", "done"],
      ["Draft reply", "run"],
      ["Route escalation", "wait"],
      ["Write audit", "wait"],
    ],
  },
  {
    key: "invoices",
    title: "Invoice reconciliation",
    punch: "Reconcile the morning's feed.",
    body: "Matches invoices against the bank feed each morning and flags the small set that do not line up.",
    stat: "12,400",
    note: "entries reconciled in this run",
    chips: ["NetSuite", "Stripe"],
    status: Wait,
    steps: [
      ["Pull bank feed", "done"],
      ["Pull open invoices", "done"],
      ["Match entries", "done"],
      ["Flag variances", "done"],
      ["Review flagged", "run"],
    ],
  },
  {
    key: "leads",
    title: "Lead research",
    punch: "Brief the rep in three minutes.",
    body: "Reads new signups, checks them against your ideal customer profile, and posts a short brief to the right channel.",
    stat: "3 min",
    note: "median enrichment time",
    chips: ["HubSpot", "Salesforce"],
    status: Ok,
    steps: [
      ["Read signups", "done"],
      ["Enrich companies", "done"],
      ["Score against ICP", "done"],
      ["Write CRM", "done"],
      ["Notify reps", "done"],
    ],
  },
  {
    key: "reporting",
    title: "Weekly reporting",
    punch: "The Monday digest, already written.",
    body: "Pulls numbers from your tools into a summary leads actually read, every Monday at 8:00.",
    stat: "4.5 hrs",
    note: "saved per team",
    chips: ["Notion", "Slack"],
    status: Queued,
    steps: [
      ["Pull metrics", "wait"],
      ["Compare weeks", "wait"],
      ["Draft summary", "wait"],
      ["Post digest", "wait"],
    ],
  },
];

export default function UseCaseSelector() {
  const [sel, setSel] = useState(0);
  const active = useCases[sel];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = useCases.length;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (sel + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
      next = (sel - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    setSel(next);
    document.getElementById(`uc-tab-${useCases[next].key}`)?.focus();
  };

  return (
    <div className="mt-12 grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 lg:gap-14 items-start">
      <div>
        <div
          role="tablist"
          aria-label="Where teams start"
          aria-orientation="vertical"
          className="border-b border-line"
          onKeyDown={onKeyDown}
        >
          {useCases.map((u, i) => {
          const on = i === sel;
          return (
            <button
              key={u.key}
              type="button"
              role="tab"
              id={`uc-tab-${u.key}`}
              aria-selected={on}
              aria-controls="uc-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setSel(i)}
              className={`group grid w-full grid-cols-[2.25rem_minmax(0,1fr)_auto] items-baseline gap-4 border-t border-line px-1 py-4 text-left transition-colors ${
                on ? "" : "text-muted hover:text-ink"
              }`}
            >
              <span
                className={`font-mono text-[0.6875rem] tabular-nums ${
                  on ? "text-accent-text" : "text-muted"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[1.15rem] leading-tight">
                  {u.title}
                </span>
                <span className="mt-1 block text-[0.8125rem] leading-relaxed text-muted">
                  {u.punch}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`text-sm transition-all duration-200 ${
                  on
                    ? "text-accent"
                    : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              >
                →
              </span>
            </button>
          );
        })}
        </div>
        <p className="mt-5 max-w-sm text-[0.8125rem] leading-relaxed text-muted">
          Each case starts read-only. Add writes once the run record looks
          right.
        </p>
      </div>

      <div
        role="tabpanel"
        id="uc-panel"
        aria-label={active.title}
        className="border border-line-strong bg-paper lg:sticky lg:top-24"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex h-10 items-center justify-between gap-4 border-b border-line px-5">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                Run preview
              </span>
              <span
                className={`st ${active.status.cls}`}
                style={
                  active.status.dot ? { color: "var(--muted)" } : undefined
                }
              >
                <span
                  className="dot"
                  style={
                    active.status.dot
                      ? { background: active.status.dot }
                      : undefined
                  }
                />
                {active.status.label}
              </span>
            </div>

            <div className="border-b border-line px-5 py-5">
              <h3 className="font-display text-[1.55rem] leading-tight">
                {active.title}
              </h3>
              <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                {active.body}
              </p>
            </div>

            <div className="grid sm:grid-cols-[minmax(0,1fr)_9rem]">
              <ol
                aria-label="How this workflow runs"
                className="px-5 py-4"
              >
                {active.steps.map(([label, s], i) => (
                  <li
                    key={label}
                    className="flex items-center gap-2.5 py-1.5 text-[0.9375rem]"
                  >
                    <span className="w-4 flex-none font-mono text-[0.625rem] tabular-nums text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Glyph s={s} />
                    <span className={s === "wait" ? "text-muted" : "text-ink"}>
                      {label}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="border-t border-line px-5 py-4 sm:border-l sm:border-t-0">
                <div className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                  Outcome
                </div>
                <div className="mt-1.5 font-display text-[1.75rem] leading-none num">
                  {active.stat}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {active.note}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 border-t border-line px-5 py-3">
              <span className="chip">Demo data</span>
              {active.chips.map((c) => (
                <span className="chip" key={c}>
                  {c}
                </span>
              ))}
              <span className="ml-auto font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                Case {String(sel + 1).padStart(2, "0")} / 04
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
