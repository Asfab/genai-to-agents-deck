import { Slide, Reveal, Grid, Em, Label, Typewriter, Flow, Card } from '../../components'

export const meta = {
  title: 'Structured output (JSON)',
  steps: 2,
  notes: `This one is for the developers in the room.

- Prose is great for humans, terrible for code. If your app expects JSON and gets a paragraph, it crashes
- So: name the keys, say "ONLY JSON", give the format
- **(click 1)** Clean JSON — \`json.loads()\` and you're done. Note it normalised the date and the class code
- **(click 2)** Now your program can act on it: validate, call the booking API, save to DB

Big idea: this is exactly how **agents** call tools — the model emits structured output, code executes it. Hold that thought for Act 3.

**Ask:** "Anyone built a project that calls an LLM API? How did you parse the response?"

**Transition:** "Who sets these rules in a real app? The system prompt."`,
}

const prompt = `Extract booking details from the message.
Return ONLY JSON with keys:
name, from, to, date (YYYY-MM-DD), class.

Message: "hey pls book Ananya on
Kochi → Bengaluru, 14 Nov, 3AC 🙏"`

const K = ({ k, v, last }) => <>{'  '}<span className="k">"{k}"</span>: <span className="s">"{v}"</span>{last ? '' : ','}{'\n'}</>

export default function StructuredOutput() {
  return (
    <Slide section="prompting" kicker="Structured output" title={<>Ask for <Em>JSON</Em>, get data your code can use</>}>
      <Grid cols={2} style={{ gridTemplateColumns: '1.15fr 1fr', flex: 1.7 }}>
        <Reveal delay={0.1} className="col" style={{ gap: 16 }}>
          <Label>Prompt</Label>
          <Typewriter text={prompt} speed={70} className="prompt-box" style={{ flex: 1, display: 'flex', alignItems: 'center' }} />
        </Reveal>
        <Reveal at={1} as="right" className="col" style={{ gap: 16 }}>
          <Label>Model output</Label>
          <div className="code" style={{ flex: 1, display: 'flex', alignItems: 'center', fontSize: 'var(--fs-body)' }}>
            <div>{'{\n'}<K k="name" v="Ananya" /><K k="from" v="Kochi" /><K k="to" v="Bengaluru" /><K k="date" v="2026-11-14" /><K k="class" v="3A" last />{'}'}</div>
          </div>
        </Reveal>
      </Grid>
      <Flow at={2} style={{ flex: 1 }} nodes={[
        <FlowCard icon="🧠" title="LLM" text="reads messy text" />,
        <FlowCard icon="{ }" title="JSON" text="predictable shape" />,
        <FlowCard icon="🐍" title="Your code" text="json.loads()" />,
        <FlowCard ink icon="⚡" title="Action" text="book · save · notify" />,
      ]} />
    </Slide>
  )
}

const FlowCard = ({ icon, title, text, ink }) => (
  <Card variant={ink ? 'ink' : 'flat'} style={{ flexDirection: 'row', alignItems: 'center', gap: 22, padding: '0 32px' }}>
    <div className="icon">{icon}</div>
    <div className="col" style={{ gap: 4 }}>
      <div className="card-title">{title}</div>
      <div className="card-text">{text}</div>
    </div>
  </Card>
)
