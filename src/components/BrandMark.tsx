/* The Neumann monogram: a knockout N cut from the brand tile.

   Drawn rather than typeset so the letterform stays crisp at 16px and
   never depends on a webfont being ready. Decorative: the wordmark beside
   it carries the name. */

export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={className ? `brandmark ${className}` : "brandmark"}
      viewBox="0 0 32 32"
      role="presentation"
      focusable="false"
    >
      <path
        d="M9 0h14a9 9 0 0 1 9 9v14a9 9 0 0 1-9 9H9a9 9 0 0 1-9-9V9a9 9 0 0 1 9-9Z"
        fill="#ff5e3a"
      />
      <path
        d="M9 0h14a9 9 0 0 1 9 9v2.5H0V9a9 9 0 0 1 9-9Z"
        fill="#ffffff"
        opacity=".13"
      />
      <path
        d="M10 20.5V7.5L22 20.5V7.5"
        fill="none"
        stroke="#160d09"
        strokeWidth="3.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
