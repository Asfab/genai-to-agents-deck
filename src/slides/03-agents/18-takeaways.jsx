import { Slide, Reveal, Em } from '../../components'

export const meta = {
  title: 'Agents: key takeaways',
  steps: 3,
  notes: `Four lines to remember. One per click, say each slowly.

- **Agents = reasoning + tools** (plus memory and a loop)
- **Orchestration = teamwork for AIs**: supervisor, sequential, swarm, mixture, debate
- **MCP standardises context**: one way to plug tools and data into any agent
- **A2A standardises collaboration**: agents from different vendors working together

**Ask:** "Which one would you build first for your final-year project?"

**Transition to Act 4:** "Enough theory. Let's see what the industry, and IBM in particular, is actually shipping."`,
}

const items = [
  { k: 'Agents', v: 'reasoning + tools', icon: '🤖', s: 'LLM + tools + memory, running in a loop' },
  { k: 'Orchestration', v: 'teamwork for AIs', icon: '🎛️', s: 'Supervisor · sequential · swarm · mixture · debate' },
  { k: 'MCP', v: 'standardises context', icon: '🔌', s: 'Tools, resources and prompts, plugged in once' },
  { k: 'A2A', v: 'standardises collaboration', icon: '🤝', s: 'Agent cards, tasks and artifacts across vendors' },
]

export default function Takeaways() {
  return (
    <Slide section="agents" kicker="Key takeaways" title={<>Act 3 in <Em>four lines</Em></>}>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 28 }}>
        {items.map((it, i) => (
          <Reveal key={it.k} at={i} as="scale" style={{ display: 'flex' }}>
            <div className={`card ${i === 3 ? 'ink' : 'tint'}`} style={{ flex: 1, justifyContent: 'space-between', padding: '38px 46px' }}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="tag-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="icon">{it.icon}</span>
              </div>
              <div className="col" style={{ gap: 10 }}>
                <div className="h2">{it.k} <span className="muted" style={{ color: i === 3 ? 'var(--faint)' : undefined }}>=</span></div>
                <div className="h2 em" style={{ color: i === 3 ? 'var(--accent-line)' : undefined }}>{it.v}</div>
                <div className="small" style={{ color: i === 3 ? 'var(--faint)' : undefined, marginTop: 6 }}>{it.s}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Slide>
  )
}
