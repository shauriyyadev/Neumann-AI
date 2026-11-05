import { FieldNote } from "@/components/FieldNote";

export const metadata = {
  title: "Run histories auditors actually read",
  description:
    "When someone asks “show me what happened,” screenshots and Slack scrollback do not count. Run histories are the answer.",
  openGraph: {
    title: "Run histories auditors actually read",
    description:
      "When someone asks “show me what happened,” screenshots and Slack scrollback do not count. Run histories are the answer.",
    type: "article",
    siteName: "Neumann",
  },
};

export default function Page() {
  return (
    <FieldNote
      index="02"
      title="Run histories auditors actually read"
      date="September 10, 2026"
      read="4 min"
      topic="Audit trails"
      nextHref="/blog/why-we-price-per-workspace"
      nextTitle="Why we price per workspace"
    >
      <p className="dropcap">
        Every security review reaches the same question: show us what happened.
        Screenshots and Slack scrollback do not count — auditors want a record
        that is complete, timestamped, and impossible to quietly edit. That
        record is the run history.
      </p>

      <h2>One record per run</h2>
      <p>
        Each run keeps every step with its name, inputs, outputs, duration, and
        actor — the agent, or the person who approved. A reviewer can open run
        #4192 from four months ago and see that 124 invoices were matched, four
        exceptions were proposed, and who signed off. No reconstruction
        required.
      </p>

      <h2>Append-only and exportable</h2>
      <p>
        Steps are never edited in place; a correction is a new event. That gives
        you a trail that survives employee turnover and tool changes. History
        exports to CSV and JSON whenever you need it outside the product, and
        retention follows your plan: 30 days on Starter, 90 on Team, custom on
        Enterprise.
      </p>

      <h2>The three questions auditors ask</h2>
      <ul>
        <li>
          <strong>Who had access?</strong> SSO and SCIM logs, plus workspace
          roles.
        </li>
        <li>
          <strong>What did they change?</strong> Run history, approvals, and
          connection scopes.
        </li>
        <li>
          <strong>How do you know?</strong> Approvals on irreversible steps and
          quarterly access reviews.
        </li>
      </ul>
      <p>
        Our own controls are described on the{" "}
        <a href="/security">security page</a>, and the SOC 2 report is available
        under NDA.
      </p>
    </FieldNote>
  );
}
