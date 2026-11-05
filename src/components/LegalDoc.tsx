import type { ReactNode } from "react";

type LegalDocProps = {
  title: string;
  updated: string;
  intro: string;
  sections: Array<[id: string, label: string]>;
  children: ReactNode;
};

export function LegalDoc({
  title,
  updated,
  intro,
  sections,
  children,
}: LegalDocProps) {
  return (
    <section className="pt-14 md:pt-20 pb-16 md:pb-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-3xl reveal">
          <div className="eyebrow">Legal</div>
          <h1 className="font-display font-semibold t-l mt-3">{title}</h1>
          <p className="lede mt-4 max-w-2xl">
            Last updated {updated}. {intro}
          </p>
        </div>

        <div className="mt-10 grid items-start gap-x-14 gap-y-10 border-t border-line pt-8 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)]">
          <aside className="hidden lg:sticky lg:top-28 lg:block">
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
              On this page
            </p>
            <ol className="mt-3 border-t border-line">
              {sections.map(([id, label], i) => (
                <li key={id} className="border-b border-line">
                  <a
                    href={`#${id}`}
                    className="group flex items-baseline gap-3 py-2 text-[0.8125rem] leading-snug text-muted transition-colors hover:text-ink"
                  >
                    <span className="font-mono text-[0.5625rem] tabular-nums text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[0.8125rem] leading-relaxed text-muted">
              Questions?{" "}
              <a
                href="mailto:hello@neumann.example"
                className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-text"
              >
                Email us
              </a>
              .
            </p>
          </aside>

          <article className="article reveal">{children}</article>
        </div>
      </div>
    </section>
  );
}
