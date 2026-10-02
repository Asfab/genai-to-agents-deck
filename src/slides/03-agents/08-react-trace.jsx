import { Slide, Reveal, Em, Label } from '../../components'
import { useSlide } from '../../engine/SlideContext'

export const meta = {
  title: 'ReAct: a worked trace',
  steps: 12,
  loop: true,
  loopFrom: 4,
  notes: `**ReAct = Reason + Act** (Yao et al., 2022). The model alternates a *Thought* (reasoning in words), an *Action* (tool call) and reads an *Observation* (tool result). This is the agent loop, written down.

The trace writes itself in four beats (~4 s), then a highlight replays it line by line, on a loop. Walk it:

- Thought + Action: it plans, then calls search_trains
- Observation: real data comes back, 3 trains
- It reasons again and checks seats. It didn't guess
- It notices booking spends money → **asks the human first**. That's good agent design

**Ask:** "Which line would you log for debugging when this goes wrong?" (All of them. That's the trace. Remember this for observability.)

**Transition:** "One agent, one loop, works. But what about a really big task?"`,
}

const TAG = {
  thought: { label: 'Thought', bg: 'var(--accent-soft)', fg: 'var(--accent)', bd: 'var(--accent-line)' },
  action: { label: 'Action', bg: 'var(--ink)', fg: 'var(--surface)', bd: 'var(--ink)' },
  obs: { label: 'Observation', bg: 'var(--surface-2)', fg: 'var(--ink-2)', bd: 'var(--line)' },
  answer: { label: 'Answer', bg: 'var(--accent)', fg: 'var(--surface)', bd: 'var(--accent)' },
}

const trace = [
  { k: 'thought', at: 1, t: 'Need trains ERS → SBC, Friday, after 5 pm.' },
  { k: 'action', at: 1, t: 'search_trains("ERS", "SBC", "Fri", after="17:00")', mono: true },
  { k: 'obs', at: 2, t: '18:15 SL ₹485 · 19:40 SL ₹520 · 21:05 3A ₹1310', mono: true },
  { k: 'thought', at: 3, t: '18:15 is cheapest. Are seats left?' },
  { k: 'action', at: 3, t: 'check_seats(train="18:15", cls="SL")', mono: true },
  { k: 'obs', at: 3, t: 'AVAILABLE · 42 seats', mono: true },
  { k: 'thought', at: 4, t: 'Booking spends money → confirm with the user first.' },
  { k: 'answer', at: 4, t: '"6:15 pm sleeper, ₹485, 42 seats. Shall I book?"' },
]

export default function ReActTrace() {
  const { step } = useSlide()
  const cur = step >= 5 ? step - 5 : -1 // replay cursor after the build
  return (
    <Slide section="agents" kicker="Planning · the ReAct pattern" title={<>Think, act, <Em>observe</Em>, repeat</>}>
      <div className="row fill" style={{ gap: 48, alignItems: 'stretch' }}>
        <div className="col" style={{ width: 500, gap: 24 }}>
          <Reveal as="right" className="card ink" style={{ gap: 16 }}>
            <Label style={{ color: 'var(--faint)' }}>User goal</Label>
            <div className="h3" style={{ lineHeight: 1.3 }}>"Book me the cheapest train from Kochi to Bengaluru on Friday evening."</div>
          </Reveal>
          <Reveal as="fade" delay={0.3} className="card flat" style={{ flex: 1, gap: 18, justifyContent: 'center' }}>
            <div className="card-title">ReAct = Reason + Act</div>
            {['thought', 'action', 'obs'].map((k) => (
              <div key={k} className="row" style={{ gap: 16, alignItems: 'center' }}>
                <Badge k={k} />
                <span className="small" style={{ color: 'var(--ink-2)' }}>{{ thought: 'reasoning in words', action: 'a tool call', obs: 'what the tool returned' }[k]}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="col fill" style={{ gap: 12, justifyContent: 'center' }}>
          {trace.map((r, i) => (
            <Reveal key={i} at={r.at} delay={(i % 3) * 0.12} as="left" className="row"
              style={{ gap: 20, alignItems: 'center', padding: '12px 16px', margin: '0 -16px', borderRadius: 'var(--radius-sm)', transition: 'background .3s',
                background: cur === i ? 'var(--accent-soft)' : 'transparent', borderBottom: i < trace.length - 1 ? '1px solid var(--line)' : '1px solid transparent' }}>
              <Badge k={r.k} />
              <span className={r.mono ? 'mono small' : 'body'} style={{ color: 'var(--ink)', fontWeight: r.k === 'answer' ? 600 : undefined }}>{r.t}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function Badge({ k }) {
  const s = TAG[k]
  return (
    <span className="label" style={{ flex: 'none', width: 190, textAlign: 'center', padding: '12px 0', borderRadius: 10, background: s.bg, color: s.fg, border: `1.5px solid ${s.bd}` }}>{s.label}</span>
  )
}
