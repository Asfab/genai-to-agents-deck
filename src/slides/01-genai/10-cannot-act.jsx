import { Slide, Reveal, Stagger, Em, Label } from '../../components'

export const meta = {
  title: 'What an LLM cannot do alone',
  steps: 2,
  notes: `Scenario: you ask an LLM to plan a weekend trip to Munnar with 4 friends.

- **It can think & write** — suggest places, draft a day plan, estimate a budget, write the group message. Great.
- (click) **But on its own it cannot act** — it can't check this weekend's weather, see which buses have seats, book the homestay, or send the message. It has no hands, no live data.
- (click) The bridge: give the LLM **tools**, **memory** and a **loop** to plan → act → check. That's an **AI agent** — Act 3.

**Ask:** "What's one task you'd love AI to actually *do* for you, end-to-end?" (Remember answers — reuse them in Act 3.)

**Transition:** "Before agents, let's look at who builds these models and what they're good for today."`,
}

const can = ['Suggest places to visit in Munnar', 'Draft a day-by-day plan', 'Estimate a budget for 4 friends', 'Write the message to your group']
const cannot = ["Check this weekend's weather", 'See which buses still have seats', 'Book and pay for the homestay', 'Send the message for you']

const Col = ({ variant, icon, head, sub, items, mark }) => (
  <div className={`card ${variant}`} style={{ flex: 1, gap: 26, padding: '40px 48px' }}>
    <div className="row" style={{ alignItems: 'center', gap: 22 }}>
      <span style={{ fontSize: 56, lineHeight: 1 }}>{icon}</span>
      <div className="col" style={{ gap: 6 }}>
        <Label>{sub}</Label>
        <div className="h2">{head}</div>
      </div>
    </div>
    <Stagger className="col" gap={0.08} style={{ gap: 18, flex: 1, justifyContent: 'space-evenly' }}>
      {items.map((t) => (
        <div key={t} className="row body" style={{ gap: 18, alignItems: 'center', color: 'var(--ink)' }}>
          <span className="mono" style={{ fontSize: 30, fontWeight: 600, width: 36, flex: 'none' }}>{mark}</span>{t}
        </div>
      ))}
    </Stagger>
  </div>
)

export default function CannotAct() {
  return (
    <Slide section="genai" kicker="Limit #2" title={<>An LLM can think — but it <Em>can't act</Em></>}
      lede="Ask it to plan your weekend trip to Munnar with 4 friends…">
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr auto' }}>
        <Reveal at={0} style={{ display: 'flex' }}>
          <Col variant="tint" icon="🧠" sub="It can" head="Think & write" items={can} mark="✓" />
        </Reveal>
        <Reveal at={1} style={{ display: 'flex' }}>
          <Col variant="flat" icon="✋" sub="On its own, it cannot" head="Act in the real world" items={cannot} mark="✗" />
        </Reveal>
        <Reveal at={2} as="scale" style={{ gridColumn: '1 / -1' }}>
          <div className="card ink" style={{ padding: '26px 44px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="h3">LLM + tools + memory + a loop = an <span className="em" style={{ color: 'inherit' }}>AI agent</span></span>
            <span className="body">→ Act 3</span>
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}
