import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Wie Zijn Wij | Koor Fameus",
  description: "Ontmoet het team achter Koor Fameus. Onze gepassioneerde dirigenten en begeleiders zorgen voor een inspirerende muzikale ervaring.",
};

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

const dirigenten: TeamMember[] = [
  {
    id: "lief",
    name: "Lief",
    role: "Dirigent",
    image: "/images/dirigent_lief.jpg",
  },
  {
    id: "freya",
    name: "Freya",
    role: "Dirigent",
    image: "/images/dirigent_freya.jpg",
  },
  {
    id: "karolien",
    name: "Karolien",
    role: "Dirigent",
    image: "/images/dirigent_karolien.jpg",
  },
];

const bestuur: TeamMember[] = [
  {
    id: "adriaan",
    name: "Adriaan",
    role: "Bestuurslid",
    image: "/images/bestuur_adriaan.png",
  },
  {
    id: "ellen",
    name: "Ellen",
    role: "Bestuurslid",
    image: "/images/bestuur_ellen.jpg",
  },
  {
    id: "inge",
    name: "Inge",
    role: "Bestuurslid",
    image: "/images/bestuur_inge.jpg",
  },
  {
    id: "linda",
    name: "Linda",
    role: "Bestuurslid",
    image: "/images/bestuur_linda.jpg",
  },
];

export default function WieZijnWijPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Wie Zijn <span className="text-purple">Wij</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Maak kennis met het gepassioneerde team achter Koor Fameus.
            Samen zorgen we voor een inspirerende en plezierige muzikale ervaring.
          </p>
        </div>
      </section>

      {/* Dirigenten Section - Flowing layout */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-purple text-sm font-medium tracking-widest uppercase mb-3">Onze leiders</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Dirigenten
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Onze dirigenten leiden met passie en enthousiasme de repetities en optredens.
            </p>
          </div>

          {/* Dirigent 1 - Photo RIGHT */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                {dirigenten[0].name}
              </h3>
              <p className="text-purple font-medium mb-4">{dirigenten[0].role}</p>
              <p className="text-text-secondary leading-relaxed">
                Met passie en enthousiasme leidt {dirigenten[0].name} onze zangers naar muzikale hoogtes.
              </p>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div
                className="relative h-[300px] md:h-[400px] overflow-hidden shadow-xl"
                style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 15% 100%, 0% 75%, 5% 50%, 0% 25%)' }}
              >
                <Image
                  src={dirigenten[0].image}
                  alt={dirigenten[0].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -z-10 -top-8 -right-8 w-48 h-48 bg-purple/10 rounded-full blur-2xl" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-32 h-32 bg-orange/10 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Dirigent 2 - Photo LEFT */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12">
            <div className="relative">
              <div
                className="relative h-[300px] md:h-[400px] overflow-hidden shadow-xl"
                style={{ clipPath: 'polygon(0 0, 85% 0, 100% 25%, 95% 50%, 100% 75%, 85% 100%, 0 100%)' }}
              >
                <Image
                  src={dirigenten[1].image}
                  alt={dirigenten[1].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -z-10 -top-8 -left-8 w-48 h-48 bg-orange/10 rounded-full blur-2xl" />
              <div className="absolute -z-10 -bottom-8 -right-8 w-32 h-32 bg-purple/10 rounded-full blur-2xl" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                {dirigenten[1].name}
              </h3>
              <p className="text-purple font-medium mb-4">{dirigenten[1].role}</p>
              <p className="text-text-secondary leading-relaxed">
                {dirigenten[1].name} brengt muzikale magie in elke repetitie en elk optreden.
              </p>
            </div>
          </div>

          {/* Dirigent 3 - Photo RIGHT */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12">
            <div className="order-2 lg:order-1">
              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                {dirigenten[2].name}
              </h3>
              <p className="text-purple font-medium mb-4">{dirigenten[2].role}</p>
              <p className="text-text-secondary leading-relaxed">
                De creatieve aanpak van {dirigenten[2].name} inspireert onze jonge zangers om te groeien.
              </p>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div
                className="relative h-[300px] md:h-[400px] overflow-hidden shadow-xl"
                style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 15% 100%, 0% 75%, 5% 50%, 0% 25%)' }}
              >
                <Image
                  src={dirigenten[2].image}
                  alt={dirigenten[2].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -z-10 -top-8 -right-8 w-48 h-48 bg-purple/10 rounded-full blur-2xl" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-32 h-32 bg-orange/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto -mb-1 mt-8">
          <path d="M0 100V60C240 20 480 0 720 0C960 0 1200 20 1440 60V100H0Z" className="fill-purple/5"/>
        </svg>
      </section>

      {/* Bestuur Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-purple text-sm font-medium tracking-widest uppercase mb-3">Achter de schermen</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Bestuur
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Het bestuur zorgt voor de organisatie en ondersteuning van ons koor.
            </p>
          </div>

          {/* Bestuur grid with curved photos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestuur.map((member, index) => (
              <div key={member.id} className="relative group">
                <div
                  className="relative h-[280px] overflow-hidden shadow-lg"
                  style={{
                    clipPath: index % 2 === 0
                      ? 'polygon(10% 0, 100% 0, 100% 100%, 10% 100%, 0% 80%, 5% 50%, 0% 20%)'
                      : 'polygon(0 0, 90% 0, 100% 20%, 95% 50%, 100% 80%, 90% 100%, 0 100%)'
                  }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-white/80 text-sm">{member.role}</p>
                  </div>
                </div>
                {/* Decorative blob */}
                <div className="absolute -z-10 -bottom-4 -right-4 w-24 h-24 bg-purple/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto -mb-1 mt-16">
          <path d="M0 100V40C240 80 480 100 720 60C960 20 1200 40 1440 80V100H0Z" className="fill-purple"/>
        </svg>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-purple via-purple-dark to-purple relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 md:px-6 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Wil je ons team versterken?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            We zijn altijd op zoek naar enthousiaste vrijwilligers en begeleiders.
            Neem contact met ons op!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-purple hover:bg-purple-light hover:text-white px-8 py-4 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Neem contact op
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
