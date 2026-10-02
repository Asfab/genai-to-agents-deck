import { Slide, Reveal, Stagger, Em, Pill } from '../../components'

export const meta = {
  title: '03 · AI Agents',
  steps: 0,
  notes: `**Act 3 — AI Agents.** This is the heart of the talk (~25 min).

- So far: LLMs predict text; prompting steers that text
- Now: what happens when we let the model *do* things
- Map on the right = our route for the next 25 minutes

**Ask the room:** "Who has heard the word 'agentic' in the last month?" (expect most hands) "By the end you'll be able to explain it better than most LinkedIn posts."

**Transition:** "Let's start with a definition you can actually remember."`,
}

const route = [
  'What an agent is',
  'The agent loop',
  'Tools & tool calling',
  'Memory & ReAct planning',
  'Multi-agent orchestration',
  'MCP & A2A standards',
  'Observability & failures',
  'Frameworks landscape',
]

export default function Divider() {
  return (
    <Slide section="agents">
      <div className="row fill" style={{ gap: 96, alignItems: 'stretch' }}>
        <div className="col" style={{ flex: 1.35, justifyContent: 'space-between' }}>
          <Reveal as="fade"><Pill>Act 03 · ~25 min</Pill></Reveal>
          <div className="col" style={{ gap: 36 }}>
            <Reveal as="blur" delay={0.05}>
              <div className="hero accent" style={{ transform: 'scale(2.3)', transformOrigin: 'left bottom', marginBottom: 8, opacity: 0.95 }}>03</div>
            </Reveal>
            <Reveal delay={0.2}><h1 className="hero">AI <Em>Agents</Em></h1></Reveal>
            <Reveal delay={0.35}><p className="lede">When LLMs stop <b>answering</b> and start <b>doing</b>: reasoning, tools, memory, and teams of agents.</p></Reveal>
          </div>
        </div>
        <div className="col" style={{ flex: 1, justifyContent: 'center', borderLeft: '2px solid var(--line)', paddingLeft: 64 }}>
          <Reveal as="fade" delay={0.3}><div className="label" style={{ marginBottom: 8 }}>The route</div></Reveal>
          <Stagger delay={0.4} gap={0.07} as="left" className="col" style={{ gap: 22 }}>
            {route.map((r, i) => (
              <div key={r} className="row" style={{ gap: 24, alignItems: 'baseline' }}>
                <span className="mono accent small" style={{ color: 'var(--accent)', minWidth: 44 }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="body" style={{ color: 'var(--ink)' }}>{r}</span>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </Slide>
  )
}
