"use client";

export default function PixelToggle({ isDark, onClick }: { isDark: boolean; onClick: () => void }) {
  const trackW    = 64;
  const trackH    = 30;
  const thumbSize = 22;
  const thumbPad  = 4;
  const thumbX    = isDark ? thumbPad : trackW - thumbSize - thumbPad;

  const track      = isDark ? "#161b22" : "#f0f0f0";   // bg-surface
  const trackShade = isDark ? "#0d1117" : "#c0c0c0";   // bg-base / border-subtle
  const trackHi    = isDark ? "#2a3a2a" : "#ffffff";   // border-subtle light / white
  const trackBord  = isDark ? "#3d5c2e" : "#888888";   // border-strong

  const thumb      = isDark ? "#5d8c3e" : "#ffffff";   // accent / white
  const thumbShade = isDark ? "#3f6128" : "#c0c0c0";   // accent-dim / gray
  const thumbHi    = isDark ? "#8fb86a" : "#ffffff";   // amber (lighter green) / white
  const thumbBord  = isDark ? "#2a4a18" : "#888888";   // darker green / border-strong

  const moonColor  = "#f0f6fc";  // text-primary dark — icy near-white
  const moonCutout = isDark ? "#5d8c3e" : "#ffffff";   // matches thumb fill

  return (
    <button
      onClick={onClick}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="cursor-pointer bg-transparent border-none p-0 select-none shrink-0"
      style={{ imageRendering: "pixelated" }}
    >
      <svg
        width={trackW}
        height={trackH}
        viewBox={`0 0 ${trackW} ${trackH}`}
        style={{ imageRendering: "pixelated", display: "block" }}
      >
        {/* Track fill */}
        <rect x="0" y="0" width={trackW} height={trackH} fill={track} />
        {/* Track bevel — top/left darker */}
        <rect x="0" y="0" width={trackW} height="2" fill={trackShade} />
        <rect x="0" y="0" width="2" height={trackH} fill={trackShade} />
        {/* Track bevel — bottom/right lighter */}
        <rect x="0" y={trackH - 2} width={trackW} height="2" fill={trackHi} />
        <rect x={trackW - 2} y="0" width="2" height={trackH} fill={trackHi} />
        {/* Track border */}
        <rect x="0" y="0" width={trackW} height={trackH} fill="none" stroke={trackBord} strokeWidth="1" />

        {/* Stars (dark) or clouds (light) on the inactive side */}
        {isDark ? (
          <>
            {/* Pixel stars — using text-primary #f0f6fc */}
            <rect x="42" y="6"  width="2" height="2" fill="#f0f6fc" opacity="0.6" />
            <rect x="50" y="11" width="2" height="2" fill="#f0f6fc" opacity="0.4" />
            <rect x="46" y="20" width="2" height="2" fill="#f0f6fc" opacity="0.5" />
            <rect x="56" y="8"  width="2" height="2" fill="#f0f6fc" opacity="0.35" />
            <rect x="53" y="22" width="2" height="2" fill="#8fb86a" opacity="0.5" />
          </>
        ) : (
          <>
            {/* Pixel clouds — using border-strong #888888 */}
            <rect x="40" y="10" width="4" height="2" fill="#888888" opacity="0.4" />
            <rect x="38" y="12" width="8" height="4" fill="#888888" opacity="0.4" />
            <rect x="40" y="16" width="4" height="2" fill="#888888" opacity="0.4" />
            <rect x="50" y="16" width="4" height="2" fill="#888888" opacity="0.3" />
            <rect x="48" y="18" width="8" height="3" fill="#888888" opacity="0.3" />
            <rect x="50" y="21" width="4" height="2" fill="#888888" opacity="0.3" />
          </>
        )}

        {/* Thumb */}
        <g transform={`translate(${thumbX}, ${thumbPad})`}>
          {/* Thumb fill */}
          <rect x="0" y="0" width={thumbSize} height={thumbSize} fill={thumb} />
          {/* Thumb bevel — top/left lighter */}
          <rect x="0" y="0" width={thumbSize} height="2" fill={thumbHi} />
          <rect x="0" y="0" width="2" height={thumbSize} fill={thumbHi} />
          {/* Thumb bevel — bottom/right darker */}
          <rect x="0" y={thumbSize - 2} width={thumbSize} height="2" fill={thumbShade} />
          <rect x={thumbSize - 2} y="0" width="2" height={thumbSize} fill={thumbShade} />
          {/* Thumb border */}
          <rect x="0" y="0" width={thumbSize} height={thumbSize} fill="none" stroke={thumbBord} strokeWidth="1" />

          {/* Icon */}
          {isDark ? (
            // Moon — pixel crescent in text-primary color
            <>
              <rect x="7"  y="4"  width="8" height="2" fill={moonColor} />
              <rect x="5"  y="6"  width="4" height="2" fill={moonColor} />
              <rect x="13" y="6"  width="4" height="2" fill={moonColor} />
              <rect x="5"  y="8"  width="3" height="6" fill={moonColor} />
              <rect x="15" y="8"  width="3" height="6" fill={moonColor} />
              <rect x="5"  y="14" width="4" height="2" fill={moonColor} />
              <rect x="13" y="14" width="4" height="2" fill={moonColor} />
              <rect x="7"  y="16" width="8" height="2" fill={moonColor} />
              {/* Crescent cutout */}
              <rect x="9"  y="6"  width="6" height="2" fill={moonCutout} />
              <rect x="8"  y="8"  width="7" height="6" fill={moonCutout} />
              <rect x="9"  y="14" width="6" height="2" fill={moonCutout} />
            </>
          ) : (
            // Sun — accent (#222222) center, accent-dim (#444444) rays
            <>
              <rect x="8"  y="8"  width="6" height="6" fill="#222222" />
              <rect x="10" y="4"  width="2" height="3" fill="#444444" />
              <rect x="10" y="15" width="2" height="3" fill="#444444" />
              <rect x="4"  y="10" width="3" height="2" fill="#444444" />
              <rect x="15" y="10" width="3" height="2" fill="#444444" />
              <rect x="5"  y="5"  width="2" height="2" fill="#444444" />
              <rect x="15" y="5"  width="2" height="2" fill="#444444" />
              <rect x="5"  y="15" width="2" height="2" fill="#444444" />
              <rect x="15" y="15" width="2" height="2" fill="#444444" />
            </>
          )}
        </g>
      </svg>
    </button>
  );
}