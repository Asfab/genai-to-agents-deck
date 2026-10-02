import { Slide, Reveal, Stagger, Em, Label } from '../../components'
import { Chip } from './parts/bits'

export const meta = {
  title: 'Skills and roles',
  steps: 1,
  notes: `**Career slide 1 of 3.** The good news: most of this is stuff your CSE degree already starts.

- **Foundations** — Python, APIs & JSON, Git, SQL. Agents are 80% normal software engineering
- **AI layer** — how LLMs work (tokens, context, temperature), prompting, **evals** (testing non-deterministic output), agent frameworks, MCP
- **Production** — cloud & containers, system design, security basics
- **Domain** — banking, health, retail, logistics. The person who understands the *business process* designs the best agent

**Click → roles that exist today** (I see these on real job boards and teams):
- **AI engineer** — builds LLM features into products
- **Agent developer** — tools, orchestration, MCP servers
- **LLMOps / eval engineer** — tests, monitors, measures quality and cost
- **AI product manager** — decides *what* the agent should do and where a human must step in
- **Forward-deployed / solutions engineer** — builds agents with customers

**Ask:** "Which one of these four columns are you weakest in?" Fix that one first.

**Transition:** "Skills come from building. Here's what to build."`,
}

const groups = [
  { title: 'Foundations', items: ['Python', 'APIs & JSON', 'Git', 'SQL'] },
  { title: 'AI layer', items: ['LLM basics', 'Prompting', 'Evals', 'Agent frameworks', 'MCP'] },
  { title: 'Production', items: ['Cloud', 'Containers', 'System design', 'Security'] },
  { title: 'Domain', items: ['Banking', 'Health', 'Retail', 'Logistics'] },
]

const roles = ['AI engineer', 'Agent developer', 'LLMOps / eval engineer', 'AI product manager', 'Forward-deployed engineer']

export default function Skills() {
  return (
    <Slide section="industry" kicker="Your career" title={<>Skills to build <Em>now</Em></>}>
      <Stagger className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {groups.map((g, i) => (
          <div key={g.title} className={`card ${i === 1 ? 'tint' : ''}`} style={{ flex: 1, gap: 22 }}>
            <div className="tag-num">{String(i + 1).padStart(2, '0')}</div>
            <div className="h2">{g.title}</div>
            <div className="row" style={{ gap: 12, flexWrap: 'wrap' }}>{g.items.map((x) => <Chip key={x} tone={i === 1 ? 'accent' : 'line'}>{x}</Chip>)}</div>
          </div>
        ))}
      </Stagger>
      <Reveal at={1} className="card ink" style={{ flex: 'none', flexDirection: 'row', alignItems: 'center', gap: 28, padding: '30px 40px', flexWrap: 'wrap' }}>
        <Label style={{ color: 'inherit', opacity: .6 }}>Roles hiring now</Label>
        {roles.map((r, i) => <span key={r} className="h3">{r}{i < roles.length - 1 && <span style={{ opacity: .35, marginLeft: 28 }}>·</span>}</span>)}
      </Reveal>
    </Slide>
  )
}
