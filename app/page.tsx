import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { allKorenQuery, upcomingEventsQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { ArrowRight, Sparkles, Heart, Star } from "lucide-react";

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
      {/* Hero Section - Creative & Playful */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-br from-white via-bg-section to-bg-purple">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Music Notes */}
          <div className="absolute top-20 left-[10%] text-6xl animate-float opacity-20">🎵</div>
          <div className="absolute top-40 right-[15%] text-5xl animate-float delay-300 opacity-15">🎶</div>
          <div className="absolute bottom-32 left-[20%] text-4xl animate-float delay-500 opacity-20">🎵</div>
          <div className="absolute top-1/3 right-[8%] text-7xl animate-float delay-700 opacity-10">🎤</div>
          <div className="absolute bottom-20 right-[25%] text-5xl animate-float delay-200 opacity-15">🎶</div>

          {/* Colorful Blobs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple/30 to-pink/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute top-1/2 -right-32 w-80 h-80 bg-gradient-to-br from-purple/20 to-cyan/10 rounded-full blur-3xl animate-pulse-soft delay-500" />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-yellow/20 to-purple/10 rounded-full blur-3xl animate-pulse-soft delay-300" />

          {/* Fun Shapes */}
          <div className="absolute top-1/4 left-[5%] w-8 h-8 bg-purple rounded-full animate-bounce-gentle opacity-40" />
          <div className="absolute top-1/3 right-[12%] w-6 h-6 bg-purple rounded-full animate-bounce-gentle delay-200 opacity-40" />
          <div className="absolute bottom-1/4 left-[15%] w-10 h-10 bg-yellow rounded-full animate-bounce-gentle delay-500 opacity-50" />
          <div className="absolute top-2/3 right-[20%] w-5 h-5 bg-cyan rounded-full animate-bounce-gentle delay-700 opacity-40" />
        </div>

        <div className="container relative mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Fun Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-lg animate-bounce-gentle">
                <Sparkles className="h-5 w-5 text-yellow" />
                <span className="text-sm font-medium text-text-primary">Zing mee met 100+ kinderen!</span>
              </div>

              {/* Main Heading with Gradient */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="block text-text-primary">Welkom bij</span>
                <span className="text-gradient-purple inline-block animate-wiggle">Koor Fameus!</span>
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {siteSettings?.tagline || "Het leukste kinderkoor van Landen waar plezier en muziek samenkomen! 🎉"}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple to-purple-dark text-white px-8 py-7 text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold"
                >
                  <Link href="/koren">
                    <Star className="mr-2 h-5 w-5" />
                    Ontdek onze koren
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-3 border-purple text-purple hover:bg-purple hover:text-white px-8 py-7 text-lg rounded-2xl transition-all duration-300 font-bold bg-white/80 backdrop-blur-sm"
                >
                  <Link href="/contact">
                    <Heart className="mr-2 h-5 w-5" />
                    Gratis proefles
                  </Link>
                </Button>
              </div>

              {/* Fun Stats */}
              <div className="flex gap-8 mt-10 justify-center lg:justify-start">
                <StatBubble number="100+" label="Leden" color="purple" />
                <StatBubble number="3" label="Koren" color="purple" />
                <StatBubble number="10+" label="Shows/jaar" color="cyan" />
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative order-1 lg:order-2">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-purple/20 animate-spin" style={{ animationDuration: '30s' }} />
                <div className="absolute inset-8 rounded-full border-4 border-dashed border-purple/20 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />

                {/* Main circle with content */}
                <div className="absolute inset-16 bg-gradient-to-br from-purple via-purple-dark to-pink rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
                  <div className="text-center text-white p-8">
                    <div className="text-8xl mb-4 animate-bounce-gentle">🎤</div>
                    <p className="text-2xl font-bold">Zingen is FUN!</p>
                  </div>
                </div>

                {/* Floating elements around the circle */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow text-2xl w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-float">
                  🎵
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-cyan text-2xl w-14 h-14 rounded-full flex items-center justify-center shadow-lg animate-float delay-300">
                  🎶
                </div>
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-purple text-2xl w-12 h-12 rounded-full flex items-center justify-center shadow-lg animate-float delay-500">
                  ⭐
                </div>
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-purple text-2xl w-14 h-14 rounded-full flex items-center justify-center shadow-lg animate-float delay-700">
                  💜
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave SVG divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 50C1200 40 1320 30 1380 25L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Koren Overview Section */}
      {koren && koren.length > 0 && (
        <section className="py-20 md:py-32 bg-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-20 right-0 text-9xl opacity-5 font-black text-purple">ZING</div>
          <div className="absolute bottom-20 left-0 text-9xl opacity-5 font-black text-purple">MEE!</div>

          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-purple/10 text-purple px-4 py-2 rounded-full text-sm font-bold mb-4">
                ✨ Voor elke leeftijd
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6">
                Ontdek jouw <span className="text-gradient-purple">koor!</span>
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Van kleuters tot tieners - er is een koor dat perfect bij jou past.
                Kom gerust langs voor een proefles!
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
                className="bg-gradient-to-r from-purple to-cyan text-white px-10 py-6 text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
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
      <section className="py-20 md:py-28 bg-gradient-to-br from-bg-section via-white to-bg-cyan relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-purple/10 text-purple px-4 py-2 rounded-full text-sm font-bold mb-4">
              💜 Waarom Koor Fameus?
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-text-primary">
              Meer dan alleen zingen
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FunFeatureCard
              emoji="🎤"
              title="Zingen!"
              description="Wekelijks samen muziek maken"
              color="purple"
            />
            <FunFeatureCard
              emoji="🎭"
              title="Optredens"
              description="Schitter op het podium"
              color="purple"
            />
            <FunFeatureCard
              emoji="🤝"
              title="Vrienden"
              description="Maak nieuwe vrienden"
              color="cyan"
            />
            <FunFeatureCard
              emoji="🎉"
              title="Plezier"
              description="Gegarandeerde fun!"
              color="yellow"
            />
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {events && events.length > 0 && (
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <span className="inline-block bg-yellow/20 text-yellow-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                📅 Binnenkort
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-text-primary mb-6">
                Aankomende <span className="text-gradient-purple">events</span>
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
                className="inline-flex items-center text-purple font-bold text-lg hover:text-purple-dark transition-colors group"
              >
                Bekijk alle evenementen
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Creative */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple via-purple-dark to-pink animate-gradient" />

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-[10%] text-6xl animate-float opacity-30">🎵</div>
          <div className="absolute bottom-10 right-[10%] text-5xl animate-float delay-500 opacity-30">🎶</div>
          <div className="absolute top-1/2 left-[5%] text-4xl animate-float delay-300 opacity-20">⭐</div>
          <div className="absolute top-1/2 right-[5%] text-5xl animate-float delay-700 opacity-20">💜</div>
        </div>

        <div className="container relative mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-6xl mb-6 animate-bounce-gentle">🎤</div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Klaar om te shinen?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              De eerste proefles is altijd <strong>gratis</strong>! Kom gezellig langs en ontdek hoe leuk zingen is.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-purple hover:bg-yellow hover:text-text-primary px-12 py-8 text-xl rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 font-black"
            >
              <Link href="/contact">
                <Star className="mr-3 h-6 w-6" />
                Boek je proefles!
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function StatBubble({ number, label, color }: { number: string; label: string; color: string }) {
  const bgColors: Record<string, string> = {
    purple: "bg-purple/10",
    orange: "bg-orange/10",
    cyan: "bg-cyan/10",
    yellow: "bg-yellow/10",
  };
  const textColors: Record<string, string> = {
    purple: "text-purple",
    orange: "text-orange",
    cyan: "text-cyan",
    yellow: "text-yellow-600",
  };

  return (
    <div className={`${bgColors[color]} rounded-2xl px-5 py-3 text-center`}>
      <div className={`text-2xl md:text-3xl font-black ${textColors[color]}`}>{number}</div>
      <div className="text-sm text-text-muted font-medium">{label}</div>
    </div>
  );
}

function FunFeatureCard({ emoji, title, description, color }: {
  emoji: string;
  title: string;
  description: string;
  color: string;
}) {
  const bgColors: Record<string, string> = {
    purple: "bg-purple",
    orange: "bg-orange",
    cyan: "bg-cyan",
    yellow: "bg-yellow",
  };

  return (
    <Card className="group border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 overflow-hidden">
      <CardContent className="p-6 text-center">
        <div className={`w-20 h-20 ${bgColors[color]} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <span className="text-4xl">{emoji}</span>
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
        <p className="text-text-secondary">{description}</p>
      </CardContent>
    </Card>
  );
}

function KoorCard({ koor, index }: { koor: Koor; index: number }) {
  const gradients = [
    "from-purple to-purple-dark",
    "from-purple-dark to-pink",
    "from-cyan to-purple",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <Link href={`/koren/${koor.slug.current}`} className="group">
      <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 overflow-hidden bg-white">
        {/* Image or gradient header */}
        <div className="relative h-56 overflow-hidden">
          {koor.image ? (
            <>
              <Image
                src={urlFor(koor.image).width(400).height(300).url()}
                alt={koor.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-60`} />
            </>
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          )}

          {/* Floating emoji */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-2xl">🎵</span>
          </div>

          {/* Age badge */}
          {koor.ageRange && (
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-text-primary px-4 py-2 rounded-full font-bold shadow-lg">
              {koor.ageRange}
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-purple transition-colors">
            {koor.name}
          </h3>
          {koor.shortDescription && (
            <p className="text-text-secondary mb-4 line-clamp-2">
              {koor.shortDescription}
            </p>
          )}
          <div className="flex items-center text-purple font-bold">
            Ontdek meer
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date);

  return (
    <Card className="group border-0 bg-gradient-to-br from-white to-bg-section shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Date bubble */}
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple to-purple-dark rounded-2xl flex flex-col items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
            <span className="font-black text-2xl leading-none">
              {eventDate.getDate()}
            </span>
            <span className="text-xs uppercase font-bold opacity-90">
              {eventDate.toLocaleDateString("nl-BE", { month: "short" })}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-text-primary mb-1 group-hover:text-purple transition-colors">
              {event.title}
            </h3>
            {event.location && (
              <p className="text-sm text-text-muted mb-2 flex items-center">
                📍 {event.location}
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
