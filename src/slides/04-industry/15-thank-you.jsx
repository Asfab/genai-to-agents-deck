import { Slide, Reveal, Stagger, Em } from '../../components'
import { presenters } from '../../presenters'

export const meta = {
  title: 'Thank you',
  steps: 0,
  notes: `**Close warmly and briefly.** Each presenter says one line.

- Thank the department, the faculty coordinator and the students
- One-line recap: GenAI predicts → prompting steers → agents act → industry governs. "And you can build one this weekend."
- Invite them to connect on LinkedIn and share what they build

Names and links come from **src/presenters.js**. Empty links are hidden.

Leave this slide up while people walk out / come to talk.`,
}

const ACTS = ['Generative AI', 'Prompting', 'AI Agents', 'Industry']

export default function ThankYou() {
  return (
    <Slide section="industry" footer={false}>
      <div className="col fill" style={{ justifyContent: 'space-between' }}>
        <div className="col" style={{ gap: 36, marginTop: 40 }}>
          <Reveal as="fade" className="kicker">Thank you</Reveal>
          <Reveal delay={0.1}><h1 className="hero">Go build an agent <Em>this weekend.</Em></h1></Reveal>
          <Reveal delay={0.25}><p className="lede">Then show us what it does. We'd genuinely love to see it.</p></Reveal>
        </div>

        <Stagger delay={0.4} className="grid" style={{ gridTemplateColumns: `repeat(${presenters.length}, minmax(0, 1fr))`, flex: 'none' }}>
          {presenters.map((p, i) => (
            <div key={i} className="card" style={{ flex: 1, gap: 18 }}>
              <div className="label">{p.acts.map((a) => ACTS[a - 1]).join(' · ')}</div>
              <div className="col" style={{ gap: 4 }}>
                <div className="card-title">{p.name}</div>
                <div className="small">{p.role}</div>
              </div>
              {(p.linkedin || p.github) && (
                <div className="col" style={{ gap: 10, borderTop: '1px solid var(--line)', paddingTop: 18 }}>
                  {p.linkedin && <Handle label="LinkedIn" text={p.linkedin} />}
                  {p.github && <Handle label="GitHub" text={p.github} />}
                </div>
              )}
            </div>
          ))}
        </Stagger>
      </div>
    </Slide>
  )
}

const Handle = ({ label, text }) => (
  <div className="row" style={{ gap: 14, alignItems: 'baseline', minWidth: 0 }}>
    <span className="label" style={{ width: 96, flex: 'none' }}>{label}</span>
    <span className="mono" style={{ fontSize: 24, color: 'var(--ink-2)', overflowWrap: 'anywhere' }}>{text}</span>
  </div>
)
