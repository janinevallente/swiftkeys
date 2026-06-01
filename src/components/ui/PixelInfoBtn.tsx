"use client";

export default function PixelInfoBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title="About SwiftKeys"
      className="flex items-center justify-center bg-bg-surface border-2 border-border-strong cursor-pointer p-1.5 hover:border-accent hover:text-accent transition-colors duration-150 text-text-muted"
      style={{ boxShadow: "2px 2px 0px var(--bg-base)" }}
    >
      {/* Pixel "i" icon */}
      <svg
        width="13" height="13" viewBox="0 0 10 10"
        style={{ imageRendering: "pixelated" }}
      >
        <rect x="4" y="0" width="2" height="2" fill="currentColor" />
        <rect x="4" y="3" width="2" height="6" fill="currentColor" />
        <rect x="3" y="8" width="4" height="1" fill="currentColor" />
      </svg>
    </button>
  );
}