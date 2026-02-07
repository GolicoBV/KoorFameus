import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Koor Fameus - Kinder- en Jeugdkoor",
  description: "Welkom bij Koor Fameus, een energiek kinder- en jeugdkoor uit Landen, België",
};

async function getSiteSettings() {
  try {
    return await client.fetch(siteSettingsQuery);
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="nl" className={quicksand.className}>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col relative">
        {/* Flowing S-curve background - starts from header */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 h-full">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 100 3000"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Glow effect */}
            <path
              d="M50 0 C0 1500, 100 1500, 50 3000"
              stroke="url(#layout-gradient)"
              strokeWidth="6"
              fill="none"
              opacity="0.05"
            />
            {/* Main flowing curve */}
            <path
              d="M50 0 C0 1500, 100 1500, 50 3000"
              stroke="url(#layout-gradient)"
              strokeWidth="1"
              fill="none"
              opacity="0.25"
            />
            <defs>
              <linearGradient id="layout-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-purple)" />
                <stop offset="50%" stopColor="var(--color-orange)" />
                <stop offset="100%" stopColor="var(--color-purple)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <Header />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer
          socialMedia={siteSettings?.socialMedia}
          contactEmail={siteSettings?.contactEmail}
        />
        <CookieConsent />
      </body>
    </html>
  );
}
