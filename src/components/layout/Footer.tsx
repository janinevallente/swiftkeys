import { footer } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white-7 px-8 md:px-12 py-7 flex flex-col md:flex-row items-center justify-between gap-4 font-body text-2xs tracking-[0.06em] text-white/45">
      <p>{footer.copyright}</p>
      <p>{footer.builtWith}</p>
    </footer>
  );
}
