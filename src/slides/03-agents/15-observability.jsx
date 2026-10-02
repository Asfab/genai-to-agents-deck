import { motion } from 'framer-motion'
import { ListTree, Timer, CircleCheck, UserCheck } from 'lucide-react'
import { Slide, Reveal, Em, Label } from '../../components'
import { ease } from '../../components/motion'

export const meta = {
  title: 'Agent observability',
  steps: 4,
  notes: `Agents act on their own. The more autonomy, the more you need to *see* inside. **From black box to glass box.**

Left: a real-looking **trace** of our train-booking agent. Every LLM call and tool call is a span with time and tokens. When something breaks you replay this, not guess.

Four things to watch (they build in one by one):

- **Reasoning traces**: what it saw, what it chose, why
- **Latency & tokens**: where time and money go; catch runaway loops
- **Evals**: score accuracy/safety on test conversations *before every release*
- **Human in the loop**: approval gates on risky steps (see the dashed 'waiting' span)

Tools to name-drop: LangSmith, Langfuse, Arize Phoenix, OpenTelemetry; watsonx Orchestrate has AgentOps built in.

**Ask:** "Would you deploy a web app with no logs?" (No. Same for agents.)

**Transition:** "And here's what happens when nobody's watching…"`,
}

const spans = [
  { n: 'agent.run', d: 0, w: 100, t: '4.9 s', k: '3,412 tok', root: true },
  { n: 'llm.reason', d: 0, w: 17, t: '0.8 s', k: '812 tok' },
  { n: 'tool.search_trains', d: 17, w: 20, t: '1.0 s', k: '', tool: true },
  { n: 'llm.reason', d: 37, w: 14, t: '0.7 s', k: '905 tok' },
  { n: 'tool.check_seats', d: 51, w: 10, t: '0.5 s', k: '', tool: true },
  { n: 'llm.reason', d: 61, w: 12, t: '0.6 s', k: '1,020 tok' },
  { n: 'human.approve', d: 73, w: 17, t: 'waiting', k: '', hitl: true },
  { n: 'llm.final', d: 90, w: 10, t: '0.5 s', k: '675 tok' },
]

const pillars = [
  { icon: <ListTree />, t: 'Reasoning traces', d: 'What it saw, chose, and why' },
  { icon: <Timer />, t: 'Latency & tokens', d: 'Where time and money go' },
  { icon: <CircleCheck />, t: 'Evals', d: 'Score quality before every release' },
  { icon: <UserCheck />, t: 'Human in the loop', d: 'Approve the risky steps' },
]

function Bar({ s, i }) {
  const bg = s.root ? 'var(--ink)' : s.hitl ? 'var(--surface-2)' : s.tool ? 'var(--accent-line)' : 'var(--accent)'
  return (
    <div style={{ position: 'relative', height: 30, background: 'var(--surface-2)', borderRadius: 8 }}>
      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.12 }}
        style={{ position: 'absolute', left: `${s.d}%`, width: `${s.w}%`, top: 0, bottom: 0, borderRadius: 8, background: bg, transformOrigin: 'left',
          border: s.hitl ? '2px dashed var(--line-strong)' : 'none' }} />
    </div>
  )
}

export default function Observability() {
  return (
    <Slide section="agents" kicker="Agent observability" title={<>From black box to <Em>glass box</Em></>}>
      <div className="row fill" style={{ gap: 36, alignItems: 'stretch' }}>
        <Reveal as="right" className="card" style={{ flex: 1.55, gap: 14, padding: '30px 36px' }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Label>Trace · "cheapest train Friday"</Label>
            <span className="mono small accent">4.9 s · 3,412 tokens</span>
          </div>
          <div className="col fill" style={{ gap: 0, justifyContent: 'space-between' }}>
            {spans.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '290px 1fr 250px', alignItems: 'center', gap: 16, padding: '8px 0', borderBottom: i < spans.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <span className="mono small" style={{ color: s.root ? 'var(--ink)' : 'var(--ink-2)', paddingLeft: s.root ? 0 : 24, fontWeight: s.root ? 700 : 400, whiteSpace: 'nowrap' }}>{s.n}</span>
                <Bar s={s} i={i} />
                <span className="mono small" style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>{s.t}{s.k && <span className="muted"> · {s.k}</span>}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="col" style={{ flex: 1, gap: 18 }}>
          {pillars.map((p, i) => (
            <Reveal key={p.t} at={i + 1} as="left" style={{ display: 'flex', flex: 1 }}>
              <div className="card tint row" style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 24, padding: '18px 30px' }}>
                <span className="icon">{p.icon}</span>
                <div className="col" style={{ gap: 4 }}>
                  <div className="card-title">{p.t}</div>
                  <div className="card-text">{p.d}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}
