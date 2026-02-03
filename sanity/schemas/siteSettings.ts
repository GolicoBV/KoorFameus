import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Instellingen',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Website Naam',
      type: 'string',
      initialValue: 'Koor Fameus',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Kinder- en jeugdkoor',
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 3,
      description: 'Korte beschrijving voor SEO en social media',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact E-mail',
      type: 'string',
      initialValue: 'info@koorfameus.be',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'address',
      title: 'Adres',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          title: 'Straat',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'Stad',
          type: 'string',
        }),
        defineField({
          name: 'postalCode',
          title: 'Postcode',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Instellingen',
      }
    },
  },
})
