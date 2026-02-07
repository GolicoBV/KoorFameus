import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { GoogleMap } from "@/components/google-map";

export const metadata: Metadata = {
  title: "Contact | Koor Fameus",
  description: "Neem contact op met Koor Fameus. Heb je vragen over lidmaatschap, optredens of andere zaken? We helpen je graag!",
};

interface SiteSettings {
  contactEmail?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
  };
}

async function getSiteSettings() {
  return client.fetch<SiteSettings>(siteSettingsQuery);
}

export default async function ContactPage() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-bg-white to-bg-section py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-text-primary md:text-5xl mb-4">
              <span className="text-purple">Contact</span>
            </h1>
            <p className="text-lg text-text-secondary">
              Heb je vragen over lidmaatschap, optredens of wil je gewoon meer weten?
              We horen graag van je!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-text-primary mb-6">
                    Stuur ons een bericht
                  </h2>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {/* Email */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">E-mail</h3>
                      <a
                        href={`mailto:${siteSettings?.contactEmail || "info@koorfameus.be"}`}
                        className="text-purple hover:text-purple-dark transition-colors"
                      >
                        {siteSettings?.contactEmail || "info@koorfameus.be"}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Locatie</h3>
                      <p className="text-text-secondary">
                        {siteSettings?.address ? (
                          <>
                            {siteSettings.address.street && (
                              <span>{siteSettings.address.street}<br /></span>
                            )}
                            {siteSettings.address.postalCode} {siteSettings.address.city}
                          </>
                        ) : (
                          <>De Villa<br />Landen, België</>
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rehearsal Times */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">Repetities</h3>
                      <p className="text-text-secondary text-sm">
                        Onze koren repeteren wekelijks. Bekijk de pagina van elk koor
                        voor de exacte tijden.
                      </p>
                      <a
                        href="/koren"
                        className="text-purple text-sm hover:text-purple-dark transition-colors mt-2 inline-block"
                      >
                        Bekijk onze koren →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Questions */}
              <Card className="border-0 shadow-lg bg-purple">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-3">Veelgestelde vragen</h3>
                  <ul className="space-y-2 text-white/90 text-sm">
                    <li>• Proefles is altijd gratis</li>
                    <li>• Geen muzikale voorkennis vereist</li>
                    <li>• Inschrijven kan het hele jaar</li>
                    <li>• Lidgeld op jaarbasis</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24 bg-bg-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-text-primary md:text-3xl mb-2">
              Onze Locatie
            </h2>
            <p className="text-text-secondary">
              De Villa, Landen
            </p>
          </div>
          <GoogleMap
            address="De Villa, Stationsstraat, Landen, België"
            title="De Villa - Repetitielocatie Koor Fameus"
            className="max-w-4xl mx-auto shadow-lg"
          />
        </div>
      </section>
    </>
  );
}
