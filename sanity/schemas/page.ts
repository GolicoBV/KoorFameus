import { defineType, defineField } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Pagina',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Afbeelding',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Tekst',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'content',
      title: 'Inhoud',
      type: 'blockContent',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Titel',
          type: 'string',
          description: 'Titel voor zoekmachines (laat leeg voor pagina titel)',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Beschrijving',
          type: 'text',
          rows: 2,
          description: 'Beschrijving voor zoekmachines',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
    },
  },
})
