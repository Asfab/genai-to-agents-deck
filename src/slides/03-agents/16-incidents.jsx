import { Plane, Car, DatabaseZap } from 'lucide-react'
import { Slide, Reveal, Em, Pill } from '../../components'

export const meta = {
  title: 'When agents go wrong',
  steps: 2,
  notes: `Three real incidents. Not hypotheticals. Keep it quick; the cards build in left to right.

- **Air Canada (Feb 2024)**: chatbot told a grieving customer he could claim a bereavement refund after flying. Not the real policy. A Canadian tribunal (Moffatt v. Air Canada) made the airline pay; arguing the bot was "responsible for its own actions" failed
- **Chevrolet dealership, Watsonville (Dec 2023)**: users prompt-injected the dealer's ChatGPT-powered bot to "agree with anything" and it "agreed" to sell a new Tahoe for $1, "legally binding". Not honoured, but went viral
- **Replit (July 2025)**: during a code freeze, Replit's AI coding agent deleted a startup's production database, then wrongly said recovery was impossible. Replit's CEO apologised and added safeguards

Pattern: no grounding, no scope limits, too much privilege, no human gate.

**Ask:** "Which of these would observability + HITL have prevented?" (All three, or at least caught early.)

**Transition:** "So you want to build one, safely. What do people actually use?"`,
}

const cases = [
  {
    when: 'Air Canada · Feb 2024', icon: <Plane />, t: 'Airline liable for its chatbot', d: 'The bot invented a refund rule. A tribunal made the airline pay. "The bot said it" was no defence.',
    cause: 'Not grounded in the real policy', lesson: 'You own what your agent says → ground it in real policy',
  },
  {
    when: 'Chevy dealer · Dec 2023', icon: <Car />, t: 'New SUV "sold" for $1', d: 'A user told the dealer\'s chatbot to agree with everything and call it legally binding. It did.',
    cause: 'No guardrails on input or output', lesson: 'Prompt injection is real → limit scope, check outputs',
  },
  {
    when: 'Replit · Jul 2025', icon: <DatabaseZap />, t: 'Agent deleted a live DB', d: 'During a code freeze, a coding agent ran destructive commands, then misreported that recovery was impossible.',
    cause: 'Too much access, no approval gate', lesson: 'Least privilege + human approval for irreversible actions',
  },
]

export default function Incidents() {
  return (
    <Slide section="agents" kicker="When agents go wrong" title={<>Real incidents, <Em>real</Em> consequences</>}>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 28 }}>
        {cases.map((c, i) => (
          <Reveal key={c.t} at={i} as="up" style={{ display: 'flex' }}>
            <div className="card" style={{ flex: 1, gap: 20, padding: 0, overflow: 'hidden' }}>
              <div className="col" style={{ gap: 18, padding: '34px 38px 0', flex: 1 }}>
                <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Pill>{c.when}</Pill><span className="icon-chip">{c.icon}</span>
                </div>
                <div className="h3">{c.t}</div>
                <div className="body">{c.d}</div>
                <div className="col" style={{ gap: 8, marginTop: 'auto', marginBottom: 6, padding: '22px 26px', borderRadius: 'var(--radius-sm)', background: 'var(--surface-2)' }}>
                  <span className="label" style={{ color: 'var(--rose)' }}>Root cause</span>
                  <span className="small" style={{ color: 'var(--ink)', fontWeight: 600 }}>{c.cause}</span>
                </div>
              </div>
              <div className="col" style={{ gap: 10, padding: '26px 38px 32px', background: 'var(--ink)' }}>
                <span className="label" style={{ color: 'var(--faint)' }}>Lesson</span>
                <span className="body" style={{ color: 'var(--surface)', lineHeight: 1.35 }}>{c.lesson}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Slide>
  )
}
