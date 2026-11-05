"use client";

import { useEffect, useRef } from "react";

/* Oversized closing wordmark. Its reveal and the band of light are both tied
   to scroll position, so the light travels with the wheel and reverses on the
   way back up instead of firing once on a timer. */

export default function FooterWordmark() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let maxScroll = 0;

    const measure = () => {
      maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
    };

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const start = Math.max(0, window.scrollY + rect.top - vh);
      const end = Math.max(start + 1, maxScroll);
      const raw = Math.min(
        1,
        Math.max(0, (window.scrollY - start) / (end - start)),
      );
      const p = raw * raw * (3 - 2 * raw);
      el.style.setProperty("--fw-p", p.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measure);

    measure();
    update();
    resizeObserver?.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => {
      measure();
      update();
    });

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="footer-wordmark" aria-hidden="true">
      <span className="fw-word" data-text="Neumann">
        Neumann
      </span>
      <noscript>
        <style>{`.footer-wordmark{--fw-p:1}`}</style>
      </noscript>
    </div>
  );
}
