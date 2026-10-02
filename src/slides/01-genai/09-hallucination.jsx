import { Slide, Reveal, Chat, Card, Em, Label } from '../../components'

export const meta = {
  title: 'Why LLMs hallucinate',
  steps: 4,
  notes: `**Hallucination** = a confident, fluent answer that's simply made up.

- Read the chat. The model has *no way* to know what the canteen served — but "masala dosa" is a very likely-sounding answer
- (clicks) Why it happens:
  - It's trained to produce **plausible** text, not **verified** text
  - Its knowledge stops at a **training cutoff** — no live data
  - It has no built-in "I'm not sure" — it fills the gap with a likely guess
- (click) The fixes: give it real sources (RAG — coming up), give it tools, and **you** verify anything that matters

**Ask:** "Has an AI ever confidently given you a wrong answer or a fake reference?" (Lots of nods — get one story.)

**Transition:** "Hallucination is one limit. A bigger one: on its own, an LLM can't *do* anything."`,
}

const reasons = [
  { icon: '🎲', title: 'Plausible ≠ true', text: 'It is trained to sound likely, not to check facts.' },
  { icon: '📅', title: 'Frozen knowledge', text: 'Training stops at a cutoff date. No live data.' },
  { icon: '🤷', title: 'No built-in "I don\'t know"', text: 'Gaps get filled with a confident guess.' },
]

export default function Hallucination() {
  return (
    <Slide section="genai" kicker="Limit #1" title={<>Fluent is not the same as <Em>true</Em></>}>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <Card variant="flat" style={{ gap: 26, padding: '40px 44px' }}>
          <Label>A real-looking chat</Label>
          <Chat style={{ flex: 1 }} messages={[
            { from: 'user', text: 'What did our college canteen serve for lunch yesterday?' },
            { from: 'ai', text: 'Yesterday your canteen served masala dosa with sambar and coconut chutney, followed by filter coffee. ☕' },
          ]} />
          <div className="prompt-box bad" style={{ fontFamily: 'var(--font-body)' }}>
            <b>Made up.</b> It has never seen your canteen — but the answer <i>sounds</i> right.
          </div>
        </Card>
        <div className="col" style={{ gap: 20 }}>
          {reasons.map((r, i) => (
            <Reveal key={r.title} at={i + 1} as="left" className="row card" style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 28, padding: '24px 36px' }}>
              <span style={{ fontSize: 48, lineHeight: 1 }}>{r.icon}</span>
              <div className="col" style={{ gap: 6 }}>
                <div className="card-title">{r.title}</div>
                <div className="card-text">{r.text}</div>
              </div>
            </Reveal>
          ))}
          <Reveal at={4} as="scale" className="card ink" style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 28, padding: '24px 36px' }}>
            <span style={{ fontSize: 48, lineHeight: 1 }}>✅</span>
            <div className="col" style={{ gap: 6 }}>
              <div className="card-title">Fix: give it sources & tools</div>
              <div className="card-text">…and verify anything that matters.</div>
            </div>
          </Reveal>
        </div>
      </div>
    </Slide>
  )
}
