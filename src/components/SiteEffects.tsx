"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io?.unobserve(en.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
      );
      els.forEach((el) => io!.observe(el));
    } else {
      els.forEach((el) => el.classList.add("in"));
    }

    const cycleBtns = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".cycle-btn"),
    );
    const onCycle = (btn: HTMLButtonElement) => {
      const c = btn.getAttribute("data-cycle");
      cycleBtns.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      document.querySelectorAll<HTMLElement>(".price").forEach((p) => {
        p.textContent =
          "$" + p.getAttribute(c === "annual" ? "data-annual" : "data-monthly");
      });
      document.querySelectorAll<HTMLElement>(".billing-note").forEach((n) => {
        n.textContent = c === "annual" ? "billed annually" : "billed monthly";
      });
    };
    const cycleHandlers: [HTMLButtonElement, () => void][] = cycleBtns.map(
      (b) => [b, () => onCycle(b)],
    );
    cycleHandlers.forEach(([b, h]) => b.addEventListener("click", h));

    const openTarget = () => {
      document
        .querySelectorAll<HTMLDetailsElement>("details:target:not([open])")
        .forEach((d) => {
          d.open = true;
          d.scrollIntoView({ block: "center", behavior: "smooth" });
        });
    };
    openTarget();
    window.addEventListener("hashchange", openTarget);

    return () => {
      io?.disconnect();
      cycleHandlers.forEach(([b, h]) => b.removeEventListener("click", h));
      window.removeEventListener("hashchange", openTarget);
    };
  }, [pathname]);

  return null;
}
