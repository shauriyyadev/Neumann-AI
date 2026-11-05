"use client";

import { useEffect, useState } from "react";

export type FaqItem = { id: string; q: string; a: string };

/* Editorial accordion. One answer open at a time, animated on the
   grid row so the page grows smoothly instead of snapping open. */
export default function FaqList({
  items,
  className = "",
}: {
  items: FaqItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const pin = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = window.scrollY + el.getBoundingClientRect().top - 88;
      window.scrollTo(0, Math.max(0, top));
    };

    const sync = () => {
      const id = decodeURIComponent(window.location.hash.replace("#", ""));
      if (!items.some((item) => item.id === id)) return;

      /* Kill smooth scrolling for the landing so a late router or
         fragment scroll cannot drag the answer under the header. */
      const html = document.documentElement;
      const previous = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      setOpen(id);
      [60, 700, 1600].forEach((delay) =>
        window.setTimeout(() => pin(id), delay)
      );
      window.setTimeout(() => {
        html.style.scrollBehavior = previous;
      }, 2200);
    };

    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [items]);

  return (
    <div className={`faq faq-editorial ${className}`.trim()}>
      {items.map((item, i) => {
        const isOpen = open === item.id;
        const panelId = `${item.id}-panel`;

        return (
          <div
            key={item.id}
            id={item.id}
            className={`faq-item${isOpen ? " open" : ""}`}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={`${item.id}-q`}
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                <span className="q-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="q-text">{item.q}</span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={`${item.id}-q`}
              aria-hidden={!isOpen}
              className="faq-panel"
            >
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
