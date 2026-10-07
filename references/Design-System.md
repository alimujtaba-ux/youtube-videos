# Design System — CalcMatrix

## 1. Design Character

The design system should support a product that feels:

- precise
- premium
- restrained
- numeric
- interactive
- trustworthy

The system should avoid looking like:

- enterprise banking software
- a trading terminal
- a generic admin dashboard
- a playful consumer toy

---

# 2. Color Tokens

Use CSS custom properties.

## Light theme

```css
:root {
  --color-page: #F7F8FA;
  --color-surface: #FFFFFF;
  --color-surface-subtle: #F1F3F5;

  --color-text: #101318;
  --color-text-secondary: #626973;
  --color-text-muted: #8C929C;

  --color-border: #E5E7EB;
  --color-border-strong: #D7DAE0;

  --color-accent: #5B5CE2;
  --color-accent-hover: #4D4ED4;
  --color-accent-soft: #EEEEFF;

  --color-positive: #16875D;
  --color-positive-soft: #EAF7F1;

  --color-warning: #B7791F;
  --color-warning-soft: #FFF7E6;

  --color-negative: #C93C37;
  --color-negative-soft: #FDEEEE;
}
```

Semantic colors must communicate meaning, not decoration.

---

# 3. Industry Accents

These are secondary identifiers.

- Banking & Loans: Indigo
- Investing: Emerald
- Construction: Amber
- Business: Blue
- Real Estate: Terracotta

Use industry accent for:

- small icon
- category badge
- selected marker
- chart highlight

Do not recolor the entire application per industry.

---

# 4. Typography

Recommended:

- `Inter`
- fallback: system UI stack

Use tabular numerals for financial values.

```css
.numeric {
  font-variant-numeric: tabular-nums;
}
```

## Type Scale

### Display

- 48–64 px desktop
- 40–48 px mobile
- weight 650–750
- primary calculator result

### H1

- 36–44 px desktop
- 30–36 px mobile
- weight 650–700

### H2

- 24–30 px
- weight 600–700

### H3

- 18–22 px
- weight 600

### Body

- 16 px
- line-height 1.5–1.65

### Small

- 13–14 px
- line-height 1.4–1.5

### Input value

- 18 px minimum

---

# 5. Spacing

Base system:

- 4 px
- 8 px
- 12 px
- 16 px
- 24 px
- 32 px
- 48 px
- 64 px
- 96 px

Prefer 24–32 px internal panel spacing on desktop.

Calculator major sections:

- 64–96 px vertical separation desktop
- 40–64 px mobile

---

# 6. Radius

Recommended:

- input: 10–12 px
- button: 10–12 px
- card: 14–16 px
- major panel: 16–18 px
- badge: pill

Avoid excessive pill-shaped surfaces.

---

# 7. Borders

Default:

- 1 px
- neutral

Use stronger borders for:

- active input
- selected card
- focused comparison column

Do not rely on heavy shadows.

---

# 8. Shadows

Use sparingly.

Good use:

- command palette
- floating mobile navigation panel

Avoid shadows around every card.

---

# 9. Buttons

## Primary

Use accent background.

Typical actions:

- Share calculation
- primary navigation action in a modal

## Secondary

Neutral border/surface.

Typical:

- Reset
- View schedule
- Compare

## Tertiary

Text/ghost.

Typical:

- Learn more
- View formula

Minimum interactive height:

- 44 px

---

# 10. Inputs

Base:

- 52–56 px height
- 16–18 px value text
- visible label
- optional prefix/suffix

States:

- default
- hover
- focus
- error
- disabled

Focus:

- high contrast border/ring
- must not depend on color alone

Money input:

```text
Loan amount
Rs  [ 5,000,000 ]
```

Rate input:

```text
Interest rate
[ 15.00 ] %
```

---

# 11. Sliders

Slider is supplemental to a numeric input.

Use accent only for:

- selected track portion
- thumb
- focus state

Provide:

- min label
- max label
- current exact numeric field

---

# 12. Calculator Panel

## Input panel

- white or subtle neutral surface
- moderate border
- clear group spacing

## Result panel

- visually stronger hierarchy
- primary result in display scale
- limited internal divider use
- share action available

Do not create five nested cards inside the result.

---

# 13. Metrics

### Primary metric

- large
- tabular
- dark high contrast

### Supporting metric

Use label/value row.

Example:

```text
Total repayment       Rs 7.14m
Total interest        Rs 2.14m
Payments                    60
```

---

# 14. Cards

Industry/calculator cards:

- restrained surface
- border
- 16 px radius
- subtle hover background/border
- arrow motion optional

Do not use dramatic elevation.

---

# 15. Tables

Financial table requirements:

- tabular numerals
- right-align numeric columns
- left-align text labels
- sticky header where helpful
- zebra striping only if necessary
- sufficient row height
- localized horizontal scrolling on mobile

---

# 16. Chart Tokens

Use a small data palette.

Recommended semantic roles:

- principal
- interest
- baseline
- scenario
- Offer A
- Offer B

Do not use more than necessary.

Charts should have:

- visible legend
- direct labels where possible
- accessible tooltip/tap detail
- readable mobile sizing

---

# 17. Motion Tokens

Suggested durations:

```text
--motion-fast: 140ms
--motion-base: 220ms
--motion-slow: 320ms
```

Suggested easing:

- subtle ease-out for entrances
- standard ease for value transitions

GSAP should read reduced-motion preferences.

---

# 18. Numeric Animation

Primary result changes may animate.

Rules:

- no spinning odometer effect
- no multi-second counting
- preserve readability
- animate from previous value
- interrupt safely
- instant change under reduced-motion

---

# 19. Disclosure Component

Use for:

- formula
- assumptions
- methodology

Collapsed state:

- clear title
- chevron

Expanded state:

- smooth GSAP height/opacity transition
- full keyboard support
- state communicated accessibly

---

# 20. Search Command

Visual structure:

- modal/palette surface
- search field at top
- result list below
- category context
- keyboard selection state
- hint row where useful

Avoid turning it into a full-screen decorative experience on desktop.

---

# 21. Breakpoints

Suggested:

```text
sm: 640 px
md: 768 px
lg: 1024 px
xl: 1280 px
2xl: 1536 px
```

Design must still work at 320 px.

---

# 22. Layout Width

Recommended content max width:

- approximately 1180–1280 px

Calculator reading content:

- narrower when text-heavy

Do not stretch calculator fields across ultra-wide screens.

---

# 23. Dark Mode

Not required for MVP.

However:

- use semantic design tokens
- avoid hardcoding colors throughout components
- keep future dark mode feasible

---

# 24. Iconography

Use Lucide React.

Style:

- line icons
- consistent stroke
- restrained size

Use icons for:

- industries
- search
- share
- copy
- comparison
- disclosures
- navigation

Do not decorate every label with an icon.

---

# 25. Component Inventory

Core primitives:

- Button
- IconButton
- Input
- MoneyInput
- PercentInput
- Select
- Slider
- Badge
- Card
- Divider
- Disclosure
- Dialog
- Tooltip
- Table

Product components:

- CalculatorShell
- InputPanel
- ResultPanel
- PrimaryMetric
- MetricRow
- ScenarioPanel
- FormulaPanel
- RelatedCalculatorCard
- SearchCommand
- IndustryCard
- ComparisonColumn
- DonutBreakdown
- BalanceChart

---

# 26. Design Quality Rules

1. One visual hero per calculator.
2. Inputs remain obvious but secondary to results.
3. Accent color is for interaction, not wallpaper.
4. Semantic colors retain meaning.
5. Avoid excessive card nesting.
6. Prefer spacing before adding dividers.
7. Prefer labels before adding icons.
8. Prefer direct values before adding charts.
9. Motion explains change.
10. Mobile is intentionally designed, not compressed desktop.
