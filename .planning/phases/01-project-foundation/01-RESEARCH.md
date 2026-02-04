# Phase 1 Research: Project Foundation

**Researched:** 2026-02-02
**Confidence:** High

## Key Findings

### Next.js 16 Setup

Next.js 16 was released with significant improvements over Next.js 15. Key features relevant to this project:

**Current Best Practices:**
```bash
npx create-next-app@latest koorfameus --typescript --tailwind --eslint --app
```

The `create-next-app` CLI automatically configures:
- TypeScript support
- Tailwind CSS v4 (CSS-first configuration)
- ESLint
- App Router (recommended)
- Turbopack as default bundler

**Key Next.js 16 Changes:**
1. **Turbopack is now the default bundler** - 5-10x faster Fast Refresh, 2-5x faster builds
2. **Filesystem caching in dev mode** - Stores compiler artifacts on disk for faster subsequent runs
3. **React 19.2 integration** - Includes View Transitions, useEffectEvent
4. **React Compiler (stable)** - Automatic memoization, reducing unnecessary re-renders
5. **Async Request APIs required** - `cookies()`, `headers()`, and `params` must be accessed asynchronously
6. **New caching model** - `use cache` directive for explicit opt-in caching (replaces old implicit caching)

**Project Structure (App Router):**
```
koorfameus/
├── app/
│   ├── layout.tsx      # Root layout (required)
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles + Tailwind
├── components/
│   └── ui/             # shadcn/ui components
├── lib/
│   └── utils.ts        # Utility functions (cn helper)
├── public/             # Static assets
├── next.config.ts      # TypeScript config (recommended)
└── package.json
```

**TypeScript Configuration (next.config.ts):**
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Turbopack is default, no config needed
  // Optional: Enable filesystem caching for even faster dev
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}

export default nextConfig
```

---

### Tailwind CSS v4 Configuration

Tailwind CSS v4.0 (released January 2025) introduces a **CSS-first configuration** approach, eliminating the need for `tailwind.config.js` in most cases.

**Key Changes from v3:**
- All configuration happens in CSS via `@theme` blocks
- Design tokens become CSS custom properties at build-time
- Zero-config mode - no JavaScript config file needed
- First-class CSS variable support

**Custom Color Setup for KoorFameus:**
```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* KoorFameus Brand Colors */
  --color-coral: #F3504C;
  --color-coral-dark: #D34153;
  --color-text: #1F1F1F;
  --color-background: #FFFFFF;
  --color-section: #F4F4F4;

  /* Optional: Create a full coral palette for flexibility */
  --color-coral-50: oklch(97% 0.02 25);
  --color-coral-100: oklch(94% 0.04 25);
  --color-coral-200: oklch(88% 0.08 25);
  --color-coral-300: oklch(80% 0.12 25);
  --color-coral-400: oklch(72% 0.16 25);
  --color-coral-500: #F3504C;  /* Primary accent */
  --color-coral-600: #D34153;  /* Hover state */
  --color-coral-700: oklch(50% 0.16 25);
  --color-coral-800: oklch(40% 0.14 25);
  --color-coral-900: oklch(30% 0.10 25);

  /* Typography */
  --font-sans: var(--font-geist-sans);
}
```

**Usage in Components:**
```tsx
// These utilities are now available:
<button className="bg-coral hover:bg-coral-dark text-white">
  Join Koor Fameus
</button>

<section className="bg-section">
  <p className="text-text">Welcome!</p>
</section>
```

**Dark Mode (if needed later):**
```css
@custom-variant dark (&:where(.dark, .dark *));
```

---

### shadcn/ui Setup

**Installation Process for Next.js 16:**
```bash
# After creating Next.js project
cd koorfameus
npx shadcn@latest init
```

The CLI will prompt for:
1. Style preference (Default/New York) - **Recommend: Default**
2. Base color (Slate/Gray/Zinc/Neutral/Stone) - **Recommend: Neutral** (pairs well with coral accent)
3. CSS variables usage - **Yes**

**What Gets Created:**
- `components.json` - CLI configuration
- `lib/utils.ts` - Contains `cn()` function for merging Tailwind classes
- `components/ui/` - Directory for components

**Essential Components for Phase 1 (Placeholder Page):**
```bash
# Install only what's needed initially
npx shadcn@latest add button
npx shadcn@latest add card
```

**Recommended Initial Components for Full Project:**
```bash
# Core UI elements
npx shadcn@latest add button card badge separator

# Navigation & Layout
npx shadcn@latest add navigation-menu sheet

# Forms (for contact later)
npx shadcn@latest add input textarea label

# Feedback
npx shadcn@latest add toast
```

**Important Notes:**
- Components are copied to your codebase (not installed as dependency)
- Full ownership - modify freely
- Server Components work out of the box for non-interactive components
- Interactive components (Dialog, Sheet) auto-include "use client"

**React 19 Compatibility:**
With npm, use `--legacy-peer-deps` if peer dependency warnings occur:
```bash
npx shadcn@latest add button --legacy-peer-deps
```
Or use pnpm/yarn/bun which handle this automatically.

---

### Font Recommendation

**Recommendation: Geist Sans**

**Rationale:**
1. **Native Next.js integration** - Created by Vercel, optimized for Next.js apps
2. **npm installable** - `npm install geist` for seamless integration
3. **Modern aesthetic** - Slightly softer than Inter, fits "energiek & speels" vibe
4. **Excellent readability** - High x-height, clear letterforms
5. **Variable font support** - Single file, smooth weight transitions
6. **Future-proof** - Maintained by Vercel, used in their own products

**Comparison Summary:**
| Font | Pros | Cons for KoorFameus |
|------|------|---------------------|
| Inter | Industry standard, battle-tested | Can feel corporate/sterile |
| Geist | Modern, playful, Next.js native | Newer, less documentation |
| DM Sans | Friendly, geometric | More casual, may not scale as well |

**Setup in Next.js 16:**
```tsx
// app/layout.tsx
import { Geist } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={geist.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
```

**Tailwind Integration:**
```css
/* globals.css */
@theme {
  --font-sans: var(--font-geist-sans);
}
```

---

### Vercel Deployment

**Git Integration Setup:**

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Next.js 16 with Tailwind v4 and shadcn/ui"
git branch -M main
git remote add origin https://github.com/[username]/koorfameus.git
git push -u origin main
```

2. **Vercel Import:**
- Go to vercel.com → "Add New Project"
- Select GitHub repository
- Vercel auto-detects Next.js settings
- Click "Deploy"

**Automatic Deployments:**
- Every push to `main` → Production deployment
- Every push to other branches → Preview deployment
- Build typically completes in 1-2 minutes for new projects

**Environment Variables (if needed):**
- Add in Vercel Dashboard → Project Settings → Environment Variables
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Variables are encrypted at rest

**Build Configuration:**
No custom configuration needed - Vercel auto-detects:
- Framework: Next.js
- Build Command: `next build`
- Output Directory: `.next`
- Install Command: `npm install` (or pnpm/yarn)

**Success Criteria Check:**
- Build under 3 minutes for fresh project
- Automatic HTTPS
- Global CDN distribution
- Preview URLs for each PR

---

### Mobile-First Strategy

**Tailwind's Mobile-First Approach:**
- Unprefixed utilities apply to ALL screen sizes (mobile baseline)
- Prefixed utilities (`sm:`, `md:`, etc.) apply at that breakpoint AND ABOVE

**Default Breakpoints:**
| Prefix | Min Width | Target Devices |
|--------|-----------|----------------|
| (none) | 0px | Mobile phones |
| sm | 640px | Large phones, small tablets |
| md | 768px | Tablets |
| lg | 1024px | Laptops, desktops |
| xl | 1280px | Large desktops |
| 2xl | 1536px | Extra large screens |

**Strategy for KoorFameus:**
```tsx
// Example: Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {/* Cards */}
</div>

// Example: Responsive padding
<section className="px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:py-16">
  {/* Content */}
</section>

// Example: Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Welkom bij Koor Fameus
</h1>
```

**Key Principles:**
1. **Start with mobile layout** - Write base styles first
2. **Enhance for larger screens** - Add breakpoint prefixes to expand
3. **Test on real devices** - Use browser dev tools AND actual phones
4. **Consider touch targets** - Minimum 44x44px for buttons on mobile

**Custom Breakpoint (if needed):**
```css
@theme {
  --breakpoint-xs: 480px;  /* Very small phones */
}
```

---

## Recommended Approach

### Phase 1 Implementation Steps:

1. **Create Next.js 16 Project**
   ```bash
   npx create-next-app@latest koorfameus --typescript --tailwind --eslint --app
   cd koorfameus
   ```

2. **Initialize shadcn/ui**
   ```bash
   npx shadcn@latest init
   # Choose: Default style, Neutral base color, CSS variables: Yes
   npx shadcn@latest add button card
   ```

3. **Configure Custom Theme (globals.css)**
   - Add KoorFameus color palette via `@theme`
   - Set Geist as font-sans
   - Define base styles

4. **Set Up Root Layout**
   - Configure Geist font with CSS variable
   - Add `lang="nl"` for Dutch
   - Include antialiased text rendering

5. **Create Placeholder Page**
   - Responsive hero section
   - Use coral brand colors
   - Include shadcn/ui Button component
   - Mobile-first responsive design

6. **Push to GitHub**
   - Initialize git
   - Create repository
   - Push initial commit

7. **Deploy to Vercel**
   - Import from GitHub
   - Verify automatic deployment
   - Test on mobile and desktop

### Design Token Values (Claude's Discretion):

**Spacing/Padding:**
- Section padding: `py-12 md:py-16 lg:py-20` (48px → 64px → 80px)
- Container padding: `px-4 md:px-6 lg:px-8` (16px → 24px → 32px)
- Component gaps: `gap-4` (16px) or `gap-6` (24px)

**Border Radius ("licht afgerond"):**
- Small elements (badges): `rounded-md` (6px)
- Buttons: `rounded-lg` (8px)
- Cards: `rounded-xl` (12px)
- Large containers: `rounded-2xl` (16px)

**Shadows (subtle):**
- Cards: `shadow-sm` or `shadow`
- Hover state: `hover:shadow-md`
- No heavy drop shadows

**Transitions ("smooth"):**
- Default: `transition-all duration-200`
- Hover effects: `transition-colors duration-150`
- Page elements: `transition-transform duration-300`

---

## Pitfalls to Avoid

### Technical Pitfalls:

1. **Don't use tailwind.config.js with v4**
   - Tailwind v4 uses CSS-first configuration
   - All customization goes in `@theme` blocks in CSS
   - Old JavaScript config will be ignored

2. **Async APIs in Next.js 16**
   - `cookies()`, `headers()`, and `params` MUST be awaited
   - Old synchronous patterns will throw errors
   ```tsx
   // Wrong
   const params = useParams()

   // Correct
   const params = await props.params
   ```

3. **React 19 peer dependency issues**
   - With npm, use `--legacy-peer-deps` flag
   - Or switch to pnpm/yarn/bun

4. **Font loading flash**
   - Always use `display: 'swap'` in font configuration
   - Prevents invisible text during load

5. **Mobile-first confusion**
   - Unprefixed = mobile baseline (NOT desktop default)
   - `sm:` means "small screens and UP" not "only small screens"

### Design Pitfalls:

6. **Inconsistent spacing**
   - Stick to Tailwind's spacing scale (4, 6, 8, 12, 16, etc.)
   - Don't use arbitrary values unless necessary

7. **Over-animating**
   - Keep transitions subtle (150-300ms)
   - Don't animate everything - focus on interactive elements

8. **Coral color accessibility**
   - #F3504C on white has ~3.5:1 contrast ratio
   - Use for large text/buttons, not small body text
   - Always test with accessibility tools

9. **Forgetting touch targets**
   - Mobile buttons should be minimum 44x44px
   - Add padding to make small icons tappable

10. **Not testing on real devices**
    - Browser dev tools don't catch everything
    - Test on actual iOS and Android devices

---

## Sources

- [Next.js 16 Release Blog](https://nextjs.org/blog/next-16)
- [Next.js Installation Guide](https://nextjs.org/docs/app/getting-started/installation)
- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS Colors Documentation](https://tailwindcss.com/docs/colors)
- [shadcn/ui Next.js Installation](https://ui.shadcn.com/docs/installation/next)
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)
- [Tailwind Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Vercel Deployment Guide](https://vercel.com/docs/environment-variables)
