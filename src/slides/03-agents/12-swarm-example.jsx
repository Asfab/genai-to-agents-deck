import { Slide, Em } from '../../components'
import { Stage, Pos, Wires, Wire, Node, Tag } from './parts/kit'

export const meta = {
  title: 'Example: support triage (swarm)',
  steps: 4,
  notes: `Worked example: **Swarm pattern**: no boss, agents hand off to each other.

The customer has *two* problems in one message.

- Entry: **Triage** agent reads it
- Click 1 → hands off to **Billing** ("double charge"), passing the whole conversation along
- Click 2 → Billing starts the refund, notices the login issue, hands off to **Account**
- Click 3 → Account sends a reset link; one combined reply goes back
- Click 4 → guardrail: big refunds are handed to a **human**. Agents decide *who's next*, rules decide *what's allowed*

Real-world: this is how many bank and telecom support bots are being rebuilt.

**Ask:** "What's the risk of no boss?" (Ping-pong: two agents handing off forever. You need max-handoff limits and tracing.)

**Transition:** "All these agents need tools. Wiring every tool into every agent gets messy fast…"`,
}

const W = 1728, H = 740

export default function SwarmExample() {
  return (
    <Slide section="agents" kicker="Multi-agent example · swarm" title={<>No boss. Agents <Em>hand off</Em>.</>}>
      <Stage w={W} h={H}>
        <Wires w={W} h={H}>
          <Wire d="M 1060 85 L 1290 85" at={1} width={4} />
          <Wire d="M 1508 172 L 1508 290" at={2} width={4} />
          <Wire d="M 1508 472 C 1508 540, 1380 540, 1200 540 L 540 540" at={3} width={4} />
          <Wire d="M 1300 150 L 1060 330" at={4} tone="ink" dashed />
        </Wires>

        <Pos x={0} y={0} w={520} h={200} as="right">
          <div className="col" style={{ gap: 10, width: '100%' }}>
            <span className="label">Customer</span>
            <div className="bubble user" style={{ maxWidth: '100%', alignSelf: 'stretch' }}>"I was billed twice for my order, and now I can't log in."</div>
          </div>
        </Pos>
        <Wires w={W} h={H}><Wire d="M 530 85 L 632 85" tone="ink" delay={0.3} /></Wires>

        <Pos x={640} y={0} w={420} h={170} as="scale"><Node variant="tint" icon="🧭" title="Triage" sub="Reads intent, picks who's next" /></Pos>
        <Pos x={1298} y={0} w={430} h={170} at={1} as="scale"><Node variant="tint" icon="💳" title="Billing" sub="Spots duplicate charge, starts refund" /></Pos>
        <Pos x={1298} y={300} w={430} h={170} at={2} as="scale"><Node variant="tint" icon="🔐" title="Account" sub="Verifies identity, sends reset link" /></Pos>
        <Pos x={640} y={300} w={420} h={170} at={4} as="scale"><Node variant="flat" icon="🙋" title="Human agent" sub="Takes over for refunds above ₹5,000" /></Pos>

        <Pos x={1090} y={22} w={200} h={40} at={1} delay={0.4} as="fade" style={{ justifyContent: 'center' }}><Tag>① billing</Tag></Pos>
        <Pos x={1528} y={208} w={200} h={40} at={2} delay={0.4} as="fade"><Tag>② login</Tag></Pos>

        <Pos x={0} y={440} w={520} h={200} at={3} delay={0.5} as="right">
          <div className="col" style={{ gap: 10, width: '100%' }}>
            <span className="label">③ One reply</span>
            <div className="bubble ai" style={{ maxWidth: '100%' }}>"Refund of the duplicate ₹1,299 started. Reset link sent to your email."</div>
          </div>
        </Pos>

        <Pos x={0} y={640} w={1728} h={100} at={4} delay={0.3} as="up">
          <div className="card ink row" style={{ width: '100%', flexDirection: 'row', alignItems: 'center', padding: '0 36px', gap: 24 }}>
            <span className="body" style={{ color: 'var(--surface)' }}>Each agent decides <b>who's next</b>. The handoff carries the full conversation. Rules decide <b>what's allowed</b>.</span>
          </div>
        </Pos>
      </Stage>
    </Slide>
  )
}
