import { Slide, Reveal, Em, Pill } from '../../components'

export const meta = {
  title: 'Thank you',
  steps: 0,
  notes: `**Close warmly and briefly.**

- Thank the department, the faculty coordinator and the students by name
- One-line recap: GenAI predicts → prompting steers → agents act → industry governs. "And you can build one this weekend."
- Invite them to connect on LinkedIn and share what they build — "tag me, I'll look at it"

**TODO before the talk:** replace the placeholder handles on this slide with your real LinkedIn and GitHub (in 15-thank-you.jsx → \`contacts\`).

Leave this slide up while people walk out / come to talk.`,
}

// TODO(presenter): fill in real handles.
const contacts = [
  { label: 'LinkedIn', value: 'linkedin.com/in/…' },
  { label: 'GitHub', value: 'github.com/…' },
]

export default function ThankYou() {
  return (
    <Slide section="industry" footer={false}>
      <div className="col fill" style={{ justifyContent: 'space-between' }}>
        <Reveal as="fade"><Pill>Thank you</Pill></Reveal>
        <div className="col" style={{ gap: 40 }}>
          <Reveal delay={0.1}><h1 className="hero">Go build an agent<br /><Em>this weekend.</Em></h1></Reveal>
          <Reveal delay={0.3}><p className="lede">Then show me what it does. I'd genuinely love to see it.</p></Reveal>
        </div>
        <Reveal delay={0.5} as="fade" className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--line)', paddingTop: 36 }}>
          <div className="col" style={{ gap: 8 }}>
            <div className="h2">Asfab K</div>
            <div className="body">IBM · watsonx Orchestrate</div>
          </div>
          <div className="row" style={{ gap: 64 }}>
            {contacts.map((c) => (
              <div key={c.label} className="col" style={{ gap: 10 }}>
                <span className="label">{c.label}</span>
                <span className="h3 mono">{c.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}
