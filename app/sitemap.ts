import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allKorenQuery, allGalleryAlbumsQuery } from "@/sanity/lib/queries";

const baseUrl = "https://koorfameus.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/koren`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wie-zijn-wij`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evenementen`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galerij`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic koren pages
  const koren = await client.fetch<{ slug: { current: string } }[]>(allKorenQuery);
  const korenPages: MetadataRoute.Sitemap = koren.map((koor) => ({
    url: `${baseUrl}/koren/${koor.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic gallery album pages
  const albums = await client.fetch<{ slug: { current: string } }[]>(allGalleryAlbumsQuery);
  const albumPages: MetadataRoute.Sitemap = albums.map((album) => ({
    url: `${baseUrl}/galerij/${album.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...korenPages, ...albumPages];
}
