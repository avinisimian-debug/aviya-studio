import type { CSSProperties } from "react";

const scores = [
  { label: "Performance", value: 100 },
  { label: "Accessibility", value: 100 },
  { label: "Best Practices", value: 100 },
  { label: "SEO", value: 100 },
] as const;

const metrics = [
  { value: "<0.5s", label: "Global TTFB" },
  { value: "0 KB", label: "Template bloat" },
  { value: "100%", label: "Custom code" },
] as const;

const stack = ["Next.js 16", "React 19", "TypeScript", "Tailwind", "Edge Runtime"] as const;

/**
 * Engineering & performance HUD — the hero visual.
 *
 * A single, sharp technical card (Lighthouse audit + real edge-runtime code)
 * that proves engineering quality with measurements instead of fake product
 * mockups. Rendered LTR, like a real developer surface.
 */
export function EngineeringHud() {
  return (
    <div className="hud" dir="ltr">
      <div className="hud-bar">
        <span className="hud-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="hud-title">
          <span className="hud-title-mark">◆</span> engineering · audit
        </span>
        <span className="hud-live">
          <i aria-hidden="true" /> LIVE
        </span>
      </div>

      <div className="hud-scores">
        {scores.map((score) => (
          <div className="hud-score" key={score.label}>
            <span
              className="hud-ring"
              style={{ "--v": score.value } as CSSProperties}
            >
              <b>{score.value}</b>
            </span>
            <span className="hud-score-label">{score.label}</span>
          </div>
        ))}
      </div>

      <pre className="hud-code" aria-hidden="true">
        <span className="hud-line">
          <span className="hud-ln">1</span>
          <span className="tok-c">{"// edge runtime · zero template bloat"}</span>
        </span>
        <span className="hud-line">
          <span className="hud-ln">2</span>
          <span>
            <span className="tok-k">export const</span> <span className="tok-v">runtime</span> ={" "}
            <span className="tok-s">&quot;edge&quot;</span>;
          </span>
        </span>
        <span className="hud-line">
          <span className="hud-ln">3</span>
          <span> </span>
        </span>
        <span className="hud-line">
          <span className="hud-ln">4</span>
          <span>
            <span className="tok-k">export default async function</span>{" "}
            <span className="tok-f">Page</span>() {"{"}
          </span>
        </span>
        <span className="hud-line">
          <span className="hud-ln">5</span>
          <span>
            {"  "}
            <span className="tok-k">const</span> <span className="tok-v">audit</span> ={" "}
            <span className="tok-k">await</span> <span className="tok-f">runAudit</span>(
            <span className="tok-v">SITE</span>);
          </span>
        </span>
        <span className="hud-line">
          <span className="hud-ln">6</span>
          <span>
            {"  "}
            <span className="tok-k">return</span> {"<"}
            <span className="tok-f">Launch</span> <span className="tok-v">scores</span>={"{"}
            <span className="tok-s">&quot;perfect&quot;</span>
            {"}"} <span className="tok-v">runtime</span>=<span className="tok-s">&quot;edge&quot;</span>{" "}
            {"/>"};
          </span>
        </span>
        <span className="hud-line">
          <span className="hud-ln">7</span>
          <span>{"}"}</span>
        </span>
      </pre>

      <div className="hud-metrics">
        {metrics.map((metric) => (
          <div className="hud-metric" key={metric.label}>
            <b>{metric.value}</b>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>

      <div className="hud-stack">
        {stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
