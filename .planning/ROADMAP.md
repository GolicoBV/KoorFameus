# Roadmap: KoorFameus Website

**Created:** 2026-02-02
**Depth:** Comprehensive (10 phases)
**Total Requirements:** 26

---

## Phase Overview

| # | Phase | Requirements | Focus |
|---|-------|--------------|-------|
| 1 | Project Foundation | 2 | Next.js + Tailwind + Vercel setup |
| 2 | CMS Integration | 3 | Sanity Studio + core schemas |
| 3 | Design System | 2 | Layout, navigation, visual design |
| 4 | Homepage | 2 | Hero, choir overview |
| 5 | Choir Pages | 3 | Three choir detail pages |
| 6 | Team Pages | 3 | Dirigenten, bestuur, team management |
| 7 | Events | 2 | Events page + CMS management |
| 8 | Media Gallery | 3 | Photo gallery with lightbox |
| 9 | Forms & Email | 5 | Contact, registration, Resend |
| 10 | Polish & Compliance | 5 | SEO, cookies, privacy, performance |

**Total mapped:** 26/26 requirements

---

## Phase Details

---

### Phase 1: Project Foundation

**Goal:** Establish the technical foundation with a deployed, working Next.js application on Vercel.

**Depends on:** Nothing

**Requirements:**
- TECH-01: Website is volledig mobile responsive
- TECH-05: Modern, fris visueel ontwerp

**Success Criteria:**
1. Bezoeker opent de website op mobiel en desktop; layout past zich correct aan
2. Ontwikkelaar pusht naar Git; Vercel bouwt en deployt automatisch binnen 3 minuten
3. Bezoeker ziet een placeholder pagina met moderne styling (Tailwind + shadcn/ui)

**Plans:**
1. Initialize Next.js 16 project with App Router and TypeScript
2. Configure Tailwind CSS v4 with custom color palette for KoorFameus
3. Install and configure shadcn/ui component library
4. Set up Vercel project and connect Git repository
5. Create responsive base layout structure (mobile-first)
6. Verify deployment pipeline works end-to-end

---

### Phase 2: CMS Integration

**Goal:** Integrate Sanity Studio so administrators can log in and manage content.

**Depends on:** Phase 1

**Requirements:**
- CMS-01: Meerdere beheerders kunnen inloggen in Sanity Studio
- CMS-04: Beheerders kunnen pagina content wijzigen
- CMS-05: Beheerders kunnen teamleden (dirigenten/bestuur) beheren

**Success Criteria:**
1. Beheerder navigeert naar /studio en logt in met Google/email
2. Beheerder ziet een overzichtelijk dashboard met content types
3. Beheerder kan basis tekst content aanmaken en opslaan
4. Tweede beheerder kan ook inloggen en dezelfde content zien

**Plans:**
1. Create Sanity project and configure dataset
2. Set up embedded Sanity Studio at /studio route
3. Create base document schemas (siteSettings, page)
4. Create teamMember schema (name, role, bio, image, order)
5. Configure Sanity client and GROQ query helpers
6. Add multiple team members to Sanity project with proper roles
7. Set up on-demand revalidation webhook

---

### Phase 3: Design System

**Goal:** Build the visual foundation with header, footer, and navigation that reflects KoorFameus brand identity.

**Depends on:** Phase 1, Phase 2

**Requirements:**
- TECH-02: Social media links in footer (Instagram, Facebook)
- TECH-05: Modern, fris visueel ontwerp (continued)

**Success Criteria:**
1. Bezoeker ziet header met logo en navigatie op elke pagina
2. Bezoeker ziet footer met social media iconen; klikken opent Instagram/Facebook
3. Bezoeker op mobiel ziet hamburger menu dat soepel opent/sluit
4. Beheerder kan social media links wijzigen in CMS

**Plans:**
1. Design and implement Header component with logo and navigation
2. Create responsive mobile navigation (hamburger menu)
3. Design and implement Footer component with social links
4. Add social media links to siteSettings schema
5. Implement active navigation state highlighting
6. Create consistent page container/wrapper component

---

### Phase 4: Homepage

**Goal:** Create an engaging homepage that introduces visitors to KoorFameus and guides them to the three choirs.

**Depends on:** Phase 3

**Requirements:**
- PAGE-01: Homepage met hero image en welkomstboodschap
- PAGE-02: Homepage toont overzicht van de drie koren met links

**Success Criteria:**
1. Bezoeker landt op homepage en ziet een aantrekkelijke hero met welkomstboodschap
2. Bezoeker scrolt en ziet drie koren met korte beschrijving en duidelijke links
3. Beheerder kan hero afbeelding en tekst wijzigen in CMS
4. Bezoeker klikt op een koor en wordt naar de juiste pagina geleid

**Plans:**
1. Create Hero component with image background and text overlay
2. Create homepage schema in Sanity (hero image, welcome text, choir highlights)
3. Build KoorCard component for choir overview
4. Implement homepage with hero + choir overview sections
5. Fetch and render CMS content on homepage
6. Add smooth scroll and hover animations

---

### Phase 5: Choir Pages

**Goal:** Create dedicated pages for Startkoor, Kinderkoor, and Jeugdkoor with all relevant information.

**Depends on:** Phase 4

**Requirements:**
- PAGE-03: Startkoor pagina met leeftijdsgroep, repetitietijden, beschrijving
- PAGE-04: Kinderkoor pagina met leeftijdsgroep, repetitietijden, beschrijving
- PAGE-05: Jeugdkoor pagina met leeftijdsgroep, repetitietijden, beschrijving

**Success Criteria:**
1. Bezoeker opent /koren/startkoor en ziet leeftijdsgroep, repetitietijden, beschrijving
2. Bezoeker ziet dezelfde structuur op kinderkoor en jeugdkoor paginas
3. Beheerder kan alle koor-informatie bewerken in CMS
4. Bezoeker kan makkelijk naar inschrijfformulier navigeren vanaf koorpagina

**Plans:**
1. Create koor document schema (title, slug, ageRange, schedule, description, image)
2. Build KoorDetail component with info sections
3. Create dynamic route /koren/[slug]/page.tsx
4. Add three koren to Sanity: Startkoor, Kinderkoor, Jeugdkoor
5. Implement schedule display component (day, time, location)
6. Add call-to-action to registration form on each page

---

### Phase 6: Team Pages

**Goal:** Create the "Wie zijn wij" page showing dirigenten and bestuur members.

**Depends on:** Phase 2, Phase 3

**Requirements:**
- PAGE-06: Wie zijn wij pagina met dirigenten (foto, naam, bio)
- PAGE-07: Wie zijn wij pagina met bestuur (naam, rol)
- CMS-05: Beheerders kunnen teamleden (dirigenten/bestuur) beheren

**Success Criteria:**
1. Bezoeker opent /wie-zijn-wij en ziet dirigenten met foto, naam, en bio
2. Bezoeker scrolt en ziet bestuursleden met naam en rol
3. Beheerder kan teamlid toevoegen met foto upload in Sanity
4. Beheerder kan volgorde van teamleden aanpassen

**Plans:**
1. Extend teamMember schema with type field (dirigent/bestuur)
2. Build TeamMemberCard component (foto, naam, rol/bio)
3. Create /wie-zijn-wij/page.tsx with sections for dirigenten and bestuur
4. Implement image optimization with Sanity image URLs
5. Add drag-and-drop ordering in Sanity Studio
6. Style bestuur section differently (smaller cards, no photo optional)

---

### Phase 7: Events

**Goal:** Create events page where visitors can see upcoming performances and activities.

**Depends on:** Phase 3

**Requirements:**
- PAGE-08: Evenementen pagina met aankomende events (datum, locatie, beschrijving)
- CMS-02: Beheerders kunnen events toevoegen, wijzigen, verwijderen

**Success Criteria:**
1. Bezoeker opent /evenementen en ziet aankomende events gesorteerd op datum
2. Bezoeker ziet datum, locatie, en beschrijving per event
3. Beheerder kan nieuw event toevoegen in Sanity
4. Beheerder kan bestaand event wijzigen of verwijderen
5. Verouderde events worden automatisch niet meer getoond (of onderaan)

**Plans:**
1. Create event document schema (title, date, endDate, location, description, image)
2. Build EventCard component with date badge
3. Create /evenementen/page.tsx with event listing
4. Implement GROQ query filtering for upcoming events
5. Add optional location display with Google Maps preview
6. Style past events differently or hide them

---

### Phase 8: Media Gallery

**Goal:** Create a photo gallery where visitors can browse and view photos in a lightbox.

**Depends on:** Phase 2, Phase 3

**Requirements:**
- MEDIA-01: Foto galerij pagina met grid weergave
- MEDIA-02: Foto's openen in lightbox bij klikken
- MEDIA-03: Alle foto's beheersbaar via CMS
- CMS-03: Beheerders kunnen foto's uploaden en beheren

**Success Criteria:**
1. Bezoeker opent /galerij en ziet foto's in een responsive grid
2. Bezoeker klikt op foto; foto opent in fullscreen lightbox met sluiten-knop
3. Bezoeker kan in lightbox naar volgende/vorige foto navigeren
4. Beheerder kan foto's uploaden via Sanity media library
5. Beheerder kan foto's organiseren in albums/categorien

**Plans:**
1. Create gallery and photo schemas in Sanity (album, photos array)
2. Build PhotoGrid component with responsive masonry/grid layout
3. Install and configure lightbox library (yet-another-react-lightbox or similar)
4. Create /galerij/page.tsx with album tabs/filters
5. Implement lazy loading for images
6. Add photo metadata (title, date, event link optional)

---

### Phase 9: Forms & Email

**Goal:** Implement contact and registration forms that send email notifications.

**Depends on:** Phase 3

**Requirements:**
- FORM-01: Contactformulier met velden: naam, email, bericht
- FORM-02: Contactformulier stuurt notificatie email naar info@koorfameus.be
- FORM-03: Inschrijfformulier voor nieuwe leden (kind info, ouder info, koor keuze)
- FORM-04: Inschrijfformulier stuurt notificatie email naar bestuur
- FORM-05: GDPR consent checkbox op alle formulieren (niet vooraf aangevinkt)

**Success Criteria:**
1. Bezoeker vult contactformulier in; ontvangt bevestiging na verzenden
2. info@koorfameus.be ontvangt email met naam, email, bericht
3. Bezoeker vult inschrijfformulier in met kind- en oudergegevens
4. Bestuur ontvangt inschrijving email met alle details
5. Beide formulieren hebben GDPR checkbox die verplicht aangevinkt moet worden
6. Formulieren tonen duidelijke foutmeldingen bij ongeldige invoer

**Plans:**
1. Set up Resend account and verify domain koorfameus.be
2. Create contact form with react-hook-form and Zod validation
3. Build /api/contact/route.ts API endpoint
4. Create email templates for contact notification
5. Build registration form with multi-step or sectioned layout
6. Create /api/inschrijven/route.ts API endpoint
7. Create email templates for registration notification
8. Add GDPR checkbox component (unchecked by default, required)
9. Implement honeypot field for spam protection

---

### Phase 10: Polish & Compliance

**Goal:** Finalize the website with SEO, cookie consent, privacy policy, and performance optimization.

**Depends on:** Phase 4, Phase 5, Phase 6, Phase 7, Phase 8, Phase 9

**Requirements:**
- PAGE-09: Privacy policy pagina met GDPR-conforme tekst
- TECH-03: Google Maps embed voor repetitielocatie
- TECH-04: Cookie consent banner bij eerste bezoek
- TECH-06: Website laadt binnen 3 seconden op mobiel
- TECH-07: SEO meta tags op alle pagina's

**Success Criteria:**
1. Bezoeker ziet cookie consent banner bij eerste bezoek; keuze wordt opgeslagen
2. Bezoeker opent /privacy en ziet volledige GDPR-conforme privacy policy
3. Bezoeker ziet Google Maps met repetitielocatie op relevante paginas
4. Google zoekresultaten tonen correcte titel en beschrijving per pagina
5. Lighthouse performance score is 90+ op mobiel
6. Lighthouse SEO score is 90+ op alle pagina's

**Plans:**
1. Install and configure cookie consent library (e.g., cookie-consent-banner)
2. Create /privacy/page.tsx with GDPR-compliant privacy policy content
3. Implement Google Maps embed component with consent check
4. Add generateMetadata function to all page routes
5. Create sitemap.xml and robots.txt
6. Run Lighthouse audit and optimize Core Web Vitals
7. Implement image lazy loading and optimize bundle size
8. Add structured data (JSON-LD) for organization and events
9. Test and verify 3-second mobile load time

---

## Progress

| Phase | Status | Requirements | Completed |
|-------|--------|--------------|-----------|
| 1. Project Foundation | Not Started | 2 | 0 |
| 2. CMS Integration | Not Started | 3 | 0 |
| 3. Design System | Not Started | 2 | 0 |
| 4. Homepage | Not Started | 2 | 0 |
| 5. Choir Pages | Not Started | 3 | 0 |
| 6. Team Pages | Not Started | 3 | 0 |
| 7. Events | Not Started | 2 | 0 |
| 8. Media Gallery | Not Started | 4 | 0 |
| 9. Forms & Email | Not Started | 5 | 0 |
| 10. Polish & Compliance | Not Started | 5 | 0 |

**Overall:** 0/26 requirements completed (0%)

---

## Requirement Coverage Validation

### Pages (9/9 mapped)
- PAGE-01 -> Phase 4 (Homepage)
- PAGE-02 -> Phase 4 (Homepage)
- PAGE-03 -> Phase 5 (Choir Pages)
- PAGE-04 -> Phase 5 (Choir Pages)
- PAGE-05 -> Phase 5 (Choir Pages)
- PAGE-06 -> Phase 6 (Team Pages)
- PAGE-07 -> Phase 6 (Team Pages)
- PAGE-08 -> Phase 7 (Events)
- PAGE-09 -> Phase 10 (Polish & Compliance)

### Media (3/3 mapped)
- MEDIA-01 -> Phase 8 (Media Gallery)
- MEDIA-02 -> Phase 8 (Media Gallery)
- MEDIA-03 -> Phase 8 (Media Gallery)

### Forms (5/5 mapped)
- FORM-01 -> Phase 9 (Forms & Email)
- FORM-02 -> Phase 9 (Forms & Email)
- FORM-03 -> Phase 9 (Forms & Email)
- FORM-04 -> Phase 9 (Forms & Email)
- FORM-05 -> Phase 9 (Forms & Email)

### CMS (5/5 mapped)
- CMS-01 -> Phase 2 (CMS Integration)
- CMS-02 -> Phase 7 (Events)
- CMS-03 -> Phase 8 (Media Gallery)
- CMS-04 -> Phase 2 (CMS Integration)
- CMS-05 -> Phase 2, Phase 6 (CMS Integration, Team Pages)

### Technical (7/7 mapped)
- TECH-01 -> Phase 1 (Project Foundation)
- TECH-02 -> Phase 3 (Design System)
- TECH-03 -> Phase 10 (Polish & Compliance)
- TECH-04 -> Phase 10 (Polish & Compliance)
- TECH-05 -> Phase 1, Phase 3 (Project Foundation, Design System)
- TECH-06 -> Phase 10 (Polish & Compliance)
- TECH-07 -> Phase 10 (Polish & Compliance)

**Coverage: 26/26 (100%)**

---

*Roadmap created: 2026-02-02*
*Last updated: 2026-02-02*
