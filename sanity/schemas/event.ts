import { defineType, defineField } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Evenement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Einddatum',
      type: 'datetime',
      description: 'Optioneel, voor meerdaagse evenementen',
    }),
    defineField({
      name: 'location',
      title: 'Locatie',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'blockContent',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Korte Beschrijving',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'koren',
      title: 'Koren',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'koor' }] }],
      description: 'Welke koren nemen deel?',
    }),
    defineField({
      name: 'isPublic',
      title: 'Openbaar evenement',
      type: 'boolean',
      description: 'Mag dit evenement op de website getoond worden?',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Datum (nieuwste eerst)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Datum (oudste eerst)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
    },
    prepare({ title, date, media }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString('nl-BE', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : 'Geen datum'
      return {
        title,
        subtitle: formattedDate,
        media,
      }
    },
  },
})
