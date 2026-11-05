/* Hero abstract: an iris of fine rings with a warm core and two slow
   orbital arcs. Every moving part animates transform or opacity only,
   so the whole field stays on the compositor. Decorative. */

import type { CSSProperties } from "react";

const STARS = [
  { x: 16, y: 26, d: 0 },
  { x: 82, y: 18, d: 1.2 },
  { x: 70, y: 40, d: 2.4 },
  { x: 28, y: 46, d: 3.6 },
  { x: 88, y: 52, d: 4.4 },
  { x: 11, y: 56, d: 5.2 },
];

export default function HeroAbstract() {
  return (
    <div className="hero-abstract" aria-hidden="true">
      <span className="ha-wash" />

      <div className="ha-iris">
        <span className="ha-rings" />
        <svg className="ha-orbit" viewBox="0 0 800 800" focusable="false">
          <circle cx="400" cy="400" r="392" className="ha-arc" />
          <circle cx="400" cy="400" r="316" className="ha-arc thin" />
        </svg>
        <span className="ha-core" />
      </div>

      <div className="ha-stars">
        {STARS.map((s) => (
          <i
            key={`${s.x}-${s.y}`}
            style={{ left: `${s.x}%`, top: `${s.y}%`, "--tw": `${s.d}s` } as CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
