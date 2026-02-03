import { defineType, defineField } from 'sanity'

export const koor = defineType({
  name: 'koor',
  title: 'Koor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ageRange',
      title: 'Leeftijdsgroep',
      type: 'string',
      description: 'Bijv. "6-9 jaar"',
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
      description: 'Voor overzichtspagina\'s',
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
      name: 'schedule',
      title: 'Repetitietijden',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Dag',
              type: 'string',
              options: {
                list: [
                  'Maandag',
                  'Dinsdag',
                  'Woensdag',
                  'Donderdag',
                  'Vrijdag',
                  'Zaterdag',
                  'Zondag',
                ],
              },
            }),
            defineField({
              name: 'startTime',
              title: 'Starttijd',
              type: 'string',
              description: 'Bijv. "18:30"',
            }),
            defineField({
              name: 'endTime',
              title: 'Eindtijd',
              type: 'string',
              description: 'Bijv. "19:30"',
            }),
            defineField({
              name: 'location',
              title: 'Locatie',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              day: 'day',
              startTime: 'startTime',
              endTime: 'endTime',
            },
            prepare({ day, startTime, endTime }) {
              return {
                title: `${day}: ${startTime} - ${endTime}`,
              }
            },
          },
        },
      ],
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
      title: 'Volgorde',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'ageRange',
      media: 'image',
    },
  },
})
