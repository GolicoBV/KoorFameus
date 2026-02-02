# Research Summary: KoorFameus Website

**Project:** KoorFameus - Children's and Youth Choir Website
**Researched:** 2026-02-02
**Confidence:** High

---

## Key Findings

### Recommended Stack

| Technology | Purpose | Why |
|------------|---------|-----|
| **Next.js 16** | Framework | Turbopack, Server Components, excellent Vercel integration |
| **Sanity CMS** | Content management | 20 free user seats, real-time collaboration, visual editing |
| **Tailwind CSS v4** | Styling | Zero-config, modern CSS, works with shadcn/ui |
| **Resend** | Email | 3,000 emails/month free, React Email templates |
| **Cloudinary** | Media | 10GB storage free, automatic optimization |

**Total cost:** €0/month (all within free tiers)

---

### Table Stakes Features (Must Have)

1. Homepage with hero image and clear CTA
2. Choir pages (Startkoor, Kinderkoor, Jeugdkoor) with times, ages, info
3. Wie zijn wij (dirigenten, bestuur)
4. Events list/calendar
5. Contact page with working form
6. Photo gallery with lightbox
7. Mobile responsive design
8. Social media links (Instagram, Facebook)
9. Privacy policy (GDPR)
10. Cookie consent banner

### Differentiators (v1.x)

- News/blog section
- Video embeds (YouTube)
- Online member registration form
- Newsletter signup
- Interactive events calendar with add-to-calendar

### Out of Scope

- Member portal with login
- Online payments
- Multilingual (NL/FR)
- Self-hosted video
- Real-time chat/forum

---

### Critical Pitfalls to Avoid

1. **Contact form email delivery** — Use Resend, not PHP mail. Test monthly.
2. **Non-technical editors struggling** — Sanity has learning curve. Create content guide.
3. **Preview confusion** — Clear visual distinction between staging/production.
4. **Image gallery performance** — Lazy load, optimize, use Cloudinary.
5. **GDPR compliance** — Unchecked consent boxes, link to privacy policy.

---

### Architecture Summary

```
Editors → Sanity CMS → Webhook → Next.js (Vercel) → CDN → Visitors
                                      ↓
                               Resend (email)
```

**Key patterns:**
- Server Components for data fetching (no client JS bloat)
- ISR for content freshness (revalidate on publish)
- Embedded Sanity Studio at /studio
- API routes for form handling

---

### Project Structure

```
koorfameus/
├── app/
│   ├── (site)/           # Public pages
│   │   ├── page.tsx      # Homepage
│   │   ├── koren/        # Choir pages
│   │   ├── evenementen/  # Events
│   │   ├── nieuws/       # News
│   │   ├── gallerij/     # Gallery
│   │   ├── contact/      # Contact form
│   │   └── inschrijven/  # Registration
│   ├── studio/           # Sanity CMS admin
│   └── api/              # Form handlers
├── components/           # UI components
├── lib/sanity/          # CMS integration
└── sanity/schemas/      # Content models
```

---

### Content Model (Sanity Schemas)

| Schema | Fields |
|--------|--------|
| **koor** | title, slug, description, ageRange, schedule, image |
| **event** | title, date, location, description, image |
| **news** | title, publishedAt, excerpt, content, image |
| **teamMember** | name, role, bio, image |
| **siteSettings** | contactEmail, phone, address, socialLinks |

---

### Success Metrics

- Page load < 3s on mobile
- Contact form works and sends email
- All content editable by non-technical users
- 90+ PageSpeed score
- GDPR compliant

---

*Research complete. Ready for requirements definition.*
