import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacybeleid | Koor Fameus",
  description: "Het privacybeleid van Koor Fameus. Lees hoe we omgaan met je persoonlijke gegevens.",
};

export default function PrivacyPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-bg-white to-bg-section py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-text-primary md:text-5xl mb-4">
              Privacybeleid
            </h1>
            <p className="text-lg text-text-secondary">
              Laatst bijgewerkt: februari 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="border-0 shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-6 md:p-10 prose prose-lg max-w-none">
              <h2>1. Inleiding</h2>
              <p>
                Koor Fameus vzw hecht veel belang aan de bescherming van je persoonsgegevens.
                In dit privacybeleid willen we heldere en transparante informatie geven over
                hoe wij omgaan met je persoonlijke gegevens.
              </p>

              <h2>2. Welke gegevens verzamelen we?</h2>
              <p>We verzamelen de volgende gegevens:</p>
              <ul>
                <li>Naam en voornaam (bij contactformulier of inschrijving)</li>
                <li>E-mailadres (voor communicatie)</li>
                <li>Telefoonnummer (optioneel, bij inschrijving)</li>
                <li>Geboortedatum (bij inschrijving voor leeftijdsgroep bepaling)</li>
              </ul>

              <h2>3. Waarvoor gebruiken we je gegevens?</h2>
              <p>Je persoonsgegevens worden gebruikt voor:</p>
              <ul>
                <li>Het beantwoorden van vragen via het contactformulier</li>
                <li>Het verwerken van inschrijvingen</li>
                <li>Het versturen van informatie over activiteiten en optredens</li>
                <li>Administratieve doeleinden (ledenadministratie)</li>
              </ul>

              <h2>4. Hoe lang bewaren we je gegevens?</h2>
              <p>
                We bewaren je persoonsgegevens niet langer dan strikt nodig is om de
                doelen te realiseren waarvoor je gegevens worden verzameld. Voor leden
                worden gegevens bewaard gedurende het lidmaatschap en tot 2 jaar erna
                voor administratieve afhandeling.
              </p>

              <h2>5. Delen met derden</h2>
              <p>
                Koor Fameus deelt je persoonsgegevens niet met derden, tenzij dit nodig
                is voor de uitvoering van een overeenkomst of om te voldoen aan een
                wettelijke verplichting.
              </p>

              <h2>6. Cookies</h2>
              <p>
                Onze website maakt alleen gebruik van functionele cookies die noodzakelijk
                zijn voor het goed functioneren van de website. We gebruiken geen tracking
                cookies of analytics die je persoonlijk kunnen identificeren.
              </p>

              <h2>7. Je rechten</h2>
              <p>Je hebt het recht om:</p>
              <ul>
                <li>Je persoonsgegevens in te zien</li>
                <li>Je persoonsgegevens te laten corrigeren</li>
                <li>Je persoonsgegevens te laten verwijderen</li>
                <li>Bezwaar te maken tegen de verwerking van je gegevens</li>
              </ul>

              <h2>8. Contact</h2>
              <p>
                Heb je vragen over dit privacybeleid of wil je een van je rechten uitoefenen?
                Neem dan contact met ons op via{" "}
                <a href="mailto:info@koorfameus.be" className="text-coral hover:text-coral-dark">
                  info@koorfameus.be
                </a>.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
