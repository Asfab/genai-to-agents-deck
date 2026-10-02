import { Slide, Reveal, Stagger, Em } from '../../components'
import { Hammer, Plug, Network, ShieldCheck } from 'lucide-react'
import { BigCard, Chip } from './parts/bits'

export const meta = {
  title: 'IBM watsonx Orchestrate',
  steps: 0,
  notes: `**What it is, in one line:** IBM's platform to build, run and govern AI agents — including agents built somewhere else.

- **Build:** no-code in the browser, or agent-as-code with the ADK (Agent Developer Kit) and CLI
- **Connect tools:** an OpenAPI spec, an MCP server URL, or plain Python functions. Plus a catalog of pre-built agents and tools
- **Orchestrate:** a supervisor agent routes work to specialist agents; agentic workflows for multi-step processes with branching and approvals
- **Govern:** the control plane — versions, access control, audit logs, rollback, analytics

The four cards and the black banner cascade in on entry (~1.5 s); no build steps. If the IBM presenter is on stage, hand over for one personal line here ("this is what my team ships").

**Ask:** "If you had to give an agent a tool *without writing code*, which of these three would you pick?" (MCP URL — it's literally a link.)

**Transition:** "There are three ways to build an agent here. Let me show you all three."`,
}

const pillars = [
  { num: '01', icon: Hammer, title: 'Build', text: 'No-code in the browser, or agent-as-code with the ADK.', chips: ['No-code', 'ADK + CLI'] },
  { num: '02', icon: Plug, title: 'Connect', text: 'Give agents tools, or pick from a pre-built catalog.', chips: ['OpenAPI', 'MCP', 'Python'] },
  { num: '03', icon: Network, title: 'Orchestrate', text: 'A supervisor routes work to specialist agents and workflows.', chips: ['Multi-agent', 'Workflows'] },
  { num: '04', icon: ShieldCheck, title: 'Govern', text: 'One control plane for every agent, wherever it was built.', chips: ['Audit', 'Rollback', 'Analytics'] },
]

export default function Orchestrate() {
  return (
    <Slide section="industry" kicker="IBM watsonx Orchestrate"
      title={<>Build, run and govern agents <Em>in one place</Em></>}
      lede="IBM's agentic platform: your agents, third-party agents, and the tools they use, under one control plane.">
      <Stagger className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {pillars.map((p, i) => (
          <BigCard key={p.num} variant={i === 3 ? 'tint' : ''} num={p.num} icon={p.icon} title={p.title} text={p.text}>
            <div className="row" style={{ gap: 10, flexWrap: 'wrap', marginTop: 8 }}>{p.chips.map((c) => <Chip key={c} tone="accent">{c}</Chip>)}</div>
          </BigCard>
        ))}
      </Stagger>
      <Reveal delay={0.7} as="fade" className="card ink" style={{ flex: 'none', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '28px 40px' }}>
        <div className="h3">Build with any framework. Govern from one place.</div>
        <div className="small mono">ibm.com/products/watsonx-orchestrate</div>
      </Reveal>
    </Slide>
  )
}
