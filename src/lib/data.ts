// ─────────────────────────────────────────────────────────────
//  Site config — update these values for every new project
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Project Name",
  tagline: "A short one-line description of what this project does.",
  url: "https://yoursite.com",
  locale: "en",
};

export const meta = {
  title: `${site.name}`,
  description: site.tagline,
  author: site.name,
};

export const footer = {
  copyright: `© ${new Date().getFullYear()} ${site.name}. All rights reserved.`,
  builtWith: "Built with Next.js & Framer Motion",
};

// ─────────────────────────────────────────────────────────────
//  Navigation links — point href values at your section IDs
// ─────────────────────────────────────────────────────────────

export const navLinks = [
  { href: "home",    label: "Home" },
  { href: "about",   label: "About" },
  { href: "work",    label: "Work" },
  { href: "contact", label: "Contact" },
];
