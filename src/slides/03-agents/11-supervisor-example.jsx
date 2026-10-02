import { Slide, Reveal, Em } from '../../components'
import { Stage, Pos, Wires, Wire, Node, Tag } from './parts/kit'

export const meta = {
  title: 'Example: travel planner (supervisor)',
  steps: 3,
  notes: `Worked example: **Supervisor pattern**.

Read the prompt aloud. It's really three jobs in one sentence.

- Entry: the **Travel Supervisor** gets the whole goal
- Click 1 → it delegates to three specialists, each with its *own* tools and a short, focused prompt
- Click 2 → results come back; the supervisor merges them into one day-by-day plan
- Click 3 → before spending money it pauses for the parent to approve (human-in-the-loop)

Why better than one agent? Each specialist is small, testable and swappable. Want a hotel agent? Plug in a fourth.

**Ask:** "What should happen if the flight agent finds nothing under budget?" (Supervisor re-plans or asks the user. That's orchestration.)

**Transition:** "Supervisor has a boss. What if there's no boss at all?"`,
}

const W = 1728, H = 600
const workers = [
  { y: 0, icon: '✈️', t: 'Flight agent', s: 'Kochi → Bangkok, 4 seats', tool: 'flight_search' },
  { y: 210, icon: '🗺️', t: 'Itinerary agent', s: 'Kid-friendly spots, 4 days', tool: 'places_api' },
  { y: 420, icon: '🥗', t: 'Food agent', s: 'Veg restaurants near each stop', tool: 'restaurant_search' },
]

export default function SupervisorExample() {
  return (
    <Slide section="agents" kicker="Multi-agent example · supervisor" title={<>One request, three <Em>specialists</Em></>}>
      <Reveal as="down" className="prompt-box" style={{ flex: 'none' }}>
        "Plan me a 4-day family trip to Thailand with kid-friendly spots, flights from Kochi, and a vegetarian food plan."
      </Reveal>
      <Stage w={W} h={H}>
        <Wires w={W} h={H}>
          <Wire d="M 220 -10 L 220 140" tone="ink" delay={0.3} />
          {workers.map((w, i) => <Wire key={i} d={`M 440 300 C 540 300, 540 ${w.y + 90}, 632 ${w.y + 90}`} at={1} delay={0.1 + i * 0.12} />)}
          {workers.map((w, i) => <Wire key={'r' + i} d={`M 1186 ${w.y + 90} L 1262 ${w.y + 90}`} at={2} delay={i * 0.12} dashed />)}
        </Wires>

        <Pos x={0} y={150} w={440} h={300} as="scale">
          <Node variant="ink" icon="🎛️" title="Travel Supervisor" sub="Splits the goal, routes each part, merges the answers" />
        </Pos>
        <Pos x={20} y={480} w={420} h={80} at={3} as="up">
          <Tag style={{ alignSelf: 'center' }}>🙋 parent approves before booking</Tag>
        </Pos>

        {workers.map((w, i) => (
          <Pos key={w.t} x={640} y={w.y} w={540} h={180} at={1} delay={0.2 + i * 0.12} as="left">
            <Node variant="tint" icon={w.icon} title={w.t} sub={w.s}>
              <span className="mono small accent">tool: {w.tool}</span>
            </Node>
          </Pos>
        ))}

        <Pos x={1272} y={0} w={456} h={600} at={2} delay={0.3} as="left">
          <div className="card" style={{ width: '100%', gap: 16, padding: '30px 34px' }}>
            <div className="card-title">📋 Day-by-day plan</div>
            {[
              ['Day 1', 'Fly COK → BKK · aquarium'],
              ['Day 2', 'Safari park · veg thali'],
              ['Day 3', 'Beach day · early dinner'],
              ['Day 4', 'Markets · fly home'],
              ['Food', 'Veg spots near every stop'],
            ].map(([d, t]) => (
              <div key={d} className="row" style={{ gap: 16, alignItems: 'baseline', borderTop: '1px solid var(--line)', paddingTop: 14 }}>
                <span className="mono small accent" style={{ minWidth: 76 }}>{d}</span>
                <span className="small" style={{ color: 'var(--ink)' }}>{t}</span>
              </div>
            ))}
            <span className="small" style={{ marginTop: 'auto' }}>Merged by the supervisor</span>
          </div>
        </Pos>
      </Stage>
    </Slide>
  )
}
