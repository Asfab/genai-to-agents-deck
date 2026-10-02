import { Slide, Stagger, Em } from '../../components'

export const meta = {
  title: 'Free resources',
  steps: 0,
  notes: `**Career slide 3 of 3.** All free. Pick *one*, finish it, then build.

- **IBM SkillsBuild** — free courses and digital credentials on AI, including agentic AI. Badges you can put on LinkedIn
- **watsonx Orchestrate trial** — free trial; build today's demo agent yourself. ADK docs for the code route
- **Hugging Face courses** — the LLM course and the AI Agents course; hands-on, open models
- **DeepLearning.AI short courses** — 1–2 hour courses on prompting, RAG, agents, MCP, evals
- **LangChain / LangGraph docs & academy** — the most common open-source agent framework; good tutorials
- **Model Context Protocol docs** — modelcontextprotocol.io: build your own MCP server in an afternoon

**Ask:** "Take out your phone and bookmark one of these right now." (Pause 10 seconds. Seriously.)

**Transition:** "That's everything from me — over to you."`,
}

const res = [
  { icon: '🎓', title: 'IBM SkillsBuild', url: 'skillsbuild.org', text: 'Free AI courses + credentials.' },
  { icon: '🤖', title: 'watsonx Orchestrate trial', url: 'ibm.com/products/watsonx-orchestrate', text: 'Build today\'s demo agent yourself.' },
  { icon: '🤗', title: 'Hugging Face courses', url: 'huggingface.co/learn', text: 'LLM course + AI Agents course.' },
  { icon: '⚡', title: 'DeepLearning.AI', url: 'deeplearning.ai/short-courses', text: '1–2 hour courses: RAG, agents, evals.' },
  { icon: '🦜', title: 'LangChain / LangGraph', url: 'docs.langchain.com', text: 'Docs + free academy courses.' },
  { icon: '🔌', title: 'Model Context Protocol', url: 'modelcontextprotocol.io', text: 'Build your own MCP server.' },
]

export default function Resources() {
  return (
    <Slide section="industry" kicker="Your career" title={<>Learn it <Em>free</Em>, starting tonight</>}>
      <Stagger className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 1fr)' }}>
        {res.map((r, i) => (
          <div key={r.title} className={`card ${i < 2 ? 'tint' : ''}`} style={{ flex: 1, flexDirection: 'row', gap: 28, alignItems: 'center' }}>
            <div style={{ fontSize: 56, lineHeight: 1, flex: 'none' }}>{r.icon}</div>
            <div className="col" style={{ gap: 10, minWidth: 0 }}>
              <div className="card-title">{r.title}</div>
              <div className="card-text">{r.text}</div>
              <div className="mono small accent" style={{ overflowWrap: 'anywhere' }}>{r.url}</div>
            </div>
          </div>
        ))}
      </Stagger>
    </Slide>
  )
}
