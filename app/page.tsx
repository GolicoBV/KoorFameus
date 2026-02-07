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
      {/* Hero Section - Full width image with wave */}
      <section className="relative">
        {/* Full-width background image */}
        <div className="relative min-h-[90vh] w-full">
          <Image
            src="/images/home1.jpg"
            alt="Koor Fameus kinderen zingen samen"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-xl">
                {/* 3D Logo */}
                <div className="mb-8 flex justify-center lg:justify-start">
                  <Image
                    src="/images/logo-3d.png"
                    alt="Koor Fameus Logo"
                    width={320}
                    height={320}
                    className="w-48 md:w-64 lg:w-72 h-auto drop-shadow-xl"
                    priority
                  />
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
                  Ontdek de vreugde van{" "}
                  <span className="text-purple">samen zingen</span>
                </h1>

                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  {siteSettings?.tagline || "Koor Fameus is het kinderkoor van Landen waar muziek en plezier samenkomen. Voor kinderen van 4 tot 18 jaar."}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    asChild
                    size="lg"
                    className="bg-purple text-white hover:bg-purple-dark px-8 py-6 text-base rounded-full transition-colors font-semibold shadow-lg hover:shadow-xl"
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
                    className="border-2 border-purple text-purple hover:bg-purple hover:text-white px-8 py-6 text-base rounded-full transition-colors font-semibold bg-white/50 backdrop-blur-sm"
                  >
                    <Link href="/contact">
                      Gratis proefles
                    </Link>
                  </Button>
                </div>

                <p className="text-sm text-text-muted">Vrijblijvend kennismaken? Dat kan!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0 150L60 135C120 120 240 90 360 75C480 60 600 60 720 67.5C840 75 960 90 1080 97.5C1200 105 1320 105 1380 105L1440 105V150H1380C1320 150 1200 150 1080 150C960 150 840 150 720 150C600 150 480 150 360 150C240 150 120 150 60 150H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Koren Overview Section */}
      {koren && koren.length > 0 && (
        <section className="py-20 md:py-28 bg-white relative pb-32">
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
                className="bg-purple text-white hover:bg-purple-dark px-8 py-6 rounded-full transition-colors shadow-lg hover:shadow-xl"
              >
                <Link href="/koren">
                  Bekijk alle koren
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Wave divider to next section */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path d="M0 60L48 52.5C96 45 192 30 288 30C384 30 480 45 576 52.5C672 60 768 60 864 52.5C960 45 1056 30 1152 30C1248 30 1344 45 1392 52.5L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" className="fill-purple/5"/>
            </svg>
          </div>
        </section>
      )}

      {/* Why Join Section */}
      <section className="py-20 md:py-28 relative bg-gradient-to-br from-purple/5 via-purple/10 to-orange/5 overflow-hidden pb-32">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-orange/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
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

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 40L60 45C120 50 240 60 360 65C480 70 600 70 720 62.5C840 55 960 40 1080 35C1200 30 1320 35 1380 37.5L1440 40V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V40Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {events && events.length > 0 && (
        <section className="py-20 md:py-28 bg-white relative pb-32">
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

          {/* Wave divider to CTA */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path d="M0 80L48 72.5C96 65 192 50 288 45C384 40 480 45 576 55C672 65 768 80 864 82.5C960 85 1056 75 1152 65C1248 55 1344 45 1392 40L1440 35V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V80Z" className="fill-purple"/>
            </svg>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-purple via-purple-dark to-purple relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 md:px-6 text-center relative">
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
