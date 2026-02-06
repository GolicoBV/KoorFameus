import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { allGalleryAlbumsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Calendar, Images } from "lucide-react";

export const metadata: Metadata = {
  title: "Galerij | Koor Fameus",
  description: "Bekijk foto's van optredens, repetities en evenementen van Koor Fameus.",
};

interface GalleryAlbum {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  description?: string;
  coverImage?: {
    asset: {
      _ref: string;
    };
  };
  imageCount: number;
  event?: {
    _id: string;
    title: string;
  };
}

async function getGalleryAlbums() {
  return client.fetch<GalleryAlbum[]>(allGalleryAlbumsQuery);
}

export default async function GalerijPage() {
  const albums = await getGalleryAlbums();

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-bg-white to-bg-section py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-text-primary md:text-5xl mb-4">
              <span className="text-coral">Galerij</span>
            </h1>
            <p className="text-lg text-text-secondary">
              Herbeleef de mooiste momenten van Koor Fameus.
              Van concerten tot repetities, van uitstappen tot workshops.
            </p>
          </div>
        </div>
      </section>

      {/* Albums Grid */}
      <section className="py-16 md:py-24 bg-bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {albums && albums.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <AlbumCard key={album._id} album={album} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Camera className="h-16 w-16 text-coral/30 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                De galerij wordt binnenkort gevuld
              </h2>
              <p className="text-text-secondary max-w-md mx-auto mb-8">
                We zijn bezig met het toevoegen van foto's van onze optredens en activiteiten.
                Kom snel terug!
              </p>
              <Link
                href="/evenementen"
                className="inline-flex items-center text-coral font-medium hover:text-coral-dark transition-colors"
              >
                Bekijk onze evenementen
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-bg-section">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold text-text-primary md:text-3xl mb-4">
            Heb je foto's van een optreden?
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-8">
            Deel je mooiste foto's met ons! We voegen ze graag toe aan onze galerij.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-coral text-white hover:bg-coral-dark px-8 py-4 text-lg font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Stuur ons je foto's
          </Link>
        </div>
      </section>
    </>
  );
}

function AlbumCard({ album }: { album: GalleryAlbum }) {
  return (
    <Link href={`/galerij/${album.slug.current}`}>
      <Card className="group h-full border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-56">
          {album.coverImage ? (
            <Image
              src={urlFor(album.coverImage).width(600).height(400).url()}
              alt={album.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-coral/20 to-coral/40 flex items-center justify-center">
              <Images className="h-16 w-16 text-coral/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-semibold text-white mb-1">{album.title}</h3>
            {album.date && (
              <p className="text-white/80 text-sm flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(album.date).toLocaleDateString("nl-BE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
          <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full flex items-center">
            <Camera className="h-4 w-4 mr-1" />
            {album.imageCount} foto's
          </div>
        </div>
        {album.description && (
          <CardContent className="p-4">
            <p className="text-text-secondary text-sm line-clamp-2">
              {album.description}
            </p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
