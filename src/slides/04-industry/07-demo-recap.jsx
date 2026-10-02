import { Slide, Reveal, Card, Em, Flow } from '../../components'
import { ToolCall } from './parts/bits'

export const meta = {
  title: 'What just happened',
  steps: 1,
  notes: `**Recap — and the fallback if the live demo failed.** Walk left to right.

- **You** typed one sentence in plain English
- **The agent** (an LLM with instructions) decided which tools to call, in what order
- **The MCP server** exposed 12 tools — the agent discovered them, nobody hard-coded the flow
- **The TicketTown backend** is the *same* system the website uses. The agent isn't a separate app; it's a new front door

**Click →** the trace: three tool calls, one booking, then it *stopped and asked* before payment. That pause is the human-in-the-loop design.

If the demo failed: "This is exactly what you would have seen. The code and guide are in the TicketTown repo — try it yourself."

**Ask:** "What's the one tool you'd NOT give this agent without a human approving?" (Refunds. Payment.)

**Transition:** "That was building in a UI. Now let's have an AI build the agent for us — meet Bob."`,
}

const nodes = [
  { icon: '🙋', title: 'You', text: '“Book 2 seats for Agent 404 tomorrow morning”' },
  { icon: '🤖', title: 'Orchestrate agent', text: 'Understands the ask, plans which tools to call.', variant: 'tint' },
  { icon: '🔌', title: 'MCP server', text: '12 tools: shows, seats, booking, pay.' },
  { icon: '🎟️', title: 'TicketTown backend', text: 'The same seats the website sells.' },
]

export default function DemoRecap() {
  return (
    <Slide section="industry" kicker="Demo 1 · recap" title={<>One sentence in. A real booking <Em>out</Em>.</>}>
      <Flow nodes={nodes.map((n) => <Card key={n.title} variant={n.variant} icon={n.icon} title={n.title} text={n.text} />)} style={{ flex: 1 }} />
      <Reveal at={1} className="card flat" style={{ flex: 'none', flexDirection: 'row', alignItems: 'center', gap: 20, padding: '26px 36px', flexWrap: 'wrap' }}>
        <span className="label" style={{ marginRight: 8 }}>Trace</span>
        <ToolCall name="get_showtimes_for_movie" /><span className="muted h3">→</span>
        <ToolCall name="suggest_seats" /><span className="muted h3">→</span>
        <ToolCall name="create_booking" /><span className="muted h3">→</span>
        <span className="body" style={{ color: 'var(--ink)' }}><b>Pauses:</b> “Shall I take payment now?”</span>
      </Reveal>
    </Slide>
  )
}
