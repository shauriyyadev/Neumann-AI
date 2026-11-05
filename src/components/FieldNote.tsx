import Link from "next/link";
import type { ReactNode } from "react";

type FieldNoteProps = {
  index: string;
  title: string;
  date: string;
  read: string;
  topic: string;
  nextHref: string;
  nextTitle: string;
  children: ReactNode;
};

export function FieldNote({
  index,
  title,
  date,
  read,
  topic,
  nextHref,
  nextTitle,
  children,
}: FieldNoteProps) {
  return (
    <>
      <section className="pt-14 md:pt-20 pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> All field notes
          </Link>

          <header className="mt-8 max-w-3xl reveal">
            <div className="eyebrow">
              <span className="n">{index}</span> / Field note
            </div>
            <h1 className="font-display font-semibold t-l mt-3">{title}</h1>
          </header>

          <div className="mt-10 grid items-start gap-x-14 gap-y-10 border-t border-line pt-8 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)]">
            <aside className="reveal lg:sticky lg:top-28">
              <dl>
                {[
                  ["Published", date],
                  ["Reading", read],
                  ["Topic", topic],
                  ["By", "The Neumann team"],
                ].map(([k, v], i) => (
                  <div
                    key={k}
                    className={`grid grid-cols-[5.25rem_minmax(0,1fr)] gap-x-4 border-b border-line py-3 ${
                      i === 0 ? "pt-0" : ""
                    }`}
                  >
                    <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                      {k}
                    </dt>
                    <dd className="text-[0.8125rem] leading-snug text-ink">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 max-w-[22ch] text-[0.8125rem] leading-relaxed text-muted">
                Written by the people who ship the product.
              </p>
            </aside>

            <div>
              <article className="article reveal">{children}</article>

              <div className="reveal mt-12 max-w-[44rem] border-t border-line pt-5">
                <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                  Next field note
                </p>
                <Link
                  href={nextHref}
                  className="group mt-2 flex items-baseline justify-between gap-6 font-display text-[1.25rem] leading-snug text-ink transition-colors hover:text-accent-text"
                >
                  {nextTitle}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[1rem] text-accent-text transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-band border-t border-line">
        <div className="mx-auto max-w-6xl px-5 flex flex-col md:flex-row md:items-center gap-6 reveal">
          <div className="md:w-1/2">
            <h2 className="font-display font-semibold t-s">
              See it in a real workspace.
            </h2>
            <p className="mt-2 text-muted text-[.9375rem] leading-relaxed max-w-xl">
              Connect one tool and watch a run open — approvals included.
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
