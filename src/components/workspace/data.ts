export type StepState = "done" | "active" | "pending" | "wait" | "blocked";

export type Step = { label: string; tool?: string; ms?: string; log?: string };

export type AgentKey = "support" | "finance" | "sales" | "email" | "research";

export type Tool = { name: string; key: string };

export type Baseline = "running" | "waiting" | "completed";

export type PillCls = "run" | "ok" | "wait" | "err" | "queue";

export type Pill = { cls: PillCls; text: string };

export type Approval = {
  action: string;
  amount: string;
  customer: string;
  transaction: string;
  reason: string;
  policy: string;
  policyNote: string;
  evidence: string[];
  previous: string[];
};

export type Agent = {
  key: AgentKey;
  name: string;
  short: string;
  kind: string;
  version: string;
  runId: string;
  started: string;
  taskTitle: string;
  taskRef: string;
  status: Baseline;
  duration: string;
  tools: Tool[];
  steps: Step[];
  startAt: number;
  auto: boolean;
  approval?: Approval;
};

export const AGENTS: Agent[] = [
  {
    key: "support",
    name: "Support Agent",
    short: "SUP",
    kind: "Customer support",
    version: "support-agent v3.2",
    runId: "run-1082",
    started: "2 min ago",
    taskTitle: "Resolve refund for a duplicate charge — ticket #4821",
    taskRef: "ticket #4821",
    status: "running",
    duration: "12s elapsed",
    tools: [
      { name: "Zendesk", key: "zendesk" },
      { name: "Salesforce", key: "salesforce" },
      { name: "Knowledge base", key: "kb" },
      { name: "Email", key: "email" },
    ],
    steps: [
      { label: "Read request from Zendesk", tool: "Zendesk · ticket #4821", ms: "0.2s", log: "ticket #4821 assigned to Support Agent" },
      { label: "Check customer history", tool: "Salesforce · account and orders", ms: "0.9s", log: "customer since 2021 · 3 prior tickets · tier: plus" },
      { label: "Search refund policy", tool: "Knowledge base · refund policy", ms: "0.6s", log: "policy REF-12 retrieved · inside 30-day window" },
      { label: "Draft response", tool: "Writing model · 124 words", ms: "1.2s", log: "draft reply ready for review" },
      { label: "Update CRM record", tool: "Salesforce · case notes", ms: "0.4s", log: "case notes written to Salesforce" },
      { label: "Send reply to customer", tool: "Email · to the customer", ms: "0.3s", log: "reply delivered to customer" },
      { label: "Record run in audit log", tool: "Audit log · permanent record", ms: "0.1s", log: "run-1082 recorded · audit #A-1082" },
    ],
    startAt: 3,
    auto: true,
  },
  {
    key: "finance",
    name: "Finance Agent",
    short: "FIN",
    kind: "Finance operations",
    version: "finance-agent v7",
    runId: "run-1076",
    started: "6 min ago",
    taskTitle: "Refund duplicate charge — refund #R-2048",
    taskRef: "refund #R-2048",
    status: "waiting",
    duration: "8s elapsed",
    tools: [
      { name: "Ledger", key: "ledger" },
      { name: "Knowledge base", key: "kb" },
      { name: "Stripe", key: "payments" },
    ],
    approval: {
      action: "Issue refund — $4,820.00",
      amount: "$4,820.00",
      customer: "Acme Robotics GmbH · account #2251",
      transaction: "Invoice #10482 · $4,820.00 · paid 14 Sep · Visa ···· 4417",
      reason: "Duplicate charge — the customer was billed twice for invoice #10482",
      policy: "FIN-204",
      policyNote: "refunds over $1,000 need a person to approve",
      evidence: [
        "Ledger shows two charges of $4,820.00 on 14 Sep",
        "Customer emailed support with the receipt attached",
        "Refund is inside the 30-day window (day 14)",
      ],
      previous: [
        "Verified customer identity",
        "Checked refund policy FIN-204",
        "Calculated refund amount from invoice #10482",
      ],
    },
    steps: [
      { label: "Verify customer", tool: "Ledger · account #2251", ms: "0.4s", log: "identity verified · billing match confirmed" },
      { label: "Check refund policy", tool: "Knowledge base · refund policy", ms: "0.6s", log: "refund inside policy window (day 14)" },
      { label: "Human approval — issue refund", tool: "Approval · policy FIN-204", ms: "waiting", log: "paused: refund needs a human" },
      { label: "Execute refund", tool: "Payments · refund issued", ms: "1.2s", log: "refund issued · recorded in the audit log (audit #A-1076)" },
    ],
    startAt: 2,
    auto: false,
  },
  {
    key: "sales",
    name: "Sales Ops Agent",
    short: "SAL",
    kind: "Pipeline",
    version: "sales-agent v2",
    runId: "run-1064",
    started: "41 min ago",
    taskTitle: "Qualify and route 14 new inbound leads — lead #L-820",
    taskRef: "lead #L-820",
    status: "completed",
    duration: "9s total",
    tools: [
      { name: "HubSpot", key: "hubspot" },
      { name: "Enrichment", key: "enrich" },
      { name: "Salesforce", key: "salesforce" },
      { name: "Slack", key: "slack" },
    ],
    steps: [
      { label: "Pull new leads from forms", tool: "HubSpot · 14 leads", ms: "0.7s", log: "14 leads pulled from web + pricing forms" },
      { label: "Enrich companies", tool: "Enrichment · company details", ms: "3.1s", log: "13 enriched · 1 skipped (no domain)" },
      { label: "Score and qualify", tool: "Scoring · fit with your ideal customer", ms: "1.9s", log: "6 qualified · 8 routed to nurture" },
      { label: "Update CRM", tool: "Salesforce · lead owners", ms: "1.3s", log: "owners assigned · SLA timers started" },
      { label: "Notify owners in Slack", tool: "Slack · pipeline channel", ms: "0.2s", log: "6 reps notified with lead context" },
    ],
    startAt: 5,
    auto: false,
  },
  {
    key: "email",
    name: "Email Agent",
    short: "EML",
    kind: "Shared inbox",
    version: "email-agent v5",
    runId: "run-1083",
    started: "1 min ago",
    taskTitle: "Triage shared inbox — 63 unread messages",
    taskRef: "63 unread",
    status: "running",
    duration: "5s elapsed",
    tools: [
      { name: "Gmail", key: "imap" },
      { name: "Knowledge base", key: "kb" },
      { name: "Outbound policy", key: "policy" },
    ],
    steps: [
      { label: "Pull unread messages", tool: "Gmail · shared inbox", ms: "0.7s", log: "63 unread messages pulled" },
      { label: "Classify by intent", tool: "Classify · 12 intents", ms: "1.1s", log: "63 messages sorted into 12 intents" },
      { label: "Draft replies", tool: "Draft · replies for review", ms: "2.4s", log: "9 replies drafted for review" },
      { label: "Send or request approval", tool: "Policy · outbound check", ms: "0.5s", log: "7 sent · 2 queued for approval" },
    ],
    startAt: 1,
    auto: true,
  },
  {
    key: "research",
    name: "Research Agent",
    short: "RES",
    kind: "Market research",
    version: "research-agent v1",
    runId: "run-1084",
    started: "3 min ago",
    taskTitle: "Draft weekly market brief — 18 sources",
    taskRef: "Q3 market brief",
    status: "running",
    duration: "4s elapsed",
    tools: [
      { name: "Web search", key: "web" },
      { name: "Notion", key: "notion" },
      { name: "Knowledge base", key: "kb" },
      { name: "Slack", key: "slack" },
    ],
    steps: [
      { label: "Collect sources", tool: "Web search · 18 sources", ms: "1.3s", log: "18 sources collected" },
      { label: "Read and summarize", tool: "Reading · 42 pages", ms: "3.8s", log: "42 pages summarized" },
      { label: "Compare findings", tool: "Compare · 6 themes", ms: "1.6s", log: "6 themes compared" },
      { label: "Save report to Notion", tool: "Notion · Q3 brief", ms: "0.6s", log: "report saved to Notion" },
    ],
    startAt: 0,
    auto: true,
  },
];

export type SectionKey =
  | "Ask Neumann"
  | "Overview"
  | "Agents"
  | "Workflows"
  | "Approvals"
  | "Integrations"
  | "Audit Log"
  | "Help";

export const NAV_MAIN: { label: SectionKey; icon: string; badge?: boolean }[] = [
  { label: "Ask Neumann", icon: "spark" },
  { label: "Overview", icon: "grid" },
  { label: "Agents", icon: "cube" },
  { label: "Workflows", icon: "branch" },
  { label: "Approvals", icon: "check", badge: true },
];

export const NAV_WS: { label: SectionKey; icon: string }[] = [
  { label: "Integrations", icon: "nodes" },
  { label: "Audit Log", icon: "doc" },
];

export const META: Record<SectionKey, string> = {
  "Ask Neumann": "Agents ready · demo workspace",
  Overview: "Last updated just now",
  Agents: "3 active agents · updated just now",
  Workflows: "5 workflows · 1 needs approval",
  Approvals: "This week · 2 resolved",
  Integrations: "8 tools connected",
  "Audit Log": "Append-only · today",
  Help: "Docs and guides",
};

export const WORKFLOWS = [
  { name: "Ticket first response", agent: "Support Agent", steps: 7, mode: "Automated", last: "run-1082 · running" },
  { name: "Refund over $1,000", agent: "Finance Agent", steps: 4, mode: "Needs approval", last: "run-1076 · waiting" },
  { name: "Inbound lead routing", agent: "Sales Ops Agent", steps: 5, mode: "Automated", last: "run-1064 · completed" },
  { name: "Shared inbox triage", agent: "Email Agent", steps: 4, mode: "Semi-automated", last: "run-1083 · running" },
  { name: "Weekly market brief", agent: "Research Agent", steps: 4, mode: "Scheduled", last: "run-1084 · running" },
  { name: "Refund under $1,000", agent: "Finance Agent", steps: 4, mode: "Automated", last: "run-1051 · completed" },
  { name: "Churn-risk alerts", agent: "Sales Ops Agent", steps: 6, mode: "Automated", last: "run-1044 · completed" },
  { name: "Invoice reminders", agent: "Finance Agent", steps: 5, mode: "Scheduled", last: "run-1029 · completed" },
  { name: "Escalation routing", agent: "Support Agent", steps: 4, mode: "Semi-automated", last: "run-1071 · completed" },
];

export type Integration = {
  name: string;
  scope: string;
  usedBy: string;
  readOnly?: boolean;
};

export const INTEGRATIONS: Integration[] = [
  { name: "Zendesk", scope: "tickets read/write", usedBy: "Support" },
  { name: "Salesforce", scope: "records read/write", usedBy: "Support · Sales" },
  { name: "HubSpot", scope: "leads read/write", usedBy: "Sales" },
  { name: "Stripe", scope: "payments read, refunds write", usedBy: "Finance" },
  { name: "Gmail", scope: "mailbox read/send", usedBy: "Email" },
  { name: "Slack", scope: "messages read/post", usedBy: "All agents" },
  { name: "Notion", scope: "pages read/write", usedBy: "Research" },
  { name: "Enrichment", scope: "company data read", usedBy: "Sales", readOnly: true },
  { name: "Postgres", scope: "analytics read", usedBy: "Finance · Research", readOnly: true },
  { name: "GitHub", scope: "issues read", usedBy: "Research · Support", readOnly: true },
];

export const AUDIT_LOG: [string, string, string, string][] = [
  ["09:41:58", "finance-agent v7", "approval.requested", "run-1076"],
  ["09:40:31", "finance-agent v7", "tool.invoked ledger.read", "run-1076"],
  ["09:38:47", "email-agent v5", "run.started", "run-1083"],
  ["09:36:12", "support-agent v3.2", "tool.invoked kb.search", "run-1082"],
  ["09:35:02", "support-agent v3.2", "policy.check passed REF-12", "run-1082"],
  ["09:31:20", "sales-agent v2", "run.completed", "run-1064"],
  ["09:29:44", "Maya K.", "agent.deployed v2", "sales-agent"],
  ["09:24:18", "Maya K.", "approval.granted", "run-1061"],
  ["09:23:50", "finance-agent v7", "tool.invoked stripe.refund", "run-1061"],
  ["09:12:04", "Maya K.", "agent.deployed v3.2", "support-agent"],
  ["09:04:37", "research-agent v1", "run.started", "run-1079"],
  ["08:58:21", "Maya K.", "integration.scope updated", "stripe"],
];

export const HELP_LINKS = [
  { label: "How the loop works", href: "#security" },
  { label: "Where teams start", href: "#use-cases" },
  { label: "Security and access", href: "#security" },
  { label: "Pricing", href: "#pricing" },
  { label: "Start free trial", href: "#demo" },
];

export function stepStates(
  agent: Agent,
  pos: number,
  approved: boolean,
  rejected: boolean,
): StepState[] {
  return agent.steps.map((_, i) => {
    if (i < pos) return "done";
    if (rejected && i >= pos) return "blocked";
    if (i === pos) {
      if (agent.key === "finance" && i === 2) return approved ? "active" : "wait";
      return "active";
    }
    return "pending";
  });
}

export function fmtTime(i: number) {
  const s = (7 + i * 6) % 60;
  return `09:4${1 + Math.floor(i / 2)}:${s < 10 ? "0" : ""}${s}`;
}
