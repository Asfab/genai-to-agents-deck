import { Slide, Reveal, Stagger, Em, CountUp } from '../../components'
import { Chip } from './parts/bits'

export const meta = {
  title: 'Meet IBM Bob',
  steps: 0,
  notes: `**IBM Bob = IBM's AI software development partner.** It lives in your IDE. Not just autocomplete: it helps across the whole lifecycle — plan, code, test, modernise, ship.

- Modes: **Ask** (explain this code), **Plan** (design the change), **Agent** (go make the change across files)
- **45%** average productivity gain reported by users; **80,000+ IBMers** already build with it
- **30 → 3 days:** Blue Pearl finished a 30-day Java upgrade in 3 days, saving 160+ engineering hours
- **~40% less compute:** picks the right model per task — Claude, Mistral or IBM Granite
- **Secure by design:** sensitive-data scanning, policy checks and red-teaming built in

Point: *the same "agent" idea from Act 3 — applied to writing software.*

**Ask:** "How many of you used an AI coding assistant for your last lab or project?" Then: "Did it plan, or just autocomplete?"

**Transition:** "Let's watch Bob build the TicketTown agent for us."`,
}

const stats = [
  { to: 45, suffix: '%', title: 'More productive', text: 'Average gain reported by users. 80,000+ IBMers build with Bob.' },
  { pre: '30 → ', to: 3, title: 'Days, not weeks', text: 'Blue Pearl: a 30-day Java upgrade done in 3 days.' },
  { pre: '~', to: 40, suffix: '%', title: 'Less compute', text: 'Picks Claude, Mistral or IBM Granite per task.' },
]

export default function Bob() {
  return (
    <Slide section="industry" kicker="IBM Bob" title={<>Meet Bob, your AI <Em>development partner</Em></>}
      lede="Not just autocomplete. Bob helps across the whole lifecycle, from first plan to production.">
      <div className="row fill" style={{ alignItems: 'stretch' }}>
        <Reveal as="scale" className="card ink" style={{ flex: '0 0 520px', justifyContent: 'space-between', padding: '40px 44px' }}>
          <div className="h2">Hi, I'm Bob.</div>
          <div className="col" style={{ gap: 18 }}>
            <div className="label" style={{ color: 'inherit', opacity: .6 }}>Three modes</div>
            {[['Ask', 'Explain this codebase'], ['Plan', 'Design the change'], ['Agent', 'Make it, across files']].map(([m, d]) => (
              <div key={m} className="row" style={{ gap: 20, alignItems: 'baseline', borderTop: '1px solid rgba(255,255,255,.18)', paddingTop: 16 }}>
                <span className="h3" style={{ flex: '0 0 120px' }}>{m}</span><span className="small">{d}</span>
              </div>
            ))}
          </div>
          <div className="row" style={{ gap: 10, flexWrap: 'wrap' }}><Chip tone="accent">🔒 Secure by design</Chip></div>
        </Reveal>
        <Stagger delay={0.35} className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', flex: 1 }}>
          {stats.map((s) => (
            <div key={s.title} className="card" style={{ flex: 1, justifyContent: 'space-between' }}>
              <div className="stat-value">{s.pre}<CountUp to={s.to} suffix={s.suffix || ''} /></div>
              <div className="col" style={{ gap: 12 }}>
                <div className="card-title">{s.title}</div>
                <div className="card-text">{s.text}</div>
              </div>
            </div>
          ))}
        </Stagger>
      </div>
    </Slide>
  )
}
