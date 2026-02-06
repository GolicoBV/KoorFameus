import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { allKorenQuery, upcomingEventsQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Music, Users, Calendar, ArrowRight } from "lucide-react";

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
}

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  shortDescription: string;
}

interface SiteSettings {
  tagline?: string;
  description?: string;
}

async function getHomePageData() {
  const [koren, events, siteSettings] = await Promise.all([
    client.fetch<Koor[]>(allKorenQuery),
    client.fetch<Event[]>(upcomingEventsQuery),
    client.fetch<SiteSettings>(siteSettingsQuery),
  ]);
  return { koren, events, siteSettings };
}

export default async function Home() {
  const { koren, events, siteSettings } = await getHomePageData();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg-white to-bg-section py-12 md:py-16 lg:py-24">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-coral/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-coral/5 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center rounded-full border border-coral/20 bg-bg-accent px-4 py-1.5 text-sm font-medium text-coral">
              <span className="mr-2">🎵</span>
              Kinderkoor met passie
            </div>

            {/* Main heading */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              Welkom bij{" "}
              <span className="text-coral">Koor Fameus</span>
            </h1>

            {/* Subheading */}
            <p className="mb-8 max-w-2xl text-lg text-text-secondary md:text-xl">
              {siteSettings?.tagline || "Een bruisend kinder- en jeugdkoor uit Landen waar kinderen en jongeren hun passie voor zingen kunnen ontdekken."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-coral hover:bg-coral-dark text-white px-8 py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Link href="/koren">Ontdek onze koren</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-coral text-coral hover:bg-coral hover:text-white px-8 py-6 text-lg rounded-xl transition-all duration-200"
              >
                <Link href="/contact">Neem contact op</Link>
              </Button>
            </div>
          </div>

          {/* Feature cards preview */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Music className="h-6 w-6" />}
              title="Zingen"
              description="Wekelijkse repetities vol plezier en muziek"
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title="Optredens"
              description="Regelmatige voorstellingen en evenementen"
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Gemeenschap"
              description="Een warme groep voor kinderen van alle leeftijden"
            />
          </div>
        </div>
      </section>

      {/* Koren Overview Section */}
      {koren && koren.length > 0 && (
        <section className="py-16 md:py-24 bg-bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary md:text-4xl mb-4">
                Onze Koren
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Koor Fameus bestaat uit drie koren voor verschillende leeftijdsgroepen.
                Elk kind vindt hier zijn of haar plek!
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {koren.map((koor) => (
                <KoorCard key={koor._id} koor={koor} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-coral text-coral hover:bg-coral hover:text-white rounded-xl"
              >
                <Link href="/koren">
                  Bekijk alle koren
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events Section */}
      {events && events.length > 0 && (
        <section className="py-16 md:py-24 bg-bg-section">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary md:text-4xl mb-4">
                Aankomende Evenementen
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Ontdek onze optredens en activiteiten
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.slice(0, 3).map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-coral text-coral hover:bg-coral hover:text-white rounded-xl"
              >
                <Link href="/evenementen">
                  Alle evenementen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-coral">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
            Klaar om mee te zingen?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            Neem contact met ons op voor een vrijblijvende proefles.
            Ieder kind is welkom!
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-coral hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Link href="/contact">Schrijf je in</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="group border-0 bg-bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-bg-accent text-coral transition-transform duration-200 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-text-primary">
          {title}
        </h3>
        <p className="text-text-secondary">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function KoorCard({ koor }: { koor: Koor }) {
  return (
    <Link href={`/koren/${koor.slug.current}`}>
      <Card className="group h-full border-0 bg-bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
        {koor.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={urlFor(koor.image).width(400).height(300).url()}
              alt={koor.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {koor.ageRange && (
              <span className="absolute bottom-3 left-3 bg-coral text-white text-sm px-3 py-1 rounded-full">
                {koor.ageRange}
              </span>
            )}
          </div>
        )}
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-coral transition-colors">
            {koor.name}
          </h3>
          {koor.shortDescription && (
            <p className="text-text-secondary line-clamp-2">
              {koor.shortDescription}
            </p>
          )}
          <div className="mt-4 flex items-center text-coral font-medium">
            Meer info
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card className="group border-0 bg-bg-white shadow-md hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 bg-coral/10 rounded-xl flex flex-col items-center justify-center">
            <span className="text-coral font-bold text-lg">
              {eventDate.getDate()}
            </span>
            <span className="text-coral text-xs uppercase">
              {eventDate.toLocaleDateString("nl-BE", { month: "short" })}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary mb-1 group-hover:text-coral transition-colors">
              {event.title}
            </h3>
            {event.location && (
              <p className="text-sm text-text-muted mb-2">{event.location}</p>
            )}
            {event.shortDescription && (
              <p className="text-sm text-text-secondary line-clamp-2">
                {event.shortDescription}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
