import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
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
    <html lang="nl" className={`${GeistSans.className} ${cormorant.variable}`}>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer
          socialMedia={siteSettings?.socialMedia}
          contactEmail={siteSettings?.contactEmail}
        />
        <CookieConsent />
      </body>
    </html>
  );
}
