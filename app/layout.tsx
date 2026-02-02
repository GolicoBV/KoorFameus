import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koor Fameus - Kinderkoor",
  description: "Welkom bij Koor Fameus, een energiek kinderkoor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={GeistSans.className}>
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
