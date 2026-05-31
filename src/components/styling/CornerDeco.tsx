"use client";

export default function CornerDeco({ pos }: { pos: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const base = "absolute w-2 h-2 border-2 border-amber";
  const variants: Record<typeof pos, string> = {
    "top-left":     "-top-px -left-px border-r-0 border-b-0",
    "top-right":    "-top-px -right-px border-l-0 border-b-0",
    "bottom-left":  "-bottom-px -left-px border-r-0 border-t-0",
    "bottom-right": "-bottom-px -right-px border-l-0 border-t-0",
  };
  return <span className={`${base} ${variants[pos]}`} />;
}