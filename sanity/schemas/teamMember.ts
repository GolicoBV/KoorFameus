import { defineType, defineField } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Teamlid',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rol',
      type: 'string',
      options: {
        list: [
          { title: 'Dirigent', value: 'dirigent' },
          { title: 'Bestuur', value: 'bestuur' },
          { title: 'Begeleider', value: 'begeleider' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'function',
      title: 'Functie',
      type: 'string',
      description: 'Bijv. "Voorzitter", "Penningmeester", "Dirigent Kinderkoor"',
    }),
    defineField({
      name: 'koren',
      title: 'Koren',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'koor' }] }],
      description: 'Aan welke koren is dit teamlid verbonden?',
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
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
      subtitle: 'function',
      media: 'photo',
    },
  },
})
