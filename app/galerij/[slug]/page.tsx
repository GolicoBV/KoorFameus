"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { galleryAlbumBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  asset: {
    _ref: string;
  };
  caption?: string;
}

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
  images: GalleryImage[];
  event?: {
    _id: string;
    title: string;
    date: string;
  };
}

export default function GalleryAlbumPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [album, setAlbum] = useState<GalleryAlbum | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchAlbum() {
      const data = await client.fetch<GalleryAlbum>(galleryAlbumBySlugQuery, { slug });
      setAlbum(data);
      setLoading(false);
    }
    fetchAlbum();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple border-t-transparent" />
      </div>
    );
  }

  if (!album) {
    notFound();
  }

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => {
    if (lightboxIndex !== null && album.images) {
      setLightboxIndex((lightboxIndex - 1 + album.images.length) % album.images.length);
    }
  };
  const nextImage = () => {
    if (lightboxIndex !== null && album.images) {
      setLightboxIndex((lightboxIndex + 1) % album.images.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-bg-white to-bg-section py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <Link
            href="/galerij"
            className="inline-flex items-center text-text-secondary hover:text-purple mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar galerij
          </Link>
          <h1 className="text-3xl font-bold text-text-primary md:text-4xl mb-2">
            {album.title}
          </h1>
          {album.date && (
            <p className="text-text-secondary flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(album.date).toLocaleDateString("nl-BE", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
          {album.description && (
            <p className="text-text-secondary mt-4 max-w-2xl">
              {album.description}
            </p>
          )}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-8 md:py-12 bg-bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {album.images && album.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {album.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="relative aspect-square overflow-hidden rounded-lg group focus:outline-none focus:ring-2 focus:ring-purple"
                >
                  <Image
                    src={urlFor(image).width(400).height(400).url()}
                    alt={image.caption || `${album.title} - foto ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-muted">Geen foto's in dit album.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && album.images && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            aria-label="Sluiten"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 text-white/80 hover:text-white p-2 z-10"
            aria-label="Vorige foto"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 text-white/80 hover:text-white p-2 z-10"
            aria-label="Volgende foto"
          >
            <ChevronRight className="h-10 w-10" />
          </button>

          {/* Image */}
          <div className="relative max-w-[90vw] max-h-[85vh]">
            <Image
              src={urlFor(album.images[lightboxIndex]).width(1600).height(1200).url()}
              alt={album.images[lightboxIndex].caption || `${album.title} - foto ${lightboxIndex + 1}`}
              width={1600}
              height={1200}
              className="max-w-full max-h-[85vh] object-contain"
            />
            {album.images[lightboxIndex].caption && (
              <p className="absolute bottom-0 left-0 right-0 text-white text-center py-4 bg-gradient-to-t from-black/80 to-transparent">
                {album.images[lightboxIndex].caption}
              </p>
            )}
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {lightboxIndex + 1} / {album.images.length}
          </div>
        </div>
      )}
    </>
  );
}
