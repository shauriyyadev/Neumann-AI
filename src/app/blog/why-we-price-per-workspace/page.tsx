import { FieldNote } from "@/components/FieldNote";

export const metadata = {
  title: "Why we price per workspace",
  description:
    "Per-seat pricing punishes exactly the behavior we want: more reviewers, more approvers, more people watching the runs.",
  openGraph: {
    title: "Why we price per workspace",
    description:
      "Per-seat pricing punishes exactly the behavior we want: more reviewers, more approvers, more people watching the runs.",
    type: "article",
    siteName: "Neumann",
  },
};

export default function Page() {
  return (
    <FieldNote
      index="03"
      title="Why we price per workspace"
      date="August 28, 2026"
      read="3 min"
      topic="Pricing"
      nextHref="/blog/where-agents-should-pause"
      nextTitle="Where agents should pause"
    >
      <p className="dropcap">
        Per-seat pricing punishes the behavior agent products actually want. If
        every reviewer costs money, invites get delayed, approvals bottleneck on
        the two licensed users, and the finance team reads screenshots instead
        of the audit log. Adoption slows down for a billing reason, not a trust
        reason.
      </p>

      <h2>What we charge for instead</h2>
      <p>
        A flat workspace price plus runs — the work actually done. Starter is
        $29 a month for three agents and 2,000 runs; Team is $99 for fifteen
        agents and 20,000 runs with the audit log and SSO. Annual billing takes
        20 percent off. When you approach a limit, admins are warned before
        anything changes; you choose whether to upgrade or pause runs, never a
        surprise invoice.
      </p>

      <h2>Who never appears on the invoice</h2>
      <p>
        Anyone you invite to watch. Approvers, auditors, the CFO who checks on
        Fridays — they cost nothing. The person approving the refund should not
        be a licensed seat you ration.
      </p>
      <p>
        The full plan comparison is on the{" "}
        <a href="/pricing">pricing page</a>.
      </p>
    </FieldNote>
  );
}
