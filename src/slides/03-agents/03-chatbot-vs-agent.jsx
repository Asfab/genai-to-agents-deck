import { MessageSquare, Bot } from 'lucide-react'
import { Slide, Reveal, Em, Label, Icon } from '../../components'

export const meta = {
  title: 'Chatbot vs agent',
  steps: 1,
  notes: `Same request, two very different outcomes.

- **Chatbot** (builds first): one reply, training data only, gives you text, *you* do the work
- **Agent** (slides in next): plans many steps, uses live data via tools, takes action, *you* approve

Point at the bottom boxes: the chatbot hands you a list; the agent hands you a PNR.

**Ask:** "Which one would you trust to spend your money?" (Good: that's why approval / human-in-the-loop matters. We'll come back to it.)

**Transition:** "So what's going on inside the agent? A loop."`,
}

const rows = [
  ['One reply to one question', 'Plans and takes many steps'],
  ['Knows only its training data', 'Uses live data through tools'],
  ['Gives you text', 'Takes action: books, sends, updates'],
  ['You do the work', 'It does the work. You approve.'],
]

const Side = ({ variant, icon, name, tagline, items, result, resultClass }) => (
  <div className={`card ${variant}`} style={{ flex: 1, padding: '40px 44px', gap: 26 }}>
    <div className="row" style={{ gap: 18, alignItems: 'center' }}>
      <Icon of={icon} chip style={variant === 'tint' ? { background: 'var(--surface)' } : undefined} />
      <div className="col" style={{ gap: 6 }}>
        <div className="h2">{name}</div>
        <div className="body">{tagline}</div>
      </div>
    </div>
    <ul className="bullets" style={{ gap: 18 }}>
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
    <div className="col" style={{ gap: 10, marginTop: 'auto' }}>
      <Label>Result</Label>
      <div className={`prompt-box ${resultClass}`}>{result}</div>
    </div>
  </div>
)

export default function ChatbotVsAgent() {
  return (
    <Slide section="agents" kicker="The difference" title={<>A chatbot <Em>talks</Em>. An agent <Em>does</Em>.</>}>
      <div className="col" style={{ gap: 14 }}>
        <Label>Same request</Label>
        <div className="prompt-box">"Get me the cheapest train from Kochi to Bengaluru on Friday evening."</div>
      </div>
      <div className="row fill" style={{ gap: 28, alignItems: 'stretch' }}>
        <Reveal as="right" style={{ display: 'flex', flex: 1 }}>
          <Side variant="flat" icon={MessageSquare} name="LLM chatbot" tagline="You ask. It answers."
            items={rows.map((r) => r[0])}
            result={'"Here are some trains you could check on the IRCTC site…"'} resultClass="bad" />
        </Reveal>
        <Reveal as="fade" className="center-all" style={{ width: 56 }}><span className="h3 muted">vs</span></Reveal>
        <Reveal at={1} as="left" style={{ display: 'flex', flex: 1 }}>
          <Side variant="tint" icon={Bot} name="AI agent" tagline="You set a goal. It gets it done."
            items={rows.map((r) => r[1])}
            result={'"6:15 pm sleeper, ₹485, 42 seats left. Book it?"'} resultClass="good" />
        </Reveal>
      </div>
    </Slide>
  )
}
