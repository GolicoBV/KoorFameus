import { defineConfig } from 'sanity'
import { structureTool, type StructureBuilder } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rzrgvvg3'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'koorfameus',
  title: 'Koor Fameus CMS',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('Content')
          .items([
            // Site Settings singleton
            S.listItem()
              .title('Site Instellingen')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Regular document types
            S.documentTypeListItem('page').title('Pagina\'s'),
            S.documentTypeListItem('teamMember').title('Teamleden'),
            S.documentTypeListItem('koor').title('Koren'),
            S.documentTypeListItem('event').title('Evenementen'),
            S.documentTypeListItem('galleryAlbum').title('Galerij Albums'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
