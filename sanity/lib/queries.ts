import { groq } from 'next-sanity'

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    description,
    contactEmail,
    socialMedia,
    address
  }
`

// Pages
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    heroImage,
    heroText,
    content,
    seo
  }
`

export const allPagesQuery = groq`
  *[_type == "page"] | order(title asc) {
    _id,
    title,
    slug
  }
`

// Team Members
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    function,
    photo,
    bio,
    email,
    "koren": koren[]->{ _id, name, slug }
  }
`

export const teamMembersByRoleQuery = groq`
  *[_type == "teamMember" && role == $role] | order(order asc) {
    _id,
    name,
    role,
    function,
    photo,
    bio,
    email,
    "koren": koren[]->{ _id, name, slug }
  }
`

// Koren
export const allKorenQuery = groq`
  *[_type == "koor"] | order(order asc) {
    _id,
    name,
    slug,
    ageRange,
    shortDescription,
    image
  }
`

export const koorBySlugQuery = groq`
  *[_type == "koor" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    ageRange,
    description,
    shortDescription,
    image,
    schedule
  }
`

// Events
export const upcomingEventsQuery = groq`
  *[_type == "event" && isPublic == true && date >= now()] | order(date asc) {
    _id,
    title,
    date,
    endDate,
    location,
    shortDescription,
    image,
    "koren": koren[]->{ _id, name, slug }
  }
`

export const allEventsQuery = groq`
  *[_type == "event" && isPublic == true] | order(date desc) {
    _id,
    title,
    date,
    endDate,
    location,
    shortDescription,
    description,
    image,
    "koren": koren[]->{ _id, name, slug }
  }
`

// Gallery Albums
export const allGalleryAlbumsQuery = groq`
  *[_type == "galleryAlbum"] | order(date desc, order asc) {
    _id,
    title,
    slug,
    date,
    description,
    coverImage,
    "imageCount": count(images),
    "event": event->{ _id, title }
  }
`

export const galleryAlbumBySlugQuery = groq`
  *[_type == "galleryAlbum" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    date,
    description,
    coverImage,
    images[] {
      asset,
      caption
    },
    "event": event->{ _id, title, date }
  }
`
