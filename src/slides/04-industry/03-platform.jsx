import { Slide, Reveal, Em } from '../../components'
import { Chip } from './parts/bits'

export const meta = {
  title: 'The enterprise agentic platform',
  steps: 5,
  stepMs: 1000,
  notes: `**The diagram builds itself top-down, one layer per second (~5 s).** Let it finish, then walk it top to bottom in the same order. It is based on IBM's own reference architecture: open, pluggable orchestration with central governance for agents running anywhere.

- **Top — channels:** users stay where they already are — Slack, Teams, WhatsApp, voice, Salesforce, APIs. Nobody installs a new app
- **Layer 1 — the orchestrator:** orchestrator agents + agentic workflows + a catalog of pre-built agents and tools. Three gateways sit in front of everything
- **Layer 2 — agents anywhere (A2A):** it doesn't matter who built the agent — Salesforce Agentforce, Amazon AgentCore, Microsoft Copilot, LangGraph, Langflow. They talk over A2A (Agent-to-Agent protocol)
- **Layer 3 — tools anywhere (MCP):** enterprise apps, automation, collaboration tools, exposed once through the MCP gateway and reused by every agent
- **Layer 4 — models anywhere:** Granite, Claude, OpenAI, Bedrock, Azure AI — swap models without rewriting the agent
- **Right rail — AgentOps:** evaluate, monitor, trace across all of it. Runs as SaaS (AWS, IBM Cloud) or hybrid on Red Hat OpenShift

**Ask:** "Why three gateways and not one?" (Different traffic, different policies: who can call which agent, which tool, which model, and what it costs.)

**Transition:** "This is the picture. watsonx Orchestrate is IBM's product for it — let's look closer."`,
}

const Layer = ({ title, sub, chips, foot, at, style }) => (
  <Reveal at={at} className="card" style={{ padding: '22px 28px', gap: 14, ...style }}>
    <div className="row" style={{ gap: 14, alignItems: 'baseline', justifyContent: 'space-between' }}>
      <div className="h3">{title}</div>
      {sub && <span className="mono small accent">{sub}</span>}
    </div>
    <div className="row" style={{ gap: 10, flexWrap: 'wrap' }}>{chips.map((c) => <Chip key={c}>{c}</Chip>)}</div>
    <div className="small" style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--line)' }}>{foot}</div>
  </Reveal>
)

const Gateway = ({ name }) => (
  <div className="card" style={{ padding: '14px 18px', alignItems: 'center', boxShadow: 'none', border: '1.5px solid var(--accent-line)' }}>
    <div className="small" style={{ color: 'var(--ink)', fontWeight: 650 }}>{name}</div>
  </div>
)

const Down = ({ at, col }) => (
  <Reveal at={at} as="fade" className="accent" style={{ gridColumn: col, textAlign: 'center', lineHeight: 1 }}>
    <svg width="28" height="26" viewBox="0 0 28 26" aria-hidden><path d="M14 0v20M5 13l9 9 9-9" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </Reveal>
)

export default function Platform() {
  return (
    <Slide section="industry" kicker="The enterprise picture" title={<>One platform. Agents, tools and models <Em>anywhere</Em></>}>
      <div className="fill" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 300px', gridTemplateRows: 'auto 26px auto 26px 1fr', columnGap: 24, rowGap: 10 }}>
        {/* Channels */}
        <Reveal style={{ gridColumn: '1 / 4', padding: '20px 28px' }} className="card flat">
          <div className="row" style={{ gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="label">Channels</span>
            {['Slack', 'Teams', 'WhatsApp', 'Voice', 'Salesforce', 'Web & API'].map((c) => <Chip key={c}>{c}</Chip>)}
          </div>
        </Reveal>
        <Down at={1} col="1 / 4" />

        {/* Orchestrator core */}
        <Reveal at={1} as="scale" className="card tint" style={{ gridColumn: '1 / 4', padding: '22px 28px', gap: 16 }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="h3">Orchestrator agents <span className="muted" style={{ fontWeight: 400 }}>· agentic workflows · catalog of pre-built agents &amp; tools</span></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            <Gateway name="Agent gateway · A2A" />
            <Gateway name="MCP gateway" />
            <Gateway name="Model gateway" />
          </div>
        </Reveal>
        <Down at={2} col="1" /><Down at={3} col="2" /><Down at={4} col="3" />

        {/* Anywhere layers */}
        <Layer at={2} title="Agents" sub="deployed anywhere" chips={['watsonx Orchestrate', 'Agentforce', 'Amazon AgentCore', 'Copilot', 'LangGraph', 'Langflow']} foot="Any vendor, any framework. They talk over A2A." style={{ gridColumn: '1', gridRow: '5' }} />
        <Layer at={3} title="Tools" sub="running anywhere" chips={['Enterprise apps', 'Automation', 'Collaboration', 'APIs', 'Your data']} foot="Exposed once via MCP, reused by every agent." style={{ gridColumn: '2', gridRow: '5' }} />
        <Layer at={4} title="Models" sub="hosted anywhere" chips={['IBM Granite', 'Claude', 'OpenAI', 'Bedrock', 'Azure AI']} foot="Swap the model without rewriting the agent." style={{ gridColumn: '3', gridRow: '5' }} />

        {/* AgentOps rail */}
        <Reveal at={5} as="left" className="card ink" style={{ gridColumn: '4', gridRow: '1 / 6', padding: '32px 30px', gap: 18, justifyContent: 'space-between' }}>
          <div className="col" style={{ gap: 18 }}>
            <div className="label" style={{ color: 'inherit', opacity: .6 }}>AgentOps</div>
            {['Evaluate', 'Monitor', 'Trace logs', 'Optimize'].map((x) => (
              <div key={x} className="h3" style={{ borderTop: '1px solid rgba(255,255,255,.18)', paddingTop: 16 }}>{x}</div>
            ))}
          </div>
          <div className="col" style={{ gap: 10 }}>
            <div className="label" style={{ color: 'inherit', opacity: .6 }}>Runs on</div>
            <div className="small">SaaS (AWS, IBM Cloud) or hybrid on Red Hat OpenShift</div>
          </div>
        </Reveal>

      </div>
    </Slide>
  )
}
