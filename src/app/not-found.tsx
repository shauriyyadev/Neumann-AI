import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-14 md:pt-20 pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-start gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)]">
          <div className="reveal">
            <div className="eyebrow">
              <span className="n">404</span> / Not found
            </div>
            <p className="mt-6 max-w-[24ch] font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.16em] text-muted">
              Nothing is filed at this address.
            </p>
          </div>

          <div className="reveal border-t border-line pt-8 lg:border-t-0 lg:pt-0">
            <h1 className="font-display font-semibold t-l max-w-[16ch]">
              This page is not here.
            </h1>
            <p className="lede mt-4 max-w-lg">
              The link may be old, or the page moved. Nothing was deleted from
              your workspace.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="btn btn-primary">
                Back to home
              </Link>
              <Link href="/security" className="btn btn-ghost">
                Security
              </Link>
            </div>

            <div className="mt-10 border-t border-line pt-5">
              <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-muted">
                Or try
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <li>
                  <Link
                    href="/pricing"
                    className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-text"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-text"
                  >
                    Field notes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-text"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
