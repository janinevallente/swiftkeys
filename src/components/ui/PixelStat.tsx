"use client";

export default function PixelStat({ label, value, highlight, colorVar }: {
  label: string;
  value: string;
  highlight: boolean;
  colorVar: string;
}) {
  return (
    <div
      className="bg-bg-surface border-2 border-border-strong text-right min-w-[60px] sm:min-w-[80px] px-2 sm:px-3 py-1"
      style={{
        boxShadow: highlight
          ? `3px 3px 0px ${colorVar}44, 0 0 10px ${colorVar}22`
          : "3px 3px 0px var(--border-strong)",
      }}
    >
      <div
        className="font-mono text-[1.1rem] sm:text-[1.55rem] font-bold leading-[1.1] tracking-pixel"
        style={{
          color: highlight ? colorVar : "var(--text-secondary)",
          textShadow: highlight ? `0 0 10px ${colorVar}66` : "none",
        }}
      >
        {value}
      </div>
      <div className="font-pixel text-[0.28rem] sm:text-3xs text-text-muted tracking-wider6 mt-0.5">
        {label}
      </div>
    </div>
  );
}