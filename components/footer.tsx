import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-bg-section bg-bg-white">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Image
              src="/images/logo.png"
              alt="Koor Fameus logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <p className="text-sm text-text-muted text-center md:text-left">
              Kinder- en jeugdkoor
            </p>
          </div>

          {/* Contact placeholder */}
          <div className="text-center md:text-right">
            <p className="text-sm text-text-secondary">
              Contactgegevens volgen binnenkort
            </p>
            <p className="mt-1 text-sm text-text-muted">
              info@koorfameus.be
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-bg-section pt-6 text-center">
          <p className="text-sm text-text-muted">
            &copy; {currentYear} Koor Fameus. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
