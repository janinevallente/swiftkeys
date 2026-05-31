"use client";

export default function PixelBtn({
  children,
  active,
  disabled,
  onClick,
  amber,
}: {
  children: React.ReactNode;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
  amber: boolean;
}) {
  const base = "font-pixel text-6xs tracking-pixel border-2 cursor-pointer transition-none";
  const activeClass = amber
    ? "bg-amber text-bg-base border-amber shadow-pixel-accent"
    : "bg-accent text-bg-base border-accent shadow-pixel-accent";
  const idleClass = amber
    ? "bg-bg-surface text-amber border-border-strong shadow-pixel-base hover:border-amber"
    : "bg-bg-surface text-accent border-border-strong shadow-pixel-base hover:border-accent";
  const disabledClass = "bg-bg-surface text-text-dim border-border-subtle shadow-pixel-base opacity-35 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[base, "px-2 py-1", active ? activeClass : disabled ? disabledClass : idleClass].join(" ")}
    >
      {children}
    </button>
  );
}