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
    <div className="relative">
      {/* Flowing S-curve background with music symbols */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Glow effect */}
          <path
            d="M50 0
               C0 500, 100 500, 50 1000"
            stroke="url(#gradient)"
            strokeWidth="6"
            fill="none"
            opacity="0.1"
          />
          {/* Main flowing curve */}
          <path
            d="M50 0
               C0 500, 100 500, 50 1000"
            stroke="url(#gradient)"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          {/* Music symbols along the curve */}
          <text x="30" y="200" fontSize="6" fill="url(#gradient)" opacity="0.4">&#119070;</text>
          <text x="20" y="400" fontSize="4" fill="url(#gradient)" opacity="0.3">&#9834;</text>
          <text x="50" y="500" fontSize="5" fill="url(#gradient)" opacity="0.35">&#9835;</text>
          <text x="80" y="600" fontSize="6" fill="url(#gradient)" opacity="0.4">&#119070;</text>
          <text x="70" y="800" fontSize="4" fill="url(#gradient)" opacity="0.3">&#9833;</text>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-purple)" />
              <stop offset="50%" stopColor="var(--color-orange)" />
              <stop offset="100%" stopColor="var(--color-purple)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hero Section - Centered with logo */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          {/* 3D Logo */}
          <div className="mb-8">
            <Image
              src="/images/logo-3d-nobackground.png"
              alt="Koor Fameus Logo"
              width={320}
              height={320}
              className="w-48 md:w-64 lg:w-80 h-auto mx-auto drop-shadow-xl relative z-10 mix-blend-multiply"
              priority
            />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
            Ontdek de vreugde van{" "}
            <span className="text-purple">samen zingen</span>
          </h1>

          <p className="text-lg text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto">
            {siteSettings?.tagline || "Koor Fameus is het kinderkoor van Landen waar muziek en plezier samenkomen. Voor kinderen van 4 tot 18 jaar."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
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
              className="border-2 border-purple text-purple hover:bg-purple hover:text-white px-8 py-6 text-base rounded-full transition-colors font-semibold"
            >
              <Link href="/contact">
                Gratis proefles
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Flowing sections with alternating photos */}
      {/* Section 1: Photo RIGHT */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 md:py-24">
            <div className="order-2 lg:order-1">
              <p className="text-purple text-sm font-medium tracking-widest uppercase mb-3">Samen zingen</p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                Muziek verbindt
              </h2>
              <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                Bij Koor Fameus ontdekken kinderen de magie van samen zingen. Van kleuters tot tieners - iedereen is welkom om deel uit te maken van onze muzikale familie.
              </p>
              <Link href="/koren" className="inline-flex items-center text-purple font-semibold hover:text-purple-dark transition-colors group">
                Bekijk onze koren
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/home1.jpg"
                  alt="Kinderen zingen samen"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative blob */}
              <div className="absolute -z-10 -top-8 -right-8 w-48 h-48 bg-purple/10 rounded-full blur-2xl" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-32 h-32 bg-orange/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>

        {/* Wave to next section */}
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto -mb-1">
          <path d="M0 100V60C240 20 480 0 720 0C960 0 1200 20 1440 60V100H0Z" className="fill-purple/5"/>
        </svg>
      </section>

      {/* Section 2: Photo LEFT */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 md:py-24">
            <div className="relative">
              <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/home2.jpg"
                  alt="Optreden van het koor"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative blob */}
              <div className="absolute -z-10 -top-8 -left-8 w-48 h-48 bg-orange/10 rounded-full blur-2xl" />
              <div className="absolute -z-10 -bottom-8 -right-8 w-32 h-32 bg-purple/10 rounded-full blur-2xl" />
            </div>
            <div>
              <p className="text-purple text-sm font-medium tracking-widest uppercase mb-3">Optredens</p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                Schitter op het podium
              </h2>
              <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                Regelmatig staan onze koren op het podium. Van schoolfeesten tot concerten - onze zangers leren met trots hun talent te tonen.
              </p>
              <Link href="/evenementen" className="inline-flex items-center text-purple font-semibold hover:text-purple-dark transition-colors group">
                Bekijk evenementen
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Wave to next section */}
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto -mb-1">
          <path d="M0 100V60C240 100 480 80 720 40C960 0 1200 20 1440 60V100H0Z" fill="white"/>
        </svg>
      </section>

      {/* Koren Overview Section */}
      {koren && koren.length > 0 && (
        <section className="py-16 md:py-24 relative overflow-hidden">
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

          {/* Wave to next section */}
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto -mb-1 mt-16">
            <path d="M0 100V40C360 80 720 100 1080 60C1260 40 1350 30 1440 40V100H0Z" className="fill-purple/5"/>
          </svg>
        </section>
      )}

      {/* Why Join Section - with photo RIGHT */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 md:py-24">
            <div>
              <p className="text-purple text-sm font-medium tracking-widest uppercase mb-3">
                Waarom Koor Fameus?
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                Meer dan alleen zingen
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple/10 text-purple rounded-xl flex items-center justify-center flex-shrink-0">
                    <Music className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Zingen</h3>
                    <p className="text-text-secondary text-sm">Wekelijks samen muziek maken</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple/10 text-purple rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Vrienden</h3>
                    <p className="text-text-secondary text-sm">Maak nieuwe vrienden voor het leven</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple/10 text-purple rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Optredens</h3>
                    <p className="text-text-secondary text-sm">Schitter op het podium</p>
                  </div>
                </div>
              </div>
              <Link href="/wie-zijn-wij" className="inline-flex items-center text-purple font-semibold hover:text-purple-dark transition-colors group">
                Over ons team
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/wie1.jpg"
                  alt="Ons team"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative blob */}
              <div className="absolute -z-10 -top-8 -right-8 w-48 h-48 bg-purple/10 rounded-full blur-2xl" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-32 h-32 bg-orange/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>

        {/* Wave to next section */}
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto -mb-1">
          <path d="M0 100V60C360 20 720 0 1080 40C1260 60 1350 70 1440 60V100H0Z" fill="white"/>
        </svg>
      </section>

      {/* Upcoming Events Section - with photo LEFT */}
      {events && events.length > 0 && (
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 md:py-24">
              <div className="relative">
                <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/wie2.jpg"
                    alt="Evenementen"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative blob */}
                <div className="absolute -z-10 -top-8 -left-8 w-48 h-48 bg-orange/10 rounded-full blur-2xl" />
                <div className="absolute -z-10 -bottom-8 -right-8 w-32 h-32 bg-purple/10 rounded-full blur-2xl" />
              </div>
              <div>
                <p className="text-purple text-sm font-medium tracking-widest uppercase mb-3">
                  Agenda
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                  Aankomende evenementen
                </h2>
                <div className="space-y-4 mb-6">
                  {events.slice(0, 3).map((event) => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>
                <Link
                  href="/evenementen"
                  className="inline-flex items-center text-purple font-semibold hover:text-purple-dark transition-colors group"
                >
                  Bekijk alle evenementen
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Wave to CTA section */}
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto -mb-1">
            <path d="M0 100V40C240 80 480 100 720 60C960 20 1200 40 1440 80V100H0Z" className="fill-purple"/>
          </svg>
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
    </div>
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
