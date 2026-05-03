# ElectroGuide Design Skill
**Purpose**: A precision design system for ElectroGuide — an AI civic education assistant.
Use this skill whenever building any UI component, page, or screen for the ElectroGuide project.

---

## Aesthetic Direction

**Theme**: "Civic Clarity" — the feeling of a modern government portal that actually respects the user.
Think: The Economist meets Linear meets a well-funded civic tech startup.

**Tone**: Authoritative but approachable. Trustworthy but not cold. Smart but never condescending.

**The one unforgettable thing**: Every screen feels like it was designed by someone who genuinely cares about democracy — precise, legible, purposeful. No noise. No decoration for decoration's sake.

**Avoid at all costs**:
- Purple gradient on white (generic AI look)
- Comic/playful civic iconography (ballots with smiley faces)
- Overused fonts: Inter, Roboto, Poppins, Space Grotesk
- Bootstrap or Material-style components
- Dark navy + gold (old government cliché)

---

## Typography

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Serif+Display:ital@0;1&display=swap');
```

- **Display / Hero headings**: `DM Serif Display` — gives civic weight without feeling dated
- **Body / UI text**: `DM Sans` — optical-size aware, clean at small sizes
- **Monospace (timers, codes, counts)**: `'Courier Prime', monospace`

### Type Scale
```css
:root {
  --text-xs:   11px;
  --text-sm:   13px;
  --text-base: 15px;
  --text-md:   17px;
  --text-lg:   22px;
  --text-xl:   30px;
  --text-2xl:  42px;
  --text-hero: 64px;

  --weight-regular: 300;
  --weight-medium:  400;
  --weight-bold:    500;
  --weight-heavy:   600;

  --leading-tight:  1.15;
  --leading-normal: 1.6;
  --leading-loose:  1.85;
  --tracking-wide:  0.06em;
  --tracking-wider: 0.12em;
}
```

### Usage Rules
- Hero titles: `DM Serif Display`, `var(--text-hero)`, italic variant for emphasis words
- Section headings: `DM Serif Display`, `var(--text-xl)`
- Labels / overlines: `DM Sans`, `var(--text-xs)`, `var(--tracking-wider)`, uppercase
- Body copy: `DM Sans 300`, `var(--text-base)`, `var(--leading-loose)`
- Stat numbers: `DM Serif Display`, `var(--text-2xl)`, tabular nums
- Never mix more than 2 weights of DM Sans in one component

---

## Color System

### Palette
```css
:root {
  /* Primary — Ink */
  --ink-900: #0D0F0E;
  --ink-800: #1A1D1B;
  --ink-700: #2C302D;
  --ink-500: #4A5050;
  --ink-300: #8C9190;
  --ink-100: #D6DADA;
  --ink-050: #F0F2F1;

  /* Accent — Civic Green */
  --green-900: #0A2E1A;
  --green-700: #145C35;
  --green-500: #1E8A50;
  --green-400: #2DB36A;
  --green-200: #A3DEBA;
  --green-100: #D4F0E1;
  --green-050: #EDF8F3;

  /* Signal — Alert Amber */
  --amber-700: #7A4000;
  --amber-500: #C26A00;
  --amber-300: #F5A623;
  --amber-100: #FDE8BC;
  --amber-050: #FEF6E4;

  /* Signal — Status Red */
  --red-700:   #6B1515;
  --red-500:   #C0392B;
  --red-100:   #FAD7D3;
  --red-050:   #FDF2F1;

  /* Paper — warm off-white page feel */
  --paper:     #F8F7F4;
  --paper-warm:#F2EFE9;

  /* Pure */
  --white:     #FFFFFF;
  --black:     #080A09;
}
```

### Semantic Tokens
```css
:root {
  --color-bg:           var(--paper);
  --color-surface:      var(--white);
  --color-surface-alt:  var(--ink-050);
  --color-border:       var(--ink-100);
  --color-border-strong:var(--ink-300);

  --color-text-primary: var(--ink-900);
  --color-text-body:    var(--ink-700);
  --color-text-muted:   var(--ink-500);
  --color-text-hint:    var(--ink-300);

  --color-accent:       var(--green-500);
  --color-accent-light: var(--green-050);
  --color-accent-text:  var(--green-900);

  --color-warning:      var(--amber-500);
  --color-warning-bg:   var(--amber-050);
  --color-danger:       var(--red-500);
  --color-danger-bg:    var(--red-050);

  /* Election stage colors */
  --stage-upcoming:     var(--ink-100);
  --stage-active:       var(--green-400);
  --stage-done:         var(--ink-300);
  --stage-critical:     var(--amber-300);
}
```

### Color Usage Rules
- **Backgrounds**: `--color-bg` (page), `--color-surface` (cards), `--color-surface-alt` (sidebar/panels)
- **Accent sparingly**: Only on CTAs, active states, and the timeline progress indicator — never as decorative fill
- **Never use green as a background** for large areas — it reads as "success state" and confuses the eye
- **Amber for deadlines only** — deadline badges, countdown warnings, "register by" notices
- **Red only for errors** — form validation, failed states

---

## Spacing & Layout

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   14px;
  --radius-xl:   22px;
  --radius-pill: 999px;

  --shadow-xs: 0 1px 2px rgba(0,0,0,0.06);
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.10);
  --shadow-lg: 0 8px 40px rgba(0,0,0,0.12);
}
```

### Page Layout
```
┌──────────────────────────────────────────────┐
│  Topbar (60px, sticky)                        │
├──────────┬───────────────────────────────────┤
│ Sidebar  │  Main content area                 │
│ 240px    │  max-width: 780px, centered        │
│ fixed    │  padding: 0 var(--space-8)         │
└──────────┴───────────────────────────────────┘
```

- Sidebar: `240px` fixed, `--color-surface-alt` bg, `1px solid var(--color-border)` right border
- Content: `max-width: 780px`, left-aligned inside remaining space, `padding: var(--space-8)`
- Topbar: `60px` height, `--color-surface`, bottom border `1px solid var(--color-border)`, `z-index: 100`
- Mobile (`< 768px`): sidebar collapses to bottom tab bar (4 icons)

---

## Component Specifications

### Sidebar Navigation
```css
.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  font-family: 'DM Sans', sans-serif;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  text-decoration: none;
}
.nav-item:hover {
  background: var(--color-surface);
  color: var(--color-text-primary);
}
.nav-item.active {
  background: var(--color-accent-light);
  color: var(--color-accent-text);
  font-weight: var(--weight-bold);
}
.nav-item .nav-icon {
  width: 18px;
  height: 18px;
  opacity: 0.7;
}
.nav-item.active .nav-icon { opacity: 1; }
```

### Chat Bubbles
```css
/* Electra (AI) bubble */
.bubble-ai {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg) var(--radius-lg) var(--radius-lg) var(--radius-sm);
  padding: var(--space-4) var(--space-5);
  max-width: 78%;
  align-self: flex-start;
  box-shadow: var(--shadow-xs);
}

/* User bubble */
.bubble-user {
  background: var(--ink-900);
  color: var(--white);
  border-radius: var(--radius-lg) var(--radius-lg) var(--radius-sm) var(--radius-lg);
  padding: var(--space-4) var(--space-5);
  max-width: 78%;
  align-self: flex-end;
}

/* Electra avatar */
.electra-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--green-500);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Serif Display', serif;
  font-size: 14px;
  color: white;
  flex-shrink: 0;
}

/* Typing indicator */
.typing-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--ink-300);
  animation: blink 1.2s infinite;
}
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink {
  0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
  40%           { opacity: 1;   transform: scale(1); }
}
```

### Suggested Follow-up Pills
```css
.suggestion-pill {
  display: inline-flex;
  align-items: center;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  font-size: var(--text-sm);
  font-family: 'DM Sans', sans-serif;
  color: var(--color-text-body);
  background: var(--color-surface);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  white-space: nowrap;
}
.suggestion-pill:hover {
  border-color: var(--green-400);
  background: var(--green-050);
  color: var(--green-900);
}
```

### Election Timeline
Each stage is a horizontal node connected by a line.

```css
.timeline-track {
  display: flex;
  align-items: flex-start;
  gap: 0;
  position: relative;
  padding: var(--space-8) 0;
}

.timeline-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  cursor: pointer;
}

/* Connector line between nodes */
.timeline-node::before {
  content: '';
  position: absolute;
  top: 20px;
  left: -50%;
  width: 100%;
  height: 2px;
  background: var(--color-border);
  z-index: 0;
}
.timeline-node:first-child::before { display: none; }
.timeline-node.done::before { background: var(--green-400); }

.timeline-dot {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  background: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  transition: border-color 0.2s, background 0.2s, transform 0.2s;
}
.timeline-node:hover .timeline-dot {
  transform: scale(1.1);
  border-color: var(--green-400);
}
.timeline-node.active .timeline-dot {
  background: var(--green-500);
  border-color: var(--green-500);
  box-shadow: 0 0 0 4px var(--green-100);
}
.timeline-node.done .timeline-dot {
  background: var(--ink-900);
  border-color: var(--ink-900);
}
.timeline-node.upcoming .timeline-dot {
  background: var(--color-surface-alt);
  border-color: var(--ink-100);
}

.timeline-label {
  margin-top: var(--space-3);
  font-family: 'DM Sans', sans-serif;
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-muted);
  text-align: center;
}
.timeline-node.active .timeline-label { color: var(--green-700); }
.timeline-node.done  .timeline-label  { color: var(--ink-700); }
```

### Stage Detail Card (appears on click)
```css
.stage-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--green-500);
  border-radius: var(--radius-lg);
  padding: var(--space-6) var(--space-8);
  margin-top: var(--space-6);
  box-shadow: var(--shadow-sm);
  animation: slideUp 0.2s ease;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.stage-card h3 {
  font-family: 'DM Serif Display', serif;
  font-size: var(--text-lg);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3);
}
.stage-card p {
  font-family: 'DM Sans', sans-serif;
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  color: var(--color-text-body);
  line-height: var(--leading-loose);
  margin: 0 0 var(--space-4);
}
```

### Deadline Badge
```css
.deadline-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  font-size: var(--text-xs);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}
.deadline-badge.urgent {
  background: var(--amber-050);
  color: var(--amber-700);
  border: 1px solid var(--amber-100);
}
.deadline-badge.upcoming {
  background: var(--ink-050);
  color: var(--ink-500);
  border: 1px solid var(--ink-100);
}
.deadline-badge.passed {
  background: var(--red-050);
  color: var(--red-700);
  border: 1px solid var(--red-100);
}
```

### Countdown Timer
```css
.countdown-block {
  display: flex;
  gap: var(--space-4);
  align-items: baseline;
}
.countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.countdown-number {
  font-family: 'DM Serif Display', serif;
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
  font-variant-numeric: tabular-nums;
  line-height: 1;
}
.countdown-label {
  font-family: 'DM Sans', sans-serif;
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--color-text-hint);
  margin-top: var(--space-1);
}
.countdown-sep {
  font-family: 'DM Serif Display', serif;
  font-size: var(--text-xl);
  color: var(--ink-100);
  margin-bottom: 8px;
}
```

### FAQ Accordion
```css
.faq-item {
  border-bottom: 1px solid var(--color-border);
}
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-5) 0;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: var(--text-base);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  transition: color 0.15s;
}
.faq-question:hover { color: var(--green-700); }
.faq-chevron {
  width: 18px; height: 18px;
  color: var(--color-text-muted);
  transition: transform 0.2s;
  flex-shrink: 0;
}
.faq-item.open .faq-chevron { transform: rotate(180deg); }
.faq-answer {
  font-family: 'DM Sans', sans-serif;
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  color: var(--color-text-body);
  line-height: var(--leading-loose);
  padding-bottom: var(--space-5);
  display: none;
}
.faq-item.open .faq-answer { display: block; }
```

### Input / Chat Bar
```css
.chat-input-bar {
  display: flex;
  align-items: flex-end;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  position: sticky;
  bottom: 0;
}
.chat-input {
  flex: 1;
  font-family: 'DM Sans', sans-serif;
  font-size: var(--text-base);
  color: var(--color-text-primary);
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-3) var(--space-5);
  resize: none;
  min-height: 44px;
  max-height: 120px;
  outline: none;
  transition: border-color 0.15s;
  line-height: var(--leading-normal);
}
.chat-input:focus { border-color: var(--green-400); }
.chat-send-btn {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--ink-900);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, transform 0.1s;
}
.chat-send-btn:hover   { background: var(--green-500); }
.chat-send-btn:active  { transform: scale(0.95); }
.chat-send-btn svg     { color: white; width: 18px; height: 18px; }
```

### CTA Button
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: var(--ink-900);
  color: var(--white);
  border: none;
  border-radius: var(--radius-md);
  font-family: 'DM Sans', sans-serif;
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
  text-decoration: none;
}
.btn-primary:hover  { background: var(--green-700); }
.btn-primary:active { transform: scale(0.98); }

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  font-family: 'DM Sans', sans-serif;
  font-size: var(--text-sm);
  font-weight: var(--weight-bold);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.btn-secondary:hover { border-color: var(--green-400); background: var(--green-050); }
```

### Jurisdiction Selector
```css
.jurisdiction-select {
  appearance: none;
  font-family: 'DM Sans', sans-serif;
  font-size: var(--text-base);
  color: var(--color-text-primary);
  background: var(--color-surface) url("data:image/svg+xml,...") no-repeat right 12px center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-10) var(--space-3) var(--space-4);
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s;
  min-width: 200px;
}
.jurisdiction-select:focus { border-color: var(--green-400); }
```

---

## Motion & Micro-interactions

### Global Transitions
```css
* { box-sizing: border-box; }
a, button, input, select, textarea { transition: all 0.15s ease; }
```

### Page Section Entry
```css
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.section-enter {
  animation: fadeSlideUp 0.3s ease forwards;
}
/* Stagger children */
.section-enter > *:nth-child(1) { animation-delay: 0.00s; }
.section-enter > *:nth-child(2) { animation-delay: 0.05s; }
.section-enter > *:nth-child(3) { animation-delay: 0.10s; }
.section-enter > *:nth-child(4) { animation-delay: 0.15s; }
```

### Timeline Stage Click
```css
@keyframes dotPulse {
  0%   { box-shadow: 0 0 0 0   rgba(30,138,80,0.4); }
  70%  { box-shadow: 0 0 0 10px rgba(30,138,80,0); }
  100% { box-shadow: 0 0 0 0   rgba(30,138,80,0); }
}
.timeline-node.active .timeline-dot {
  animation: dotPulse 1.8s ease infinite;
}
```

### Chat message entry
```css
@keyframes bubbleIn {
  from { opacity: 0; transform: scale(0.96) translateY(6px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.bubble-ai, .bubble-user {
  animation: bubbleIn 0.2s ease forwards;
}
```

---

## Topbar / Header

```html
<header class="topbar">
  <div class="topbar-inner">
    <a class="brand" href="/">
      <span class="brand-mark">E</span>
      <span class="brand-name">ElectroGuide</span>
    </a>
    <div class="topbar-actions">
      <select class="jurisdiction-select" id="jurisdiction">
        <option value="">Select region...</option>
        <option value="us-federal">United States — Federal</option>
        <option value="us-ca">California</option>
        <option value="us-tx">Texas</option>
        <option value="in">India</option>
      </select>
      <button class="btn-primary" id="save-dates-btn">
        <svg><!-- calendar icon --></svg>
        Save key dates
      </button>
    </div>
  </div>
</header>
```

```css
.topbar {
  height: 60px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}
.topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 var(--space-6);
}
.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
}
.brand-mark {
  width: 32px; height: 32px;
  border-radius: var(--radius-md);
  background: var(--ink-900);
  color: var(--white);
  font-family: 'DM Serif Display', serif;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.brand-name {
  font-family: 'DM Serif Display', serif;
  font-size: var(--text-md);
  color: var(--color-text-primary);
}
.topbar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}
```

---

## Section: Overline Pattern

Used above any major section heading to establish context:

```html
<p class="overline">Step 3 of 6 — Voting Day</p>
<h2 class="section-heading">How voting works on election day</h2>
```

```css
.overline {
  font-family: 'DM Sans', sans-serif;
  font-size: var(--text-xs);
  font-weight: var(--weight-heavy);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--green-500);
  margin: 0 0 var(--space-2);
}
.section-heading {
  font-family: 'DM Serif Display', serif;
  font-size: var(--text-xl);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-6);
  line-height: var(--leading-tight);
}
```

---

## Accessibility Requirements

- All interactive elements: `focus-visible` ring using `outline: 2px solid var(--green-400); outline-offset: 2px;`
- Minimum contrast: 4.5:1 for body text, 3:1 for large headings
- All icons: `aria-hidden="true"` + adjacent visible text label OR `aria-label` on the button
- Timeline nodes: `role="button"`, `tabindex="0"`, `aria-expanded`, `aria-label="Stage: Voter Registration — click to expand"`
- Chat input: `aria-label="Ask Electra a question"`, `aria-live="polite"` on message container
- Color is never the sole indicator of state — always pair with icon or label
- Skip-to-content link: first focusable element on every page

```css
:focus-visible {
  outline: 2px solid var(--green-400);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
```

---

## Mobile Responsive Rules

```css
@media (max-width: 768px) {
  /* Sidebar becomes bottom tab bar */
  .sidebar { display: none; }
  .bottom-tab-bar { display: flex; }

  /* Content fills full width */
  .main-content { padding: var(--space-4); }

  /* Timeline scrolls horizontally */
  .timeline-track {
    overflow-x: auto;
    padding-bottom: var(--space-4);
    -webkit-overflow-scrolling: touch;
  }

  /* Chat bubbles max-width wider on mobile */
  .bubble-ai, .bubble-user { max-width: 92%; }

  /* Hero text scales down */
  .section-heading { font-size: var(--text-lg); }

  /* Topbar actions collapse */
  .topbar-actions .jurisdiction-select { display: none; }
}

/* Bottom tab bar */
.bottom-tab-bar {
  display: none;
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 60px;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  z-index: 100;
}
.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  color: var(--color-text-muted);
  cursor: pointer;
}
.tab-item.active { color: var(--green-700); }
.tab-item svg { width: 22px; height: 22px; }
```

---

## Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:           #0D0F0E;
    --color-surface:      #161918;
    --color-surface-alt:  #1E2220;
    --color-border:       #2C302D;
    --color-border-strong:#4A5050;

    --color-text-primary: #F0F2F1;
    --color-text-body:    #C8CCCA;
    --color-text-muted:   #8C9190;
    --color-text-hint:    #4A5050;

    --color-accent:       var(--green-400);
    --color-accent-light: rgba(30,138,80,0.15);
    --color-accent-text:  var(--green-200);
  }

  .bubble-user {
    background: var(--green-700);
  }
  .brand-mark {
    background: var(--green-500);
  }
}
```

---

## What NOT to do in ElectroGuide UI

- No hero illustrations of ballot boxes, voting booths, or flag graphics — they read as stock art
- No blue + red "political" color schemes — this is neutral civic education
- No card grid layouts for the main chat — chat is always a vertical thread
- No modal popups for stage explanations — use inline expanding cards
- No full-page loaders — use skeleton screens or inline spinners per-component
- No toast notifications for every action — only for async failures (Calendar save failed)
- No "Powered by Gemini" branding in the UI itself — put it discreetly in the footer

---

## Quick Reference Cheatsheet

| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| Page title | DM Serif Display | 42px | — | `--color-text-primary` |
| Section heading | DM Serif Display | 30px | — | `--color-text-primary` |
| Overline | DM Sans | 11px | 600 | `--color-accent` |
| Body | DM Sans | 15px | 300 | `--color-text-body` |
| Label | DM Sans | 13px | 500 | `--color-text-muted` |
| Chat AI | DM Sans | 15px | 300 | `--color-text-body` |
| Timer number | DM Serif Display | 42px | — | `--color-text-primary` |
| Badge | DM Sans | 11px | 600 | semantic |
| Button | DM Sans | 13px | 600 | white on `--ink-900` |
| Nav item | DM Sans | 13px | 500 | `--color-text-muted` |
