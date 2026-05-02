import type { Metadata } from "next";
import "./globals.css";
import { meta } from "@/lib/data";
import { AppProvider } from "@/store";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  authors: [{ name: meta.author }],
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
