import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { koorBySlugQuery, allKorenQuery, teamMembersQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, ArrowLeft, ArrowRight, Users } from "lucide-react";

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
  description: any[];
  shortDescription: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  schedule?: Schedule[];
}

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  function: string;
  photo?: {
    asset: {
      _ref: string;
    };
  };
  koren?: { _id: string; name: string; slug: { current: string } }[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getKoorBySlug(slug: string) {
  return client.fetch<Koor>(koorBySlugQuery, { slug });
}

async function getTeamMembersForKoor(koorId: string) {
  const allTeamMembers = await client.fetch<TeamMember[]>(teamMembersQuery);
  return allTeamMembers.filter((member) =>
    member.koren?.some((k) => k._id === koorId)
  );
}

async function getAllKorenSlugs() {
  const koren = await client.fetch<{ slug: { current: string } }[]>(allKorenQuery);
  return koren.map((k) => k.slug.current);
}

export async function generateStaticParams() {
  const slugs = await getAllKorenSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const koor = await getKoorBySlug(slug);

  if (!koor) {
    return {
      title: "Koor niet gevonden | Koor Fameus",
    };
  }

  return {
    title: `${koor.name} | Koor Fameus`,
    description: koor.shortDescription || `Meer informatie over ${koor.name} van Koor Fameus.`,
  };
}

export default async function KoorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const koor = await getKoorBySlug(slug);

  if (!koor) {
    notFound();
  }

  const teamMembers = await getTeamMembersForKoor(koor._id);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] max-h-[500px]">
        {koor.image ? (
          <Image
            src={urlFor(koor.image).width(1920).height(600).url()}
            alt={koor.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple/30 to-purple/60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="container relative mx-auto px-4 md:px-6 h-full flex items-end pb-8">
          <div>
            <Link
              href="/koren"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar koren
            </Link>
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl mb-2">
              {koor.name}
            </h1>
            {koor.ageRange && (
              <span className="inline-block bg-purple text-white text-sm font-medium px-4 py-2 rounded-full">
                {koor.ageRange}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {koor.description && (
                <div className="prose prose-lg max-w-none">
                  <PortableText value={koor.description} />
                </div>
              )}

              {!koor.description && koor.shortDescription && (
                <p className="text-text-secondary text-lg">
                  {koor.shortDescription}
                </p>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Schedule Card */}
              {koor.schedule && koor.schedule.length > 0 && (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                      <Clock className="h-5 w-5 text-purple mr-2" />
                      Repetitietijden
                    </h3>
                    <div className="space-y-3">
                      {koor.schedule.map((item, idx) => (
                        <div key={idx} className="border-l-2 border-purple pl-4 py-1">
                          <p className="font-medium text-text-primary">{item.day}</p>
                          <p className="text-text-secondary">
                            {item.startTime} - {item.endTime}
                          </p>
                          {item.location && (
                            <p className="text-sm text-text-muted flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {item.location}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Team Members Card */}
              {teamMembers.length > 0 && (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                      <Users className="h-5 w-5 text-purple mr-2" />
                      Begeleiders
                    </h3>
                    <div className="space-y-4">
                      {teamMembers.map((member) => (
                        <div key={member._id} className="flex items-center gap-3">
                          {member.photo ? (
                            <Image
                              src={urlFor(member.photo).width(80).height(80).url()}
                              alt={member.name}
                              width={48}
                              height={48}
                              className="rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-purple/10 flex items-center justify-center">
                              <span className="text-purple font-medium">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-text-primary">{member.name}</p>
                            <p className="text-sm text-text-muted">{member.function}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/wie-zijn-wij"
                      className="inline-flex items-center text-purple text-sm font-medium mt-4 hover:text-purple-dark transition-colors"
                    >
                      Ontmoet het hele team
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* CTA Card */}
              <Card className="border-0 shadow-lg bg-purple">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Interesse?
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    Kom eens langs voor een gratis proefles!
                  </p>
                  <Button
                    asChild
                    className="w-full bg-white text-purple hover:bg-gray-100"
                  >
                    <Link href="/contact">Neem contact op</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
