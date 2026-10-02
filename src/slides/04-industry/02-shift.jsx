import { Slide, Reveal, Stagger, Card, Em, Flow } from '../../components'
import { BigCard } from './parts/bits'

export const meta = {
  title: 'From chat to agents',
  steps: 1,
  notes: `**Big idea:** the industry moved from *AI that talks* to *AI that does*.

- **Chatbots** answer a question and stop
- **Copilots** sit next to you and suggest — you still click the buttons
- **Agents** take a goal, call tools, and finish the job — with a human approving what matters

**Click →** what enterprises now demand (this is what every RFP I see asks for):
- **Choice of models** — no lock-in to one LLM; pick the best (or cheapest) per task
- **Open standards** — MCP for tools, A2A for agent-to-agent. Same reason we like USB-C
- **Governance** — who did what, on whose behalf, at what cost. Auditable
- **Every channel** — Slack, Teams, WhatsApp, voice. Users won't open a new app

**Ask:** "Which of these four would *you* forget if you built an agent in a hackathon?" (Usually governance.)

**Transition:** "So what does a platform that does all four look like? Let's draw it."`,
}

const flow = [
  { icon: '💬', title: 'Chatbots', text: 'Answer once, then stop.' },
  { icon: '🧑‍✈️', title: 'Copilots', text: 'Suggest. You still click.' },
  { icon: '🤖', title: 'Agents', text: 'Plan, call tools, finish the job.', variant: 'tint' },
]

const asks = [
  { icon: '🧠', title: 'Choice of models', text: 'Best model per task. No lock-in.' },
  { icon: '🔌', title: 'Open standards', text: 'MCP for tools, A2A for agents.' },
  { icon: '🛡️', title: 'Governance', text: 'Who did what, on whose behalf, at what cost.' },
  { icon: '📱', title: 'Every channel', text: 'Slack, Teams, WhatsApp, voice.' },
]

export default function Shift() {
  return (
    <Slide section="industry" kicker="What's happening" title={<>From AI that <Em>talks</Em> to AI that <Em>does</Em></>}>
      <Flow nodes={flow.map((f) => <BigCard key={f.title} variant={f.variant} icon={f.icon} title={f.title} text={f.text} />)} style={{ flex: 1.25, minHeight: 0 }} />
      <Reveal at={1} as="fade" className="label" style={{ marginTop: 8 }}>What enterprises now ask for</Reveal>
      <Stagger at={1} className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', flex: 1 }}>
        {asks.map((a) => <Card key={a.title} variant="flat" icon={a.icon} title={a.title} text={a.text} style={{ padding: '28px 32px', gap: 10 }} />)}
      </Stagger>
    </Slide>
  )
}
