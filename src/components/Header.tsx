"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BrandMark from "./BrandMark";

type NavItem = {
  key: string;
  label: string;
  href: string;
  sub?: { label: string; href: string; hint: string }[];
};

const NAV: NavItem[] = [
  {
    key: "product",
    label: "Product",
    href: "/#product",
    sub: [
      { label: "Workspace", href: "/#product", hint: "the live product tour" },
      { label: "Use cases", href: "/#use-cases", hint: "where teams start" },
      { label: "Security", href: "/#security", hint: "access, audit, residency" },
      { label: "Pricing", href: "/#pricing", hint: "per workspace, not per seat" },
    ],
  },
  {
    key: "how",
    label: "How it works",
    href: "/#security",
    sub: [
      { label: "The loop", href: "/#security", hint: "one workflow, start to finish" },
      { label: "FAQ", href: "/#faq", hint: "the questions we hear most" },
      { label: "Book a demo", href: "/#demo", hint: "30 minutes with an engineer" },
    ],
  },
  {
    key: "cases",
    label: "Use cases",
    href: "/#use-cases",
    sub: [
      { label: "Support", href: "/#use-cases", hint: "triage tickets & draft replies" },
      { label: "Finance", href: "/#use-cases", hint: "reconcile invoices" },
      { label: "Sales", href: "/#use-cases", hint: "research new leads" },
      { label: "Reporting", href: "/#use-cases", hint: "weekly digests, on time" },
    ],
  },
  { key: "pricing", label: "Pricing", href: "/pricing" },
  {
    key: "faq",
    label: "FAQ",
    href: "/#faq",
    sub: [
      { label: "What can an agent do?", href: "/#faq-capabilities", hint: "capabilities" },
      { label: "How do approvals work?", href: "/#faq-approvals", hint: "human control" },
      { label: "Which tools connect?", href: "/#faq-tools", hint: "integrations" },
      { label: "Where does data live?", href: "/#faq-data", hint: "residency" },
      { label: "What if a run fails?", href: "/#faq-failures", hint: "recovery" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const onPricing = pathname === "/pricing";
  const [open, setOpen] = useState(false);
  const [floating, setFloating] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  // The header is tied to scroll position rather than toggled at a threshold,
  // so it travels with the wheel in both directions instead of racing it.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    let frame = 0;
    let wasFloating = false;
    const update = () => {
      frame = 0;
      const x = Math.min(1, Math.max(0, window.scrollY / 140));
      const p = x * x * (3 - 2 * x);
      el.style.setProperty("--nav-p", p.toFixed(4));
      const next = p > 0.55;
      if (next !== wasFloating) {
        wasFloating = next;
        setFloating(next);
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const navItem = (item: NavItem) => {
    const current = onPricing && item.key === "pricing";
    return (
      <div key={item.key} className="group relative">
        <Link
          href={item.href}
          aria-current={current ? "page" : undefined}
          className={`nav-link ${
            current
              ? "text-ink font-medium"
              : "text-muted hover:text-ink transition-colors"
          }`}
        >
          {item.label}
          {item.sub && (
            <span className="nav-caret" aria-hidden="true">
              ▾
            </span>
          )}
        </Link>
        {item.sub && (
          <div className="nav-drop-wrap">
            <div className="nav-drop">
              {item.sub.map((s) => (
                <Link key={s.label} href={s.href}>
                  <span className="dd-label">{s.label}</span>
                  <span className="dd-hint font-mono">{s.hint}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`site-header sticky top-0 z-50${floating ? " is-scrolled" : ""}`}
        style={{
          backdropFilter: "blur(14px) saturate(1.35)",
          WebkitBackdropFilter: "blur(14px) saturate(1.35)",
        }}
      >
      <div className="site-head-inner relative mx-auto max-w-6xl flex items-center">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Neumann home">
          <BrandMark />
          <span className="site-brand font-display font-semibold tracking-[-0.025em]">
            Neumann<span className="text-accent">.</span>
          </span>
        </Link>
        <nav
          className="site-nav hidden lg:flex lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 items-center justify-center text-muted"
          aria-label="Main navigation"
        >
          {NAV.map(navItem)}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/#demo" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Start free trial
          </Link>
          <button
            id="menu-btn"
            type="button"
            className="icon-btn lg:hidden"
            aria-expanded={open ? "true" : "false"}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M2.5 5h13M2.5 9h13M2.5 13h13" />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="mobile-menu"
        className={`${open ? "" : "hidden"} lg:hidden border-t border-line mobile-panel`}
      >
        <nav
          className="px-5 pt-2 pb-4 flex flex-col text-[.9375rem]"
          aria-label="Mobile navigation"
        >
          {NAV.map((item) => {
            const current = onPricing && item.key === "pricing";
            return (
              <div key={item.key} className="border-b border-line py-1">
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`block py-2 ${
                    current ? "text-ink font-medium" : "text-muted hover:text-ink"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.sub && (
                  <div className="flex flex-col pl-4 pb-1.5">
                    {item.sub.map((s) => (
                      <Link
                        key={s.label}
                        href={s.href}
                        className="py-1.5 text-sm text-muted hover:text-ink"
                        onClick={() => setOpen(false)}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="px-5 pb-4">
          <Link
            href="/#demo"
            className="btn btn-primary w-full"
            onClick={() => setOpen(false)}
          >
            Start free trial
          </Link>
        </div>
      </div>
    </header>
    </>
  );
}
