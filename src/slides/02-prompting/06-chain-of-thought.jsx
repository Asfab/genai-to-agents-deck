import { Slide, Reveal, Grid, Em, Label } from '../../components'

export const meta = {
  title: 'Chain of thought',
  steps: 2,
  notes: `Read the question out. Let the room answer first (most get it in their head).

- **(click 1) Direct answer:** the model jumps to a number — and forgets the delay. Confident, wrong
- **(click 2) "Think step by step":** each line it writes becomes context for the next token. It literally reasons on paper
- Connect to Act 1: an LLM only "thinks" while it generates text — so give it room to write the steps

Note: newer "reasoning" models (o-series, Claude/Gemini thinking modes, Granite reasoning) do this internally — but asking for steps still helps you **check** the logic.

**Ask:** "When would you *not* want step by step?" (simple lookups, when you need short output fast)

**Transition:** "Steps help humans read the answer. But what if a *program* needs to read it?"`,
}

export default function ChainOfThought() {
  return (
    <Slide section="prompting" kicker="Chain-of-thought" title={<>Hard problem? Ask it to <Em>think step by step</Em></>}>
      <Reveal delay={0.1} className="prompt-box" style={{ fontSize: 'var(--fs-body)' }}>
        My train leaves Ernakulam at <b>6:40 AM</b>. The journey takes <b>9 h 35 min</b> and it's running <b>25 min late</b>. When do I reach Bengaluru?
      </Reveal>
      <Grid cols={2} style={{ gridTemplateColumns: '1fr 1.3fr' }}>
        <Reveal at={1} className="card flat" style={{ justifyContent: 'space-between' }}>
          <Label>Direct answer</Label>
          <div className="col" style={{ gap: 12 }}>
            <div style={{ font: '700 120px/1 var(--font-display)', letterSpacing: '-.04em', color: 'var(--rose)' }}>4:15 PM</div>
            <div className="body">Confident… and forgot the 25-minute delay. ✗</div>
          </div>
        </Reveal>
        <Reveal at={2} className="card tint" style={{ justifyContent: 'space-between' }}>
          <Label>+ “Think step by step”</Label>
          <ol className="col mono" style={{ gap: 18, listStyle: 'none', fontSize: 'var(--fs-body)' }}>
            <li>1 · 6:40 AM + 9 h → <b>3:40 PM</b></li>
            <li>2 · 3:40 PM + 35 min → <b>4:15 PM</b></li>
            <li>3 · 4:15 PM + 25 min delay → <b className="accent">4:40 PM ✓</b></li>
          </ol>
          <div className="small">Each written step becomes context for the next token.</div>
        </Reveal>
      </Grid>
    </Slide>
  )
}
