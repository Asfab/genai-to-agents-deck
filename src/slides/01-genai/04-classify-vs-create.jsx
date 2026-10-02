import { Slide, Reveal, Card, Em, Label } from '../../components'

export const meta = {
  title: 'Discriminative vs generative',
  steps: 2,
  notes: `Two families of models. Most of your ML coursework is the left side.

- **Discriminative** — sorts inputs into boxes. Answers *"which one?"* Spam/not spam, cat/dog, fraud/genuine.
- (click) **Generative** — learns what the data *looks like*, so it can produce new examples. Answers *"what comes next?"*
- (click) Punchline: same data, different question.

**Ask:** "Your college plagiarism checker — discriminative or generative?" (Discriminative: it labels. The essay-writer it's catching is generative.)

**Transition:** "So how does a generative model write a whole paragraph? It's simpler — and weirder — than you think."`,
}

const Panel = ({ tag, title, sub, input, output, outputClass, variant }) => (
  <Card variant={variant} style={{ gap: 14, padding: '32px 44px' }}>
    <Label>{tag}</Label>
    <div className="h2">{title}</div>
    <div className="body">{sub}</div>
    <div className="col" style={{ gap: 10, marginTop: 'auto' }}>
      <Label>Input</Label>
      <div className="prompt-box">{input}</div>
      <div className="accent" style={{ fontSize: 32, lineHeight: 1, textAlign: 'center' }}>↓</div>
      <Label>Output</Label>
      <div className={`prompt-box ${outputClass}`}>{output}</div>
    </div>
  </Card>
)

export default function ClassifyVsCreate() {
  return (
    <Slide section="genai" kicker="Two kinds of models" title={<>Classify, or <Em>create</Em>?</>}>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr auto' }}>
        <Reveal at={0} style={{ display: 'flex' }}>
          <Panel tag="Discriminative" title="Draws a line" sub={<>Answers <b>"which one?"</b></>}
            input="Email: “Congrats! You won ₹50,000. Click here…”" output="SPAM  (97% sure)" outputClass="bad" />
        </Reveal>
        <Reveal at={1} style={{ display: 'flex' }}>
          <Panel variant="tint" tag="Generative" title="Makes something new" sub={<>Answers <b>"what comes next?"</b></>}
            input="Write a polite leave request to my HOD for Friday." output="Dear Sir, I request leave on Friday as I have to attend…" outputClass="good" />
        </Reveal>
        <Reveal at={2} as="scale" style={{ gridColumn: '1 / -1' }}>
          <div className="card ink" style={{ padding: '24px 44px', flexDirection: 'row', alignItems: 'center', gap: 24 }}>
            <span className="h3">Generative models learn what data <i>looks like</i> — so they can produce more of it.</span>
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}
