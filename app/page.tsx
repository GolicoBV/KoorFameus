import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { allKorenQuery, upcomingEventsQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { ArrowRight, Music, Users, Calendar } from "lucide-react";

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
      {/* Hero Section - Elegant & Musical */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Full-width background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/home1.jpg"
            alt="Koor Fameus"
            fill
            className="object-cover"
            priority
          />
          {/* Elegant overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple/70 via-purple/50 to-purple/20" />
        </div>

        <div className="container relative mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-2xl">
            {/* Subtle label */}
            <p className="text-purple-light/90 text-sm font-medium tracking-widest uppercase mb-4">
              Kinderkoor Landen
            </p>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Welkom bij{" "}
              <span className="text-purple-light">Koor Fameus</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-white/90 mb-8 max-w-xl leading-relaxed">
              {siteSettings?.tagline || "Waar jonge stemmen samenkomen. Drie koren voor kinderen van 4 tot 18 jaar."}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-purple hover:bg-purple-light hover:text-white px-8 py-6 text-base rounded-xl shadow-lg transition-all duration-300 font-semibold"
              >
                <Link href="/koren">
                  Ontdek onze koren
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white/80 text-white hover:bg-white hover:text-purple px-8 py-6 text-base rounded-xl transition-all duration-300 font-semibold"
              >
                <Link href="/contact">
                  Gratis proefles
                </Link>
              </Button>
            </div>

            {/* Stats - subtle */}
            <div className="flex gap-12 mt-12 text-white/80">
              <div>
                <span className="block text-3xl font-bold text-white">100+</span>
                <span className="text-sm">Leden</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white">3</span>
                <span className="text-sm">Koren</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white">10+</span>
                <span className="text-sm">Optredens/jaar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Koren Overview Section */}
      {koren && koren.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <p className="text-purple text-sm font-medium tracking-widest uppercase mb-3">
                Voor elke leeftijd
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Onze koren
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Van kleuters tot tieners — er is een koor dat bij jou past.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {koren.map((koor, index) => (
                <KoorCard key={koor._id} koor={koor} index={index} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                asChild
                size="lg"
                className="bg-purple text-white hover:bg-purple-dark px-8 py-6 rounded-xl transition-colors"
              >
                <Link href="/koren">
                  Bekijk alle koren
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Why Join Section */}
      <section className="py-20 md:py-28 bg-bg-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-purple text-sm font-medium tracking-widest uppercase mb-3">
              Waarom Koor Fameus?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
              Meer dan alleen zingen
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Music className="h-6 w-6" />}
              title="Zingen"
              description="Wekelijks samen muziek maken"
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title="Optredens"
              description="Schitter op het podium"
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Vrienden"
              description="Maak nieuwe vrienden"
            />
            <FeatureCard
              icon={<Music className="h-6 w-6" />}
              title="Plezier"
              description="Samen muziek beleven"
            />
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {events && events.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-14">
              <p className="text-purple text-sm font-medium tracking-widest uppercase mb-3">
                Agenda
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                Aankomende evenementen
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {events.slice(0, 3).map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/evenementen"
                className="inline-flex items-center text-purple font-semibold hover:text-purple-dark transition-colors group"
              >
                Bekijk alle evenementen
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-purple">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Probeer een gratis les
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Ontdek of zingen iets voor jou is. De eerste proefles is altijd gratis en vrijblijvend.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-purple hover:bg-purple-light hover:text-white px-8 py-6 rounded-xl transition-colors font-semibold"
            >
              <Link href="/contact">
                Neem contact op
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border border-border/50 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6 text-center">
        <div className="w-12 h-12 bg-purple/10 text-purple rounded-xl flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}

function KoorCard({ koor }: { koor: Koor; index: number }) {
  return (
    <Link href={`/koren/${koor.slug.current}`} className="group">
      <Card className="h-full border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-purple/5">
          {koor.image ? (
            <Image
              src={urlFor(koor.image).width(400).height(300).url()}
              alt={koor.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Music className="h-12 w-12 text-purple/30" />
            </div>
          )}
        </div>

        <CardContent className="p-5">
          {koor.ageRange && (
            <p className="text-purple text-sm font-medium mb-2">{koor.ageRange}</p>
          )}
          <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-purple transition-colors">
            {koor.name}
          </h3>
          {koor.shortDescription && (
            <p className="text-text-secondary text-sm mb-4 line-clamp-2">
              {koor.shortDescription}
            </p>
          )}
          <span className="inline-flex items-center text-purple text-sm font-medium">
            Meer info
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date);

  return (
    <Card className="border border-border/50 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Date */}
          <div className="flex-shrink-0 w-14 h-14 bg-purple rounded-lg flex flex-col items-center justify-center text-white">
            <span className="font-bold text-xl leading-none">
              {eventDate.getDate()}
            </span>
            <span className="text-xs uppercase">
              {eventDate.toLocaleDateString("nl-BE", { month: "short" })}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary mb-1 group-hover:text-purple transition-colors">
              {event.title}
            </h3>
            {event.location && (
              <p className="text-sm text-text-muted mb-1">
                {event.location}
              </p>
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
