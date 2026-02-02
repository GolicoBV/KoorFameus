import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-bg-section bg-bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/logo.png"
            alt="Koor Fameus logo"
            width={48}
            height={48}
            className="h-12 w-auto transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        <nav className="flex items-center gap-4">
          <span className="text-sm text-text-muted">
            Website in opbouw
          </span>
        </nav>
      </div>
    </header>
  );
}
