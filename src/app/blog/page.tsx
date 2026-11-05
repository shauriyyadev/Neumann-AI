import Link from "next/link";

export const metadata = {
  title: "Blog",
  description:
    "Notes from building agents people can trust — approval design, audit trails, and how we price.",
  openGraph: {
    title: "Blog",
    description:
      "Notes from building agents people can trust — approval design, audit trails, and how we price.",
    type: "website",
    siteName: "Neumann",
  },
};

const posts = [
  {
    href: "/blog/where-agents-should-pause",
    date: "September 24, 2026",
    read: "5 min",
    title: "Where agents should pause",
    excerpt:
      "The difference between an agent people trust and one they disable after a week is not model quality. It is where you put the pauses.",
  },
  {
    href: "/blog/run-histories-auditors-read",
    date: "September 10, 2026",
    read: "4 min",
    title: "Run histories auditors actually read",
    excerpt:
      "When someone asks “show me what happened,” screenshots and Slack scrollback do not count. Run histories are the answer.",
  },
  {
    href: "/blog/why-we-price-per-workspace",
    date: "August 28, 2026",
    read: "3 min",
    title: "Why we price per workspace",
    excerpt:
      "Per-seat pricing punishes exactly the behavior we want: more reviewers, more approvers, more people watching the runs.",
  },
];

export default function Page() {
  return (
    <>
      <section className="pt-14 md:pt-20 pb-10 md:pb-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-3xl reveal">
            <div className="eyebrow">Writing / Field notes</div>
            <h1 className="font-display font-semibold t-l mt-3">
              Notes from the build.
            </h1>
            <p className="lede mt-4 max-w-2xl">
              Three essays on approval design, audit trails, and the economics
              of trust. Written by the people who ship the product.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="border-t border-line">
            {posts.map((p, i) => (
              <Link
                key={p.href}
                href={p.href}
                className="group grid grid-cols-[2rem_minmax(0,1fr)] md:grid-cols-[2.5rem_minmax(0,1.1fr)_minmax(0,0.9fr)] lg:grid-cols-[3rem_minmax(0,1.15fr)_minmax(0,0.95fr)_5rem] gap-x-6 gap-y-3 border-b border-line py-7 reveal"
              >
                <span className="pt-1 font-mono text-[0.6875rem] tabular-nums text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <div className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
                    {p.date} · {p.read}
                  </div>
                  <h2 className="mt-2 font-display text-[1.55rem] leading-tight tracking-tight transition-colors group-hover:text-accent-text">
                    {p.title}
                  </h2>
                </div>

                <p className="col-start-2 text-[0.9375rem] leading-relaxed text-muted md:col-start-3">
                  {p.excerpt}
                </p>

                <div className="col-start-2 flex items-center gap-3 lg:col-start-4 lg:justify-end lg:self-center">
                  <span className="sr-only">Read note</span>
                  <span
                    aria-hidden="true"
                    className="text-[1rem] text-accent-text transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted reveal">
            No newsletter. New notes are posted when there is something worth
            writing down.
          </p>
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
              the same day.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/#demo" className="btn btn-primary">
              Start free trial
            </Link>
            <Link href="/pricing" className="btn btn-ghost">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
