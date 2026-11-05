import Link from "next/link";

export const metadata = {
  title: "About",
  description:
    "Neumann builds AI agents that work in the open: one run at a time, every step visible, and a pause before anything you cannot undo.",
  openGraph: {
    title: "About",
    description:
      "Neumann builds AI agents that work in the open: one run at a time, every step visible, and a pause before anything you cannot undo.",
    type: "website",
    siteName: "Neumann",
  },
};

const principles = [
  {
    title: "Show your work",
    body: "Every run is a readable record: what was read, what changed, how long it took. If we cannot explain it, we do not ship it.",
  },
  {
    title: "Ask before breaking",
    body: "Approvals are on by default for anything irreversible. Trust is earned by runs, not promised in a demo.",
  },
  {
    title: "Write it in sentences",
    body: "Workflows are described in plain language so the person who owns the process can read them — and change them.",
  },
  {
    title: "Price the workspace",
    body: "Inviting a reviewer should never cost money. We charge for work done, not for people watching.",
  },
];

export default function Page() {
  return (
    <>
      <section className="pt-14 md:pt-20 pb-10 md:pb-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-3xl reveal">
            <div className="eyebrow">
              <span className="n">05</span> / Company
            </div>
            <h1 className="font-display font-semibold t-l mt-3">
              Built to be checked.
            </h1>
            <p className="lede mt-4 max-w-2xl">
              Neumann started in 2024 because the automation we had was fast to
              build and impossible to trust.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 lg:gap-16 items-start">
            <div className="article reveal">
              <p className="dropcap">
                We were running operations at two companies that had automated
                themselves into a corner: thousands of brittle zaps, no record
                of what ran, and a standing rule that nobody touched production
                on Fridays. The tools could trigger anything and explain
                nothing.
              </p>
              <p>
                So we built the thing we wanted: agents that work in the open —
                one run at a time, every step visible, and a pause before
                anything you cannot undo. Today support, finance, and operations
                teams use Neumann to clear the work between their tools, without
                handing over the keys.
              </p>
              <p>
                We are a small team, remote-first, with hubs in San Francisco
                and Berlin. We write decisions down, staff our own support
                rotations, and measure the product by how often someone can
                explain a run without asking us.
              </p>
            </div>

            <figure className="reveal lg:mt-2">
              <blockquote className="border-y border-line py-8">
                <p className="font-display text-[clamp(1.5rem,2.5vw,2.15rem)] leading-[1.22] tracking-tight text-ink">
                  “The tools could trigger anything and explain nothing.”
                </p>
                <figcaption className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
                  The reason we started
                </figcaption>
              </blockquote>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
                {[
                  ["Founded", "2024"],
                  ["Team", "23 people, 6 countries"],
                  ["Offices", "San Francisco + Berlin"],
                  ["Funding", "Bootstrapped"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                      {k}
                    </dt>
                    <dd className="mt-1.5 text-[0.8125rem] leading-snug text-ink">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-band border-y border-line py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] gap-8 lg:gap-16 items-start">
            <div className="reveal">
              <div className="eyebrow">How we build</div>
              <h2 className="font-display font-semibold t-l mt-3 max-w-[14ch]">
                Four rules we do not trade away.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-10">
              {principles.map((p, i) => (
                <div
                  key={p.title}
                  className="border-t border-line py-6 reveal"
                >
                  <div className="font-mono text-[0.6875rem] tabular-nums text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 font-display text-[1.35rem] leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-band border-t border-line">
        <div className="mx-auto max-w-6xl px-5 grid md:grid-cols-[minmax(0,1.2fr)_auto] items-center gap-8 reveal">
          <div>
            <h2 className="font-display font-semibold t-l max-w-[18ch]">
              We are hiring across product and engineering.
            </h2>
            <p className="mt-3 text-muted text-[.9375rem] leading-relaxed max-w-xl">
              Small team, real ownership, and a product people trust with
              irreversible actions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/careers" className="btn btn-primary">
              See open roles
            </Link>
            <Link href="/blog" className="btn btn-ghost">
              Read the blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
