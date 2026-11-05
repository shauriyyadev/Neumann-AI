import Link from "next/link";
import FooterWordmark from "./FooterWordmark";
import BrandMark from "./BrandMark";

const cols: [string, [string, string][]][] = [
  [
    "Product",
    [
      ["How it works", "/#security"],
      ["Use cases", "/#use-cases"],
      ["Pricing", "/pricing"],
      ["Security", "/security"],
    ],
  ],
  [
    "Company",
    [
      ["About", "/about"],
      ["Blog", "/blog"],
      ["Careers", "/careers"],
      ["Contact", "/#demo"],
    ],
  ],
  [
    "Legal",
    [
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
      ["DPA", "/privacy#dpa"],
    ],
  ],
];

export default function Footer() {
  return (
    <footer className="site-footer relative border-t border-[var(--footer-line)] pt-16 pb-0">
      <span className="crosshair -top-1 left-5" aria-hidden="true" />
      <span className="crosshair -top-1 right-5" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark />
              <span className="font-display font-semibold text-[1.125rem] tracking-[-0.025em]">
                Neumann<span className="text-accent">.</span>
              </span>
            </div>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "var(--footer-muted)" }}
            >
              AI agents for support, finance, and operations teams.
            </p>
          </div>
          {cols.map(([title, links]) => (
            <div key={title}>
              <h2 className="text-sm font-semibold mb-3.5">{title}</h2>
              <ul className="space-y-2.5 text-sm">
                {links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row gap-3 justify-between text-xs"
          style={{
            borderTop: "1px solid var(--footer-line)",
            color: "var(--footer-muted)",
          }}
        >
          <span>© 2026 Neumann, Inc.</span>
          <span>San Francisco + Berlin</span>
        </div>
      </div>
      <div className="mt-12 border-t border-[var(--footer-line)] pt-6">
        <div className="mx-auto max-w-6xl px-5 [container-type:inline-size]">
          <FooterWordmark />
        </div>
      </div>
    </footer>
  );
}
