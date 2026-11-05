"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AGENTS,
  AUDIT_LOG,
  HELP_LINKS,
  INTEGRATIONS,
  NAV_MAIN,
  NAV_WS,
  WORKFLOWS,
  stepStates,
} from "./workspace/data";
import type {
  Agent,
  AgentKey,
  Pill,
  SectionKey,
} from "./workspace/data";
import { Icon, StatusPill } from "./workspace/ui";

/* ------------------------------------------------------------------ */
/* Neumann Console — the product, rendered as an application window.   */
/* Window chrome, workspace header, sidebar, run inspector, and the    */
/* human approval gate. Demo data; nothing leaves the page.           */
/* ------------------------------------------------------------------ */

type ChatRun = {
  title: string;
  steps: string[];
  tone: "ok" | "wait";
};

type ChatMessage = {
  id: number;
  role: "user" | "agent";
  text: string;
  run?: ChatRun;
};

type ChatTurn = { reply: string; run: ChatRun };

const CHAT_PROMPTS: { label: string; text: string; turn: ChatTurn }[] = [
  {
    label: "Text a customer",
    text: "Can you text Maya an update about her order?",
    turn: {
      reply:
        "Done — Maya has a text saying her order is out for delivery and should arrive Thursday. I kept it short and friendly.",
      run: {
        title: "Texting Maya",
        steps: [
          "Found her order",
          "Wrote a short update",
          "Sent the text",
          "Saved what I did",
        ],
        tone: "ok",
      },
    },
  },
  {
    label: "Sort out a refund",
    text: "A customer was charged twice. Can you sort out a refund?",
    turn: {
      reply:
        "I found the duplicate charge and got the refund ready — it's waiting for your OK before any money moves.",
      run: {
        title: "Refund for a duplicate charge",
        steps: [
          "Checked the payment",
          "Confirmed it was a duplicate",
          "Put the refund together",
          "Waiting for your OK",
        ],
        tone: "wait",
      },
    },
  },
  {
    label: "Build a sales agent",
    text: "Could you set up a sales agent for me?",
    turn: {
      reply:
        "I've set up a sales agent for you — it reads new leads, does a little research, and leaves a short brief before your rep calls.",
      run: {
        title: "Setting up a sales agent",
        steps: [
          "Chose how it should help",
          "Connected your leads",
          "Set up the research steps",
          "Ready for the first lead",
        ],
        tone: "ok",
      },
    },
  },
  {
    label: "Clear the support queue",
    text: "Can you clear today's support queue?",
    turn: {
      reply:
        "I went through 12 messages: nine are ready for you to skim, and three need a person. Nothing went out without a check.",
      run: {
        title: "Clearing today's messages",
        steps: [
          "Read the new messages",
          "Sorted them by urgency",
          "Wrote nine replies",
          "Flagged three for a person",
        ],
        tone: "ok",
      },
    },
  },
];

const GENERIC_TURN: ChatTurn = {
  reply:
    "I've started on that — I'll pick the right agent and show you each step. Anything that can't be undone will wait for your OK.",
  run: {
    title: "Working on your request",
    steps: [
      "Understood what you need",
      "Picked the right agent",
      "Working through it",
      "Ready for you to check",
    ],
    tone: "ok",
  },
};

const CONTEXT_RE =
  /(sms|text|message|reply|email|ticket|support|refund|invoice|charge|payment|agent|triage|summar|report|lead|notion|slack|approv|workflow|customer|order|queue|sales|finance|build|create|make|set up|setup|call|phone|crm)/i;

const GUARDRAIL =
  "I can help with customer messages, refunds, support, or setting up an agent. Try one of the prompts below.";

const TOOL_SCOPE: Record<string, string> = {
  Zendesk: "read/write",
  Salesforce: "read/write",
  "Knowledge base": "read",
  Email: "send",
  Ledger: "read",
  Stripe: "write · gated",
  "Audit log": "append",
  HubSpot: "read/write",
  Enrichment: "read",
  Slack: "post",
  Gmail: "read/send",
  "Outbound policy": "read",
  "Web search": "read",
  Notion: "write",
};

export default function Workspace() {
  const [section, setSection] = useState<SectionKey>("Ask Neumann");
  const [agentKey, setAgentKey] = useState<AgentKey>("finance");
  const agent = AGENTS.find((a) => a.key === agentKey)!;
  const [pos, setPos] = useState(agent.startAt);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [live, setLive] = useState(false);
  const [resolved, setResolved] = useState<null | "approved" | "rejected">(null);
  const [navOpen, setNavOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [query, setQuery] = useState("");
  const [needYou, setNeedYou] = useState(false);
  const reduced = useRef(false);
  const keepDrawer = useRef(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeRun, setActiveRun] = useState<{ id: number; steps: string[] } | null>(
    null,
  );
  const [runStep, setRunStep] = useState(0);
  const chatSeq = useRef(0);
  const chatStarted = useRef(false);
  const chatLogRef = useRef<HTMLDivElement | null>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // a small proactive run on first load, so the assistant tab is alive
  useEffect(() => {
    const steps = [
      "Read the new messages",
      "Wrote two replies",
      "Sent three short updates",
      "Saved what I did",
    ];
    const t = setTimeout(() => {
      if (chatStarted.current) return;
      const id = ++chatSeq.current;
      setChat([
        {
          id,
          role: "agent",
          text: "While you were away, I cleared three customer messages and drafted two replies. Nothing has been sent without a check.",
          run: { title: "While you were away", steps, tone: "ok" },
        },
      ]);
      if (reduced.current) {
        setRunStep(steps.length);
      } else {
        setActiveRun({ id, steps });
        setRunStep(0);
      }
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  // reveal run steps one at a time
  useEffect(() => {
    if (!activeRun) return;
    if (runStep >= activeRun.steps.length) {
      const t = setTimeout(() => setActiveRun(null), 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setRunStep((n) => n + 1), 620);
    return () => clearTimeout(t);
  }, [activeRun, runStep]);

  // Keep the conversation useful in both states: the newest message starts at
  // the top of the compact window, and the expanded window follows the end.
  useEffect(() => {
    const el = chatLogRef.current;
    if (!el) return;
    if (chatOpen) {
      el.scrollTop = el.scrollHeight;
      return;
    }
    const last = el.lastElementChild;
    if (last instanceof HTMLElement) {
      el.scrollTop = Math.max(0, last.offsetTop - 2);
    }
  }, [chat, chatBusy, runStep, chatOpen]);

  useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    };
  }, []);

  const sendChat = (raw: string) => {
    const text = raw.trim();
    if (!text || chatBusy) return;
    chatStarted.current = true;
    setChatInput("");
    setChat((prev) => [
      ...prev,
      { id: ++chatSeq.current, role: "user", text },
    ]);
    setChatBusy(true);

    const preset = CHAT_PROMPTS.find(
      (p) =>
        p.label.toLowerCase() === text.toLowerCase() ||
        p.text.toLowerCase() === text.toLowerCase(),
    );
    const turn = preset
      ? preset.turn
      : CONTEXT_RE.test(text)
        ? GENERIC_TURN
        : null;

    if (replyTimer.current) clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      if (!turn) {
        setChat((prev) => [
          ...prev,
          { id: ++chatSeq.current, role: "agent", text: GUARDRAIL },
        ]);
        setChatBusy(false);
        return;
      }
      const id = ++chatSeq.current;
      setChat((prev) => [
        ...prev,
        {
          id,
          role: "agent",
          text: turn.reply,
          run: { ...turn.run, steps: [...turn.run.steps] },
        },
      ]);
      setActiveRun({ id, steps: turn.run.steps });
      setRunStep(0);
      setChatBusy(false);
    }, 850);
  };

  // run engine
  useEffect(() => {
    const fin = agent.key === "finance";
    const runnable = agent.auto || live || (fin && approved);
    if (!runnable) return;
    if (reduced.current) return;
    if (pos >= agent.steps.length) {
      if (agent.auto) {
        const t = setTimeout(() => setPos(agent.startAt), 4200);
        return () => clearTimeout(t);
      }
      return;
    }
    if (fin && pos === 2 && !approved) return;
    const delay = live ? 750 : approved ? 950 : pos === 0 ? 900 : 1550;
    const t = setTimeout(() => {
      const next = pos + 1;
      setPos(next);
      if (next >= agent.steps.length && !agent.auto) setLive(false);
    }, delay);
    return () => clearTimeout(t);
  }, [agent, pos, approved, live, agentKey]);

  // escape closes drawer / mobile nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawer(false);
        setNavOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (drawer) {
      const active = document.activeElement as HTMLElement | null;
      if (active && active !== document.body) triggerRef.current = active;
      closeRef.current?.focus();
    } else {
      if (triggerRef.current?.isConnected) triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [drawer]);

  // keep keyboard focus inside the approval drawer while it is open
  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const el = drawerRef.current;
      if (!el) return;
      const focusables = el.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (
        e.shiftKey &&
        (document.activeElement === first || !el.contains(document.activeElement))
      ) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawer]);

  const states = stepStates(agent, pos, approved, rejected);
  const doneCount = states.filter((s) => s === "done").length;
  const atApproval = agent.key === "finance" && pos === 2 && !approved && !rejected;
  const pending = resolved ? 0 : 1;
  const len = agent.steps.length;
  const stepNo = Math.min(pos + 1, len);
  const pct = Math.round((doneCount / len) * 100);

  const runState: Pill = rejected
    ? { cls: "err", text: "Blocked" }
    : atApproval
      ? { cls: "wait", text: "Waiting for approval" }
      : approved && pos < len
        ? { cls: "run", text: "Approved — resuming" }
        : pos >= len
          ? { cls: "ok", text: "Completed" }
          : pos === 0 && live
            ? { cls: "queue", text: "Queued" }
            : { cls: "run", text: "Running" };

  function pillFor(a: Agent): Pill {
    if (a.key !== agentKey) {
      if (a.status === "running") return { cls: "run", text: "running" };
      if (a.status === "waiting") return { cls: "wait", text: "waiting" };
      return { cls: "ok", text: "completed" };
    }
    if (rejected) return { cls: "err", text: "attention" };
    if (pos >= len) return { cls: "ok", text: "completed" };
    if (a.key === "finance" && pos === 2 && !approved) return { cls: "wait", text: "waiting" };
    if (pos === 0 && live) return { cls: "queue", text: "queued" };
    return { cls: "run", text: "running" };
  }

  const visibleAgents = AGENTS.filter((a) => {
    const q = query.trim().toLowerCase();
    const matchQ =
      !q || a.name.toLowerCase().includes(q) || a.taskTitle.toLowerCase().includes(q);
    const p = pillFor(a);
    const matchN = !needYou || p.text === "waiting" || p.text === "attention";
    return matchQ && matchN;
  });

  const chooseAgent = (k: AgentKey) => {
    const a = AGENTS.find((x) => x.key === k)!;
    setAgentKey(k);
    setPos(a.startAt);
    setApproved(false);
    setRejected(false);
    setResolved(null);
    setLive(false);
    setDrawer(keepDrawer.current);
    keepDrawer.current = false;
  };

  const selectAgent = (k: AgentKey) => {
    chooseAgent(k);
    setSection("Agents");
    setNavOpen(false);
  };

  const approve = () => {
    setApproved(true);
    setRejected(false);
    setResolved("approved");
    setDrawer(false);
  };

  const reject = () => {
    setRejected(true);
    setApproved(false);
    setResolved("rejected");
    setDrawer(false);
  };

  const liveRun = () => {
    setPos(0);
    setApproved(false);
    setRejected(false);
    setResolved(null);
    setLive(true);
  };

  const reviewFromApprovals = () => {
    setSection("Agents");
    if (agentKey === "finance") setDrawer(true);
    else {
      keepDrawer.current = true;
      chooseAgent("finance");
    }
  };

  const go = (s: SectionKey) => {
    setSection(s);
    setNavOpen(false);
  };

  const approval = agent.approval;
  const resolvedPill: Pill = resolved
    ? { cls: resolved === "approved" ? "ok" : "err", text: resolved }
    : { cls: "wait", text: "waiting" };

  return (
    <div className="wsp">
      <div className="w-window">
        {/* ---------- window chrome ---------- */}
        <div className="w-chrome">
          <span className="w-lights" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="w-title">Neumann Console</span>
          <span className="w-chrome-right">
            <span className="w-conn">
              <i />
              Connected
            </span>
            <span className="w-chrome-env">acme-inc · production</span>
          </span>
        </div>

        {/* ---------- workspace header ---------- */}
        <div className="w-head">
          <button
            type="button"
            className="icon-btn w-menu"
            aria-label="Open navigation"
            aria-expanded={navOpen}
            onClick={() => setNavOpen(true)}
          >
            <Icon name="menu" />
          </button>

          <div className="w-ws">
            <span className="mark w-mark">N</span>
            <span className="w-ws-name">
              Acme Inc
              <span className="w-ws-sub">Team · production</span>
            </span>
          </div>

          <div className="w-crumb" aria-hidden="true">
            {section}
            <span>/</span>
            <b>{section === "Agents" ? agent.name : "Workspace"}</b>
          </div>

          <div className="w-head-actions">
            <label className="w-find">
              <Icon name="search" size={12} />
              <input
                ref={searchRef}
                type="search"
                placeholder="Search agents"
                aria-label="Search agents"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="w-kbd" aria-hidden="true">
                ⌘K
              </span>
            </label>

            <button
              type="button"
              className={`w-filter${needYou ? " on" : ""}`}
              aria-pressed={needYou}
              onClick={() => setNeedYou((v) => !v)}
            >
              <Icon name="filter" size={12} />
              <span className="w-filter-label">Needs you</span>
              <b>{pending}</b>
            </button>

            <a href="#demo" className="w-btn w-new">
              <Icon name="plus" size={12} />
              <span className="w-new-label">New agent</span>
            </a>

            <button
              type="button"
              className="icon-btn w-bell"
              aria-label={`Notifications: ${pending} approval${pending === 1 ? "" : "s"} pending`}
              onClick={() => go("Approvals")}
            >
              <Icon name="bell" />
              {pending > 0 && <span className="dot" />}
            </button>

            <span className="w-ava w-avatar-accent" aria-hidden="true">
              MK
            </span>
          </div>
        </div>

        {/* ---------- app body ---------- */}
        <div className="w-body">
          {navOpen && (
            <button
              type="button"
              className="w-back"
              aria-label="Close navigation"
              onClick={() => setNavOpen(false)}
            />
          )}

          <aside
            className={`w-side${navOpen ? " open" : ""}`}
            aria-label="Workspace navigation"
          >
            <nav className="w-navgroup" aria-label="Product">
              {NAV_MAIN.map((item) => {
                const on = section === item.label;
                return (
                  <Fragment key={item.label}>
                    <button
                      type="button"
                      className={`w-nav${on ? " on" : ""}`}
                      aria-current={on ? "page" : undefined}
                      aria-expanded={item.label === "Agents" ? subOpen : undefined}
                      onClick={() => {
                        if (item.label === "Agents") setSubOpen((o) => !o);
                        go(item.label);
                      }}
                    >
                      <Icon name={item.icon} size={14} />
                      <span>{item.label}</span>
                      {item.label === "Agents" && (
                        <span
                          className={`w-chev${subOpen ? " up" : ""}`}
                          aria-hidden="true"
                        >
                          <Icon name="chev" size={11} />
                        </span>
                      )}
                      {item.badge && pending > 0 && (
                        <span className="w-badge">{pending}</span>
                      )}
                    </button>

                    {item.label === "Agents" && subOpen && (
                      <div id="ws-agent-list" className="w-sublist">
                        {visibleAgents.length === 0 && (
                          <p className="w-empty">No agents match.</p>
                        )}
                        {visibleAgents.map((a) => {
                          const p = pillFor(a);
                          const onA = a.key === agentKey;
                          const dot =
                            p.cls === "queue" ? "var(--w-faint)" : `var(--w-${p.cls})`;
                          return (
                            <button
                              key={a.key}
                              type="button"
                              className={`w-subnav${onA ? " on" : ""}`}
                              aria-pressed={onA}
                              onClick={() => selectAgent(a.key)}
                            >
                              <span className="w-dot" style={{ background: dot }} />
                              <span className="w-subnav-name">{a.name}</span>
                              <span className="w-subnav-state">{p.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </nav>

            <div className="w-navlabel">Workspace</div>
            <nav className="w-navgroup" aria-label="Workspace">
              {NAV_WS.map((item) => {
                const on = section === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`w-nav${on ? " on" : ""}`}
                    aria-current={on ? "page" : undefined}
                    onClick={() => go(item.label)}
                  >
                    <Icon name={item.icon} size={14} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="w-user">
              <span className="w-ava w-avatar-accent">MK</span>
              <span className="w-user-name">
                Maya K.
                <span>Operations</span>
              </span>
            </div>
          </aside>

          <main className="w-main">
            <div className="w-scroll">
              {section === "Agents" && (
                <motion.div
                  key={agentKey}
                  className="w-run"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* run header */}
                  <header className="w-runhead">
                    <div className="w-runhead-top">
                      <span className="w-ava w-ava-lg w-avatar-accent">
                        {agent.short}
                      </span>
                      <div className="w-runhead-id">
                        <div className="w-kicker">
                          {agent.version} · {agent.kind}
                        </div>
                        <h2 className="w-h2">{agent.name}</h2>
                      </div>
                      <StatusPill cls={runState.cls} text={runState.text} />
                      <button type="button" className="w-btn w-replay" onClick={liveRun}>
                        <Icon name="play" size={11} />
                        <span className="w-replay-label">Replay</span>
                      </button>
                    </div>

                    <p className="w-runhead-task">{agent.taskTitle}</p>

                    <div className="w-runmeta">
                      <span className="w-mono">{agent.runId}</span>
                      <span>started {agent.started}</span>
                      <span>{agent.duration}</span>
                      <span>production</span>
                      <span className="w-runmeta-right">
                        step {stepNo} of {len} · {pct}%
                      </span>
                    </div>

                    <div
                      className="w-prog"
                      role="progressbar"
                      aria-label="Run progress"
                      aria-valuemin={0}
                      aria-valuemax={len}
                      aria-valuenow={doneCount}
                    >
                      <i style={{ width: `${pct}%` }} />
                    </div>
                  </header>

                  <div className="w-split">
                    {/* timeline */}
                    <section className="w-feed" aria-label="Run timeline">
                      <ol className="w-tl">
                        {agent.steps.map((s, i) => {
                          const st = states[i];
                          return (
                            <li key={s.label} className={`w-ev ${st}`}>
                              <span className="w-ev-ico" aria-hidden="true">
                                {st === "done"
                                  ? "✓"
                                  : st === "blocked"
                                    ? "✕"
                                    : st === "wait"
                                      ? "!"
                                      : ""}
                              </span>
                              <div className="w-ev-body">
                                <div className="w-ev-line">
                                  <span className="w-ev-label">{s.label}</span>
                                  <span className="w-ev-ms">
                                    {st === "pending"
                                      ? "—"
                                      : st === "wait"
                                        ? "waiting"
                                        : st === "blocked"
                                          ? "blocked"
                                          : st === "active"
                                            ? "running"
                                            : s.ms}
                                  </span>
                                </div>
                                <div className="w-ev-tool">{s.tool}</div>

                                {i === 2 && approval && pos >= 2 && (
                                  <div className={`w-gate${approved ? " ok" : ""}${rejected ? " err" : ""}`}>
                                    <div className="w-gate-top">
                                      <span className="w-gate-tag">
                                        {approved
                                          ? "Approved"
                                          : rejected
                                            ? "Rejected"
                                            : "Approval required"}
                                      </span>
                                      <span className="w-tool">policy {approval.policy}</span>
                                    </div>
                                    {!approved && !rejected ? (
                                      <div className="w-gate-row">
                                        <div className="w-gate-copy">
                                          <p className="w-gate-action">{approval.action}</p>
                                          <p className="w-gate-note">
                                            {approval.policyNote}.
                                          </p>
                                        </div>
                                        <div className="w-gate-actions">
                                          <button
                                            type="button"
                                            className="w-btn"
                                            onClick={() => setDrawer(true)}
                                          >
                                            Review evidence
                                          </button>
                                          <button
                                            type="button"
                                            className="w-btn accent"
                                            onClick={approve}
                                          >
                                            Approve
                                          </button>
                                          <button
                                            type="button"
                                            className="w-btn reject"
                                            onClick={reject}
                                          >
                                            Reject
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <>
                                        <p className="w-gate-action">{approval.action}</p>
                                        <p className="w-gate-state">
                                          {approved
                                            ? "Approved by Maya K. · execution resumed"
                                            : "Rejected by Maya K. — run stopped, refund not executed."}
                                        </p>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </section>

                    {/* inspector */}
                    <aside className="w-inspect" aria-label="Run inspector">
                      <div className="w-sechead">Run detail</div>
                      <dl className="w-facts">
                        <div>
                          <dt>Status</dt>
                          <dd>
                            <StatusPill cls={runState.cls} text={runState.text} />
                          </dd>
                        </div>
                        <div>
                          <dt>Run</dt>
                          <dd className="w-mono">{agent.runId}</dd>
                        </div>
                        <div>
                          <dt>Started</dt>
                          <dd>{agent.started}</dd>
                        </div>
                        <div>
                          <dt>Duration</dt>
                          <dd className="w-mono">{agent.duration}</dd>
                        </div>
                        <div>
                          <dt>Task</dt>
                          <dd>{agent.taskRef}</dd>
                        </div>
                        <div>
                          <dt>Approver</dt>
                          <dd>
                            {approved
                              ? "Maya K."
                              : rejected
                                ? "Maya K. · rejected"
                                : "—"}
                          </dd>
                        </div>
                      </dl>

                      <div className="w-sechead">Tools in this run</div>
                      <ul className="w-toolset">
                        {agent.tools.map((t) => {
                          const scope = TOOL_SCOPE[t.name] ?? "read";
                          return (
                            <li key={t.key}>
                              <span>{t.name}</span>
                              <span
                                className={`w-scope${scope.includes("gated") ? " gated" : ""}`}
                              >
                                {scope}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="w-sechead">Audit</div>
                      <p className="w-note">
                        All steps are appended to the audit log.
                      </p>
                      <button
                        type="button"
                        className="w-link"
                        onClick={() => go("Audit Log")}
                      >
                        Open audit log
                        <Icon name="arrow" size={11} />
                      </button>
                    </aside>
                  </div>
                </motion.div>
              )}

              {section === "Overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="w-page"
                >
                  <div className="w-pagehead">
                    <div>
                      <div className="w-kicker">Wednesday, 28 October</div>
                      <h2 className="w-h2">Overview</h2>
                    </div>
                    <span className="w-live">
                      <i />
                      updated just now
                    </span>
                  </div>

                  <div className="w-stats">
                    {[
                      ["47", "Runs completed", "+12 today"],
                      ["3", "Agents running", "of 5 deployed"],
                      ["1", "Approvals waiting", "needs a person"],
                      ["12,480", "Runs this month", "62% of plan"],
                    ].map(([n, l, s]) => (
                      <div key={l}>
                        <span className="w-stat-n">{n}</span>
                        <span className="w-stat-l">{l}</span>
                        <span className="w-stat-s">{s}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-cols2">
                    <section>
                      <div className="w-sechead">
                        Live runs
                        <span className="w-sechead-note">auto-refresh</span>
                      </div>
                      <table className="w-tbl">
                        <thead>
                          <tr>
                            <th>Agent</th>
                            <th className="w-hide-sm">Task</th>
                            <th className="w-hide-md">Run</th>
                            <th>Status</th>
                            <th className="w-hide-md">Elapsed</th>
                          </tr>
                        </thead>
                        <tbody>
                          {AGENTS.map((a) => {
                            const p = pillFor(a);
                            return (
                              <tr key={a.key}>
                                <td>
                                  <button
                                    type="button"
                                    className="w-link"
                                    onClick={() => selectAgent(a.key)}
                                  >
                                    {a.name}
                                  </button>
                                </td>
                                <td className="w-hide-sm w-truncate">{a.taskRef}</td>
                                <td className="w-hide-md w-mono w-faint-cell">{a.runId}</td>
                                <td>
                                  <StatusPill cls={p.cls} text={p.text} />
                                </td>
                                <td className="w-hide-md w-mono">{a.duration}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <div className="w-sechead">
                        Recent activity
                        <span className="w-sechead-note">append-only</span>
                      </div>
                      <table className="w-tbl w-audit">
                        <thead>
                          <tr>
                            <th>Time</th>
                            <th className="w-hide-sm">Actor</th>
                            <th>Event</th>
                            <th className="w-hide-md">Run</th>
                          </tr>
                        </thead>
                        <tbody>
                          {AUDIT_LOG.slice(0, 5).map(([t, actor, ev, run], i) => (
                            <tr key={i}>
                              <td className="w-mono">{t}</td>
                              <td className="w-hide-sm w-muted-cell">{actor}</td>
                              <td className="w-mono">{ev}</td>
                              <td className="w-hide-md w-mono w-faint-cell">{run}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </section>

                    <aside>
                      <div className="w-sechead">Needs you</div>
                      <div
                        className={`w-need${resolved === "approved" ? " ok" : resolved === "rejected" ? " err" : ""}`}
                      >
                        <StatusPill cls={resolvedPill.cls} text={resolvedPill.text} />
                        <p className="w-need-action">Issue refund — $4,820.00</p>
                        <p className="w-small">
                          Finance Agent · {resolved ? "just now" : "paused 6 min"}
                        </p>
                        {!resolved && (
                          <button
                            type="button"
                            className="w-btn"
                            onClick={reviewFromApprovals}
                          >
                            Review
                          </button>
                        )}
                      </div>

                      <div className="w-sechead">This week</div>
                      <ul className="w-mini">
                        <li>
                          Refund $312.00
                          <span>approved · yesterday</span>
                        </li>
                        <li>
                          Customer export
                          <span>rejected · 3 days ago</span>
                        </li>
                        <li>
                          Payroll draft
                          <span>approved · 4 days ago</span>
                        </li>
                      </ul>

                      <div className="w-sechead">Policies</div>
                      <ul className="w-mini">
                        <li>
                          Refunds over $1,000
                          <span>FIN-204 · needs a person</span>
                        </li>
                        <li>
                          Refund window
                          <span>REF-12 · 30 days</span>
                        </li>
                        <li>
                          Data exports
                          <span>SEC-90 · needs a person</span>
                        </li>
                      </ul>
                    </aside>
                  </div>
                </motion.div>
              )}

              {section === "Workflows" && (
                <motion.div
                  key="workflows"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="w-page"
                >
                  <div className="w-pagehead">
                    <div>
                      <div className="w-kicker">9 workflows · 1 needs approval</div>
                      <h2 className="w-h2">Workflows</h2>
                    </div>
                    <a
                      href="#demo"
                      className="w-btn accent"
                      aria-label="New workflow"
                    >
                      <Icon name="plus" size={11} />
                      <span className="w-cta-label">New workflow</span>
                    </a>
                  </div>

                  <table className="w-tbl w-tbl-rows">
                    <thead>
                      <tr>
                        <th>Workflow</th>
                        <th>Agent</th>
                        <th className="w-hide-md">Steps</th>
                        <th className="w-hide-sm">Mode</th>
                        <th>Last run</th>
                        <th aria-label="Open" />
                      </tr>
                    </thead>
                    <tbody>
                      {WORKFLOWS.map((w) => {
                        const key = AGENTS.find((a) => a.name === w.agent)?.key;
                        return (
                          <tr key={w.name}>
                            <td>
                              <button
                                type="button"
                                className="w-link"
                                onClick={() => key && selectAgent(key)}
                              >
                                {w.name}
                              </button>
                            </td>
                            <td className="w-muted-cell">{w.agent}</td>
                            <td className="w-hide-md w-mono">{w.steps}</td>
                            <td className="w-hide-sm w-muted-cell">{w.mode}</td>
                            <td className="w-mono w-faint-cell">{w.last}</td>
                            <td className="w-cell-end">
                              <Icon name="chev" size={12} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </motion.div>
              )}

              {section === "Approvals" && (
                <motion.div
                  key="approvals"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="w-page"
                >
                  <div className="w-pagehead">
                    <div>
                      <div className="w-kicker">2 resolved this week</div>
                      <h2 className="w-h2">Approvals</h2>
                    </div>
                    <span className={`w-live${resolved ? "" : " wait"}`}>
                      <i />
                      {resolved ? "resolved" : "1 waiting"}
                    </span>
                  </div>

                  <div className={`w-gate w-gate-lg${approved ? " ok" : ""}${rejected ? " err" : ""}`}>
                    <div className="w-gate-top">
                      <span className="w-gate-tag">
                        {approved ? "Approved" : rejected ? "Rejected" : "Approval required"}
                      </span>
                      <span className="w-tool">finance-agent v7 · run-1076</span>
                    </div>
                    {!approved && !rejected ? (
                      <div className="w-gate-row">
                        <div className="w-gate-copy">
                          <p className="w-gate-action">Issue refund — $4,820.00</p>
                          <p className="w-gate-note">
                            Acme Robotics GmbH · duplicate charge on invoice #10482 ·
                            policy FIN-204
                          </p>
                        </div>
                        <div className="w-gate-actions">
                          <button
                            type="button"
                            className="w-btn"
                            onClick={reviewFromApprovals}
                          >
                            Review evidence
                          </button>
                          <button type="button" className="w-btn accent" onClick={approve}>
                            Approve
                          </button>
                          <button type="button" className="w-btn reject" onClick={reject}>
                            Reject
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="w-gate-action">Issue refund — $4,820.00</p>
                        <p className="w-gate-state">
                          {approved
                            ? "Approved by Maya K. · refund issued · run completed"
                            : "Rejected by Maya K. — run stopped, no money moved"}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="w-sechead">History</div>
                  <table className="w-tbl">
                    <thead>
                      <tr>
                        <th>Request</th>
                        <th className="w-hide-sm">Agent</th>
                        <th>Decision</th>
                        <th className="w-hide-md">By</th>
                        <th className="w-hide-md">When</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Refund — $312.00</td>
                        <td className="w-hide-sm w-muted-cell w-mono">finance-agent</td>
                        <td>
                          <StatusPill cls="ok" text="approved" />
                        </td>
                        <td className="w-hide-md w-muted-cell">Maya K.</td>
                        <td className="w-hide-md w-mono">yesterday</td>
                      </tr>
                      <tr>
                        <td>Export customer list</td>
                        <td className="w-hide-sm w-muted-cell w-mono">sales-agent</td>
                        <td>
                          <StatusPill cls="err" text="rejected" />
                        </td>
                        <td className="w-hide-md w-muted-cell">Maya K.</td>
                        <td className="w-hide-md w-mono">3 days ago</td>
                      </tr>
                      <tr>
                        <td>Refund — $1,240.00</td>
                        <td className="w-hide-sm w-muted-cell w-mono">finance-agent</td>
                        <td>
                          <StatusPill cls="ok" text="approved" />
                        </td>
                        <td className="w-hide-md w-muted-cell">Maya K.</td>
                        <td className="w-hide-md w-mono">12 days ago</td>
                      </tr>
                      <tr>
                        <td>Send pricing exception</td>
                        <td className="w-hide-sm w-muted-cell w-mono">sales-agent</td>
                        <td>
                          <StatusPill cls="ok" text="approved" />
                        </td>
                        <td className="w-hide-md w-muted-cell">Maya K.</td>
                        <td className="w-hide-md w-mono">18 days ago</td>
                      </tr>
                      <tr>
                        <td>Refund — $980.00</td>
                        <td className="w-hide-sm w-muted-cell w-mono">finance-agent</td>
                        <td>
                          <StatusPill cls="ok" text="approved" />
                        </td>
                        <td className="w-hide-md w-muted-cell">Maya K.</td>
                        <td className="w-hide-md w-mono">21 days ago</td>
                      </tr>
                      <tr>
                        <td>Delete customer record</td>
                        <td className="w-hide-sm w-muted-cell w-mono">sales-agent</td>
                        <td>
                          <StatusPill cls="err" text="rejected" />
                        </td>
                        <td className="w-hide-md w-muted-cell">Maya K.</td>
                        <td className="w-hide-md w-mono">24 days ago</td>
                      </tr>
                      <tr>
                        <td>Refund — $2,340.00</td>
                        <td className="w-hide-sm w-muted-cell w-mono">finance-agent</td>
                        <td>
                          <StatusPill cls="ok" text="approved" />
                        </td>
                        <td className="w-hide-md w-muted-cell">Maya K.</td>
                        <td className="w-hide-md w-mono">27 days ago</td>
                      </tr>
                      <tr>
                        <td>Payroll draft — October</td>
                        <td className="w-hide-sm w-muted-cell w-mono">finance-agent</td>
                        <td>
                          <StatusPill cls="ok" text="approved" />
                        </td>
                        <td className="w-hide-md w-muted-cell">Maya K.</td>
                        <td className="w-hide-md w-mono">29 days ago</td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>
              )}

              {section === "Integrations" && (
                <motion.div
                  key="integrations"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="w-page"
                >
                  <div className="w-pagehead">
                    <div>
                      <div className="w-kicker">10 connected · 3 read-only</div>
                      <h2 className="w-h2">Integrations</h2>
                    </div>
                    <a
                      href="#demo"
                      className="w-btn"
                      aria-label="Request a connector"
                    >
                      <Icon name="plus" size={11} />
                      <span className="w-cta-label">Request a connector</span>
                    </a>
                  </div>

                  <table className="w-tbl w-tbl-rows">
                    <thead>
                      <tr>
                        <th>Tool</th>
                        <th>Scope</th>
                        <th className="w-hide-sm">Used by</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {INTEGRATIONS.map(({ name, scope, usedBy, readOnly }) => (
                        <tr key={name}>
                          <td>
                            <span className="w-tool-name">
                              <span className="w-tool-mark" aria-hidden="true">
                                {name.slice(0, 1)}
                              </span>
                              {name}
                            </span>
                          </td>
                          <td className="w-muted-cell w-mono">{scope}</td>
                          <td className="w-hide-sm w-muted-cell">{usedBy}</td>
                          <td>
                            <StatusPill
                              cls={readOnly ? "queue" : "ok"}
                              text={readOnly ? "read-only" : "connected"}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}

              {section === "Audit Log" && (
                <motion.div
                  key="audit"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="w-page"
                >
                  <div className="w-pagehead">
                    <div>
                      <div className="w-kicker">Append-only · today</div>
                      <h2 className="w-h2">Audit log</h2>
                    </div>
                    <span className="w-tool">times in local time</span>
                  </div>

                  <table className="w-tbl w-tbl-rows w-audit">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Actor</th>
                        <th>Event</th>
                        <th className="w-hide-md">Run</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AUDIT_LOG.map(([t, actor, ev, run], i) => (
                        <tr key={i}>
                          <td className="w-mono">{t}</td>
                          <td className="w-muted-cell">{actor}</td>
                          <td className="w-mono">{ev}</td>
                          <td className="w-hide-md w-mono w-faint-cell">{run}</td>
                        </tr>
                      ))}
                      {resolved && (
                        <tr>
                          <td className="w-mono">just now</td>
                          <td className="w-muted-cell">Maya K.</td>
                          <td className="w-mono">
                            {resolved === "approved"
                              ? "approval.granted"
                              : "approval.rejected"}
                          </td>
                          <td className="w-hide-md w-mono w-faint-cell">run-1076</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </motion.div>
              )}

              {section === "Ask Neumann" && (
                <motion.div
                  key="ask"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="w-page w-ask"
                >
                  <div className="w-pagehead">
                    <div>
                      <div className="w-kicker">Neumann assistant · demo workspace</div>
                      <h2 className="w-h2">Ask Neumann</h2>
                    </div>
                    <span className="w-live">
                      <i />
                      5 agents ready
                    </span>
                  </div>

                  <div className="w-ai">
                    <div className="w-ai-head">
                      <span className="w-ai-orb" aria-hidden="true" />
                      <div className="w-ai-intro">
                        <p className="w-ai-title">What can I do for you?</p>
                        <p className="w-ai-sub">
                          Ask me to message a customer, sort a refund, or set up
                          an agent. I&apos;ll do the work and show you what I did.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="w-ai-toggle"
                        aria-expanded={chatOpen}
                        aria-controls="ask-chat"
                        aria-label={chatOpen ? "Hide chat" : "Show chat"}
                        title={chatOpen ? "Hide chat" : "Show chat"}
                        onClick={() => setChatOpen((v) => !v)}
                      >
                        <span>{chatOpen ? "Hide chat" : "Show chat"}</span>
                        <Icon name="chev" size={12} />
                      </button>
                    </div>

                    <div
                      id="ask-chat"
                      className={`w-ai-chat${chatOpen ? " is-open" : ""}`}
                      ref={chatLogRef}
                      role="log"
                      aria-live="polite"
                      aria-label="Conversation with Neumann"
                    >
                      {chat.length === 0 && !chatBusy && (
                        <p className="w-ai-empty">
                          Pick a prompt below, or just tell me what you need.
                        </p>
                      )}

                      {chat.map((m) => {
                        const running =
                          activeRun?.id === m.id &&
                          runStep < (m.run?.steps.length ?? 0);
                        return (
                          <div key={m.id} className={`w-ai-msg ${m.role}`}>
                            <div className="w-ai-bubble">
                              <p>{m.text}</p>
                              {m.run && (
                                <div className="w-ai-run">
                                  <div className="w-ai-run-top">
                                    <span>{m.run.title}</span>
                                    <span
                                      className={
                                        running
                                          ? "run"
                                          : m.run.tone === "wait"
                                            ? "wait"
                                            : "ok"
                                      }
                                    >
                                      {running
                                        ? "working"
                                        : m.run.tone === "wait"
                                          ? "needs you"
                                          : "done"}
                                    </span>
                                  </div>
                                  {m.run.steps.map((s, idx) => {
                                    const isActive =
                                      activeRun?.id === m.id && idx === runStep;
                                    const isDone =
                                      activeRun?.id === m.id
                                        ? idx < runStep
                                        : true;
                                    return (
                                      <div
                                        key={s}
                                        className={`w-ai-step${isDone ? " done" : ""}${
                                          isActive ? " active" : ""
                                        }`}
                                      >
                                        <span className="dot" aria-hidden="true" />
                                        {s}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      {chatBusy && (
                        <div className="w-ai-msg agent">
                          <div
                            className="w-ai-bubble w-ai-thinking"
                            aria-label="Neumann is working"
                          >
                            <span className="w-ai-typing" aria-hidden="true">
                              <i />
                              <i />
                              <i />
                            </span>
                            <span>On it…</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="w-ai-prompts" aria-label="Suggested prompts">
                      {CHAT_PROMPTS.map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          className="w-ai-chip"
                          disabled={chatBusy}
                          onClick={() => sendChat(p.text)}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>

                    <form
                      className="w-ai-compose"
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendChat(chatInput);
                      }}
                    >
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Tell me what you need…"
                        aria-label="Tell Neumann what you need"
                      />
                      <button
                        type="submit"
                        className="w-btn accent w-ai-send"
                        disabled={chatBusy || !chatInput.trim()}
                      >
                        Send
                        <Icon name="arrow" size={11} />
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {section === "Help" && (
                <motion.div
                  key="help"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                  className="w-page"
                >
                  <div className="w-pagehead">
                    <div>
                      <div className="w-kicker">Docs and guides</div>
                      <h2 className="w-h2">Help</h2>
                    </div>
                  </div>

                  <ul className="w-helplist">
                    {HELP_LINKS.map((h) => (
                      <li key={h.href}>
                        <a href={h.href}>
                          {h.label}
                          <Icon name="arrow" size={12} />
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="w-sechead">Keyboard</div>
                  <ul className="w-keys">
                    <li>
                      Focus search
                      <kbd>⌘K</kbd>
                    </li>
                    <li>
                      Close panel or menu
                      <kbd>Esc</kbd>
                    </li>
                    <li>
                      Move between controls
                      <kbd>Tab</kbd>
                    </li>
                  </ul>

                  <div className="w-sechead">Workspace</div>
                  <dl className="w-facts">
                    <div>
                      <dt>Plan</dt>
                      <dd>Team</dd>
                    </div>
                    <div>
                      <dt>Runs this month</dt>
                      <dd>12,480 of 20,000</dd>
                    </div>
                    <div>
                      <dt>Region</dt>
                      <dd className="w-mono">us-east-1</dd>
                    </div>
                    <div>
                      <dt>Console</dt>
                      <dd className="w-mono">v2.4.0</dd>
                    </div>
                    <div>
                      <dt>Audit retention</dt>
                      <dd>Append-only · no expiry</dd>
                    </div>
                  </dl>
                </motion.div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* ---------- approval drawer ---------- */}
      <AnimatePresence>
        {drawer && approval && (
          <motion.div
            key="drawer-back"
            className="w-back"
            aria-hidden="true"
            onClick={() => setDrawer(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {drawer && approval && (
          <motion.aside
            key="drawer"
            ref={drawerRef}
            className="w-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Approval request detail"
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 24, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-drawer-head">
              <span className="w-sechead">Approval request</span>
              <button
                ref={closeRef}
                type="button"
                className="icon-btn ml-auto"
                aria-label="Close approval detail"
                onClick={() => setDrawer(false)}
              >
                <Icon name="close" size={14} />
              </button>
            </div>

            <div className="w-drawer-body">
              <div className="w-drawer-state">
                <StatusPill
                  cls={approved ? "ok" : rejected ? "err" : "wait"}
                  text={approved ? "approved" : rejected ? "rejected" : "waiting"}
                />
              </div>

              <p className="w-drawer-action">{approval.action}</p>
              <p className="w-small">{approval.reason}</p>

              <dl className="w-facts w-facts-stack">
                <div>
                  <dt>Run</dt>
                  <dd className="w-mono">{agent.runId}</dd>
                </div>
                <div>
                  <dt>Agent</dt>
                  <dd className="w-mono">{agent.version}</dd>
                </div>
                <div>
                  <dt>Customer</dt>
                  <dd>{approval.customer}</dd>
                </div>
                <div>
                  <dt>Transaction</dt>
                  <dd>{approval.transaction}</dd>
                </div>
                <div>
                  <dt>Policy</dt>
                  <dd>
                    <span className="w-mono">{approval.policy}</span> ·{" "}
                    {approval.policyNote}
                  </dd>
                </div>
              </dl>

              <div className="w-sechead">Evidence</div>
              <ul className="w-evidence">
                {approval.evidence.map((e) => (
                  <li key={e}>
                    <span aria-hidden="true">✓</span>
                    {e}
                  </li>
                ))}
              </ul>

              <div className="w-sechead">Previous actions</div>
              <ol className="w-evidence w-evidence-num">
                {approval.previous.map((p, i) => (
                  <li key={p}>
                    <span aria-hidden="true">{i + 1}</span>
                    {p}
                  </li>
                ))}
              </ol>

              <p className="w-note w-drawer-note">
                The workflow stays paused until you decide. Approving runs the
                refund; rejecting stops the run before money moves.
              </p>
            </div>

            <div className="w-drawer-foot">
              {!approved && !rejected ? (
                <>
                  <button
                    type="button"
                    className="w-btn accent"
                    onClick={approve}
                  >
                    Approve refund
                  </button>
                  <button type="button" className="w-btn reject" onClick={reject}>
                    Reject
                  </button>
                </>
              ) : (
                <p className="w-gate-state">
                  {approved
                    ? "Approved by Maya K. · execution resumed"
                    : "Rejected by Maya K. — run stopped."}
                </p>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
