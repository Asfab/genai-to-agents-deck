import { Slide, Reveal, Em, Label } from '../../components'
import { Heads } from './parts/kit'

export const meta = {
  title: 'Memory',
  steps: 3,
  notes: `Two kinds of memory. Analogy: **RAM vs hard disk**.

- **Short-term** (entry) = the context window: system prompt, chat so far, tool results, the agent's own thoughts. Fast, but limited (token budget) and gone when the session ends
- Click 1 → **Long-term** = a vector store or database: your preferences, past trips, company documents. Survives across sessions
- Click 2 → **Retrieve**: before reasoning, search long-term memory *by meaning* (embeddings) and paste only the relevant bits into the context. That's RAG
- Click 3 → **Save**: after the task, write new facts back ("user prefers sleeper class")

**Ask:** "Why not just put everything in the context window?" (Cost, latency, and models get worse at finding things in very long contexts.)

**Transition:** "Now the agent can act and remember. How does it *plan*?"`,
}

const msgs = [
  ['system', 'You are TravelBot. Be concise.'],
  ['user', 'Cheapest train ERS → SBC, Fri pm'],
  ['tool', '3 trains · 18:15 SL ₹485 …'],
  ['thought', 'Check seats before booking'],
]
const facts = ['🛏️ Prefers sleeper class', '🥗 Vegetarian meals', '🏠 Home station: Ernakulam', '🧳 Munnar trip, May 2026']

const Chip = ({ who, text, hl }) => (
  <div className="row" style={{ gap: 16, alignItems: 'center', background: 'var(--surface)', border: hl ? '2px dashed var(--accent)' : '1px solid var(--line)', borderRadius: 'var(--radius-sm)', padding: '14px 20px' }}>
    <span className="mono small accent" style={{ minWidth: 104 }}>{who}</span>
    <span className="small" style={{ color: 'var(--ink-2)' }}>{text}</span>
  </div>
)

const Arrow = ({ at, dir, text }) => (
  <Reveal at={at} as={dir === 'left' ? 'right' : 'left'} className="col" style={{ alignItems: 'center', gap: 14 }}>
    <svg viewBox="0 0 220 40" width={220} height={40}>
      <Heads />
      <path d={dir === 'left' ? 'M 210 20 L 18 20' : 'M 10 20 L 202 20'} markerEnd="url(#ag-head-accent)"
        style={{ stroke: 'var(--accent)', strokeWidth: 6, fill: 'none', strokeLinecap: 'round' }} />
    </svg>
    <span className="body" style={{ textAlign: 'center', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.25 }}>{text}</span>
  </Reveal>
)

export default function Memory() {
  return (
    <Slide section="agents" kicker="Memory" title={<>What the agent <Em>remembers</Em></>}>
      <div className="row fill" style={{ gap: 24, alignItems: 'stretch' }}>
        <Reveal as="right" style={{ display: 'flex', flex: 1 }}>
          <div className="card tint" style={{ flex: 1, gap: 18 }}>
            <Label>Short-term · like RAM</Label>
            <div className="h2">Context window</div>
            <div className="col" style={{ gap: 12 }}>
              {msgs.map(([w, t]) => <Chip key={w} who={w} text={t} />)}
              <Reveal at={2} delay={0.5} as="left"><Chip who="memory" text="Prefers sleeper class ← retrieved" hl /></Reveal>
            </div>
            <div className="col" style={{ gap: 10, marginTop: 'auto' }}>
              <div style={{ height: 16, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--accent-line)', overflow: 'hidden' }}>
                <div style={{ width: '78%', height: '100%', background: 'var(--accent)' }} />
              </div>
              <span className="small">Fast, but limited by tokens and wiped after the session</span>
            </div>
          </div>
        </Reveal>

        <div className="col" style={{ width: 240, justifyContent: 'center', gap: 80 }}>
          <Arrow at={2} dir="left" text="retrieve what's relevant (RAG)" />
          <Arrow at={3} dir="right" text="save new facts" />
        </div>

        <Reveal at={1} as="left" style={{ display: 'flex', flex: 1 }}>
          <div className="card" style={{ flex: 1, gap: 18 }}>
            <Label>Long-term · like a hard disk</Label>
            <div className="h2">Vector store / DB</div>
            <div className="row" style={{ gap: 28, alignItems: 'center', flex: 1 }}>
              <svg viewBox="0 0 160 200" width={200} height={250} style={{ flex: 'none' }}>
                <path d="M10 30 v140 a70 22 0 0 0 140 0 v-140" style={{ fill: 'var(--accent-soft)', stroke: 'var(--accent)', strokeWidth: 3 }} />
                <ellipse cx="80" cy="30" rx="70" ry="22" style={{ fill: 'var(--surface)', stroke: 'var(--accent)', strokeWidth: 3 }} />
                <path d="M10 80 a70 22 0 0 0 140 0 M10 125 a70 22 0 0 0 140 0" style={{ fill: 'none', stroke: 'var(--accent-line)', strokeWidth: 3 }} />
              </svg>
              <div className="col" style={{ gap: 18, flex: 1 }}>{facts.map((f) => <div key={f} className="body" style={{ color: 'var(--ink)' }}>{f}</div>)}</div>
            </div>
            <span className="small" style={{ marginTop: 'auto' }}>Survives sessions · searched by meaning (embeddings)</span>
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}
