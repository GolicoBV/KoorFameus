"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/koren", label: "Onze Koren" },
  { href: "/wie-zijn-wij", label: "Wie Zijn Wij" },
  { href: "/evenementen", label: "Evenementen" },
  { href: "/galerij", label: "Galerij" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-bg-section bg-bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/logo.png"
            alt="Koor Fameus logo"
            width={48}
            height={48}
            className="h-12 w-auto transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive(item.href)
                  ? "bg-coral/10 text-coral"
                  : "text-text-secondary hover:text-coral hover:bg-coral/5"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="sr-only">Navigatie menu</SheetTitle>
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image
                  src="/images/logo.png"
                  alt="Koor Fameus"
                  width={120}
                  height={40}
                  className="h-10 w-auto mb-4"
                />
              </Link>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                      isActive(item.href)
                        ? "bg-coral/10 text-coral"
                        : "text-text-secondary hover:text-coral hover:bg-coral/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
