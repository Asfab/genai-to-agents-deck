import { Slide, Reveal, Em, Label, Typewriter, Pill } from '../../components'

export const meta = {
  title: 'Zero-shot vs few-shot',
  steps: 2,
  notes: `Same task, same review — the only difference is two examples.

- **Zero-shot (left):** just ask. You get a polite paragraph — fine for a human, useless if your code needs a label
- **(click 1) Few-shot (right):** show 2 examples of input → output first
- **(click 2)** The model copies the *pattern*: labels, format, even the arrow. One line, perfectly parseable

Rule of thumb: simple common task → zero-shot. Need a specific pattern or format → few-shot.

**Ask:** "Where would you use this?" (classify support tickets, tag expenses from UPI SMS, grade answers…)

**Transition:** "Examples fix the *format*. For hard *reasoning*, there's another trick."`,
}

const zero = `Classify this Zomato review:
"Biryani was cold but the
delivery guy was super polite."`

const few = `"Paneer tikka was amazing!"
→ food: +  | service: n/a
"Rider was rude, food okay."
→ food: 0  | service: −
"Biryani was cold but the
delivery guy was super polite."
→`

export default function ZeroVsFew() {
  return (
    <Slide section="prompting" kicker="Show, don't just tell" title={<>Zero-shot vs <Em>few-shot</Em></>}>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto 1fr', columnGap: 'var(--gap)', rowGap: 24 }}>
        <Reveal delay={0.15} className="col" style={{ gap: 18 }}>
          <div className="row" style={{ alignItems: 'center', gap: 16 }}><Label>Zero-shot</Label><Pill outline>just ask</Pill></div>
          <div className="prompt-box" style={{ minHeight: 360, display: 'flex', alignItems: 'center' }}>{zero}</div>
        </Reveal>
        <Reveal at={1} className="col" style={{ gap: 18 }}>
          <div className="row" style={{ alignItems: 'center', gap: 16 }}><Label>Few-shot</Label><Pill>2 examples first</Pill></div>
          <Typewriter at={1} speed={70} text={few} className="prompt-box good" style={{ minHeight: 360 }} />
        </Reveal>
        <Reveal delay={0.4} className="card flat" style={{ justifyContent: 'center' }}>
          <Label>Model reply</Label>
          <div className="body">“This review shows mixed sentiment. The customer was disappointed that the biryani was cold, however…”</div>
        </Reveal>
        <Reveal at={2} as="scale" className="card tint" style={{ justifyContent: 'center' }}>
          <Label>Model reply</Label>
          <div className="mono h2" style={{ color: 'var(--accent)' }}>food: −  | service: +</div>
          <div className="small">Same labels, same format — your code can parse it.</div>
        </Reveal>
      </div>
    </Slide>
  )
}
