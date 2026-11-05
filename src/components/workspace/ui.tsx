import type { ReactNode } from "react";
import type { Pill } from "./data";

export function Icon({ name, size = 15 }: { name: string; size?: number }) {
  const p: Record<string, ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    cube: (
      <>
        <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
        <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
      </>
    ),
    branch: (
      <>
        <circle cx="6" cy="6" r="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="12" r="2" />
        <path d="M8 6h3a5 5 0 0 1 5 5M8 18h3a5 5 0 0 0 5-5" />
      </>
    ),
    pulse: <path d="M3 12h4l2.5-6 4 12L16 12h5" />,
    check: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M8.5 12.5l2.5 2.5 4.5-5" />
      </>
    ),
    nodes: (
      <>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="12" cy="18" r="2.5" />
        <path d="M8.5 6h7M7.5 8l3 7.5M16.5 8l-3 7.5" />
      </>
    ),
    doc: (
      <>
        <path d="M6 3.5h9l3 3V20.5H6z" />
        <path d="M9 9h6M9 13h6M9 17h4" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9.8 9.5a2.3 2.3 0 1 1 3.1 2.2c-.7.3-1.2.9-1.2 1.7v.3" />
        <path d="M11.7 17h.01" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </>
    ),
    bell: (
      <>
        <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
        <path d="M10.5 19a1.8 1.8 0 0 0 3 0" />
      </>
    ),
    close: <path d="M6 6l12 12M18 6L6 18" />,
    chev: <path d="M6 9l6 6 6-6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    play: <path d="M8 5.5v13l10-6.5z" />,
    filter: <path d="M4 7h16M7 12h10M10 17h4" />,
    spark: (
      <>
        <path d="M12 3l1.7 5.1a4 4 0 0 0 2.5 2.5L21.3 12l-5.1 1.7a4 4 0 0 0-2.5 2.5L12 21l-1.7-5.1a4 4 0 0 0-2.5-2.5L2.7 12l5.1-1.7a4 4 0 0 0 2.5-2.5L12 3z" />
        <path d="M18.5 3.5l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6z" />
      </>
    ),
    arrow: <path d="M5 12h13M13 6l6 6-6 6" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-none"
    >
      {p[name]}
    </svg>
  );
}

export function StatusPill({ cls, text }: Pill) {
  return (
    <span className={`w-status ${cls}`}>
      <span className="dot" />
      {text}
    </span>
  );
}
