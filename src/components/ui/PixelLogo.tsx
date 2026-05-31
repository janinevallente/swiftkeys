"use client";

export default function PixelLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect x="1" y="1" width="34" height="34" fill="none" stroke="var(--default)" strokeWidth="2"/>
      <rect x="4" y="4" width="28" height="28" fill="none" stroke="var(--default)" strokeWidth="1" opacity="0.3"/>
      <rect x="7"  y="10" width="5" height="5" fill="var(--default)"  opacity="0.9"/>
      <rect x="14" y="10" width="5" height="5" fill="var(--default)"  opacity="0.7"/>
      <rect x="21" y="10" width="5" height="5" fill="var(--amber)" opacity="0.9"/>
      <rect x="7"  y="17" width="5" height="5" fill="var(--default)"  opacity="0.5"/>
      <rect x="14" y="17" width="5" height="5" fill="var(--amber)" opacity="0.6"/>
      <rect x="21" y="17" width="5" height="5" fill="var(--default)"  opacity="0.5"/>
      <rect x="9"  y="24" width="18" height="4" fill="var(--default)" opacity="0.4"/>
    </svg>
  );
}