import type { CSSProperties } from "react";

const WAVE = [
  28, 44, 62, 38, 72, 90, 58, 34, 52, 78, 44, 66, 96, 72, 48, 32, 58, 84, 62,
  40, 54, 76, 92, 64, 42, 30, 50, 70, 88, 56, 36, 48, 68, 80,
];

const TURNAROUND = [34, 52, 40, 68, 58, 76, 48, 62, 84, 70, 56, 44, 66, 90];
const FAILURES = [12, 18, 8, 26, 14, 10, 22, 8, 12, 6, 16, 9, 12, 7];

export default function SignalBand() {
  return (
    <section
      id="signals"
      className="sec-lit relative overflow-hidden bg-band border-y border-line py-20 md:py-28"
    >
      <span className="amb" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl reveal">
            <div className="eyebrow">
              <span className="n">03</span> / Signals
            </div>
            <h2 className="font-display font-semibold t-l mt-3">
              The run, in telemetry.
            </h2>
            <p className="lede mt-4 max-w-xl">
              Every workflow leaves a readable trace: how long a gate waited,
              which step retried, what a voice call became.
            </p>
          </div>
          <div className="reveal">
            <span className="capsule">
              <span className="pip" aria-hidden="true" />
              <strong>Telemetry</strong> · demo workspace
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.3fr]">
          <div className="tele reveal">
            <div className="tele-head">
              <span className="tele-label">Approval turnaround</span>
              <span className="tele-tag">ISS-2</span>
            </div>
            <div className="tele-value num">
              4m 12s <small>p95</small>
            </div>
            <div className="tele-bars" aria-hidden="true">
              {TURNAROUND.map((h, i) => (
                <i
                  key={i}
                  style={{ "--h": `${h}%` } as CSSProperties}
                  className={i === TURNAROUND.length - 1 ? "gold" : undefined}
                />
              ))}
            </div>
            <p className="tele-note">132 gates this week · none over 30m</p>
          </div>

          <div className="tele reveal">
            <div className="tele-head">
              <span className="tele-label">Failed runs</span>
              <span className="tele-tag">IMP-16</span>
            </div>
            <div className="tele-value num">
              0.4% <small>of 18,420</small>
            </div>
            <div className="tele-bars" aria-hidden="true">
              {FAILURES.map((h, i) => (
                <i
                  key={i}
                  style={{ "--h": `${h}%` } as CSSProperties}
                  className={i % 4 === 0 ? undefined : "dim"}
                />
              ))}
            </div>
            <p className="tele-note">retry ×3 → queue · no page fired</p>
          </div>

          <div className="tele reveal md:col-span-2 lg:col-span-1">
            <div className="tele-head">
              <span className="tele-label">Voice intake</span>
              <span className="tele-tag">VOC-9</span>
            </div>

            <div className="wave mt-4" aria-hidden="true">
              {WAVE.map((h, i) => (
                <i
                  key={i}
                  style={
                    {
                      "--h": `${h}%`,
                      "--d": `${(i % 12) * 0.07}s`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>

            <div className="mt-4 space-y-1.5 font-mono text-[0.6875rem] leading-relaxed">
              <p className="text-muted">
                <span className="text-accent-text">00:12</span> “duplicate charge
                on invoice 10482 —”
              </p>
              <p className="text-muted">
                <span className="text-accent-text">00:31</span> “— can someone
                refund the second one?”
              </p>
            </div>

            <p className="tele-note mt-3">
              transcribed 00:42 · ticket #4192 drafted · awaiting Sam
            </p>
          </div>
        </div>

        <div className="reveal mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-line px-4 py-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
          <span>
            queue.depth <span className="text-ink">0</span>
          </span>
          <span className="hidden sm:inline" aria-hidden="true">
            /
          </span>
          <span>
            retry(3) <span className="text-ink">→ backoff</span>
          </span>
          <span className="hidden sm:inline" aria-hidden="true">
            /
          </span>
          <span>
            approval.timeout <span className="text-ink">15m</span>
          </span>
          <span className="ml-auto hidden md:inline">
            audit.export <span className="text-ink">jsonl</span>
          </span>
        </div>
      </div>
    </section>
  );
}
