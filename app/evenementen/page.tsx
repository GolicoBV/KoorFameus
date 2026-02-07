import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { allEventsQuery } from "@/sanity/lib/queries";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Evenementen | Koor Fameus",
  description: "Ontdek de optredens en evenementen van Koor Fameus. Van concerten tot workshops, er is altijd iets te beleven!",
};

interface Event {
  _id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  shortDescription: string;
}

// Event photos for the flowing gallery
const eventPhotos = [
  "/images/evenementen1.jpg",
  "/images/evenementen2.jpg",
  "/images/evenementen3.jpg",
  "/images/evenementen4.jpg",
  "/images/evenementen5.jpg",
  "/images/evenementen6.jpg",
];

async function getEvents() {
  try {
    return await client.fetch<Event[]>(allEventsQuery);
  } catch {
    return [];
  }
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("nl-BE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("nl-BE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function EvenementenPage() {
  const events = await getEvents();
  const now = new Date();
  const upcomingEvents = events.filter((e) => new Date(e.date) >= now);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            <span className="text-purple">Evenementen</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Van inspirerende concerten tot gezellige workshops -
            ontdek wat er allemaal te beleven valt bij Koor Fameus.
          </p>
        </div>
      </section>

      {/* Photo Gallery Section 1 - Photo RIGHT */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12">
            <div className="order-2 lg:order-1">
              <p className="text-purple text-sm font-medium tracking-widest uppercase mb-3">Concerten</p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                Muzikale hoogtepunten
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                Onze concerten zijn altijd bijzondere momenten waar onze jonge zangers hun talent kunnen tonen aan familie en vrienden.
              </p>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div
                className="relative h-[300px] md:h-[400px] overflow-hidden shadow-xl"
                style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 15% 100%, 0% 75%, 5% 50%, 0% 25%)' }}
              >
                <Image
                  src={eventPhotos[0]}
                  alt="Concert Koor Fameus"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -z-10 -top-8 -right-8 w-48 h-48 bg-purple/10 rounded-full blur-2xl" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-32 h-32 bg-orange/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section 2 - Photo LEFT */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12">
            <div className="relative">
              <div
                className="relative h-[300px] md:h-[400px] overflow-hidden shadow-xl"
                style={{ clipPath: 'polygon(0 0, 85% 0, 100% 25%, 95% 50%, 100% 75%, 85% 100%, 0 100%)' }}
              >
                <Image
                  src={eventPhotos[1]}
                  alt="Optreden Koor Fameus"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -z-10 -top-8 -left-8 w-48 h-48 bg-orange/10 rounded-full blur-2xl" />
              <div className="absolute -z-10 -bottom-8 -right-8 w-32 h-32 bg-purple/10 rounded-full blur-2xl" />
            </div>
            <div>
              <p className="text-purple text-sm font-medium tracking-widest uppercase mb-3">Optredens</p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                Schitteren op het podium
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                Twee keer per jaar organiseren we een concert waar onze zangers hun talent tonen aan familie en vrienden.
              </p>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto -mb-1 mt-8">
          <path d="M0 100V60C240 20 480 0 720 0C960 0 1200 20 1440 60V100H0Z" className="fill-purple/5"/>
        </svg>
      </section>

      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <p className="text-purple text-sm font-medium tracking-widest uppercase mb-3">Agenda</p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Aankomende Evenementen
              </h2>
            </div>

            <div className="grid gap-6 max-w-3xl mx-auto">
              {upcomingEvents.slice(0, 5).map((event) => {
                const eventDate = new Date(event.date);
                return (
                  <Card key={event._id} className="border border-border/50 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-purple rounded-xl flex flex-col items-center justify-center text-white">
                          <span className="font-bold text-xl leading-none">
                            {eventDate.getDate()}
                          </span>
                          <span className="text-xs uppercase">
                            {eventDate.toLocaleDateString("nl-BE", { month: "short" })}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-text-primary text-lg mb-1">
                            {event.title}
                          </h3>
                          <p className="text-sm text-text-muted flex items-center mb-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTime(event.date)}
                            {event.endDate && ` - ${formatTime(event.endDate)}`}
                          </p>
                          {event.location && (
                            <p className="text-sm text-text-secondary flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {event.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Wave divider */}
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto -mb-1 mt-16">
            <path d="M0 100V60C360 20 720 0 1080 40C1260 60 1350 70 1440 60V100H0Z" fill="white"/>
          </svg>
        </section>
      )}

      {/* More Photos - Gallery Grid */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-purple text-sm font-medium tracking-widest uppercase mb-3">Sfeerbeelden</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Momenten om te koesteren
            </h2>
          </div>

          {/* Photo grid with curved edges */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventPhotos.slice(2).map((photo, index) => (
              <div key={index} className="relative group">
                <div
                  className="relative h-[250px] overflow-hidden shadow-lg"
                  style={{
                    clipPath: index % 2 === 0
                      ? 'polygon(10% 0, 100% 0, 100% 100%, 10% 100%, 0% 80%, 5% 50%, 0% 20%)'
                      : 'polygon(0 0, 90% 0, 100% 20%, 95% 50%, 100% 80%, 90% 100%, 0 100%)'
                  }}
                >
                  <Image
                    src={photo}
                    alt={`Evenement ${index + 3}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute -z-10 -bottom-4 -right-4 w-24 h-24 bg-purple/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with integrated wave */}
      <section className="relative overflow-hidden">
        {/* Wave at top of section */}
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
          <path d="M0 100V40C240 80 480 100 720 60C960 20 1200 40 1440 80V100H0Z" className="fill-purple"/>
        </svg>
        <div className="py-20 md:py-28 bg-gradient-to-br from-purple via-purple-dark to-purple -mt-1 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="container mx-auto px-4 md:px-6 text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Wil je Koor Fameus boeken?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
              Op zoek naar een koor voor jouw evenement? Neem contact met ons op
              om de mogelijkheden te bespreken.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white text-purple hover:bg-purple-light hover:text-white px-8 py-4 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              Neem contact op
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
