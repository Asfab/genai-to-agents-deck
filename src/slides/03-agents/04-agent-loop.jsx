import { motion } from 'framer-motion'
import { Slide, Em } from '../../components'
import { useSlide } from '../../engine/SlideContext'
import { Stage, Pos, Wires, Wire, Node, Tag } from './parts/kit'

export const meta = {
  title: 'The agent loop',
  steps: 4,
  notes: `Build the loop one click at a time, point at the matching row on the right.

- Entry: a **goal** arrives; the agent *observes* it plus whatever it already knows
- Click 1 → **Reason**: the LLM decides the next action, e.g. "call search_trains"
- Click 2 → **Act**: the agent's code (not the LLM!) runs the tool
- Click 3 → the result is a new **observation**, fed back. Round and round
- Click 4 → a **stop condition** (goal met, step limit, needs human) ends it with a final answer

**Ask:** "What happens if there's no stop condition?" (Infinite loop + a big API bill. Real failure mode.)

**Transition:** "The 'Act' step needs tools. What exactly *is* a tool?"`,
}

const W = 1728, H = 740
const CX = 520, CY = 370

const rows = [
  { n: '01', t: 'Observe', d: 'Read the goal, memory and latest results' },
  { n: '02', t: 'Reason', d: 'LLM picks the next action, e.g. a tool to run' },
  { n: '03', t: 'Act', d: 'The agent executes it: API, DB, code…' },
  { n: '04', t: 'Observe again', d: 'The result goes back to the LLM. Repeat.' },
]

function Pulse() {
  const { step } = useSlide()
  if (step < 3) return null
  return (
    <motion.g style={{ transformOrigin: `${CX}px ${CY}px`, transformBox: 'view-box' }}
      initial={{ rotate: 0, opacity: 0 }} animate={{ rotate: 360, opacity: 1 }}
      transition={{ rotate: { duration: 7, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.6 } }}>
      <circle cx={CX} cy={CY - 260} r={11} style={{ fill: 'var(--accent)' }} />
    </motion.g>
  )
}

export default function AgentLoop() {
  return (
    <Slide section="agents" kicker="How an agent works" title={<>The agent <Em>loop</Em></>}>
      <Stage w={W} h={H}>
        <Wires w={W} h={H}>
          <circle cx={CX} cy={CY} r={260} style={{ fill: 'none', stroke: 'var(--line)', strokeWidth: 2 }} />
          <Pulse />
          <Wire d="M 240 110 L 368 110" at={0} delay={0.3} tone="ink" />
          <Wire d={`M 687 171 A 260 260 0 0 1 776 415`} at={1} width={5} />
          <Wire d={`M 669 583 A 260 260 0 0 1 371 583`} at={2} width={5} />
          <Wire d={`M 264 415 A 260 260 0 0 1 353 171`} at={3} width={5} />
          <Wire d="M 895 500 C 960 500, 940 665, 990 665" at={4} tone="ink" />
        </Wires>

        <Pos x={30} y={78} w={210} h={64} as="right">
          <span className="h3" style={{ alignSelf: 'center' }}>🎯 Goal</span>
        </Pos>

        <Pos x={CX - 100} y={CY - 100} w={200} h={200} as="scale">
          <div className="card ink" style={{ width: '100%', height: '100%', borderRadius: '50%', padding: 0, alignItems: 'center', justifyContent: 'center' }}>
            <div className="col" style={{ gap: 6, alignItems: 'center' }}>
              <span className="icon">🧠</span>
              <span className="card-title">LLM</span>
            </div>
          </div>
        </Pos>

        <Pos x={380} y={50} w={280} h={120}><Node variant="tint" center icon="👀" title="Observe" /></Pos>
        <Pos x={605} y={440} w={280} h={120} at={1} as="scale"><Node variant="tint" center icon="💭" title="Reason" /></Pos>
        <Pos x={155} y={440} w={280} h={120} at={2} as="scale"><Node variant="tint" center icon="⚡" title="Act" /></Pos>

        <Pos x={410} y={606} w={220} h={50} at={2} delay={0.4} as="fade" style={{ justifyContent: 'center' }}><Tag>tool call</Tag></Pos>
        <Pos x={20} y={262} w={220} h={50} at={3} delay={0.4} as="fade"><Tag>observation</Tag></Pos>

        {rows.map((r, i) => (
          <Pos key={r.n} x={1000} y={i * 138} w={728} h={118} at={i} as="left">
            <div className="card flat row" style={{ width: '100%', padding: '20px 32px', alignItems: 'center', gap: 28, flexDirection: 'row' }}>
              <span className="mono accent h3">{r.n}</span>
              <div className="col" style={{ gap: 4 }}>
                <span className="card-title">{r.t}</span>
                <span className="card-text">{r.d}</span>
              </div>
            </div>
          </Pos>
        ))}

        <Pos x={1000} y={590} w={728} h={150} at={4} as="scale">
          <div className="card ink row" style={{ width: '100%', padding: '24px 32px', alignItems: 'center', gap: 28, flexDirection: 'row' }}>
            <span className="icon">🏁</span>
            <div className="col" style={{ gap: 4 }}>
              <span className="card-title">Stop condition met</span>
              <span className="card-text">Goal done, step limit hit, or a human must decide → return the final answer</span>
            </div>
          </div>
        </Pos>
      </Stage>
    </Slide>
  )
}
