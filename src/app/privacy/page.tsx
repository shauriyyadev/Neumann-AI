import { LegalDoc } from "@/components/LegalDoc";

export const metadata = {
  title: "Privacy policy",
  description:
    "What Neumann collects, how it is used, retention, subprocessors, and your rights.",
  openGraph: {
    title: "Privacy policy",
    description:
      "What Neumann collects, how it is used, retention, subprocessors, and your rights.",
    type: "website",
    siteName: "Neumann",
  },
};

const sections: Array<[string, string]> = [
  ["who-we-are", "Who we are"],
  ["what-we-collect", "What we collect"],
  ["how-we-use-it", "How we use it"],
  ["legal-bases", "Legal bases"],
  ["subprocessors", "Subprocessors"],
  ["retention", "Retention"],
  ["your-rights", "Your rights"],
  ["transfers", "International transfers"],
  ["dpa", "Data processing agreement"],
  ["changes", "Changes"],
];

export default function Page() {
  return (
    <LegalDoc
      title="Privacy policy"
      updated="September 15, 2026"
      intro="This policy covers the Neumann website and product."
      sections={sections}
    >
      <h2 id="who-we-are" className="scroll-mt-28">
        Who we are
      </h2>
      <p>
        Neumann, Inc. (&ldquo;we&rdquo;) provides the Neumann workspace product
        and this website. For privacy questions, write to{" "}
        <a href="mailto:hello@neumann.example">hello@neumann.example</a>.
      </p>

      <h2 id="what-we-collect" className="scroll-mt-28">
        What we collect
      </h2>
      <ul>
        <li>
          <strong>Account data.</strong> Name, work email, workspace name, and
          billing details if you subscribe.
        </li>
        <li>
          <strong>Usage data.</strong> Logs of how the product is used — pages,
          features, device and browser characteristics, approximate location
          derived from IP.
        </li>
        <li>
          <strong>Content processed for you.</strong> The records, tickets, and
          documents your agents work with. We process this only to run the
          service; we do not mine it, sell it, or train models on it.
        </li>
        <li>
          <strong>Website data.</strong> Standard server logs and privacy-first
          analytics (no cross-site tracking, no advertising identifiers).
        </li>
      </ul>

      <h2 id="how-we-use-it" className="scroll-mt-28">
        How we use it
      </h2>
      <ul>
        <li>
          To provide, secure, and support the service, including detecting
          abuse.
        </li>
        <li>To bill subscriptions and keep required financial records.</li>
        <li>
          To send service messages (incidents, billing, material policy changes)
          and, if you opted in, product updates — unsubscribe any time.
        </li>
        <li>
          To improve the product using aggregated usage metadata about features,
          never your content.
        </li>
      </ul>

      <h2 id="legal-bases" className="scroll-mt-28">
        Legal bases
      </h2>
      <p>
        Under the GDPR we rely on: performance of a contract (providing the
        service), legitimate interests (security, product improvement, B2B
        communication), and consent (marketing email). You may withdraw consent
        at any time without affecting prior processing.
      </p>

      <h2 id="subprocessors" className="scroll-mt-28">
        Subprocessors
      </h2>
      <p>Entities that process data on our behalf:</p>
      <ul>
        <li>
          <strong>Cloud hosting</strong> — application and database hosting in
          your chosen region (US or EU).
        </li>
        <li>
          <strong>Model providers</strong> — prompt processing under
          zero-retention agreements; your data is never used for training.
        </li>
        <li>
          <strong>Payment processing</strong> — card payments; we never see full
          card numbers.
        </li>
        <li>
          <strong>Transactional email</strong> — setup links and alerts.
        </li>
        <li>
          <strong>Product analytics</strong> — privacy-first, first-party only.
        </li>
      </ul>
      <p>We publish additions at least 30 days before they take effect.</p>

      <h2 id="retention" className="scroll-mt-28">
        Retention
      </h2>
      <p>
        Account data is kept while your workspace exists and for 30 days after
        deletion (including backups). Run history follows your plan: 30 days, 90
        days, or a custom Enterprise schedule. Invoices are retained for seven
        years where tax law requires it.
      </p>

      <h2 id="your-rights" className="scroll-mt-28">
        Your rights
      </h2>
      <p>
        Access, correction, deletion, export, and portability — all available in
        workspace settings, or by writing to us. You may also complain to your
        supervisory authority.
      </p>

      <h2 id="transfers" className="scroll-mt-28">
        International transfers
      </h2>
      <p>
        EU workspaces are processed in the EU. Where transfer to the US is
        required (for example, support access), we use the European
        Commission&apos;s Standard Contractual Clauses.
      </p>

      <h2 id="dpa" className="scroll-mt-28">
        Data processing agreement
      </h2>
      <p>
        We sign a DPA, including Standard Contractual Clauses, for every
        customer on request — with the Enterprise plan it is part of contract
        setup. Ask through the trial form or write to{" "}
        <a href="mailto:hello@neumann.example">hello@neumann.example</a>.
      </p>

      <h2 id="changes" className="scroll-mt-28">
        Changes
      </h2>
      <p>
        Material changes are announced at least 30 days before they take effect.
        Continued use after that date constitutes acceptance.
      </p>
    </LegalDoc>
  );
}
