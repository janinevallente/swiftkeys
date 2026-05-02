'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ScrollToSection() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const target = searchParams.get('scrollTo');
    if (!target) return;

    // Replace the URL immediately so no query param lingers
    router.replace('/', { scroll: false });

    // Give the page a tick to settle, then scroll
    const t = setTimeout(() => {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(t);
  }, [searchParams, router]);

  return null;
}