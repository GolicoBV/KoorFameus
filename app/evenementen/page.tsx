import { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { allEventsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import Link from "next/link";

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
  description?: any[];
  image?: {
    asset: {
      _ref: string;
    };
  };
  koren?: { _id: string; name: string; slug: { current: string } }[];
}

async function getEvents() {
  return client.fetch<Event[]>(allEventsQuery);
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

  // Split into upcoming and past events
  const upcomingEvents = events.filter((e) => new Date(e.date) >= now);
  const pastEvents = events.filter((e) => new Date(e.date) < now);

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-bg-white to-bg-section py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-text-primary md:text-5xl mb-4">
              <span className="text-coral">Evenementen</span>
            </h1>
            <p className="text-lg text-text-secondary">
              Van inspirerende concerten tot gezellige workshops -
              ontdek wat er allemaal te beleven valt bij Koor Fameus.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24 bg-bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-text-primary md:text-3xl mb-8">
            Aankomende Evenementen
          </h2>

          {upcomingEvents.length > 0 ? (
            <div className="grid gap-8">
              {upcomingEvents.map((event, index) => (
                <EventCard key={event._id} event={event} featured={index === 0} />
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-coral/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Geen aankomende evenementen
                </h3>
                <p className="text-text-secondary">
                  Houd deze pagina in de gaten voor toekomstige optredens en activiteiten.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-16 md:py-24 bg-bg-section">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-text-primary md:text-3xl mb-8">
              Voorbije Evenementen
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.slice(0, 6).map((event) => (
                <PastEventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-coral">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
            Wil je Koor Fameus boeken?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            Op zoek naar een koor voor jouw evenement? Neem contact met ons op
            om de mogelijkheden te bespreken.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-coral hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Neem contact op
          </Link>
        </div>
      </section>
    </>
  );
}

function EventCard({ event, featured }: { event: Event; featured?: boolean }) {
  const eventDate = new Date(event.date);

  return (
    <Card className={`border-0 shadow-lg overflow-hidden ${featured ? "" : ""}`}>
      <div className={`grid ${featured ? "lg:grid-cols-2" : "md:grid-cols-3"}`}>
        {/* Image */}
        <div className={`relative ${featured ? "h-64 lg:h-auto" : "h-48 md:h-auto"}`}>
          {event.image ? (
            <Image
              src={urlFor(event.image).width(800).height(600).url()}
              alt={event.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-coral/20 to-coral/40 flex items-center justify-center">
              <Calendar className="h-16 w-16 text-coral/50" />
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className={`p-6 ${featured ? "lg:p-8" : "md:col-span-2"}`}>
          {/* Date Badge */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-14 h-14 bg-coral rounded-xl flex flex-col items-center justify-center text-white">
              <span className="font-bold text-lg">{eventDate.getDate()}</span>
              <span className="text-xs uppercase">
                {eventDate.toLocaleDateString("nl-BE", { month: "short" })}
              </span>
            </div>
            <div>
              <p className="text-sm text-text-muted">
                {formatDate(event.date)}
              </p>
              <p className="text-sm text-text-secondary flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formatTime(event.date)}
                {event.endDate && ` - ${formatTime(event.endDate)}`}
              </p>
            </div>
          </div>

          <h3 className={`font-bold text-text-primary mb-2 ${featured ? "text-2xl" : "text-xl"}`}>
            {event.title}
          </h3>

          {event.location && (
            <p className="text-text-secondary flex items-center mb-3">
              <MapPin className="h-4 w-4 mr-2 text-coral flex-shrink-0" />
              {event.location}
            </p>
          )}

          {event.shortDescription && (
            <p className={`text-text-secondary mb-4 ${featured ? "" : "line-clamp-2"}`}>
              {event.shortDescription}
            </p>
          )}

          {event.koren && event.koren.length > 0 && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-coral flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {event.koren.map((koor) => (
                  <Link
                    key={koor._id}
                    href={`/koren/${koor.slug.current}`}
                    className="text-xs bg-coral/10 text-coral px-2 py-1 rounded-full hover:bg-coral/20 transition-colors"
                  >
                    {koor.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

function PastEventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date);

  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
            <span className="font-bold text-gray-600">{eventDate.getDate()}</span>
            <span className="text-xs text-gray-500 uppercase">
              {eventDate.toLocaleDateString("nl-BE", { month: "short" })}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary mb-1">{event.title}</h3>
            {event.location && (
              <p className="text-sm text-text-muted flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {event.location}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
