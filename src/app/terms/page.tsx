import { LegalDoc } from "@/components/LegalDoc";

export const metadata = {
  title: "Terms of service",
  description:
    "Terms governing your use of Neumann: accounts, acceptable use, fees, liability, and termination.",
  openGraph: {
    title: "Terms of service",
    description:
      "Terms governing your use of Neumann: accounts, acceptable use, fees, liability, and termination.",
    type: "website",
    siteName: "Neumann",
  },
};

const sections: Array<[string, string]> = [
  ["agreement", "Agreement"],
  ["account", "Your account"],
  ["acceptable-use", "Acceptable use"],
  ["your-content", "Your content"],
  ["fees", "Fees and billing"],
  ["trial", "Trial"],
  ["warranties", "Warranties"],
  ["liability", "Liability"],
  ["termination", "Termination"],
  ["changes", "Changes"],
];

export default function Page() {
  return (
    <LegalDoc
      title="Terms of service"
      updated="September 15, 2026"
      intro="These terms govern your use of Neumann."
      sections={sections}
    >
      <h2 id="agreement" className="scroll-mt-28">
        Agreement
      </h2>
      <p>
        These terms, together with any order form, are the agreement between you
        and Neumann, Inc. If an order form conflicts with these terms, the order
        form wins. By creating a workspace you accept them.
      </p>

      <h2 id="account" className="scroll-mt-28">
        Your account
      </h2>
      <p>
        Workspace admins are responsible for activity under the workspace, for
        keeping credentials secure, and for removing people who should no longer
        have access. You must be at least 18 and able to enter into a contract.
      </p>

      <h2 id="acceptable-use" className="scroll-mt-28">
        Acceptable use
      </h2>
      <ul>
        <li>
          No unlawful content, no unauthorized access attempts against systems
          that are not yours.
        </li>
        <li>
          No resale or sublicensing of the service without a written agreement.
        </li>
        <li>
          Keep a human in the loop for decisions with legal, medical, or
          financial consequences for individuals — the product is built around
          approvals for exactly this reason.
        </li>
      </ul>

      <h2 id="your-content" className="scroll-mt-28">
        Your content
      </h2>
      <p>
        You keep ownership of everything you and your agents process. You grant
        us only the limited rights needed to operate the service. We do not train
        models on your content — details in the{" "}
        <a href="/privacy">privacy policy</a>.
      </p>

      <h2 id="fees" className="scroll-mt-28">
        Fees and billing
      </h2>
      <p>
        Subscriptions are billed monthly or annually in advance; annual billing
        is 20 percent cheaper than monthly. Prices exclude tax. When your
        workspace approaches its run limit we notify admins, and you choose
        whether to upgrade or pause runs — we never add charges without notice.
        Subscriptions renew automatically until cancelled.
      </p>

      <h2 id="trial" className="scroll-mt-28">
        Trial
      </h2>
      <p>
        The 14-day trial needs no payment method. If you do not subscribe, the
        workspace becomes read-only when the trial ends and data is retained for
        30 days, then deleted.
      </p>

      <h2 id="warranties" className="scroll-mt-28">
        Warranties
      </h2>
      <p>
        The service is provided &ldquo;as is&rdquo;. We work hard to keep it
        accurate and available but do not promise it will be uninterrupted or
        error-free. You review agent outputs before relying on them — the
        approval workflow exists for that.
      </p>

      <h2 id="liability" className="scroll-mt-28">
        Liability
      </h2>
      <p>
        To the maximum extent permitted by law, neither party is liable for
        indirect or consequential damages. Our total liability is limited to the
        amounts you paid us in the 12 months before the claim.
      </p>

      <h2 id="termination" className="scroll-mt-28">
        Termination
      </h2>
      <p>
        Either party may cancel at any time; annual plans end at the term&apos;s
        end. After cancellation you can export your data for 30 days, after which
        we delete it.
      </p>

      <h2 id="changes" className="scroll-mt-28">
        Changes
      </h2>
      <p>
        We give at least 30 days notice of material changes. Contact:{" "}
        <a href="mailto:hello@neumann.example">hello@neumann.example</a>.
      </p>
    </LegalDoc>
  );
}
