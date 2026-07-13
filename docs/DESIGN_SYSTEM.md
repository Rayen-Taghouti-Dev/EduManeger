# Design System — EduManager Pro

This document defines the visual identity, design tokens, typography, component guidelines, and UI patterns for EduManager Pro.

---

## Design Philosophy

EduManager Pro follows a **Modern SaaS** aesthetic — clean, enterprise-grade, and professional. The interface should feel trustworthy, efficient, and delightful to use daily.

### Inspiration

| Product | What We Borrow |
|---------|---------------|
| **Stripe** | Clarity, whitespace, precise typography, subtle shadows |
| **Notion** | Content hierarchy, sidebar navigation, inline editing |
| **Vercel** | Dark/light contrast, monospace accents, developer polish |
| **Linear** | Speed, keyboard shortcuts, minimal chrome, focused layouts |

### Principles

1. **Clarity over decoration** — Every element serves a purpose
2. **Consistency** — Same patterns for same actions across modules
3. **Accessibility** — WCAG 2.1 AA compliance minimum
4. **Responsive** — Mobile-first, scales to desktop dashboards
5. **Performance** — Lightweight components, no layout shift

---

## Color Palette

### Brand Colors

| Token | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Primary** | `#4F46E5` | `--color-primary` | Buttons, links, active states, brand accents |
| **Primary Hover** | `#4338CA` | `--color-primary-hover` | Primary button hover |
| **Primary Light** | `#EEF2FF` | `--color-primary-light` | Selected backgrounds, badges |
| **Secondary** | `#3B82F6` | `--color-secondary` | Secondary actions, info highlights |

### Semantic Colors

| Token | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Success** | `#22C55E` | `--color-success` | Confirmations, paid status, positive trends |
| **Success Light** | `#DCFCE7` | `--color-success-light` | Success backgrounds |
| **Warning** | `#F59E0B` | `--color-warning` | Pending actions, alerts, due dates |
| **Warning Light** | `#FEF3C7` | `--color-warning-light` | Warning backgrounds |
| **Danger** | `#EF4444` | `--color-danger` | Errors, deletions, overdue, critical alerts |
| **Danger Light** | `#FEE2E2` | `--color-danger-light` | Error backgrounds |

### Neutral Colors

| Token | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Background** | `#F8FAFC` | `--color-background` | Page background |
| **Surface** | `#FFFFFF` | `--color-surface` | Cards, modals, sidebars |
| **Border** | `#E2E8F0` | `--color-border` | Dividers, input borders |
| **Border Hover** | `#CBD5E1` | `--color-border-hover` | Hover state borders |
| **Text Primary** | `#0F172A` | `--color-text` | Headings, body text |
| **Text Secondary** | `#64748B` | `--color-text-secondary` | Labels, captions, placeholders |
| **Text Muted** | `#94A3B8` | `--color-text-muted` | Disabled, timestamps |
| **Text Inverse** | `#FFFFFF` | `--color-text-inverse` | Text on dark/primary backgrounds |

### Tailwind Mapping (planned)

```js
// tailwind.config — color extension
colors: {
  primary: {
    DEFAULT: '#4F46E5',
    hover: '#4338CA',
    light: '#EEF2FF',
  },
  secondary: {
    DEFAULT: '#3B82F6',
  },
  success: {
    DEFAULT: '#22C55E',
    light: '#DCFCE7',
  },
  warning: {
    DEFAULT: '#F59E0B',
    light: '#FEF3C7',
  },
  danger: {
    DEFAULT: '#EF4444',
    light: '#FEE2E2',
  },
}
```

---

## Typography

### Font Stack

| Role | Font | Fallback |
|------|------|----------|
| **Sans (UI)** | Inter | system-ui, -apple-system, sans-serif |
| **Mono (Code)** | JetBrains Mono | ui-monospace, monospace |

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `text-xs` | 12px | 400 | 16px | Badges, timestamps |
| `text-sm` | 14px | 400 | 20px | Body text, table cells |
| `text-base` | 16px | 400 | 24px | Default body |
| `text-lg` | 18px | 500 | 28px | Section titles |
| `text-xl` | 20px | 600 | 28px | Card titles |
| `text-2xl` | 24px | 600 | 32px | Page titles |
| `text-3xl` | 30px | 700 | 36px | Dashboard headings |
| `text-4xl` | 36px | 700 | 40px | Hero / landing |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text |
| Medium | 500 | Labels, nav items |
| Semibold | 600 | Headings, buttons |
| Bold | 700 | Page titles, emphasis |

---

## Spacing

Based on a **4px grid**:

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight inline spacing |
| `space-2` | 8px | Icon gaps, compact padding |
| `space-3` | 12px | Input padding |
| `space-4` | 16px | Standard padding |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Section gaps |
| `space-12` | 48px | Page section margins |
| `space-16` | 64px | Large section breaks |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Badges, tags |
| `rounded-md` | 6px | Inputs, buttons |
| `rounded-lg` | 8px | Cards, dropdowns |
| `rounded-xl` | 12px | Modals, large cards |
| `rounded-full` | 9999px | Avatars, pills |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards, dropdowns |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.10)` | Modals, popovers |
| `shadow-none` | none | Flat surfaces |

---

## Component Guidelines

### Buttons

| Variant | Style | Usage |
|---------|-------|-------|
| **Primary** | `bg-primary text-white` | Main CTA — Save, Submit, Create |
| **Secondary** | `border border-border bg-surface` | Cancel, alternative actions |
| **Ghost** | `text-primary hover:bg-primary-light` | Tertiary, inline actions |
| **Danger** | `bg-danger text-white` | Delete, irreversible actions |
| **Icon** | Square, icon-only | Toolbar actions |

**Sizes:** `sm` (32px), `md` (40px), `lg` (48px)

### Inputs

- Height: 40px (md)
- Border: `1px solid --color-border`
- Focus ring: `2px solid --color-primary` with offset
- Error state: `border-danger` + error message below
- Label above input, helper text below

### Cards

```
┌─────────────────────────────────┐
│  Card Title              [Action]│
│  Subtitle / description          │
├─────────────────────────────────┤
│                                  │
│  Content area                    │
│                                  │
└─────────────────────────────────┘
```

- Background: `--color-surface`
- Border: `1px solid --color-border`
- Radius: `rounded-lg`
- Padding: `space-6`
- Shadow: `shadow-sm`

### Tables

- Sticky header on scroll
- Zebra striping optional (use `--color-background` for alternate rows)
- Row hover: `bg-primary-light/50`
- Actions column right-aligned
- Empty state with illustration and CTA

### Navigation (Sidebar)

- Width: 256px (expanded), 64px (collapsed)
- Active item: `bg-primary-light text-primary font-medium`
- Icon + label layout
- Grouped sections with dividers
- School logo at top

### Status Badges

| Status | Color | Example |
|--------|-------|---------|
| Active / Paid | Success | `bg-success-light text-success` |
| Pending | Warning | `bg-warning-light text-warning` |
| Inactive / Overdue | Danger | `bg-danger-light text-danger` |
| Draft | Neutral | `bg-gray-100 text-gray-600` |
| Info | Secondary | `bg-blue-50 text-secondary` |

---

## Layout Patterns

### Dashboard Layout

```
┌──────────┬────────────────────────────────────────┐
│          │  Top Bar (search, notifications, user)│
│ Sidebar  ├────────────────────────────────────────┤
│          │                                        │
│  Nav     │  Page Content                          │
│  Items   │  ┌──────────┐ ┌──────────┐            │
│          │  │  Stat    │ │  Stat    │            │
│          │  └──────────┘ └──────────┘            │
│          │  ┌─────────────────────────┐          │
│          │  │  Chart / Table          │          │
│          │  └─────────────────────────┘          │
└──────────┴────────────────────────────────────────┘
```

### Form Layout

- Single column for simple forms (max-width: 480px)
- Two columns for complex forms on desktop
- Sticky footer with Save / Cancel on long forms
- Section headers with descriptions
- Required fields marked with asterisk

### List + Detail (Master-Detail)

- Left panel: searchable, filterable list
- Right panel: selected item detail
- Collapses to full-screen detail on mobile

---

## Icons

- **Library:** Lucide React (consistent with Shadcn/UI)
- **Size:** 16px (inline), 20px (buttons), 24px (navigation)
- **Stroke:** 1.5px default
- **Color:** Inherits text color; use `--color-text-secondary` for decorative

---

## Motion & Animation

| Pattern | Duration | Easing |
|---------|----------|--------|
| Hover transitions | 150ms | ease-in-out |
| Modal open/close | 200ms | ease-out |
| Page transitions | 300ms | ease-in-out |
| Toast notifications | 300ms slide-in | ease-out |
| Skeleton loading | 1.5s pulse | linear |

**Rule:** Animations enhance, never delay. Respect `prefers-reduced-motion`.

---

## Dark Mode (Future Phase)

Dark mode tokens will be defined in a later phase. Initial release ships with light mode only, with CSS variables structured to support theme switching.

| Light Token | Dark Equivalent (planned) |
|-------------|------------------------|
| `#F8FAFC` background | `#0F172A` |
| `#FFFFFF` surface | `#1E293B` |
| `#0F172A` text | `#F8FAFC` |

---

## Accessibility

| Requirement | Standard |
|-------------|----------|
| Color contrast | WCAG AA (4.5:1 text, 3:1 large text) |
| Focus indicators | Visible on all interactive elements |
| Keyboard navigation | Full tab order, Escape closes modals |
| Screen readers | ARIA labels on icons, live regions for toasts |
| Form errors | Associated with inputs via `aria-describedby` |

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet — sidebar collapses |
| `lg` | 1024px | Desktop — full sidebar |
| `xl` | 1280px | Wide desktop — max content width |
| `2xl` | 1536px | Ultra-wide — centered content |

**Content max-width:** 1280px for dashboard content areas.

---

## Logo & Branding

| Asset | Specification |
|-------|--------------|
| **Logo** | Wordmark "EduManager" + icon (to be designed) |
| **Icon** | Graduation cap or book motif in Primary color |
| **Favicon** | 32×32 SVG |
| **School branding** | Per-tenant logo upload (MinIO), displayed in sidebar |

---

## Chart Colors (Recharts)

| Series | Color |
|--------|-------|
| Series 1 | `#4F46E5` (Primary) |
| Series 2 | `#3B82F6` (Secondary) |
| Series 3 | `#22C55E` (Success) |
| Series 4 | `#F59E0B` (Warning) |
| Series 5 | `#8B5CF6` (Purple accent) |
| Grid lines | `#E2E8F0` |
| Axis text | `#64748B` |

---

## Implementation Location

| Asset | Path (planned) |
|-------|---------------|
| Design tokens | `packages/ui/src/styles/tokens.css` |
| Tailwind config | `packages/ui/tailwind.config.ts` |
| Global styles | `packages/ui/src/styles/globals.css` |
| Components | `packages/ui/src/components/` |
| Fonts | Loaded via `next/font` in `apps/web` |

---

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Frontend architecture
- [TECH_STACK.md](./TECH_STACK.md) — UI technology stack
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) — Product context
