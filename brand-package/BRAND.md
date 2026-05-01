# Tim Raysby — Brand Reference

> **For Claude Code:** This document is the source of truth for all brand decisions. When updating `timraysby.com`, reference this file for colors, typography, copy, and asset paths. Do not invent new brand decisions — if something isn't covered here, ask.

---

## Brand Identity

**Owner:** Timothy William Raysby
**Domain:** timraysby.com
**Primary positioning:** Intent-driven engineer. AI orchestrator. Problem solver.
**Audience:** Self-hosted AI builders, indie founders, real estate agents, small-business operators
**Tone:** Confident operator. Editorial. Terminal-first. Hormozi-adjacent — declarative, restrained, no fluff.

---

## Color Palette

The brand uses a charcoal-and-green system. Use these exact hex values throughout the site. CSS variables strongly recommended.

| Name | Hex | RGB | Usage |
|---|---|---|---|
| **Nexus Green** | `#4FBF7B` | 79, 191, 123 | Primary accent, CTAs, brand mark, links, active states |
| **Deep Shade** | `#2A7A4A` | 42, 122, 74 | Stroke outlines on green elements, hover states |
| **Charcoal** | `#0F1110` | 15, 17, 16 | Primary background |
| **Charcoal Light** | `#1A1D1A` | 26, 29, 26 | Card backgrounds, elevated surfaces |
| **Charcoal Lighter** | `#252825` | 37, 40, 37 | Borders, dividers |
| **Ink** | `#E8EDE8` | 232, 237, 232 | Primary body text on dark backgrounds |
| **Ink Dim** | `#8A938A` | 138, 147, 138 | Secondary text, captions |
| **Ink Dimmer** | `#565A56` | 86, 90, 86 | Tertiary text, disabled states |

### CSS Variable Reference (paste into stylesheet)

```css
:root {
  --green: #4FBF7B;
  --green-deep: #2A7A4A;
  --green-glow: rgba(79, 191, 123, 0.15);
  --charcoal: #0F1110;
  --charcoal-light: #1A1D1A;
  --charcoal-lighter: #252825;
  --ink: #E8EDE8;
  --ink-dim: #8A938A;
  --ink-dimmer: #565A56;
}
```

---

## Typography

The brand uses two typefaces in pairing. Both are free, both load via Google Fonts.

### Primary Display: Fraunces
- **Use for:** Headlines, hero text, section titles, name in branding
- **Weight range:** 300 (light) to 900 (black). Italic available.
- **Character:** Variable serif with personality. Italic cuts have notable expression.
- **Google Fonts:** `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,500&display=swap`

### Secondary Mono: JetBrains Mono
- **Use for:** Body text, taglines, code, terminal-style elements, button labels, metadata, navigation
- **Weight range:** 300 to 700
- **Character:** Developer-coded monospace. Reads as technical and considered.
- **Google Fonts:** `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap`

### CSS Font Stack

```css
:root {
  --serif: 'Fraunces', 'Times New Roman', serif;
  --mono: 'JetBrains Mono', 'Menlo', 'Consolas', monospace;
}

body {
  font-family: var(--mono);
  font-size: 15px;
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: var(--serif);
  font-weight: 400;
  letter-spacing: -0.02em;
}
```

---

## Brand Mark — The Six-Point Asterisk

The primary brand mark is a stylized six-point "node burst" asterisk in Nexus Green. NOT a snowflake. NOT Claude's four-point asterisk. Six petals radiating from a hexagonal center with a tiny dot.

**SVG embed code (use anywhere a logo is needed):**

```html
<svg viewBox="-30 -30 60 60" xmlns="http://www.w3.org/2000/svg" aria-label="Tim Raysby">
  <g fill="#4FBF7B">
    <path d="M 0 -4 L 4 -24 L 0 -28 L -4 -24 Z"/>
    <g transform="rotate(60)"><path d="M 0 -4 L 4 -24 L 0 -28 L -4 -24 Z"/></g>
    <g transform="rotate(120)"><path d="M 0 -4 L 4 -24 L 0 -28 L -4 -24 Z"/></g>
    <g transform="rotate(180)"><path d="M 0 -4 L 4 -24 L 0 -28 L -4 -24 Z"/></g>
    <g transform="rotate(240)"><path d="M 0 -4 L 4 -24 L 0 -28 L -4 -24 Z"/></g>
    <g transform="rotate(300)"><path d="M 0 -4 L 4 -24 L 0 -28 L -4 -24 Z"/></g>
  </g>
  <!-- Center hexagon outline -->
  <polygon points="0,-2.5 2.17,-1.25 2.17,1.25 0,2.5 -2.17,1.25 -2.17,-1.25"
           fill="none" stroke="#4FBF7B" stroke-width="0.6"/>
  <!-- Center dot -->
  <circle cx="0" cy="0" r="0.5" fill="#4FBF7B"/>
</svg>
```

### Mark usage rules

- **Color:** Always Nexus Green (`#4FBF7B`) on dark backgrounds. Charcoal `#0F1110` if printed on Nexus Green backgrounds.
- **Clear space:** Maintain padding equal to the height of one petal around the mark.
- **Minimum size:** 24px square minimum. Below this, the hexagonal center loses readability.
- **Do NOT:** rotate, skew, recolor with non-brand colors, add gradients, add shadows.

---

## Brand Voice & Copy

### Headlines
Short. Declarative. Acquisition.com-adjacent. Use serif italic for emphasis.

✅ Good: "Agencies take 12 weeks. *I take a weekend.*"
✅ Good: "Intent-driven. *Self-hosted by default.*"
❌ Avoid: "Welcome to my website! 👋"
❌ Avoid: "Hi, I'm Tim, and I'm passionate about AI..."

### Body Copy
First-person, plain English. No corporate-speak. No emoji. No exclamation points in serious copy.

✅ Good: "I build agentic AI systems and ship production code where ownership meets velocity."
❌ Avoid: "I'm a passionate developer who loves building cutting-edge solutions!"

### Key Taglines (use anywhere)

- **Primary:** "Intent-driven engineer · AI Orchestrator"
- **Action triplet:** "build · orchestrate · solve"
- **Manifesto:** "Self-hosted by default."
- **Value prop (longer):** "Building agentic AI systems & shipping production code where ownership meets velocity."
- **Domain CTA:** "→ timraysby.com"

### Manifesto Lines (for terminal-style sections)

```
> context.local = true
> prompts.private = 1
> tokens.owner = self
```

---

## Layout Principles

### Backgrounds
- Default: dark (charcoal `#0F1110`)
- Add subtle texture: dot grid at 80px spacing with `rgba(79, 191, 123, 0.05)` opacity
- For light variants (alternate sections only): white `#FFFFFF` with charcoal text

### Spacing
- Generous. Treat whitespace as a design element.
- Sections: 120px minimum vertical padding on desktop, 60px on mobile
- Container max-width: 1200px, centered

### Decorative Elements
The brand uses a few signature decorative elements that add character without clutter:

1. **Corner registration marks** — small L-shaped brackets at canvas corners (echoes operations manuals, polybag stickers)
2. **Vertical accent lines** — thin Nexus Green lines on far edges of sections
3. **Dot grid overlays** — subtle background pattern at low opacity
4. **Cursor blinks** — terminal-style `▋` cursors next to relevant text

---

## Reference Files in This Package

```
brand-package/
├── BRAND.md                          ← This document
├── reference-landing-page.html       ← Working example of full brand application
├── logo/
│   ├── asterisk.svg                  ← Standalone brand mark, scalable
│   └── asterisk-on-dark.svg          ← Brand mark with dark background
├── shirt-design/
│   ├── mtmb_shirt_front.svg          ← Front chest print: MY TOKENS. MY BUSINESS.
│   ├── mtmb_shirt_back.svg           ← Back terminal manifesto print
│   ├── mtmb_hangtag_front.svg        ← Hang tag front
│   ├── mtmb_hangtag_back.svg         ← Hang tag back (care instructions)
│   ├── mtmb_neck_label.svg           ← Interior collar label
│   └── mtmb_polybag_sticker.svg      ← Packaging sticker
├── photography/
│   ├── headshot-clean.png            ← Headshot for LinkedIn use
│   └── headshot-with-badge.png       ← Headshot with brand mark badge
└── social-banners/
    ├── youtube_banner.jpg            ← 2560×1440
    ├── linkedin_banner.jpg           ← 1584×396
    └── x_banner.jpg                  ← 1500×500
```

---

## Application to Website (timraysby.com)

### Recommended Site Structure

```
/                      Hero + about + consulting + writing
/consulting            Service tiers (Spark / Forge / Stack)
/shop                  External link to Etsy or future merch line
/writing               Newsletter or blog
/now                   Current focus (à la nownownow.com pattern)
/about                 Long-form bio
```

### Hero Section Specs

- Background: `var(--charcoal)`
- Headline: Fraunces 300, italic emphasis on key phrase
- Sub-headline: JetBrains Mono 15-17px, `var(--ink-dim)`
- Primary CTA: Nexus Green button, charcoal text, sharp corners (no border-radius), uppercase JetBrains Mono label
- Decorative: corner registration marks, terminal-style "$ whoami" prompt above headline

### Component Reference
The reference landing page (`reference-landing-page.html`) demonstrates every brand pattern in working code:
- Hero with terminal prompt and italic emphasis
- Section labels with green accent line
- Problem cards with `[01]` numbered prefix
- Tiered pricing cards with featured highlight
- Process timeline with numbered green circles
- FAQ accordion with `+` toggle indicator
- Final CTA with radial green glow

**Use this file as the reference for component patterns.** Don't re-invent — copy the patterns.

---

## What NOT to Do

- ❌ Do not introduce additional colors outside the palette
- ❌ Do not use other fonts (no Inter, no Roboto, no system-ui as primary)
- ❌ Do not add gradients or glow effects to text or buttons
- ❌ Do not use rounded corners on primary CTAs (sharp edges = operator vibe)
- ❌ Do not use emoji as decoration (occasional intentional emoji in copy is fine)
- ❌ Do not use stock photography
- ❌ Do not center-align body copy (left-aligned only)
- ❌ Do not exceed 65 characters per line in body text
- ❌ Do not break the brand mark (no rotation, color shift, or proportional change)

---

## Source of Truth

If anything in this document conflicts with what's already on the live site, **this document wins**. The site should be brought into alignment with this reference, not the other way around.

For asset updates or brand evolution, edit this file first, then propagate changes to the site.

**Last updated:** April 30, 2026
**Maintained by:** Tim Raysby
