# Phase 2 Research: CMS Integration

**Researched:** 2026-02-03
**Confidence:** High

## Key Findings

### Sanity v3 Setup with Next.js 16

**Installation:**
```bash
npm install next-sanity sanity @sanity/image-url
```

The `next-sanity` package is the official all-in-one toolkit for Sanity + Next.js. It includes:
- `NextStudio` component for embedding Studio
- Client utilities for GROQ queries
- TypeScript type generation support
- Built-in caching and revalidation helpers

**Project Initialization:**
```bash
npx sanity@latest init
```

This command will:
1. Create a new Sanity project (or connect to existing)
2. Generate `sanity.config.ts` in your project root
3. Create a `sanity` or `studio` folder with schema files
4. Write environment variables to `.env.local`

**Environment Variables Required:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token  # Server-only, for webhooks
```

**Embedding Studio in App Router:**

Create `app/studio/[[...tool]]/page.tsx`:
```tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

Create `app/studio/[[...tool]]/layout.tsx`:
```tsx
export const metadata = {
  title: 'KoorFameus Studio',
  description: 'Content management for KoorFameus website',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
```

**Sanity Config (`sanity.config.ts`):**
```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'koorfameus-studio',
  title: 'KoorFameus',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: '/studio',

  plugins: [
    structureTool({ structure }),
  ],

  schema: {
    types: schemaTypes,
  },
})
```

**CORS Configuration:**
After setup, add your domain to CORS origins at `sanity.io/manage`:
- `http://localhost:3000` (development)
- `https://koorfameus.vercel.app` (production)
- Enable "Allow credentials"

---

### Schema Design

**Recommended File Structure:**
```
sanity/
├── schemas/
│   ├── index.ts           # Export all schemas
│   ├── documents/
│   │   ├── siteSettings.ts
│   │   ├── page.ts
│   │   └── teamMember.ts
│   └── objects/
│       ├── blockContent.ts
│       └── seo.ts
├── structure.ts           # Desk structure configuration
└── lib/
    ├── client.ts          # Sanity client
    ├── queries.ts         # GROQ queries
    └── image.ts           # Image URL builder
```

**Schema: siteSettings (Singleton)**
```typescript
// sanity/schemas/documents/siteSettings.ts
import { defineField, defineType } from 'sanity'
import { Cog } from 'lucide-react'

export default defineType({
  name: 'siteSettings',
  title: 'Site Instellingen',
  type: 'document',
  icon: Cog,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Website Naam',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Website Beschrijving',
      type: 'text',
      rows: 3,
      description: 'Korte beschrijving voor zoekmachines (SEO)',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Instellingen' }
    },
  },
})
```

**Schema: page**
```typescript
// sanity/schemas/documents/page.ts
import { defineField, defineType } from 'sanity'
import { FileText } from 'lucide-react'

export default defineType({
  name: 'page',
  title: 'Pagina',
  type: 'document',
  icon: FileText,
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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Afbeelding',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Tekst',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Inhoud',
      type: 'blockContent',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'heroImage' },
  },
})
```

**Schema: teamMember**
```typescript
// sanity/schemas/documents/teamMember.ts
import { defineField, defineType } from 'sanity'
import { User } from 'lucide-react'

export default defineType({
  name: 'teamMember',
  title: 'Teamlid',
  type: 'document',
  icon: User,
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
          { title: 'Bestuurslid', value: 'bestuur' },
          { title: 'Begeleider', value: 'begeleider' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'choir',
      title: 'Koor',
      type: 'string',
      options: {
        list: [
          { title: 'Startkoor', value: 'startkoor' },
          { title: 'Kinderkoor', value: 'kinderkoor' },
          { title: 'Jeugdkoor', value: 'jeugdkoor' },
          { title: 'Alle koren', value: 'alle' },
        ],
      },
      hidden: ({ parent }) => parent?.role === 'bestuur',
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Biografie',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'order',
      title: 'Volgorde',
      type: 'number',
      description: 'Lagere nummers verschijnen eerst',
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
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
```

**Schema: blockContent (Reusable Rich Text)**
```typescript
// sanity/schemas/objects/blockContent.ts
import { defineType, defineArrayMember } from 'sanity'

export default defineType({
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
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Nummer', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
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
                  Rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
```

**Schema: seo (Reusable Object)**
```typescript
// sanity/schemas/objects/seo.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Titel',
      type: 'string',
      description: 'Laat leeg voor standaard titel',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Beschrijving',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Media Afbeelding',
      type: 'image',
      description: '1200x630px aanbevolen',
    }),
  ],
})
```

**Schema Index:**
```typescript
// sanity/schemas/index.ts
import siteSettings from './documents/siteSettings'
import page from './documents/page'
import teamMember from './documents/teamMember'
import blockContent from './objects/blockContent'
import seo from './objects/seo'

export const schemaTypes = [
  // Documents
  siteSettings,
  page,
  teamMember,
  // Objects
  blockContent,
  seo,
]
```

**Desk Structure (Singleton Pattern):**
```typescript
// sanity/structure.ts
import type { StructureResolver } from 'sanity/structure'
import { Cog, FileText, Users } from 'lucide-react'

// Hide siteSettings from default list (it's a singleton)
const singletonTypes = ['siteSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton: Site Settings
      S.listItem()
        .title('Site Instellingen')
        .icon(Cog)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      S.divider(),

      // Pages
      S.documentTypeListItem('page').title('Paginas').icon(FileText),

      // Team Members
      S.documentTypeListItem('teamMember').title('Team').icon(Users),

      S.divider(),

      // All other document types (filtered)
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.includes(item.getId() as string) &&
                  !['page', 'teamMember'].includes(item.getId() as string)
      ),
    ])
```

---

### Multi-User Authentication

**Free Tier Capabilities:**
- **20 user seats included** (more than enough for KoorFameus)
- **3 default roles:** Administrator, Editor, Viewer
- Viewer role is **free and doesn't count** toward seat limit
- Login via Google, GitHub, or email/password

**Default Roles:**
| Role | Permissions |
|------|-------------|
| Administrator | Full access to all content, settings, and user management |
| Editor | Create, edit, delete content; no access to settings/users |
| Viewer | Read-only access (free, unlimited) |

**Inviting Users:**
1. Go to `sanity.io/manage` > Your Project > Members
2. Click "Invite member"
3. Enter email address
4. Select role (Administrator/Editor)
5. User receives email invitation

**Authentication Flow:**
- Users navigate to `/studio`
- Sanity handles authentication (Google/email)
- Session persists via cookies
- No custom auth code needed

**Limitations (Free Tier):**
- Cannot create custom roles (Enterprise only)
- No SSO/SAML (Enterprise only)
- Basic audit logging only

**For KoorFameus:**
- Invite bestuursleden as "Editor" role
- One person as "Administrator" for user management
- All 5+ expected users fit comfortably in 20-seat free tier

---

### GROQ Query Patterns

**Sanity Client Setup:**
```typescript
// sanity/lib/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01', // Pin to specific date
  useCdn: process.env.NODE_ENV === 'production',
})
```

**Query Patterns:**

```typescript
// sanity/lib/queries.ts
import { defineQuery } from 'next-sanity'

// Site Settings (singleton)
export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    contactEmail,
    socialLinks,
    "logoUrl": logo.asset->url
  }
`)

// All Pages
export const allPagesQuery = defineQuery(`
  *[_type == "page"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`)

// Single Page by Slug
export const pageBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    heroText,
    "heroImageUrl": heroImage.asset->url,
    content,
    seo
  }
`)

// Team Members by Role
export const teamMembersByRoleQuery = defineQuery(`
  *[_type == "teamMember" && role == $role] | order(order asc) {
    _id,
    name,
    role,
    choir,
    bio,
    "photoUrl": photo.asset->url
  }
`)

// All Team Members grouped
export const allTeamMembersQuery = defineQuery(`
  {
    "dirigenten": *[_type == "teamMember" && role == "dirigent"] | order(order asc) {
      _id, name, choir, bio, "photoUrl": photo.asset->url
    },
    "bestuur": *[_type == "teamMember" && role == "bestuur"] | order(order asc) {
      _id, name, bio, "photoUrl": photo.asset->url
    }
  }
`)
```

**Fetching in Server Components:**
```typescript
// app/page.tsx
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

export default async function HomePage() {
  const settings = await client.fetch(siteSettingsQuery)

  return (
    <main>
      <h1>{settings.siteName}</h1>
      <p>{settings.siteDescription}</p>
    </main>
  )
}
```

**Best Practices:**
1. **Explicit field projections** - Never use `*[_type == "page"]` alone; always specify fields
2. **Dereference in query** - Use `photo.asset->url` instead of fetching asset separately
3. **Co-locate queries** - Keep queries in dedicated modules for reuse
4. **Use `defineQuery`** - Enables TypeScript type generation with Sanity TypeGen
5. **Pin API version** - Use specific date like `'2024-01-01'`, never `'vX'`

**Type Generation:**
```bash
npx sanity@latest typegen generate
```

This creates TypeScript types from your schemas and queries for full type safety.

---

### Revalidation Strategy

**Recommended Approach: Tag-Based Revalidation with Webhooks**

**1. Tag Your Fetches:**
```typescript
// app/page.tsx
import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'

export default async function HomePage() {
  const settings = await client.fetch(
    siteSettingsQuery,
    {},
    { next: { tags: ['siteSettings'] } }
  )

  return <main>{/* ... */}</main>
}

// Also set page-level revalidation as fallback
export const revalidate = 3600 // 1 hour
```

**2. Create Revalidation API Route:**
```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

const secret = process.env.SANITY_REVALIDATE_SECRET

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string
      slug?: { current: string }
    }>(req, secret)

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'Bad Request' }, { status: 400 })
    }

    // Revalidate based on document type
    revalidateTag(body._type)

    // For pages, also revalidate specific slug
    if (body._type === 'page' && body.slug?.current) {
      revalidateTag(`page-${body.slug.current}`)
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: body._type,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
```

**3. Configure Webhook in Sanity:**
1. Go to `sanity.io/manage` > Your Project > API > Webhooks
2. Create new webhook:
   - **Name:** `Next.js Revalidation`
   - **URL:** `https://koorfameus.vercel.app/api/revalidate`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** Leave empty (all document types)
   - **Projection:** `{_type, slug}`
   - **Secret:** Generate and save as `SANITY_REVALIDATE_SECRET`

**4. Environment Variables:**
```env
SANITY_REVALIDATE_SECRET=your_generated_secret_here
```

**Tagging Strategy:**
| Content Type | Tag | Affected Pages |
|--------------|-----|----------------|
| siteSettings | `siteSettings` | All pages (header/footer) |
| page | `page`, `page-{slug}` | Specific page + listing |
| teamMember | `teamMember` | Team/about pages |

**Fallback Revalidation:**
Always include time-based revalidation as safety net:
```typescript
export const revalidate = 3600 // 1 hour fallback
```

---

### Image Handling

**Setup Image URL Builder:**
```typescript
// sanity/lib/image.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

**Configure Next.js for Sanity CDN:**
```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
```

**Usage with Next.js Image Component:**
```tsx
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface TeamMemberCardProps {
  member: {
    name: string
    photo: any // Sanity image object
  }
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="relative aspect-square">
      <Image
        src={urlFor(member.photo)
          .width(400)
          .height(400)
          .auto('format')
          .quality(80)
          .url()}
        alt={member.name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover rounded-xl"
      />
    </div>
  )
}
```

**Image Optimization Tips:**

1. **Always specify dimensions:**
   ```typescript
   urlFor(image).width(800).height(600).url()
   ```

2. **Enable auto-format (AVIF/WebP):**
   ```typescript
   urlFor(image).auto('format').url()
   ```

3. **Set quality (80 is good balance):**
   ```typescript
   urlFor(image).quality(80).url()
   ```

4. **Use hotspot for portraits:**
   ```typescript
   // In schema
   { type: 'image', options: { hotspot: true } }

   // In query - include hotspot data
   "image": photo { asset->, hotspot, crop }

   // In component - respect crop
   urlFor(image).fit('crop').url()
   ```

5. **Responsive sizes attribute:**
   ```tsx
   <Image
     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
   />
   ```

**Blur Placeholder:**
```typescript
// In GROQ query
"lqip": photo.asset->metadata.lqip

// In component
<Image
  placeholder="blur"
  blurDataURL={member.lqip}
/>
```

---

## Recommended Approach

### Phase 2 Implementation Steps:

1. **Create Sanity Project**
   ```bash
   npx sanity@latest init
   ```
   - Choose "Create new project"
   - Name: "KoorFameus"
   - Dataset: "production"
   - Accept Next.js integration prompts

2. **Set Up Schemas**
   - Create folder structure under `sanity/schemas/`
   - Implement siteSettings, page, teamMember schemas
   - Configure desk structure with singleton pattern

3. **Embed Studio**
   - Create `app/studio/[[...tool]]/page.tsx`
   - Create separate layout to avoid conflicts
   - Configure CORS at sanity.io/manage

4. **Set Up Sanity Client**
   - Create `sanity/lib/client.ts`
   - Create `sanity/lib/queries.ts`
   - Create `sanity/lib/image.ts`

5. **Configure Revalidation**
   - Create `/api/revalidate` route
   - Set up webhook in Sanity dashboard
   - Add revalidation secret to Vercel env vars

6. **Invite Team Members**
   - Go to sanity.io/manage
   - Invite beheerders with Editor role
   - Test login flow for each user

7. **Create Initial Content**
   - Add siteSettings document
   - Create test page
   - Add sample team member

### Environment Variables Checklist:

```env
# Public (client-safe)
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
NEXT_PUBLIC_SANITY_DATASET=production

# Server-only
SANITY_API_TOKEN=skxxxxx  # For write operations if needed
SANITY_REVALIDATE_SECRET=xxxxx  # For webhook validation
```

---

## Pitfalls to Avoid

### Setup Pitfalls:

1. **Don't forget CORS configuration**
   - Studio won't load without proper CORS setup
   - Add both localhost:3000 and production domain
   - Enable "Allow credentials"

2. **Separate Studio layout from app layout**
   - Studio needs its own root layout without your app's styling
   - Use route groups: `(site)` and `studio` to separate

3. **Don't include SanityLive in Studio route**
   - Can cause unexpected reloads
   - Only use in content pages

### Schema Pitfalls:

4. **Avoid making everything a singleton**
   - Only siteSettings should be singleton
   - Pages, team members need to be creatable

5. **Always enable hotspot on portrait images**
   - Without hotspot, cropping looks bad
   - Critical for team member photos

6. **Don't forget validation rules**
   - Required fields prevent incomplete content
   - Email validation, max lengths, etc.

### Query Pitfalls:

7. **Never use `useCdn: false` in production**
   - Set `useCdn: true` for published content
   - Only use `false` for draft/preview mode

8. **Pin API version to specific date**
   - Don't use `'vX'` or leave empty
   - Example: `apiVersion: '2024-01-01'`

9. **Dereference images in query**
   - Wrong: Fetch asset ID, then resolve
   - Right: `"url": image.asset->url` in GROQ

### Revalidation Pitfalls:

10. **Don't rely solely on webhooks**
    - Always include time-based fallback
    - Webhooks can fail silently

11. **Validate webhook signatures**
    - Never trust unvalidated webhook requests
    - Use `parseBody` from `next-sanity/webhook`

12. **Don't over-tag**
    - Too many tags = too much revalidation
    - Group logically (by document type)

### Image Pitfalls:

13. **Always specify image dimensions**
    - Unspecified dimensions = huge images downloaded
    - Use `.width()` and `.height()` methods

14. **Configure remotePatterns in next.config.ts**
    - Next.js Image won't work with Sanity CDN otherwise
    - Add `cdn.sanity.io` to allowed patterns

15. **Don't forget sizes attribute**
    - Critical for responsive image loading
    - Can reduce bandwidth by 60%+

---

## Sources

- [Sanity Toolkit for Next.js (next-sanity)](https://github.com/sanity-io/next-sanity)
- [Embedding Sanity Studio - Sanity Docs](https://www.sanity.io/docs/studio/embedding-sanity-studio)
- [Sanity Schema Types](https://www.sanity.io/docs/studio/schema-types)
- [Structure Builder Cheat Sheet](https://www.sanity.io/docs/studio/structure-builder-cheat-sheet)
- [Sanity Roles and Permissions](https://www.sanity.io/docs/user-guides/roles)
- [GROQ Query Patterns for Next.js](https://dev.to/fibonacid/data-fetching-patterns-for-nextjs-sanity-4bgh)
- [On-Demand ISR with Sanity Webhooks](https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs)
- [Sanity Image Transformations](https://www.sanity.io/docs/apis-and-sdks/image-urls)
- [Practical Image Rendering Guide](https://dev.to/fibonacid/practical-image-rendering-guide-for-sanity-and-nextjs-3gc7)
- [Vercel Data Cache Documentation](https://vercel.com/docs/data-cache)
