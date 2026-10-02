import { Slide, Reveal, Em, Label } from '../../components'

export const meta = {
  title: 'Frameworks landscape',
  steps: 3,
  notes: `Don't read every name. Three buckets (one per click):

- **Code-first, open source**: LangGraph (agent flows as graphs with state), CrewAI (role-based crews), AutoGen and Semantic Kernel from Microsoft (now converging into the Microsoft Agent Framework), LlamaIndex (agents over your documents)
- **Model-vendor SDKs**: OpenAI Agents SDK (handoffs, guardrails), Claude Agent SDK (the harness behind Claude Code), Google ADK
- **Enterprise platforms**: where IBM plays. watsonx Orchestrate + its ADK: build agents in code or no-code, plug in agents built elsewhere, govern them centrally. Also Bedrock AgentCore, Copilot Studio, Agentforce

Click 3: the punchline. Wiring one agent is a weekend project. Running hundreds safely (identity, guardrails, observability, cost) is the real job, and where the jobs are.

**Student tip:** start with one: LangGraph or CrewAI in Python, build a 2-tool agent this weekend.

**Transition:** "Let's land the plane."`,
}

const cols = [
  {
    t: 'Code-first · open source', icon: '🧑‍💻', items: [
      ['LangGraph', 'agent flows as stateful graphs'], ['CrewAI', 'role-based agent crews'], ['AutoGen', 'multi-agent conversations'],
      ['LlamaIndex', 'agents over your data'], ['Semantic Kernel', "Microsoft's enterprise SDK"],
    ],
  },
  {
    t: 'Model-vendor SDKs', icon: '🧠', items: [
      ['OpenAI Agents SDK', 'handoffs, guardrails, tracing'], ['Claude Agent SDK', 'the harness behind Claude Code'], ['Google ADK', 'Agent Development Kit'],
    ], foot: '🚀 Start here: a 2-tool agent in ~50 lines of Python',
  },
  {
    t: 'Enterprise platforms', icon: '🏢', tint: true, items: [
      ['watsonx Orchestrate + ADK', 'IBM · build, connect, govern'], ['Bedrock AgentCore', 'AWS'], ['Copilot Studio', 'Microsoft'], ['Agentforce', 'Salesforce'],
    ], foot: '🔌 Speak MCP + A2A, so agents built anywhere plug in',
  },
]

export default function Frameworks() {
  return (
    <Slide section="agents" kicker="Build your own" title={<>The agent <Em>frameworks</Em> landscape</>}>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 28 }}>
        {cols.map((c, i) => (
          <Reveal key={c.t} at={i} as="up" style={{ display: 'flex' }}>
            <div className={`card ${c.tint ? 'tint' : ''}`} style={{ flex: 1, gap: 6, padding: '30px 36px' }}>
              <div className="row" style={{ gap: 14, alignItems: 'center', marginBottom: 10 }}>
                <span className="icon">{c.icon}</span><Label>{c.t}</Label>
              </div>
              {c.items.map(([n, d]) => (
                <div key={n} className="col" style={{ gap: 2, padding: '12px 0', borderTop: '1px solid var(--line)' }}>
                  <span className="card-title">{n}</span>
                  <span className="small">{d}</span>
                </div>
              ))}
              {c.foot && <div className="small" style={{ marginTop: 'auto', padding: '16px 20px', borderRadius: 'var(--radius-sm)', background: c.tint ? 'var(--surface)' : 'var(--accent-soft)', color: 'var(--ink)', fontWeight: 600 }}>{c.foot}</div>}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal at={3} as="up" className="card ink row" style={{ flex: 'none', flexDirection: 'row', alignItems: 'center', gap: 24, padding: '26px 40px' }}>
        <span className="icon">💡</span>
        <span className="h3">Building one agent takes an afternoon. <span className="em" style={{ color: 'var(--accent-line)' }}>Running hundreds safely</span> is the real job.</span>
      </Reveal>
    </Slide>
  )
}
