"use client";

export default function PixelDivider() {
  return (
    <div className="flex items-center gap-1 my-5">
      <div className="flex-1 h-px bg-border-strong" />
      <div className="w-1.5 h-1.5 bg-accent" style={{ imageRendering: "pixelated" }} />
      <div className="w-1 h-1 bg-border-strong" />
      <div className="flex-1 h-px bg-border-strong" />
    </div>
  );
}