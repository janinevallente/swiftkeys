"use client";

export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-pixel text-[0.45rem] sm:text-[0.55rem] text-accent tracking-wider5 mb-3">
      {children}
    </p>
  );
}