import { Slide, Reveal, Grid, Em, Label, Typewriter, Flow, Card } from '../../components'

export const meta = {
  title: 'Structured output (JSON)',
  steps: 2,
  notes: `This one is for the developers in the room.

- Prose is great for humans, terrible for code. If your app expects JSON and gets a paragraph, it crashes
- So: name the keys, say "ONLY JSON", give the format
- **(click 1)** Clean JSON — \`json.loads()\` and you're done. Note it normalised the date and class
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

export default function StructuredOutput() {
  return (
    <Slide section="prompting" kicker="Structured output" title={<>Ask for <Em>JSON</Em>, get data your code can use</>}>
      <Grid cols={2} style={{ flex: 'none', height: 440 }}>
        <Reveal delay={0.1} className="col" style={{ gap: 16 }}>
          <Label>Prompt</Label>
          <Typewriter text={prompt} speed={70} className="prompt-box fill" />
        </Reveal>
        <Reveal at={1} as="right" className="col" style={{ gap: 16 }}>
          <Label>Model output</Label>
          <pre className="code fill" style={{ fontSize: 'var(--fs-body)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
{'{\n'}  <span className="k">"name"</span>: <span className="s">"Ananya"</span>,{'\n'}  <span className="k">"from"</span>: <span className="s">"Kochi"</span>,{'\n'}  <span className="k">"to"</span>: <span className="s">"Bengaluru"</span>,{'\n'}  <span className="k">"date"</span>: <span className="s">"2026-11-14"</span>,{'\n'}  <span className="k">"class"</span>: <span className="s">"3A"</span>{'\n}'}
          </pre>
        </Reveal>
      </Grid>
      <Flow at={2} style={{ flex: 1 }} nodes={[
        <Card variant="flat" icon="🧠" title="LLM" text="Understands messy text" />,
        <Card variant="flat" icon="{ }" title="JSON" text="Predictable structure" />,
        <Card variant="flat" icon="🐍" title="Your code" text="json.loads() → validate" />,
        <Card variant="ink" icon="⚡" title="Action" text="Book ticket · save to DB" />,
      ]} />
    </Slide>
  )
}
