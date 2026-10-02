import { Slide, Reveal, Grid, Em, Label, Typewriter, Chat, Pill } from '../../components'

export const meta = {
  title: 'Zero-shot vs few-shot',
  steps: 2,
  notes: `Same task, same review — the only difference is two examples.

- **Zero-shot (left):** just ask. You get a polite paragraph — fine for a human, useless if your code needs a label
- **(click 1) Few-shot (right):** show 2 examples of input → output first
- **(click 2)** The model copies the *pattern*: labels, format, even the arrow. Two lines, perfectly parseable

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
      <Grid cols={2}>
        <Reveal delay={0.15} className="col" style={{ gap: 20 }}>
          <div className="row" style={{ alignItems: 'center', gap: 16 }}><Label>Zero-shot</Label><Pill outline>just ask</Pill></div>
          <div className="prompt-box">{zero}</div>
          <Chat style={{ marginTop: 'auto' }} messages={[{ from: 'ai', text: 'This review shows mixed sentiment. The customer was disappointed that the biryani was cold, however they appreciated the polite behaviour of…' }]} />
        </Reveal>
        <Reveal at={1} className="col" style={{ gap: 20 }}>
          <div className="row" style={{ alignItems: 'center', gap: 16 }}><Label>Few-shot</Label><Pill>2 examples first</Pill></div>
          <Typewriter at={1} speed={70} text={few} className="prompt-box good" />
          <Reveal at={2} as="scale" style={{ marginTop: 'auto', display: 'flex' }}>
            <div className="bubble ai" style={{ maxWidth: '100%', borderColor: 'var(--accent)', background: 'var(--accent-soft)' }}>
              <span className="mono" style={{ fontSize: 'var(--fs-h3)', fontWeight: 600 }}>food: −  | service: +</span>
            </div>
          </Reveal>
        </Reveal>
      </Grid>
    </Slide>
  )
}
