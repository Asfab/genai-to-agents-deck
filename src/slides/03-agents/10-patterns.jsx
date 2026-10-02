import { Slide, Reveal, Em } from '../../components'
import { Supervisor, Sequential, Swarm, Mixture, Debate } from './parts/patterns'

export const meta = {
  title: 'Orchestration patterns',
  steps: 4,
  notes: `Five patterns you'll see in every framework. One per click; don't go deep, the next slides are worked examples.

- **Supervisor**: a boss agent splits work, routes to specialists, merges results
- **Sequential**: assembly line; output of one is input to the next (e.g. CSV → clean → analyse → report)
- **Swarm**: no boss; agents hand off to whichever peer fits best
- **Mixture of Agents**: layers of agents each refine the answer; an aggregator combines them
- **Debate**: agents argue opposite sides, a judge decides ("Wayanad or Munnar for a weekend from Kozhikode?")

Bonus: ReAct (last slides) is the pattern *inside* each agent.

**Ask:** "Which one is a college project team?" (Usually 'supervisor'… or 'swarm' the night before submission.)

**Transition:** "Let's watch two of these work on real prompts."`,
}

const pats = [
  { C: Supervisor, t: 'Supervisor', d: 'A boss routes work to specialists and merges results', u: 'Clear sub-tasks', e: 'Travel planner' },
  { C: Sequential, t: 'Sequential', d: "Each agent's output feeds the next, like an assembly line", u: 'Fixed pipelines', e: 'CSV → clean → analyse → report' },
  { C: Swarm, t: 'Swarm', d: 'Peers hand off to whoever fits best. No boss.', u: 'Open conversations', e: 'Support triage' },
  { C: Mixture, t: 'Mixture of Agents', d: 'Layers refine the answer; an aggregator combines', u: 'Quality over speed', e: 'Many drafts → one best summary' },
  { C: Debate, t: 'Debate', d: 'Agents argue sides; a judge decides', u: 'Trade-off decisions', e: 'Wayanad or Munnar?' },
]

export default function Patterns() {
  return (
    <Slide section="agents" kicker="Agent orchestration patterns" title={<>Five ways to run an <Em>AI team</Em></>}>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 22 }}>
        {pats.map(({ C, t, d, u, e }, i) => (
          <Reveal key={t} at={i} as="up" style={{ display: 'flex' }}>
            <div className="card" style={{ flex: 1, padding: '30px 28px', gap: 16 }}>
              <div style={{ height: 230, padding: '8px 4px', flex: 'none' }}><C at={i} /></div>
              <div className="card-title" style={{ marginTop: 8 }}>{t}</div>
              <div className="card-text">{d}</div>
              <div className="col" style={{ gap: 14, marginTop: 'auto', paddingTop: 18, borderTop: '1px solid var(--line)' }}>
                <div className="col" style={{ gap: 6 }}>
                  <span className="label">e.g.</span>
                  <span className="small" style={{ color: 'var(--ink)', minHeight: '2.9em' }}>{e}</span>
                </div>
                <div className="col" style={{ gap: 6 }}>
                  <span className="label">Use for</span>
                  <span className="small accent" style={{ fontWeight: 600 }}>{u}</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Slide>
  )
}
