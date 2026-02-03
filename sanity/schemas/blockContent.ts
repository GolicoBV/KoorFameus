import { defineType, defineArrayMember } from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normaal', value: 'normal' },
        { title: 'Kop 2', value: 'h2' },
        { title: 'Kop 3', value: 'h3' },
        { title: 'Kop 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Opsomming', value: 'bullet' },
        { title: 'Genummerd', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Vet', value: 'strong' },
          { title: 'Cursief', value: 'em' },
          { title: 'Onderstreept', value: 'underline' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                name: 'blank',
                type: 'boolean',
                title: 'Open in nieuw tabblad',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternatieve tekst',
          description: 'Belangrijk voor toegankelijkheid',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Bijschrift',
        },
      ],
    }),
  ],
})
