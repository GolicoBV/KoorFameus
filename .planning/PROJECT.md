# KoorFameus Website

## What This Is

Een moderne website voor KoorFameus, het kinder- en jeugdkoor uit Landen. Vervangt de huidige Google Sites met een frisse look en uitgebreide functionaliteit voor eventbeheer, nieuws, en ledeninschrijving. Meerdere bestuursleden kunnen zelfstandig content beheren.

## Core Value

Bezoekers kunnen snel informatie vinden over de koren en zich eenvoudig inschrijven of contact opnemen.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Homepage met welkomstboodschap en overzicht
- [ ] Pagina's voor de drie koren (Startkoor, Kinderkoor, Jeugdkoor)
- [ ] Wie zijn wij pagina (dirigenten en bestuur)
- [ ] Evenementenkalender met beheermogelijkheid
- [ ] Nieuwsberichten/blog
- [ ] Foto- en videogalerij
- [ ] Contactformulier dat mail stuurt naar info@koorfameus.be
- [ ] Inschrijfformulier nieuwe leden dat mail stuurt
- [ ] CMS waar meerdere beheerders content kunnen toevoegen
- [ ] Moderne, frisse visuele uitstraling

### Out of Scope

- Online betalen/lidgeld — niet nodig voor v1
- Ledenportaal met login — te complex voor nu
- Aanmelden/inschrijven voor events — mail is voldoende
- Webshop/merchandise — geen behoefte

## Context

**Huidige situatie:**
- Bestaande website op Google Sites: https://sites.google.com/view/koorfameus/home
- Koor bestaat sinds 1994, in 2016 hernoemd naar Fameus
- Drie leeftijdsgroepen: Startkoor, Kinderkoor, Jeugdkoor
- Email: info@koorfameus.be
- Actief op Instagram en Facebook

**Doelgroep:**
- Ouders die een koor zoeken voor hun kinderen
- Huidige leden en ouders die info zoeken over events
- Geïnteresseerden die willen weten wat Fameus is

**Beheer:**
- Meerdere bestuursleden moeten zelfstandig content kunnen toevoegen
- Geen technische kennis vereist voor dagelijks beheer

## Constraints

- **Platform**: Vercel + headless CMS — moderne stack, gratis hosting, multi-user
- **Beheer**: Moet gebruiksvriendelijk zijn voor niet-technische beheerders
- **Kosten**: Liefst binnen gratis tier (Vercel free, CMS free tier)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Vercel + headless CMS i.p.v. Jimdo | Jimdo ondersteunt geen custom code uploads; Vercel is gratis en modern | — Pending |
| Forms sturen email i.p.v. database | Simpeler beheer, geen extra systemen nodig | — Pending |

---
*Last updated: 2026-02-02 after initialization*
