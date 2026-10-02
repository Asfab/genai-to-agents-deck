# Authoring slides

React + Vite deck on a fixed **1920×1080 canvas** that scales to any screen. Light theme, projector-first.

## Where things live
```
src/theme/tokens.css     colours, fonts, sizes  ← change the whole deck's look here
src/theme/global.css     shared classes (.card, .bullets, .code, .prompt-box, .chat …)
src/components/          <Slide>, <Reveal>, <Stagger>, <Card>, <Grid>, <Flow>, <Bullets>, <Stat>, <Typewriter>, <Chat> …
src/engine/              deck navigation, phone remote, speaker view (don't touch for content changes)
src/slides/<NN-section>/<NN-name>.jsx   one file per slide; ORDER = folder name then file name
```
Sections: `00-opening` · `01-genai` (violet) · `02-prompting` (amber) · `03-agents` (blue) · `04-industry` (emerald).
To insert a slide between `03-x.jsx` and `04-y.jsx`, name it `03b-z.jsx`.

## A slide file
```jsx
import { Slide, Reveal, Stagger, Card, Grid, Em, Bullets } from '../../components'

export const meta = {
  title: 'Short title for the remote/overview',
  steps: 2,              // number of clicks this slide consumes (highest `at` used)
  notes: `Speaker notes. Blank line = paragraph.

- lines starting "- " become bullets
- **bold** works`,
}

export default function MySlide() {
  return (
    <Slide section="genai" kicker="Section label" title={<>Big idea in <Em>one line</Em></>} lede="Optional sub-headline">
      <Grid cols={3}>
        <Reveal at={0}><Card icon="⚡" title="Shown on entry" text="…" /></Reveal>
        <Reveal at={1}><Card title="After click 1" /></Reveal>
        <Reveal at={2} as="scale"><Card variant="ink" title="After click 2" /></Reveal>
      </Grid>
    </Slide>
  )
}
```

## Rules (keep the deck consistent)
- **Never hard-code colours or font sizes.** Use classes (`.title .lede .h2 .h3 .body .small .mono .em .accent .muted`) and tokens (`var(--accent)`, `var(--ink)`, `var(--surface-2)`, `var(--radius)` …). Inline `style` only for layout (flex, grid sizes, gaps, widths).
- **Fill the canvas.** Content area is ~1728×860 px under the header. Use `Grid`/`.grid` (it flexes to fill height) and big type. Body text never below 24px; prefer 28–36px.
- **One idea per slide.** Headline ≤ 2 lines; ≤ 5 bullets; ~ 30 words of body text max. Students, not experts: plain words, concrete examples (Indian context welcome: Swiggy, Zomato, IRCTC, UPI, Kochi…).
- **Animate with intent.** Entry cascades via `<Stagger>`; build-ups via `at={n}` and `meta.steps`. Don't exceed ~5 steps per slide.
- **Every slide has notes** – what to say, a question to ask the room, the transition line to the next slide.
- Diagrams: compose with Cards + `<Flow>` or inline SVG using `currentColor` / CSS vars. No external images needed.
- No dark full-slide backgrounds. A single `variant="ink"` card for emphasis is fine.

## Check your work
```
npm run dev -- --port 5181          # then open http://localhost:5181
node scripts/shot.mjs /tmp/shots 5 6 7   # 1920×1080 PNGs, all steps revealed
```
Keys: → / Space next · ← back · F full screen · G grid · R phone remote QR · S speaker view.
