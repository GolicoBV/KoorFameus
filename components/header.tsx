import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-bg-section bg-bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral text-white font-bold text-xl transition-transform duration-200 group-hover:scale-105">
            KF
          </div>
          <span className="text-xl font-bold text-text-primary hidden sm:inline-block">
            Koor Fameus
          </span>
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
