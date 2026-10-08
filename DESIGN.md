---
name: Serene AI Emotion Diary
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#464554'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#b10e6b'
  on-tertiary: '#ffffff'
  tertiary-container: '#d23284'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffd9e4'
  tertiary-fixed-dim: '#ffb0cd'
  on-tertiary-fixed: '#3e0022'
  on-tertiary-fixed-variant: '#8c0053'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 57px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.25px
  display-md:
    fontFamily: Inter
    fontSize: 45px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: 0px
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: 0px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: 0px
  headline-md:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: 0px
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: 0px
  title-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: 0px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0.15px
  title-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.5px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.25px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.4px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers an emotionally reassuring, reflective, and lucid atmosphere engineered specifically for journaling, sentiment tracking, and reflective AI dialogue. Grounded in Google Material Design 3 (M3) principles, the interface fuses systematic structure with empathetic softness. 

The aesthetic is clean, luminous, and tactilely reassuring—pairing airy, low-contrast neutral backdrops with calming indigo and lavender primary accents, balanced by warm emotional accents (amber and soft peach) to represent varied emotional spectra without sensory fatigue. Surfaces feel physical yet weightless, relying on generous radii, tonal shifts, and subtle surface containers rather than aggressive drop shadows. Interactions emphasize thoughtful reflection, psychological safety, and focused calm.

## Colors

The palette establishes an M3 tonal ecosystem calibrated for calm focus and nuanced emotional categorization:

- **Primary (`#6366F1`) & On-Primary**: Indigo-lavender anchors the interface, driving active states, primary actions, and focused reflection. It promotes clarity and mental calm.
- **Primary Container & On-Primary Container**: Derived as soft lavender tints (`#EEF2FF` text: `#3730A3`) for low-emphasis active states, selected filter chips, and interactive cards.
- **Secondary (`#F59E0B`)**: Warm amber captures optimism, high valence, and warm sentiment trends. Applied to mood-tracking tags, achievement highlights, and emotional warmth markers.
- **Tertiary (`#EC4899`)**: Gentle rose/peach acts as a balance for vulnerability, passion, or deep emotional markers.
- **Neutral & Surface Containers**: Standard M3 light surface tiers are anchored around gentle slate:
  - `surface`: `#FFFFFF`
  - `surface-dim`: `#F1F5F9`
  - `surface-container-lowest`: `#FFFFFF`
  - `surface-container-low`: `#F8FAFC`
  - `surface-container`: `#F1F5F9`
  - `surface-container-high`: `#E2E8F0`
  - `surface-container-highest`: `#CBD5E1`
- **Text & Outlines**: High-contrast text uses Slate-900 (`#0F172A`) for `on-surface`, Slate-600 (`#475569`) for `on-surface-variant`, and Slate-300 (`#CBD5E1`) for `outline-variant`.

## Typography

The type scale utilizes Inter for its legibility, geometric balance, and neutral character. It forms a clean typographic foundation for both reflective prose and analytic sentiment metrics. In multilingual environments supporting Korean text, fallbacks seamlessly integrate Pretendard using the identical scale and vertical metrics.

Editorial journal entries employ `body-lg` with an open 1.5 line-height multiplier for sustained reading comfort. Emotion tags, metadata timestamps, and interactive card descriptors default to `label-md` and `body-sm`.

## Layout & Spacing

The layout is built around a structured 12-column desktop grid with a max container width of 1440px to retain intimacy during diary entries and AI dialogues:

- **Desktop (1024px+)**: 12 columns, 24px (`1.5rem`) gutters, and 32px (`2rem`) margins. Content structures separate into a primary journaling / narrative canvas (spanning 7–8 columns) and an AI insight / sentiment context rail (spanning 4–5 columns).
- **Tablet (600px - 1023px)**: 8 columns, 16px gutters, and 24px margins. Context rails collapse into tabs or persistent bottom sheets.
- **Mobile (<600px)**: 4 columns, 16px gutters, and 16px margins. Full-width cards with vertical stacking.

Component internal padding obeys an 8pt spatial grid: input zones leverage `space-lg` (24px) for expansive writing comfort, while micro-interactions (chips, status pills) use `space-xs` and `space-sm`.

## Elevation & Depth

In strict accordance with Material Design 3, visual separation is driven primarily through **tonal elevation** (surface tint shifts) supplemented by diffused ambient shadows:

- **Level 0 (Flat / Canvas)**: `surface-container-low` (`#F8FAFC`). No shadow. Used for global application canvas and backdrop.
- **Level 1 (Resting Cards & Navigation)**: `surface` (`#FFFFFF`). `box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.06)`. Used for sentiment analysis cards, diary timeline feeds, and top app bars.
- **Level 2 (Interactive Hover & Popovers)**: `surface-container-lowest` with tint overlay. `box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Level 3 (Modals & Emotion Drawers)**: `box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`.
- **State Layers**: Hover, focus, and press interactions apply semi-transparent primary overlays (`rgba(99, 102, 241, 0.08)` hover; `rgba(99, 102, 241, 0.12)` pressed) over surfaces rather than changing border thicknesses.

## Shapes

The design uses high-curvature radii to communicate warmth and safety. 

- **Full / Pill (`rounded-full`)**: Applied to all primary CTA buttons, filter chips, mood selector pills, and search inputs.
- **Extra Large (`rounded-3xl` / 24px - 28px)**: Applied to primary journal entry containers, AI insight summary boards, and bottom sheets.
- **Large (`rounded-2xl` / 16px)**: Applied to secondary cards, sentiment trend widgets, and modal dialogues.
- **Medium (`rounded-xl` / 12px)**: Applied to internal text area editors and inline media attachments.

## Components

### Buttons
- **Filled Button**: Pill-shaped (`rounded-full`), height 44px, padding 0 24px. Background `#6366F1`, text `#FFFFFF`, font `label-lg`. Hover brings subtle primary-darkened overlay and +1 elevation tier.
- **Tonal Button**: Pill-shaped, background `#EEF2FF`, text `#4F46E5`. Used for tertiary diary actions (e.g., "Add Tag", "Reflect with AI").
- **Outlined Button**: 1px solid border `#CBD5E1`, background transparent, text `#475569`. Hover shifts background to `rgba(99, 102, 241, 0.04)`.

### Chips & Emotion Pills
- Height 32px, `rounded-full`, padding 0 12px.
- **Filter Chip (Unselected)**: Border 1px solid `#CBD5E1`, text `#475569`, background `#FFFFFF`.
- **Filter Chip (Selected)**: Background `#EEF2FF`, border 1px solid `#6366F1`, text `#4F46E5`, leading icon checkmark.
- **Emotion Indicator Chips**: Tonal surfaces matched to sentiment (e.g., Joy: `#FEF3C7` text `#92400E`; Calm: `#EEF2FF` text `#3730A3`; Melancholy: `#F1F5F9` text `#475569`).

### Input Fields & Editor Area
- **Diary Canvas**: Seamless, flat editor container utilizing `surface` (`#FFFFFF`), `rounded-3xl`, padded by `space-lg` (24px). Free of abrasive input borders; distinguished by subtle tonal contrast against `#F8FAFC`.
- **Standard Input**: Height 56px, filled style with background `#F1F5F9`, border-radius 16px (`rounded-2xl`), label positioned according to M3 floating mechanics with accent color transition to `#6366F1` on focus.

### Cards & Container Surfaces
- **Diary Entry Card**: Background `#FFFFFF`, border-radius 24px (`rounded-3xl`), border 1px solid `#F1F5F9`, ambient Level 1 elevation. Padding: 20px. Hover transitions smooth elevation lift (+2px translateY, Level 2 shadow).
- **AI Sentiment Analysis Insight Card**: Background subtle gradient between `#FFFFFF` and `#F5F3FF`, border 1px solid `#E0E7FF`, containing visual sentiment meter rings and sparkline trends.

### Checkboxes & Selection Controls
- Checkboxes feature 6px border radii; checked states fill with `#6366F1` featuring a white check glyph. Radio buttons use concentric circles with a smooth spring transition on active toggle.