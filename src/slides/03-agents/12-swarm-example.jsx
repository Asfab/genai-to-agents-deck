import { motion } from 'framer-motion'
import { Compass, CreditCard, KeyRound, Headset } from 'lucide-react'
import { Slide, Em } from '../../components'
import { useSlide } from '../../engine/SlideContext'
import { Stage, Pos, Wires, Wire, Node, Tag } from './parts/kit'

export const meta = {
  title: 'Example: support triage (swarm)',
  steps: 8,
  loop: true,
  loopFrom: 4,
  stepMs: 1000,
  notes: `Worked example: **Swarm pattern**: no boss, agents hand off to each other.

The customer has *two* problems in one message.

The hand-offs build in order (~4 s), then a highlight replays the path on a loop: Triage → Billing → Account → reply.

- **Triage** agent reads it
- It hands off to **Billing** ("double charge"), passing the whole conversation along
- Billing starts the refund, notices the login issue, hands off to **Account**
- Account sends a reset link; one combined reply goes back
- Guardrail: big refunds are handed to a **human**. Agents decide *who's next*, rules decide *what's allowed*

Real-world: this is how many bank and telecom support bots are being rebuilt.

**Ask:** "What's the risk of no boss?" (Ping-pong: two agents handing off forever. You need max-handoff limits and tracing.)

**Transition:** "All these agents need tools. Wiring every tool into every agent gets messy fast…"`,
}

const W = 1728, H = 740

// After the build, steps 5–8 replay the hand-off path: 0 Triage → 1 Billing → 2 Account → 3 reply.
function Hot({ i, radius = 'var(--radius)', children }) {
  const { step } = useSlide()
  const hot = step - 5 === i
  return (
    <motion.div style={{ display: 'flex', width: '100%', borderRadius: radius }}
      animate={{ scale: hot ? 1.04 : 1, boxShadow: hot ? '0 0 0 4px var(--accent)' : '0 0 0 4px rgba(0,0,0,0)' }} transition={{ duration: 0.35 }}>
      {children}
    </motion.div>
  )
}

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

        <Pos x={640} y={0} w={420} h={170} as="scale"><Hot i={0}><Node variant="tint" icon={<Compass />} title="Triage" sub="Reads intent, picks who's next" /></Hot></Pos>
        <Pos x={1298} y={0} w={430} h={170} at={1} as="scale"><Hot i={1}><Node variant="tint" icon={<CreditCard />} title="Billing" sub="Spots duplicate charge, starts refund" /></Hot></Pos>
        <Pos x={1298} y={300} w={430} h={170} at={2} as="scale"><Hot i={2}><Node variant="tint" icon={<KeyRound />} title="Account" sub="Verifies identity, sends reset link" /></Hot></Pos>
        <Pos x={640} y={300} w={420} h={170} at={4} as="scale"><Node variant="flat" icon={<Headset />} title="Human agent" sub="Takes over for refunds above ₹5,000" /></Pos>

        <Pos x={1090} y={22} w={200} h={40} at={1} delay={0.4} as="fade" style={{ justifyContent: 'center' }}><Tag>① billing</Tag></Pos>
        <Pos x={1528} y={208} w={200} h={40} at={2} delay={0.4} as="fade"><Tag>② login</Tag></Pos>

        <Pos x={0} y={440} w={520} h={200} at={3} delay={0.5} as="right">
          <div className="col" style={{ gap: 10, width: '100%' }}>
            <span className="label">③ One reply</span>
            <Hot i={3} radius="22px 22px 22px 6px"><div className="bubble ai" style={{ maxWidth: '100%' }}>"Refund of the duplicate ₹1,299 started. Reset link sent to your email."</div></Hot>
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
