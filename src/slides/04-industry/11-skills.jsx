import { Slide, Reveal, Stagger, Em, Label } from '../../components'
import { Chip } from './parts/bits'

export const meta = {
  title: 'Skills and roles',
  steps: 1,
  notes: `**Career slide 1 of 3.** The four skill columns cascade in, then the black "roles" bar builds at the bottom (~2 s). The good news: most of this is stuff your CSE degree already starts.

- **Foundations** — Python, APIs & JSON, Git, SQL. Agents are 80% normal software engineering
- **AI layer** — how LLMs work (tokens, context, temperature), prompting, **evals** (testing non-deterministic output), agent frameworks, MCP
- **Production** — cloud & containers, system design, security basics
- **Domain** — banking, health, retail, logistics. The person who understands the *business process* designs the best agent

**Bottom bar — roles that exist today** (all common titles on current job boards):
- **AI engineer** — builds LLM features into products
- **Agent developer** — tools, orchestration, MCP servers
- **Eval / LLMOps engineer** — tests, monitors, measures quality and cost
- **AI product manager** — decides *what* the agent should do and where a human must step in
- **Solutions / forward-deployed engineer** — builds agents with customers

**Ask:** "Which one of these four columns are you weakest in?" Fix that one first.

**Transition:** "Skills come from building. Here's what to build."`,
}

const groups = [
  { title: 'Foundations', items: ['Python', 'APIs & JSON', 'Git', 'SQL'], start: 'Ship one REST API.' },
  { title: 'AI layer', items: ['LLM basics', 'Prompting', 'Evals', 'Agent frameworks', 'MCP'], start: 'Write 20 test prompts. Score them.' },
  { title: 'Production', items: ['Cloud', 'Containers', 'System design', 'Security'], start: 'Deploy it in a container.' },
  { title: 'Domain', items: ['Banking', 'Health', 'Retail', 'Logistics'], start: 'Learn one industry’s workflows.' },
]

const roles = ['AI engineer', 'Agent developer', 'Eval / LLMOps', 'AI product manager', 'Solutions engineer']

export default function Skills() {
  return (
    <Slide section="industry" kicker="Your career" title={<>Skills to build <Em>now</Em></>}>
      <Stagger className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {groups.map((g, i) => (
          <div key={g.title} className={`card ${i === 1 ? 'tint' : ''}`} style={{ flex: 1, gap: 22 }}>
            <div className="tag-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="h2">{g.title}</div>
            <div className="row" style={{ gap: 12, flexWrap: 'wrap' }}>{g.items.map((x) => <Chip key={x} tone={i === 1 ? 'accent' : 'line'}>{x}</Chip>)}</div>
            <div className="small" style={{ marginTop: 'auto', paddingTop: 18, borderTop: '1px solid var(--line)', color: 'var(--ink-2)' }}><b className="accent">Start:</b> {g.start}</div>
          </div>
        ))}
      </Stagger>
      <Reveal at={1} className="card ink" style={{ flex: 'none', gap: 18, padding: '28px 40px' }}>
        <Label style={{ color: 'inherit', opacity: .6 }}>Roles hiring now</Label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, auto)', justifyContent: 'space-between', gap: 24 }}>
          {roles.map((r) => <span key={r} className="h3">{r}</span>)}
        </div>
      </Reveal>
    </Slide>
  )
}
