export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-bg-section bg-bg-white">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral text-white font-bold text-sm">
                KF
              </div>
              <span className="font-bold text-text-primary">Koor Fameus</span>
            </div>
            <p className="text-sm text-text-muted text-center md:text-left">
              Kinderkoor met passie voor muziek
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
