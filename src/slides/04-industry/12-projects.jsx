import { Slide, Stagger, Em } from '../../components'
import { Chip } from './parts/bits'

export const meta = {
  title: 'Start this weekend',
  steps: 0,
  notes: `**Career slide 2 of 3.** Five projects, easiest to hardest. Each one teaches one new idea. Put every one on GitHub with a README and a 30-second demo video — that's your portfolio.

- **01 Weather assistant** — give an agent a public API (Open-Meteo) as a tool from its OpenAPI spec. Teaches: tools. ~2 hours
- **02 Ask-a-GitHub-repo** — connect an existing MCP server (DeepWiki) with just a URL. Teaches: MCP
- **03 College helpdesk** — RAG over your syllabus, timetable and circular PDFs; answers *with citations*. Teaches: retrieval + grounding
- **04 Expense tracker** — parse UPI SMS/CSV exports with a Python tool, categorise, weekly summary. Teaches: custom tools + structured output
- **05 Multi-agent concierge** — a supervisor routing to booking + food agents (like TicketTown), with an eval set of 20 test prompts. Teaches: orchestration + evals

**Ask:** "Which one are you starting on Saturday?" Get two or three people to commit out loud.

**Transition:** "You don't need to pay for any of this. Here's where to learn, free."`,
}

const projects = [
  { lvl: 'Beginner', icon: '🌦️', title: 'Weather assistant', text: 'A public API as a tool, straight from its OpenAPI spec.', learn: 'Tools' },
  { lvl: 'Beginner', icon: '🐙', title: 'Ask-a-GitHub-repo', text: 'Plug in an existing MCP server with just a URL.', learn: 'MCP' },
  { lvl: 'Intermediate', icon: '🎓', title: 'College helpdesk', text: 'Answers from syllabus & circular PDFs, with citations.', learn: 'RAG' },
  { lvl: 'Intermediate', icon: '💸', title: 'UPI expense tracker', text: 'Python tool parses spends, writes a weekly summary.', learn: 'Custom tools' },
  { lvl: 'Advanced', icon: '🎬', title: 'Multi-agent concierge', text: 'Supervisor + booking + food agents, with an eval set.', learn: 'Orchestration + evals' },
]

export default function Projects() {
  return (
    <Slide section="industry" kicker="Your career" title={<>Start <Em>this weekend</Em>: five agents to build</>}>
      <Stagger className="grid" gap={0.12} style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {projects.map((p, i) => (
          <div key={p.title} className={`card ${i === 4 ? 'tint' : ''}`} style={{ flex: 1, padding: '32px 30px', gap: 16, marginTop: (4 - i) * 36 }}>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="tag-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="label">{p.lvl}</span>
            </div>
            <div style={{ fontSize: 44, lineHeight: 1 }}>{p.icon}</div>
            <div className="card-title">{p.title}</div>
            <div className="card-text fill">{p.text}</div>
            <Chip tone="accent" style={{ alignSelf: 'flex-start' }}>Learn: {p.learn}</Chip>
          </div>
        ))}
      </Stagger>
    </Slide>
  )
}
