# Claude Code: Site Rebrand Instructions

> **Quick-start prompt for Claude Code.** Copy the prompt below into Claude Code after dropping this `brand-package/` folder into your repo.

---

## Recommended Prompt to Give Claude Code

```
I'm rebranding timraysby.com to match a new brand identity I've developed.

Read brand-package/BRAND.md as the source of truth for all design decisions.
Reference brand-package/reference-landing-page.html for working component patterns.

Update the site to match this brand system:

1. Apply the color palette using the CSS variables defined in BRAND.md
2. Update typography to use Fraunces (display) + JetBrains Mono (body) from
   Google Fonts
3. Replace any existing logo with brand-package/logo/asterisk.svg
4. Update copy to match the voice and taglines in BRAND.md (no corporate
   speak, declarative headlines, italics for emphasis)
5. Apply the layout principles: dark backgrounds, generous spacing, sharp
   corners on CTAs, decorative corner registration marks where appropriate
6. Use the social banner images in brand-package/social-banners/ for any
   meta/og images
7. Use brand-package/photography/headshot-clean.png as the primary
   profile/about photo

Before making changes, read BRAND.md fully and tell me your plan. Don't
introduce colors, fonts, or design patterns not specified in the brand doc.

Work in small commits I can review.
```

---

## What's in This Package

| Path | Purpose |
|---|---|
| `BRAND.md` | The brand bible — colors, typography, voice, rules. Single source of truth. |
| `reference-landing-page.html` | A complete working HTML file demonstrating every brand pattern. Use as reference for component implementation. |
| `logo/asterisk.svg` | Standalone brand mark — drop this anywhere a logo is needed. |
| `logo/asterisk-on-dark.svg` | Brand mark with charcoal circle background — use for favicons or app icons. |
| `photography/headshot-clean.png` | Tim's headshot with no branding overlay. Use for About sections, hero areas. |
| `photography/headshot-with-badge.png` | Headshot with brand mark badge. Use for social meta tags. |
| `shirt-design/*.svg` | Apparel design files. Reference if site has a /shop section. |
| `social-banners/youtube_banner.jpg` | 2560×1440 banner |
| `social-banners/linkedin_banner.jpg` | 1584×396 banner |
| `social-banners/x_banner.jpg` | 1500×500 banner |

---

## Suggested Site Improvements (if you want Claude Code to expand scope)

After the basic rebrand, here are higher-value follow-up tasks:

### Phase 2: Performance & SEO

```
Following the brand update, optimize the site:

1. Self-host the Fraunces and JetBrains Mono fonts (use @font-face)
   instead of loading from Google Fonts CDN
2. Add Open Graph + Twitter Card meta tags using the social banners
   in brand-package/social-banners/ (linkedin_banner.jpg works well
   for og:image at 1584×396)
3. Add a favicon using brand-package/logo/asterisk.svg (browsers now
   support SVG favicons natively)
4. Compress all images with appropriate next-gen formats (.webp for
   photography, optimized .svg for graphics)
5. Add JSON-LD structured data for "Person" schema with my professional
   info
6. Lighthouse target: 95+ in all four categories (performance,
   accessibility, best practices, SEO)
```

### Phase 3: Component System

```
Extract the component patterns from brand-package/reference-landing-page.html
into reusable components. Specifically:

1. Hero with terminal prompt + italic emphasis headline
2. Section label with green accent line
3. Problem cards with [01] numbered prefix
4. Tier pricing cards with featured highlight variant
5. Process timeline with numbered green circles
6. FAQ accordion with + toggle
7. Final CTA with radial green glow

Build them as either CSS components, Vue/React components (depending
on framework), or static templates — match whatever the existing site
already uses.
```

### Phase 4: Content Sections

The site should eventually have these sections, each branded consistently:

- `/` — Hero, brief about, current focus, links to consulting and writing
- `/consulting` — Spark / Forge / Stack tier breakdown (the
  reference-landing-page.html is essentially this page)
- `/writing` — Blog or newsletter
- `/now` — What I'm currently working on
- `/about` — Long-form bio

---

## Common Pitfalls to Avoid

When Claude Code makes changes, watch for these:

1. **Adding default Tailwind colors** when you specifically want
   the brand palette. Stop the change if it does this.
2. **Using `border-radius: 8px`** or similar rounded corners on
   primary CTAs. Brand calls for sharp corners.
3. **Substituting Inter or Roboto** instead of Fraunces/JetBrains Mono
   when fonts fail to load. Force the brand fonts.
4. **Adding emoji for "personality"** in body copy. Brand voice is
   restrained. Emoji should be rare and intentional.
5. **Center-aligning body text**. Brand prefers left-aligned only.

If you spot any of these in a Claude Code change, tell it: "This
violates the BRAND.md rules. Re-read the brand doc and revise."

---

## Maintaining This Package

When you evolve the brand:

1. Update `BRAND.md` first with the new decision
2. Update `reference-landing-page.html` to demonstrate the new pattern
3. Re-export any affected assets (logos, banners, etc.)
4. Commit the brand-package changes alongside the site changes that
   reference them

This way, future-you (or future-Claude-Code) always has an authoritative
source for what the brand looks like at any given point.
