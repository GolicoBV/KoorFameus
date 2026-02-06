import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Mail, MapPin } from "lucide-react";

const navItems = [
  { href: "/koren", label: "Onze Koren" },
  { href: "/wie-zijn-wij", label: "Wie Zijn Wij" },
  { href: "/evenementen", label: "Evenementen" },
  { href: "/galerij", label: "Galerij" },
  { href: "/contact", label: "Contact" },
];

interface FooterProps {
  socialMedia?: {
    instagram?: string;
    facebook?: string;
  };
  contactEmail?: string;
}

export function Footer({ socialMedia, contactEmail = "info@koorfameus.be" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-bg-section bg-bg-white">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Koor Fameus logo"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-text-muted max-w-xs">
              Koor Fameus is een bruisend kinder- en jeugdkoor uit Landen waar
              kinderen en jongeren hun passie voor zingen kunnen ontdekken.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3 mt-2">
              {socialMedia?.instagram && (
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-purple/10 text-purple hover:bg-purple hover:text-white transition-colors duration-200"
                  aria-label="Volg ons op Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socialMedia?.facebook && (
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-purple/10 text-purple hover:bg-purple hover:text-white transition-colors duration-200"
                  aria-label="Volg ons op Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Snelle Links</h3>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-text-secondary hover:text-purple transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Contact</h3>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-purple transition-colors duration-200"
              >
                <Mail className="h-4 w-4" />
                {contactEmail}
              </a>
              <div className="flex items-start gap-2 text-sm text-text-muted">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Landen, België</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-bg-section flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">
            &copy; {currentYear} Koor Fameus. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-4 text-sm text-text-muted">
            <Link href="/privacy" className="hover:text-purple transition-colors duration-200">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
