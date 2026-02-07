import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { allKorenQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Onze Koren | Koor Fameus",
  description: "Ontdek de drie koren van Koor Fameus: Startkoor, Kinderkoor en Jeugdkoor. Voor kinderen en jongeren van alle leeftijden.",
};

interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface Koor {
  _id: string;
  name: string;
  slug: { current: string };
  ageRange: string;
  shortDescription: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  schedule?: Schedule[];
}

async function getKoren() {
  return client.fetch<Koor[]>(allKorenQuery);
}

export default async function KorenPage() {
  const koren = await getKoren();

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-bg-white to-bg-section py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-text-primary md:text-5xl mb-4">
              Onze <span className="text-purple">Koren</span>
            </h1>
            <p className="text-lg text-text-secondary">
              Koor Fameus bestaat uit drie koren, elk afgestemd op een specifieke leeftijdsgroep.
              Zo kan ieder kind op zijn of haar niveau groeien en genieten van muziek.
            </p>
          </div>
        </div>
      </section>

      {/* Koren Grid */}
      <section className="py-16 md:py-24 bg-bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {koren && koren.length > 0 ? (
            <div className="grid gap-8 lg:gap-12">
              {koren.map((koor, index) => (
                <KoorDetailCard key={koor._id} koor={koor} reversed={index % 2 === 1} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-muted">Geen koren gevonden.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-purple">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
            Wil je lid worden?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            Neem gerust contact met ons op voor meer informatie of om een gratis proefles te boeken.
            We verwelkomen je graag!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-purple hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Neem contact op
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}

function KoorDetailCard({ koor, reversed }: { koor: Koor; reversed: boolean }) {
  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <div className={`grid lg:grid-cols-2 ${reversed ? "lg:grid-flow-dense" : ""}`}>
        {/* Image */}
        <div className={`relative h-64 lg:h-auto ${reversed ? "lg:col-start-2" : ""}`}>
          {koor.image ? (
            <Image
              src={urlFor(koor.image).width(800).height(600).url()}
              alt={koor.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple/20 to-purple/40 flex items-center justify-center">
              <span className="text-6xl">🎵</span>
            </div>
          )}
          {koor.ageRange && (
            <span className="absolute top-4 left-4 bg-purple text-white text-sm font-medium px-4 py-2 rounded-full">
              {koor.ageRange}
            </span>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-text-primary md:text-3xl mb-4">
            {koor.name}
          </h2>

          {koor.shortDescription && (
            <p className="text-text-secondary mb-6 text-lg">
              {koor.shortDescription}
            </p>
          )}

          {koor.schedule && koor.schedule.length > 0 && (
            <div className="mb-6 space-y-2">
              <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-3">
                Repetitietijden
              </h3>
              {koor.schedule.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-text-secondary">
                  <Clock className="h-4 w-4 text-purple flex-shrink-0" />
                  <span>
                    {item.day}: {item.startTime} - {item.endTime}
                  </span>
                  {item.location && (
                    <>
                      <MapPin className="h-4 w-4 text-purple flex-shrink-0 ml-2" />
                      <span className="text-text-muted">{item.location}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          <Link
            href={`/koren/${koor.slug.current}`}
            className="inline-flex items-center text-purple font-semibold hover:text-purple-dark transition-colors group"
          >
            Meer informatie
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </CardContent>
      </div>
    </Card>
  );
}
