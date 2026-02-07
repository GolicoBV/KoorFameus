import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { teamMembersQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Music } from "lucide-react";

export const metadata: Metadata = {
  title: "Wie Zijn Wij | Koor Fameus",
  description: "Ontmoet het team achter Koor Fameus. Onze gepassioneerde dirigenten en begeleiders zorgen voor een inspirerende muzikale ervaring.",
};

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
  bio?: string;
  email?: string;
  koren?: { _id: string; name: string; slug: { current: string } }[];
}

async function getTeamMembers() {
  return client.fetch<TeamMember[]>(teamMembersQuery);
}

export default async function WieZijnWijPage() {
  const teamMembers = await getTeamMembers();

  // Group by role
  const directors = teamMembers.filter((m) => m.role === "dirigent");
  const pianists = teamMembers.filter((m) => m.role === "pianist");
  const board = teamMembers.filter((m) => m.role === "bestuur");
  const other = teamMembers.filter(
    (m) => !["dirigent", "pianist", "bestuur"].includes(m.role)
  );

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-bg-white to-bg-section py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-text-primary md:text-5xl mb-4">
              Wie Zijn <span className="text-purple">Wij</span>
            </h1>
            <p className="text-lg text-text-secondary">
              Maak kennis met het gepassioneerde team achter Koor Fameus.
              Samen zorgen we voor een inspirerende en plezierige muzikale ervaring.
            </p>
          </div>
        </div>
      </section>

      {/* Dirigenten Section */}
      {directors.length > 0 && (
        <TeamSection
          title="Dirigenten"
          description="Onze dirigenten leiden met passie en enthousiasme de repetities en optredens."
          members={directors}
          featured
        />
      )}

      {/* Pianisten Section */}
      {pianists.length > 0 && (
        <TeamSection
          title="Pianisten"
          description="Onze pianisten begeleiden de koren met talent en toewijding."
          members={pianists}
        />
      )}

      {/* Bestuur Section */}
      {board.length > 0 && (
        <TeamSection
          title="Bestuur"
          description="Het bestuur zorgt voor de organisatie en ondersteuning van ons koor."
          members={board}
          bgColor="bg-bg-section"
        />
      )}

      {/* Other Team Members */}
      {other.length > 0 && (
        <TeamSection
          title="Team"
          description="Andere belangrijke teamleden die bijdragen aan ons succes."
          members={other}
        />
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-purple">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
            Wil je ons team versterken?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
            We zijn altijd op zoek naar enthousiaste vrijwilligers en begeleiders.
            Neem contact met ons op!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-purple hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Neem contact op
          </Link>
        </div>
      </section>
    </>
  );
}

function TeamSection({
  title,
  description,
  members,
  featured = false,
  bgColor = "bg-bg-white",
}: {
  title: string;
  description: string;
  members: TeamMember[];
  featured?: boolean;
  bgColor?: string;
}) {
  return (
    <section className={`py-16 md:py-24 ${bgColor}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary md:text-4xl mb-4">
            {title}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">{description}</p>
        </div>

        <div
          className={`grid gap-8 ${
            featured
              ? "md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto"
              : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {members.map((member) => (
            <TeamMemberCard key={member._id} member={member} featured={featured} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamMemberCard({
  member,
  featured,
}: {
  member: TeamMember;
  featured?: boolean;
}) {
  return (
    <Card className="border-0 shadow-lg overflow-hidden group">
      <div className={`relative ${featured ? "h-72" : "h-56"}`}>
        {member.photo ? (
          <Image
            src={urlFor(member.photo).width(600).height(400).url()}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple/20 to-purple/40 flex items-center justify-center">
            <span className="text-6xl text-purple/50">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
          <p className="text-white/80">{member.function}</p>
        </div>
      </div>
      <CardContent className="p-6">
        {member.bio && (
          <p className="text-text-secondary text-sm mb-4 line-clamp-3">
            {member.bio}
          </p>
        )}

        {member.koren && member.koren.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <Music className="h-4 w-4 text-purple flex-shrink-0" />
            <div className="flex flex-wrap gap-1">
              {member.koren.map((koor) => (
                <Link
                  key={koor._id}
                  href={`/koren/${koor.slug.current}`}
                  className="text-xs bg-purple/10 text-purple px-2 py-1 rounded-full hover:bg-purple/20 transition-colors"
                >
                  {koor.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center text-purple text-sm hover:text-purple-dark transition-colors"
          >
            <Mail className="h-4 w-4 mr-2" />
            {member.email}
          </a>
        )}
      </CardContent>
    </Card>
  );
}
