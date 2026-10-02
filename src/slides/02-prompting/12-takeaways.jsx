import { Slide, Reveal, Bullets, Em, Grid } from '../../components'

export const meta = {
  title: 'Prompting: takeaways',
  steps: 1,
  notes: `Four lines to remember — then the bridge to Act 3. The four bullets slide in on the left; about a second later the black "Up next" card appears on the right.

- Specific beats clever: role, task, context, format, constraints
- Examples fix format; steps fix reasoning
- JSON turns answers into data your code can use
- Iterate, and verify what comes back

**The black card is the bridge:** everything so far is the model *talking*. Remember the JSON slide — what if the model's output wasn't an answer, but a decision: "call the booking API with these arguments"? That's an agent.

**Transition:** "Prompts tell a model what to say. Agents let it decide what to *do*. Let's see how."`,
}

export default function Takeaways() {
  return (
    <Slide section="prompting" kicker="Takeaways" title={<>Prompting in <Em>four lines</Em></>}>
      <Grid cols={2} style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }}>
        <div className="card flat" style={{ justifyContent: 'center', padding: '48px 52px' }}>
          <Bullets style={{ gap: 52 }} items={[
            <><b>Be specific</b> — role, task, context, format, constraints.</>,
            <><b>Show examples</b> for format; <b>ask for steps</b> for reasoning.</>,
            <><b>Ask for JSON</b> when code will read the answer.</>,
            <><b>Iterate and verify</b> — the first draft is never final.</>,
          ]} />
        </div>
        <Reveal at={1} as="scale" className="card ink" style={{ justifyContent: 'space-between', padding: '56px 60px' }}>
          <div className="label" style={{ color: 'var(--faint)' }}>Up next · Act 03</div>
          <div style={{ font: '400 68px/1.15 var(--font-serif)' }}>
            Prompts tell a model<br />what to <i>say</i>.<br /><br />
            Agents let it decide<br />what to <span style={{ fontStyle: 'italic', color: 'color-mix(in srgb, var(--accent) 65%, white)' }}>do</span>.
          </div>
          <div className="h3">AI Agents →</div>
        </Reveal>
      </Grid>
    </Slide>
  )
}
