# Technology Stack Research: Community/Choir Website with CMS

**Domain:** Small organization website with CMS (choir/community)
**Project:** KoorFameus - Children's and Youth Choir, Landen, Belgium
**Researched:** 2026-02-02
**Confidence Level:** High (based on current stable releases and industry best practices)

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Next.js** | 16.1 | React framework | Latest stable (Dec 2025). Turbopack default bundler with 5-10x faster builds. React Compiler stable. App Router with Server Components. Excellent Vercel integration. |
| **React** | 19.x | UI library | Bundled with Next.js 16. Server Components, improved performance, concurrent features. |
| **TypeScript** | 5.5+ | Type safety | Industry standard. Better DX, fewer runtime errors, excellent IDE support. |
| **Tailwind CSS** | 4.0 | Styling | Zero-config CSS-first setup. 5x faster builds. Modern CSS features (cascade layers, @property). No tailwind.config.js needed. |
| **Sanity** | Latest | Headless CMS | 20 free user seats (best for multiple content managers). Real-time collaboration. Excellent Next.js integration. Generous free tier. |
| **Resend** | Latest | Email service | 3,000 emails/month free. React Email integration. Simple API. Perfect for contact/registration forms. |

### Supporting Libraries

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| **shadcn/ui** | Latest | UI components | Copy-paste components. Built on Radix UI. Fully customizable. Works with Tailwind v4. |
| **React Hook Form** | 7.x | Form handling | Performant, minimal re-renders. TypeScript support. |
| **Zod** | 3.x | Schema validation | TypeScript-first. Works with React Hook Form via @hookform/resolvers. |
| **@hookform/resolvers** | Latest | Form validation bridge | Connects Zod schemas to React Hook Form. |
| **React Email** | Latest | Email templates | React components for emails. Pairs with Resend. |
| **next-cloudinary** | Latest | Image/video handling | 10GB storage, 20GB bandwidth free. Automatic optimization. CDN delivery. |
| **Framer Motion** | 12.x | Animations | Industry standard. Smooth animations. Layout animations. Gesture support. |
| **Lucide React** | 0.562+ | Icons | 1,600+ icons. Tree-shakable. MIT licensed. Used by shadcn/ui. |
| **date-fns** | 4.x | Date utilities | Time zone support. Tree-shakable. 200+ functions. Immutable. |
| **@sanity/image-url** | Latest | Sanity image URLs | Generate optimized image URLs from Sanity assets. |

---

## CMS Recommendation: Sanity

### Why Sanity over Storyblok for this project:

| Factor | Sanity | Storyblok |
|--------|--------|-----------|
| **Free tier users** | 20 seats | 10 team members |
| **Visual editor** | Sanity Studio (customizable) | Built-in visual editor |
| **Learning curve** | Moderate (schema-based) | Lower (drag-and-drop) |
| **Flexibility** | Highly customizable | More opinionated |
| **Best for** | Developer-defined content models | Marketing teams |

**Recommendation:** For KoorFameus with multiple non-technical content managers, **Sanity** wins because:
1. **20 free user seats** vs Storyblok's 10 - crucial for choir committees
2. Real-time collaboration for multiple editors
3. Customizable Studio tailored to choir content (events, news, photos)
4. No vendor lock-in - portable content
5. Excellent documentation and community

**Note:** Sanity has a steeper initial learning curve than Storyblok, but once the Studio is configured by a developer, non-technical users find it intuitive. The Visual Editing feature (Presentation tool) provides preview capabilities similar to Storyblok.

---

## Form Handling Strategy

### Architecture
```
User Form -> React Hook Form + Zod -> Server Action -> Resend API -> Email
```

### Contact Form Flow
1. shadcn/ui Form components with React Hook Form
2. Zod schema validation (client + server)
3. Next.js Server Action handles submission
4. Resend sends notification email to choir admin
5. Optional: Store submission in Sanity for records

### Member Registration Flow
1. Multi-step form with React Hook Form
2. Zod validation for each step
3. Server Action processes registration
4. Resend sends confirmation to parent/guardian
5. Resend sends notification to choir administrator
6. Store registration data in Sanity

### Email Templates
Use React Email to create branded email templates:
- Contact form confirmation
- Registration confirmation
- Event reminders (future feature)

---

## Image & Video Handling

### Strategy: Dual Approach

**Option A: Cloudinary (Recommended for galleries)**
- 10GB storage, 20GB bandwidth free
- Automatic format optimization (WebP, AVIF)
- On-the-fly transformations
- Video support up to 100MB per file
- CDN delivery

**Option B: Sanity Assets (Recommended for CMS content)**
- Images managed directly in Sanity
- Use @sanity/image-url for optimized URLs
- Better for content-managed images (news posts, events)
- Stays within CMS workflow

### Recommended Approach
- **Gallery photos/videos:** Cloudinary (better for bulk media, transformations)
- **Content images:** Sanity assets (simpler workflow for content editors)
- **Both:** Use next/image with appropriate loader

---

## Styling Architecture

### Tailwind CSS v4 Setup
```css
/* app/globals.css */
@import 'tailwindcss';
```

No configuration file needed. Customizations done in CSS:
```css
@theme {
  --color-primary: #your-color;
  --font-sans: 'Inter', sans-serif;
}
```

### Component Strategy
1. **shadcn/ui** for complex components (forms, dialogs, navigation)
2. **Tailwind utilities** for layout and spacing
3. **CSS variables** for theming (light/dark mode)
4. **Framer Motion** for entrance animations and page transitions

---

## Installation Commands

### Initial Setup
```bash
# Create Next.js 16 project with TypeScript and Tailwind
npx create-next-app@latest koorfameus --typescript --tailwind --eslint --app --src-dir

cd koorfameus

# Install Tailwind CSS v4 (if not included by create-next-app)
pnpm add -D tailwindcss @tailwindcss/postcss

# Initialize shadcn/ui
pnpm dlx shadcn-ui@latest init

# Add shadcn components
pnpm dlx shadcn-ui@latest add button card form input textarea dialog navigation-menu
```

### CMS & Content
```bash
# Sanity CMS
pnpm add @sanity/client @sanity/image-url next-sanity
pnpm add -D sanity

# Initialize Sanity Studio (in project)
npx sanity@latest init --env
```

### Forms & Email
```bash
# Form handling
pnpm add react-hook-form @hookform/resolvers zod

# Email
pnpm add resend @react-email/components
```

### Media & UI
```bash
# Image optimization
pnpm add next-cloudinary

# Animations & Icons
pnpm add framer-motion lucide-react

# Date utilities
pnpm add date-fns
```

### All Dependencies (Single Command)
```bash
pnpm add @sanity/client @sanity/image-url next-sanity react-hook-form @hookform/resolvers zod resend @react-email/components next-cloudinary framer-motion lucide-react date-fns

pnpm add -D sanity tailwindcss @tailwindcss/postcss
```

---

## Environment Variables

```env
# .env.local

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Resend
RESEND_API_KEY=re_your_api_key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Site
NEXT_PUBLIC_SITE_URL=https://koorfameus.be
```

---

## Alternatives Considered

### CMS Alternatives

| CMS | Verdict | Reason |
|-----|---------|--------|
| **Storyblok** | Good alternative | Better visual editor, but only 10 free seats vs Sanity's 20 |
| **Contentful** | Not recommended | Expensive, limited free tier (5 users) |
| **Strapi** | Not recommended | Self-hosted complexity, requires server management |
| **Payload CMS** | Good alternative | Self-hosted but powerful. Requires more setup. |
| **Directus** | Not recommended | More suited for data management than content editing |

### Email Alternatives

| Service | Verdict | Reason |
|---------|---------|--------|
| **SendGrid** | Good alternative | 100 emails/day free. More complex setup. |
| **Mailgun** | Not recommended | No free tier for new accounts |
| **AWS SES** | Not recommended | Complex setup, requires AWS account |
| **Nodemailer + SMTP** | Fallback option | Free but less reliable deliverability |

### Styling Alternatives

| Approach | Verdict | Reason |
|----------|---------|--------|
| **CSS Modules** | Not recommended | More boilerplate, less utility-first benefits |
| **Styled Components** | Not recommended | Runtime CSS-in-JS, performance overhead |
| **Vanilla Extract** | Good alternative | Type-safe CSS, but more complex setup |

---

## What NOT to Use

| Technology | Reason |
|------------|--------|
| **WordPress** | Monolithic, security concerns, not headless-first |
| **Wix/Squarespace** | Limited customization, vendor lock-in |
| **jQuery** | Outdated, React handles DOM manipulation |
| **Bootstrap** | Conflicts with Tailwind philosophy |
| **Moment.js** | Deprecated, use date-fns instead |
| **Create React App** | Deprecated in favor of Next.js/Vite |
| **Pages Router** | Use App Router for new Next.js projects |
| **Tailwind v3** | v4 is stable and recommended for new projects |
| **Self-hosted email** | Deliverability issues, maintenance burden |
| **Firebase** | Overkill for this use case, vendor lock-in |

---

## Free Tier Summary

| Service | Free Tier Limits | Sufficient for KoorFameus? |
|---------|------------------|---------------------------|
| **Vercel** | 100GB bandwidth, unlimited deployments | Yes |
| **Sanity** | 20 users, document limits, 10GB bandwidth | Yes |
| **Resend** | 3,000 emails/month, 100/day | Yes |
| **Cloudinary** | 10GB storage, 20GB bandwidth | Yes |

**Estimated monthly cost:** $0 (within free tiers)

---

## Project Structure

```
koorfameus/
├── src/
│   ├── app/
│   │   ├── (site)/           # Public pages
│   │   │   ├── page.tsx      # Homepage
│   │   │   ├── evenementen/  # Events
│   │   │   ├── nieuws/       # News
│   │   │   ├── gallerij/     # Gallery
│   │   │   ├── contact/      # Contact form
│   │   │   └── inschrijven/  # Registration
│   │   ├── studio/[[...tool]]/ # Sanity Studio
│   │   └── api/
│   │       └── send/         # Email API route
│   ├── components/
│   │   ├── ui/               # shadcn components
│   │   ├── forms/            # Form components
│   │   └── layout/           # Header, Footer, Nav
│   ├── lib/
│   │   ├── sanity/           # Sanity client & queries
│   │   └── utils.ts          # Utilities
│   ├── emails/               # React Email templates
│   └── sanity/
│       ├── schemas/          # Content schemas
│       └── sanity.config.ts
├── public/
├── .env.local
└── package.json
```

---

## Sources

### Next.js
- [Next.js 16.1 Release](https://nextjs.org/blog/next-16-1)
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Security Update December 2025](https://nextjs.org/blog/security-update-2025-12-11)

### CMS Comparison
- [Sanity vs Storyblok Comparison - Webstacks](https://www.webstacks.com/blog/sanity-vs-storyblok)
- [Storyblok vs Sanity - SelectHub](https://www.selecthub.com/headless-cms-platforms/storyblok-vs-sanity-io/)
- [Best Headless CMS 2025 - G2](https://www.g2.com/categories/headless-cms/free)
- [Sanity Pricing](https://www.sanity.io/pricing)
- [Storyblok Pricing](https://www.storyblok.com/pricing)

### Email & Forms
- [Resend + Next.js Documentation](https://resend.com/docs/send-with-nextjs)
- [Resend Pricing](https://resend.com/pricing)
- [React Hook Form with Zod](https://ui.shadcn.com/docs/forms/react-hook-form)

### Styling & UI
- [Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Next.js Tailwind Guide](https://nextjs.org/docs/app/getting-started/css)

### Media
- [Next Cloudinary](https://next.cloudinary.dev/)
- [Cloudinary Pricing](https://cloudinary.com/pricing)

### Libraries
- [Framer Motion](https://motion.dev/)
- [Lucide Icons](https://lucide.dev/)
- [date-fns v4.0](https://blog.date-fns.org/v40-with-time-zone-support/)
