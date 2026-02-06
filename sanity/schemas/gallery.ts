import { defineType, defineField } from 'sanity'

export const galleryAlbum = defineType({
  name: 'galleryAlbum',
  title: 'Galerij Album',
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
      name: 'date',
      title: 'Datum',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Afbeelding',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'images',
      title: 'Afbeeldingen',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'caption',
              title: 'Onderschrift',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'event',
      title: 'Evenement',
      type: 'reference',
      to: [{ type: 'event' }],
      description: 'Optioneel: koppel aan een evenement',
    }),
    defineField({
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      description: 'Lagere nummers worden eerst getoond',
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: 'Datum (nieuwste eerst)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Volgorde',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date
          ? new Date(date).toLocaleDateString('nl-BE')
          : 'Geen datum',
        media,
      }
    },
  },
})
