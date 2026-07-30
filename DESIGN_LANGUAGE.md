# TrotOS Design Language

> **Emotional Goal:** When users log in, they should think, *"Everything is under control."* Enterprise software isn't supposed to entertain. It's supposed to reduce stress.

## 1. Brand Personality

**Core Traits:**
- Professional
- Reliable
- Operational
- Modern
- Calm
- Intelligent

**Never:** Playful, Flashy, Gaming, Neon, Over-designed, Colorful.

**Product Keywords:**
Calm, Precise, Minimal, Focused, Predictable, Fast, Confident, Scalable, Reliable, Elegant.

---

## 2. Color System

| Role | Color | Hex | Notes |
| :--- | :--- | :--- | :--- |
| **Primary** | Indigo | `#5B5CEB` | Distinctive brand accent |
| **Primary Hover** | Dark Indigo | `#4C4DDC` | |
| **Primary Light** | Light Indigo | `#EEF0FF` | |
| **Background** | Slate 50 | `#F8FAFC` | Reduces eye fatigue, premium feel |
| **Cards & Sidebar** | White | `#FFFFFF` | |
| **Borders** | Gray 200 | `#E5E7EB` | Very subtle |
| **Primary Text** | Gray 900 | `#111827` | |
| **Secondary Text** | Gray 500 | `#6B7280` | |
| **Muted Text** | Gray 400 | `#9CA3AF` | |
| **Success** | Green 600 | `#16A34A` | |
| **Warning** | Amber 500 | `#F59E0B` | |
| **Danger** | Red 600 | `#DC2626` | |
| **Info** | Sky 500 | `#0EA5E9` | |

---

## 3. Typography

**Font:** `Inter Variable` (No exceptions)

**Scale:**
| Usage | Size | Weight |
| :--- | :--- | :--- |
| Display | 36px | 700 |
| Page Title | 30px | 700 |
| Section Title | 24px | 600 |
| Card Title | 18px | 600 |
| Body | 16px | 400 |
| Secondary | 14px | 400 |
| Caption | 12px | 500 |

---

## 4. Spacing System

Everything follows an **8-point grid**.
**Allowed values:** `4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96` (No random spacing).

---

## 5. Border Radius

- **Buttons:** `10px`
- **Inputs:** `10px`
- **Cards:** `16px`
- **Dialogs:** `20px`
- **Badges:** `999px` (fully rounded)

---

## 6. Shadows

All shadows should remain subtle.
- **Cards:** `0 1px 2px rgba(15,23,42,.05)`
- **Dropdowns:** `0 8px 24px rgba(15,23,42,.08)`
- **Dialogs:** `0 20px 48px rgba(15,23,42,.12)`

---

## 7. Icons

**Library:** Lucide (Consistent stroke, modern, lightweight).

**Rules:**
- 2px stroke
- Rounded caps
- No filled icons

---

## 8. Motion

Motion should communicate change, not decorate. No animation should exceed **250ms**.

| Action | Duration |
| :--- | :--- |
| Hover | 120ms |
| Click | 80ms |
| Card hover | 150ms |
| Sidebar | 180ms |
| Modal | 220ms |

---

## 9. Elevation

Only three levels. No floating cards everywhere.

1. **Level 0:** Background
2. **Level 1:** Cards
3. **Level 2:** Dialogs

---

## 10. Layout Grid

Wide enough for enterprise dashboards.
- **Sidebar:** `256px`
- **Content Max Width:** `1440px`
- **Page Padding:** `24px`
- **Section Spacing:** `32px`

---

## 11. Component Rules

- One primary action per view.
- Never use more than one accent color on a page.
- Destructive actions are always red.
- Success is always green.
- Buttons are never full-width unless appropriate (e.g., login).
- Tables always support search, filter, sort, and pagination.
- Every loading state uses skeletons rather than spinners where practical.

---

## 12. Tailwind Tokens

```ts
colors: {
  primary: {
    DEFAULT: "#5B5CEB",
    hover: "#4C4DDC",
    light: "#EEF0FF",
  },
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#DC2626",
  info: "#0EA5E9",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  border: "#E5E7EB",
  text: {
    DEFAULT: "#111827",
    secondary: "#6B7280",
    muted: "#9CA3AF",
  }
}
```

---

## 13. Golden Rules

**Non-negotiable principles:**
1. One primary action per screen.
2. One dominant focal point per page.
3. Maximum three accent colors visible at once.
4. Never rely on color alone to indicate status.
5. Every page must answer **"What should I do next?"**
6. If a widget doesn't help the user make a decision, move it to another page.
7. Design for **8-hour workdays**, not five-minute demos.
