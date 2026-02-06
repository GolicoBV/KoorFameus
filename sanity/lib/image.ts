import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Image presets
export const imagePresets = {
  hero: (source: any) =>
    urlFor(source).width(1920).height(600).auto('format').url(),

  card: (source: any) =>
    urlFor(source).width(600).height(400).auto('format').url(),

  avatar: (source: any) =>
    urlFor(source).width(200).height(200).auto('format').url(),

  thumbnail: (source: any) =>
    urlFor(source).width(300).height(200).auto('format').url(),

  og: (source: any) =>
    urlFor(source).width(1200).height(630).auto('format').url(),
}
