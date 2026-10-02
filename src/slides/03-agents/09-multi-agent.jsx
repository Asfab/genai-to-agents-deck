import { Slide, Reveal, Em, Label } from '../../components'
import { Stage, Pos, Wires, Wire } from './parts/kit'

export const meta = {
  title: 'Multi-agent systems',
  steps: 4,
  notes: `**Multi-agent system** = a team of domain-specific agents working together on a complex business process.

Why not one giant agent? One agent with 40 tools and a 10-page prompt gets confused, slow and hard to test. Specialists are smaller, cheaper, testable. Same reason we split a monolith into services.

But a team needs a manager. Orchestration handles four things (one per click):

- **Coordination**: who does what, in what order
- **Context sharing**: what agent A learned, agent B needs
- **Human-in-the-loop**: pause for approval on risky steps
- **Planning & task breakdown**: split a big goal into sub-tasks

**Ask:** "Where have you seen this before?" (A college fest team: one coordinator, many committees.)

**Transition:** "There are a few standard ways to wire such a team. Let's see them."`,
}

const needs = [
  { icon: '🤝', t: 'Coordination', d: 'Who does what, in what order' },
  { icon: '🔗', t: 'Context sharing', d: 'Pass what one agent learned to the next' },
  { icon: '🙋', t: 'Human-in-the-loop', d: 'Pause for approval on risky steps' },
  { icon: '🗺️', t: 'Planning', d: 'Break a big goal into sub-tasks' },
]

const team = [
  { x: 0, y: 450, t: '🧾 Finance' }, { x: 205, y: 450, t: '🧑‍💼 HR' }, { x: 410, y: 450, t: '💻 IT' }, { x: 615, y: 450, t: '✈️ Travel' },
]

export default function MultiAgent() {
  return (
    <Slide section="agents" kicker="Multi-agent systems" title={<>One agent can't do it all. Build a <Em>team</Em>.</>}>
      <div className="row fill" style={{ gap: 40, alignItems: 'stretch' }}>
        <Reveal as="right" className="card" style={{ flex: 1, gap: 22 }}>
          <div className="body" style={{ color: 'var(--ink)' }}>A team of <b>domain-specific agents</b> working together on a complex business process.</div>
          <Stage w={790} h={560} style={{ marginTop: 'auto' }}>
            <Wires w={790} h={560}>
              {team.map((a, i) => <Wire key={i} d={`M 395 150 C 395 300, ${a.x + 87} 300, ${a.x + 87} 440`} delay={0.4 + i * 0.1} width={3} both />)}
            </Wires>
            <Pos x={215} y={20} w={360} h={130} as="scale">
              <div className="card ink" style={{ width: '100%', padding: '16px 24px', alignItems: 'center', justifyContent: 'center' }}>
                <div className="card-title">🎛️ Orchestrator</div>
              </div>
            </Pos>
            {team.map((a, i) => (
              <Pos key={i} x={a.x} y={a.y} w={175} h={100} delay={0.5 + i * 0.1}>
                <div className="card tint" style={{ width: '100%', padding: '12px 10px', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="small" style={{ color: 'var(--ink)', fontWeight: 600, whiteSpace: 'nowrap' }}>{a.t}</span>
                </div>
              </Pos>
            ))}
          </Stage>
        </Reveal>

        <div className="col" style={{ flex: 1.05, gap: 18 }}>
          <Label>Why you need orchestration</Label>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {needs.map((n, i) => (
              <Reveal key={n.t} at={i + 1} as="scale" style={{ display: 'flex' }}>
                <div className="card tint" style={{ flex: 1, justifyContent: 'center' }}>
                  <div className="icon">{n.icon}</div>
                  <div className="card-title">{n.t}</div>
                  <div className="card-text">{n.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  )
}
