import { Luggage, TrainFront } from 'lucide-react'
import { Slide, Reveal, Em } from '../../components'
import { Stage, Pos, Wires, Wire, Node, Tag } from './parts/kit'

export const meta = {
  title: 'A2A: Agent2Agent protocol',
  steps: 4,
  notes: `From single agents to **agent societies**. Agents built by different teams, on different frameworks, owned by different companies. They don't share memory; they must *negotiate and delegate*.

**A2A (Agent2Agent)**: open protocol launched by Google in April 2025, now under the Linux Foundation. IBM's own ACP protocol merged into it.

The conversation builds message by message; walk it:

- **Discover**: fetch the other agent's *Agent Card*: who it is, its skills, endpoint, auth
- **Card**: "I can book_ticket"
- **Task**: send a task with the details
- **Result**: status updates (working → input-required → completed) and an *artifact*, here the PNR

Neither side sees the other's prompts, tools or code. Just like two companies calling each other's APIs.

**One-liner:** MCP = agent ↔ tools (vertical). A2A = agent ↔ agent (horizontal). They're complementary.

**Transition:** "Agents now act, call tools, call each other… how do we know what they're actually doing?"`,
}

const W = 1728, H = 470
const msgs = [
  { y: 30, dir: 'r', t: 'discover → fetch Agent Card' },
  { y: 135, dir: 'l', t: 'Agent Card: skills [book_ticket], endpoint, auth' },
  { y: 240, dir: 'r', t: 'Task: book 2 SL seats · 18:15 · ERS → SBC' },
  { y: 345, dir: 'l', t: 'completed · artifact: PNR 4521 963 207' },
]

export default function A2A() {
  return (
    <Slide section="agents" kicker="A2A · Agent2Agent protocol" title={<>A2A: agents <Em>working with</Em> agents</>}
      lede="Agents from different vendors discover each other and collaborate.">
      <Stage w={W} h={H}>
        <Wires w={W} h={H}>
          {msgs.map((m, i) => (
            <Wire key={i} d={m.dir === 'r' ? `M 470 ${m.y + 50} L 1252 ${m.y + 50}` : `M 1258 ${m.y + 50} L 476 ${m.y + 50}`} at={i + 1} width={3.5} tone={m.dir === 'r' ? 'accent' : 'ink'} />
          ))}
        </Wires>
        <Pos x={0} y={20} w={440} h={430} as="right">
          <Node variant="tint" icon={<Luggage />} title="Trip planner agent" sub="Your company · built with LangGraph"><span className="mono small accent" style={{ marginTop: 12 }}>skills: plan_trip</span></Node>
        </Pos>
        <Pos x={1288} y={20} w={440} h={430} as="left">
          <Node variant="flat" icon={<TrainFront />} title="Rail booking agent" sub="Another company · different stack"><span className="mono small accent" style={{ marginTop: 12 }}>skills: book_ticket</span></Node>
        </Pos>
        {msgs.map((m, i) => (
          <Pos key={i} x={480} y={m.y + 4} w={768} h={44} at={i + 1} delay={0.3} as="fade" style={{ justifyContent: 'center' }}>
            <Tag ink={m.dir === 'l'}>{m.t}</Tag>
          </Pos>
        ))}
      </Stage>

      <Reveal at={4} delay={0.5} className="row fill" style={{ gap: 24 }}>
        <div className="card flat row" style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 24, padding: '20px 32px' }}>
          <span className="h3 accent">MCP</span>
          <span className="body">agent ↔ <b>tools & data</b> · vertical</span>
        </div>
        <div className="card ink row" style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 24, padding: '20px 32px' }}>
          <span className="h3">A2A</span>
          <span className="body">agent ↔ <b>agent</b> · horizontal</span>
        </div>
      </Reveal>
    </Slide>
  )
}
