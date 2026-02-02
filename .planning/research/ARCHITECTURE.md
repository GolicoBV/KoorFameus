# Architecture Research: Small Organization Website with CMS

| Field | Value |
|-------|-------|
| **Domain** | Small organization website with CMS (choir/community) |
| **Researched** | 2026-02-02 |
| **Confidence** | High - Based on current industry best practices and official documentation |

---

## 1. Standard Architecture

### System Overview Diagram

```
+------------------+     +-------------------+     +------------------+
|                  |     |                   |     |                  |
|  Content Editors |---->|   Headless CMS    |---->|   Next.js App    |
|  (Bestuur)       |     |   (Sanity)        |     |   (Vercel)       |
|                  |     |                   |     |                  |
+------------------+     +-------------------+     +------------------+
                               |                         |
                               | Webhook                 | ISR/SSG
                               v                         v
                         +----------+              +-----------+
                         | On-demand|              |    CDN    |
                         | Revalidate|             | (Vercel   |
                         +----------+              |  Edge)    |
                                                   +-----------+
                                                        |
                                                        v
                                                  +-----------+
                                                  |  Visitors |
                                                  +-----------+

+------------------+     +-------------------+
|                  |     |                   |
|  Contact/        |---->|  Email Service    |---->  info@koorfameus.be
|  Registration    |     |  (Resend)         |
|  Forms           |     |                   |
+------------------+     +-------------------+

+------------------+
|                  |
|  Media Assets    |---->  CMS Media Library / Vercel Image Optimization
|  (Photos/Videos) |
|                  |
+------------------+
```

### Component Responsibilities

| Component | Responsibility | Technology |
|-----------|---------------|------------|
| **Headless CMS** | Content storage, editing interface, media management, multi-user access | Sanity (recommended) |
| **Next.js Frontend** | Rendering pages, routing, API routes, form handling | Next.js 15 App Router |
| **Vercel Hosting** | Deployment, CDN, serverless functions, image optimization | Vercel Platform |
| **Email Service** | Transactional emails for contact/registration forms | Resend or Nodemailer |
| **Image CDN** | Image optimization, responsive images, lazy loading | Vercel Image Optimization + CMS CDN |

### Why This Stack?

1. **Sanity CMS**: Free tier supports 3 users, visual editing, real-time collaboration, excellent Next.js integration with TypeScript support
2. **Next.js App Router**: Server-first architecture reduces client JavaScript, ISR keeps content fresh without rebuilds
3. **Vercel**: Zero-config deployment, automatic HTTPS, global CDN, generous free tier
4. **Resend**: Modern email API with React components for templates, generous free tier (3,000 emails/month)

---

## 2. Recommended Project Structure

```
koorfameus/
├── app/                          # Next.js App Router
│   ├── (site)/                   # Public website routes (route group)
│   │   ├── page.tsx              # Homepage
│   │   ├── koren/
│   │   │   ├── page.tsx          # Koren overview
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Individual koor (Startkoor, Kinderkoor, Jeugdkoor)
│   │   ├── wie-zijn-wij/
│   │   │   └── page.tsx          # About page (dirigenten, bestuur)
│   │   ├── evenementen/
│   │   │   ├── page.tsx          # Events calendar
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Single event detail
│   │   ├── nieuws/
│   │   │   ├── page.tsx          # News overview
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Single news article
│   │   ├── gallerij/
│   │   │   └── page.tsx          # Photo/video gallery
│   │   ├── contact/
│   │   │   └── page.tsx          # Contact form
│   │   └── inschrijven/
│   │       └── page.tsx          # Member registration form
│   │
│   ├── studio/                   # Sanity Studio (embedded)
│   │   └── [[...tool]]/
│   │       └── page.tsx          # CMS admin at /studio
│   │
│   ├── api/                      # API routes
│   │   ├── contact/
│   │   │   └── route.ts          # Contact form handler
│   │   ├── inschrijven/
│   │   │   └── route.ts          # Registration form handler
│   │   ├── revalidate/
│   │   │   └── route.ts          # Webhook for on-demand ISR
│   │   └── draft/
│   │       └── route.ts          # Preview mode toggle
│   │
│   ├── layout.tsx                # Root layout
│   ├── not-found.tsx             # 404 page
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── ui/                       # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── MobileMenu.tsx
│   ├── blocks/                   # CMS content blocks
│   │   ├── Hero.tsx
│   │   ├── TextBlock.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── EventCard.tsx
│   │   ├── NewsCard.tsx
│   │   └── TeamMember.tsx
│   └── forms/                    # Form components
│       ├── ContactForm.tsx
│       └── RegistrationForm.tsx
│
├── lib/                          # Utilities and configuration
│   ├── sanity/
│   │   ├── client.ts             # Sanity client configuration
│   │   ├── queries.ts            # GROQ queries
│   │   ├── image.ts              # Image URL builder
│   │   └── preview.ts            # Preview mode helpers
│   ├── email/
│   │   └── send.ts               # Email sending utility
│   └── utils.ts                  # General utilities
│
├── sanity/                       # Sanity schema definitions
│   ├── schemas/
│   │   ├── index.ts              # Schema exports
│   │   ├── documents/
│   │   │   ├── koor.ts           # Koor schema
│   │   │   ├── event.ts          # Event schema
│   │   │   ├── news.ts           # News article schema
│   │   │   ├── teamMember.ts     # Team member schema
│   │   │   ├── page.ts           # Generic page schema
│   │   │   └── siteSettings.ts   # Global settings
│   │   └── objects/
│   │       ├── blockContent.ts   # Rich text block
│   │       ├── image.ts          # Image with metadata
│   │       └── socialLink.ts     # Social media link
│   └── lib/
│       └── desk.ts               # Studio desk structure
│
├── public/                       # Static assets
│   ├── images/
│   │   └── logo.svg
│   └── fonts/
│
├── emails/                       # Email templates (if using React Email)
│   ├── ContactNotification.tsx
│   └── RegistrationNotification.tsx
│
├── sanity.config.ts              # Sanity Studio configuration
├── sanity.cli.ts                 # Sanity CLI configuration
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── .env.local                    # Environment variables (not committed)
├── .env.example                  # Environment variables template
└── package.json
```

### Key Structural Decisions

1. **Embedded Sanity Studio** (`/app/studio`): Single deployment, shared types, simpler infrastructure
2. **Route Groups** (`(site)`): Keeps public routes organized without affecting URL structure
3. **Component Categories**: UI (primitives), Layout (structural), Blocks (CMS content), Forms (interactive)
4. **Sanity Schemas Separation**: Documents vs Objects for clear content modeling
5. **Colocation**: API routes close to their related features

---

## 3. Architectural Patterns

### 3.1 Server-First Data Fetching

Fetch CMS data in Server Components to reduce client JavaScript:

```typescript
// app/(site)/nieuws/page.tsx
import { sanityClient } from '@/lib/sanity/client';
import { newsQuery } from '@/lib/sanity/queries';

export const revalidate = 3600; // Revalidate every hour

export default async function NieuwsPage() {
  const news = await sanityClient.fetch(newsQuery);

  return (
    <main>
      <h1>Nieuws</h1>
      {news.map((article) => (
        <NewsCard key={article._id} article={article} />
      ))}
    </main>
  );
}
```

### 3.2 Incremental Static Regeneration (ISR)

Use time-based revalidation for content that updates occasionally:

```typescript
// Page-level revalidation
export const revalidate = 3600; // 1 hour

// Or fetch-level revalidation
const data = await fetch(url, {
  next: { revalidate: 3600 }
});
```

### 3.3 On-Demand Revalidation via Webhooks

For immediate updates when content changes:

```typescript
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-sanity-webhook-secret');

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  const body = await request.json();
  const { _type, slug } = body;

  // Revalidate based on content type
  switch (_type) {
    case 'news':
      revalidatePath('/nieuws');
      revalidatePath(`/nieuws/${slug.current}`);
      break;
    case 'event':
      revalidatePath('/evenementen');
      revalidatePath(`/evenementen/${slug.current}`);
      break;
    // ... other types
  }

  return NextResponse.json({ revalidated: true });
}
```

### 3.4 Content Preview (Draft Mode)

Allow editors to preview unpublished content:

```typescript
// app/api/draft/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  (await draftMode()).enable();
  redirect(slug || '/');
}
```

### 3.5 Form Handling Pattern

Server Actions or API Routes for form submissions:

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  // Validate input
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: 'website@koorfameus.be',
      to: 'info@koorfameus.be',
      subject: `Contactformulier: ${name}`,
      html: `<p><strong>Van:</strong> ${name} (${email})</p>
             <p><strong>Bericht:</strong></p>
             <p>${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
```

---

## 4. Data Flow Diagrams

### 4.1 Content Publishing Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CONTENT PUBLISHING FLOW                          │
└─────────────────────────────────────────────────────────────────────────┘

  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
  │ Editor  │───>│ Sanity  │───>│ Webhook │───>│ Next.js │───>│  CDN    │
  │ Creates │    │ Stores  │    │ Fires   │    │ Revali- │    │ Cache   │
  │ Content │    │ Content │    │         │    │ dates   │    │ Updates │
  └─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
       │              │              │              │              │
       │              │              │              │              │
       v              v              v              v              v
  [Draft Mode]   [Published]   [POST to      [revalidate    [Fresh page
   Preview        in CMS       /api/          Path()]        served to
   Available]                  revalidate]                   visitors]
```

### 4.2 Page Request Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           PAGE REQUEST FLOW                              │
└─────────────────────────────────────────────────────────────────────────┘

  Visitor Request                                              Response
       │                                                          ▲
       v                                                          │
  ┌─────────────────────────────────────────────────────────────────────┐
  │                         VERCEL EDGE NETWORK                          │
  │  ┌───────────────┐                                                  │
  │  │  CDN Cache    │──── Cache HIT ────────────────────────────────>  │
  │  │               │                                                   │
  │  │               │                                                   │
  │  │  Cache MISS   │                                                   │
  │  └───────┬───────┘                                                   │
  └──────────┼───────────────────────────────────────────────────────────┘
             │
             v
  ┌─────────────────────────────────────────────────────────────────────┐
  │                         NEXT.JS SERVER                              │
  │                                                                      │
  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐             │
  │  │ Server      │───>│ Fetch from  │───>│ Render      │             │
  │  │ Component   │    │ Sanity API  │    │ HTML        │             │
  │  └─────────────┘    └─────────────┘    └─────────────┘             │
  │                            │                                         │
  │                            v                                         │
  │                     ┌─────────────┐                                  │
  │                     │ Sanity      │                                  │
  │                     │ Content     │                                  │
  │                     │ Lake        │                                  │
  │                     └─────────────┘                                  │
  └─────────────────────────────────────────────────────────────────────┘
```

### 4.3 Form Submission Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        FORM SUBMISSION FLOW                              │
└─────────────────────────────────────────────────────────────────────────┘

  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
  │ Visitor │───>│ Contact │───>│ API     │───>│ Resend  │───>│ Email   │
  │ Fills   │    │ Form    │    │ Route   │    │ API     │    │ Inbox   │
  │ Form    │    │ Submit  │    │ Handler │    │         │    │         │
  └─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
       │              │              │              │              │
       │              │              │              │              │
       v              v              v              v              v
  [User Input]   [Client-side   [Validate,    [Send          [info@
                 validation,     sanitize,     transactional  koorfameus.be
                 POST to API]    send email]   email]         receives]
```

### 4.4 Image Delivery Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         IMAGE DELIVERY FLOW                              │
└─────────────────────────────────────────────────────────────────────────┘

  ┌─────────────┐
  │ Editor      │
  │ Uploads     │
  │ Image       │
  └──────┬──────┘
         │
         v
  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
  │ Sanity      │───>│ Sanity      │───>│ Next.js     │
  │ Media       │    │ Image       │    │ <Image>     │
  │ Library     │    │ CDN         │    │ Component   │
  └─────────────┘    └─────────────┘    └──────┬──────┘
                                               │
                           ┌───────────────────┼───────────────────┐
                           │                   │                   │
                           v                   v                   v
                     ┌─────────┐         ┌─────────┐         ┌─────────┐
                     │ Desktop │         │ Tablet  │         │ Mobile  │
                     │ 1200px  │         │ 768px   │         │ 320px   │
                     │ WebP    │         │ WebP    │         │ WebP    │
                     └─────────┘         └─────────┘         └─────────┘

  [Automatic responsive images via srcset, lazy loading, modern formats]
```

---

## 5. Integration Points

### 5.1 Sanity CMS Integration

**Configuration:**
```typescript
// lib/sanity/client.ts
import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

// For preview mode
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
```

**Environment Variables:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk-xxx (for preview/write operations)
SANITY_WEBHOOK_SECRET=your-webhook-secret
SANITY_PREVIEW_SECRET=your-preview-secret
```

### 5.2 Email Service Integration (Resend)

**Configuration:**
```typescript
// lib/email/send.ts
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  return resend.emails.send({
    from: 'KoorFameus Website <noreply@koorfameus.be>',
    to: ['info@koorfameus.be'],
    replyTo: data.email,
    subject: `Contactformulier: ${data.name}`,
    html: `...`,
  });
}
```

**Environment Variables:**
```env
RESEND_API_KEY=re_xxx
```

**Note:** Resend requires domain verification. Alternative: Use Nodemailer with existing email provider (Gmail SMTP) for simpler setup.

### 5.3 Vercel Image Optimization

**Configuration:**
```javascript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};
```

**Usage:**
```typescript
// Using Sanity's image URL builder
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '@/lib/sanity/client';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

// In component
<Image
  src={urlFor(image).width(800).url()}
  alt={image.alt}
  width={800}
  height={600}
/>
```

### 5.4 Social Media Embeds

For Instagram/Facebook integration:
- Use official embed codes in rich text blocks
- Or integrate via their oEmbed APIs
- Consider privacy: load embeds on user consent

---

## 6. Component Responsibilities

### 6.1 Layout Components

| Component | Responsibility |
|-----------|---------------|
| `Header` | Logo, main navigation, mobile menu toggle |
| `Footer` | Contact info, social links, copyright |
| `Navigation` | Menu items, active state, dropdown for mobile |
| `MobileMenu` | Slide-out menu for mobile devices |

### 6.2 Content Block Components

| Component | Responsibility | CMS Schema |
|-----------|---------------|------------|
| `Hero` | Full-width hero section with image/video | `hero` object |
| `TextBlock` | Rich text content with headings, lists, links | `blockContent` portable text |
| `EventCard` | Event summary (date, title, location) | `event` document |
| `NewsCard` | News article preview (image, title, excerpt) | `news` document |
| `TeamMember` | Team member card (photo, name, role) | `teamMember` document |
| `ImageGallery` | Grid of images with lightbox | `gallery` object |
| `KoorInfo` | Choir information section | `koor` document |

### 6.3 Form Components

| Component | Responsibility |
|-----------|---------------|
| `ContactForm` | Contact form with validation, submission, success/error states |
| `RegistrationForm` | Member registration with child info, parent info, preferences |

### 6.4 UI Primitives

| Component | Responsibility |
|-----------|---------------|
| `Button` | Primary/secondary buttons with variants |
| `Card` | Generic card container with shadow, padding |
| `Input` | Form input with label, error state |
| `Textarea` | Multi-line text input |
| `Select` | Dropdown selection |
| `Modal` | Overlay dialog for gallery lightbox |

---

## 7. CMS Content Model

### Recommended Sanity Schemas

```
Documents:
├── koor (Startkoor, Kinderkoor, Jeugdkoor)
│   ├── title, slug, description, ageRange
│   ├── schedule (day, time, location)
│   ├── image, content (portable text)
│
├── event
│   ├── title, slug, date, endDate
│   ├── location, description
│   ├── image, isHighlighted
│
├── news
│   ├── title, slug, publishedAt
│   ├── excerpt, content (portable text)
│   ├── image, author
│
├── teamMember
│   ├── name, role, bio
│   ├── image, email
│   ├── order (for sorting)
│
├── page (generic pages)
│   ├── title, slug
│   ├── content (portable text)
│
├── siteSettings (singleton)
│   ├── siteName, description
│   ├── contactEmail, phone, address
│   ├── socialLinks
│
Objects (reusable):
├── blockContent (portable text)
├── imageWithAlt
├── socialLink
```

---

## 8. Security Considerations

1. **Environment Variables**: Never expose API tokens to client (use `NEXT_PUBLIC_` prefix only for public values)
2. **Webhook Validation**: Always verify webhook signatures
3. **Form Validation**: Server-side validation, rate limiting, honeypot fields for spam
4. **CORS**: Configured automatically by Vercel
5. **Content Security Policy**: Consider adding CSP headers for embedded content

---

## 9. Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | ISR, image optimization, CDN caching |
| FID | < 100ms | Server Components reduce client JS |
| CLS | < 0.1 | Image dimensions, font loading |
| TTFB | < 200ms | Edge caching, efficient queries |

---

## Sources

### Official Documentation
- [Vercel Documentation - Next.js](https://vercel.com/docs/frameworks/nextjs)
- [Vercel ISR Documentation](https://vercel.com/docs/incremental-static-regeneration)
- [Vercel Image Optimization](https://vercel.com/docs/image-optimization)
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure)
- [Sanity + Next.js Integration](https://www.sanity.io/exchange/framework=nextjs)
- [Sanity Project Structure](https://www.sanity.io/docs/project-structure)
- [Resend + Next.js](https://resend.com/docs/send-with-nextjs)

### Architecture Guides
- [Best headless CMS for Next.js in 2026 - Naturaily](https://naturaily.com/blog/next-js-cms)
- [Next.js CMS - Top Headless CMS Choices - FocusReactive](https://focusreactive.com/nextjs-cms/)
- [Headless CMS for Business - Strapi](https://strapi.io/blog/headless-cms-for-business-best-practices-and-expert-tips)
- [Architecting a Headless CMS Frontend](https://istealersn.substack.com/p/architecting-a-headless-cms-frontend)

### Project Structure
- [Next.js Folder Structure Best Practices 2026 - CodeByDeep](https://www.codebydeep.com/blog/next-js-folder-structure-best-practices-for-scalable-applications-2026-guide)
- [Next.js App Router: Project Structure - MakerKit](https://makerkit.dev/blog/tutorials/nextjs-app-router-project-structure)
- [Next.js Architecture 2026 - YogiJS](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)
- [Sanity + Next.js Monorepo Structure](https://www.sanity.io/answers/the-best-directory-structure-to-use-for-next-js-and-sanity-projects)

### Email Integration
- [Next.js Send Email Tutorial 2026 - Mailtrap](https://mailtrap.io/blog/nextjs-send-email/)
- [Sending Emails in Next.js - Infyways](https://www.infyways.com/sending-emails-in-next-js-free/)
