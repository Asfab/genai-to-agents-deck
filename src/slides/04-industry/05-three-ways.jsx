import { Slide, Reveal, Em, Label } from '../../components'

export const meta = {
  title: 'Three ways to build an agent',
  steps: 3,
  notes: `Same agent, three doors. Pick the one that fits who you are.

- **Click 1 — No-code UI:** create an agent, describe its job in plain English, add tools and knowledge, test in the preview chat, deploy. A business analyst can do this
- **Click 2 — Pro-code with the ADK CLI:** \`pip install ibm-watsonx-orchestrate\`, add and activate an environment, then \`orchestrate agents import -f agent.yaml\`. Agent-as-code: it lives in Git, gets reviewed, versioned and deployed like any service. Pre-flight: check \`python --version\`, \`orchestrate --version\`
- **Click 3 — With IBM Bob:** describe the agent to Bob in the IDE; Bob writes the YAML and the tools, then deploys it via the ADK

**Ask:** "Who here would pick the UI? The CLI? Bob?" — CSE students usually pick CLI. Good: that's the one recruiters can see on your GitHub.

**Transition:** "Enough slides. Let's build one live."`,
}

const Col = ({ at, num, title, who, children }) => (
  <Reveal at={at} className="card" style={{ flex: 1, gap: 20 }}>
    <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <span className="mono accent h3">{num}</span>
      <span className="pill outline">{who}</span>
    </div>
    <div className="h2">{title}</div>
    <div className="col fill" style={{ gap: 14, justifyContent: 'flex-end' }}>{children}</div>
  </Reveal>
)

const Steps = ({ items }) => (
  <ol className="col" style={{ gap: 14, listStyle: 'none' }}>
    {items.map((s, i) => (
      <li key={s} className="row small" style={{ gap: 16, alignItems: 'baseline', color: 'var(--ink-2)' }}>
        <span className="mono accent" style={{ flex: 'none' }}>{String(i + 1).padStart(2, '0')}</span>{s}
      </li>
    ))}
  </ol>
)

export default function ThreeWays() {
  return (
    <Slide section="industry" kicker="watsonx Orchestrate" title={<>Three ways to build the <Em>same</Em> agent</>}>
      <div className="row fill" style={{ alignItems: 'stretch' }}>
        <Col at={1} num="01" title="No-code UI" who="Anyone">
          <Steps items={['Create an agent, describe its job', 'Add tools and knowledge', 'Test in the preview chat', 'Deploy']} />
        </Col>
        <Col at={2} num="02" title="ADK + CLI" who="Developers">
          <Label>Agent-as-code</Label>
          <div className="code">
            <span className="c">$ </span>pip install ibm-watsonx-orchestrate{'\n'}
            <span className="c">$ </span>orchestrate env activate <span className="s">dev</span>{'\n'}
            <span className="c">$ </span>orchestrate agents import \{'\n'}    -f <span className="s">agent.yaml</span>
          </div>
        </Col>
        <Col at={3} num="03" title="With IBM Bob" who="AI-assisted">
          <div className="prompt-box">“Build an agent that books movie seats using the TicketTown MCP server.”</div>
          <div className="small" style={{ color: 'var(--ink-2)' }}>Bob writes the YAML and tools, then deploys with the ADK.</div>
        </Col>
      </div>
    </Slide>
  )
}
