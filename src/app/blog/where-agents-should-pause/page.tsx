import { FieldNote } from "@/components/FieldNote";

export const metadata = {
  title: "Where agents should pause",
  description:
    "The difference between an agent people trust and one they disable after a week is not model quality. It is where you put the pauses.",
  openGraph: {
    title: "Where agents should pause",
    description:
      "The difference between an agent people trust and one they disable after a week is not model quality. It is where you put the pauses.",
    type: "article",
    siteName: "Neumann",
  },
};

export default function Page() {
  return (
    <FieldNote
      index="01"
      title="Where agents should pause"
      date="September 24, 2026"
      read="5 min"
      topic="Approval design"
      nextHref="/blog/run-histories-auditors-read"
      nextTitle="Run histories auditors actually read"
    >
      <p className="dropcap">
        The difference between an agent people trust and one they disable after
        a week is rarely model quality. It is where the pauses are. Teams get
        this backwards: they add approvals to everything, the queue fills up,
        and someone approves blind just to clear it — or they add approvals to
        nothing, and one bad Friday ends the experiment.
      </p>

      <h2>Sort actions by reversibility</h2>
      <p>A useful first cut has three bands:</p>
      <ul>
        <li>
          <strong>Read.</strong> Fetching records, searching, summarizing. No
          pause; log it and move on.
        </li>
        <li>
          <strong>Reversible writes.</strong> Updating a field, creating a
          draft, posting an internal note. Run automatically, keep the
          before-state, make it one click to undo.
        </li>
        <li>
          <strong>Irreversible actions.</strong> Deleting records, issuing
          refunds, publishing, sending as the company. These always pause for a
          person.
        </li>
      </ul>
      <p>
        Most workflows are mostly reads with one or two irreversible steps at
        the end. That is the shape you are designing for.
      </p>

      <h2>Make the pause worth reading</h2>
      <p>
        A pause the approver cannot parse is worse than no pause at all. A good
        one shows the inputs, the proposed action, and the records affected —
        enough to spot a mismatch in two seconds. Consider an invoice run that
        stops with:{" "}
        <strong>
          Refund $640 to Acme Corp — original charge Mar 3, policy allows up to
          $500.
        </strong>{" "}
        The approver sees the number over policy immediately, without opening a
        single tool.
      </p>

      <h2>Start strict, loosen with evidence</h2>
      <p>
        Begin with approvals on every send, financial, and delete step. After
        two or three weeks of clean runs, teams typically move low-value
        thresholds to automatic and keep the hard stops. The history makes that
        decision safe — you are not guessing, you are reading what actually
        happened.
      </p>
      <p>
        Neumann ships with approvals on by default for every financial, delete,
        and outbound-send step. You can see where they sit in the{" "}
        <a href="/pricing">plan details</a>.
      </p>
    </FieldNote>
  );
}
