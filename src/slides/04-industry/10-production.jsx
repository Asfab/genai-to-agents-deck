import { Slide, Reveal, Em, Bullets } from '../../components'

export const meta = {
  title: 'Agents in production',
  steps: 2,
  notes: `**Building an agent is easy. Running one safely is not.** Keep this short — 90 seconds.

- **Click 1 — Manage:** version prompts, tools and models like code; access control (which agent can call which tool, on whose behalf); deployment pipelines with approval and rollback; cost and rate limits — every step is a paid model call
- **Click 2 — Monitor:** trace every decision (what it saw, chose, and why); log every tool call; guardrails stop unsafe actions *before* they run; dashboards flag drift, cost spikes and repeated failures for a human

Real-world reminder: Air Canada's chatbot invented a refund policy and a tribunal made the airline honour it. The agent's words are the company's words.

**Ask:** "If your agent books the wrong seat 1% of the time, how would you even find out?" (Traces + evals.)

**Transition:** "So — what does all this mean for *you*, sitting in 2nd, 3rd, 4th year?"`,
}

const Panel = ({ at, icon, title, items }) => (
  <Reveal at={at} className="card" style={{ flex: 1, gap: 26 }}>
    <div className="row" style={{ gap: 18, alignItems: 'center' }}><span style={{ fontSize: 44, lineHeight: 1 }}>{icon}</span><div className="h2">{title}</div></div>
    <Bullets items={items} at={at} />
  </Reveal>
)

export default function Production() {
  return (
    <Slide section="industry" kicker="Day 2 problems" title={<>Building is easy. <Em>Running</Em> safely is the job.</>}>
      <div className="row fill" style={{ alignItems: 'stretch' }}>
        <Panel at={1} icon="⚙️" title="Manage" items={[
          <><b>Version</b> prompts, tools and models like code</>,
          <><b>Access control:</b> which agent calls which tool</>,
          <><b>Pipelines:</b> stage, approve, roll back</>,
          <><b>Cost:</b> every step is a paid model call</>,
        ]} />
        <Panel at={2} icon="📈" title="Monitor" items={[
          <><b>Trace</b> every decision: saw, chose, why</>,
          <><b>Log</b> every tool call, for audit</>,
          <><b>Guardrails</b> stop unsafe actions first</>,
          <><b>Dashboards</b> flag drift and cost spikes</>,
        ]} />
      </div>
    </Slide>
  )
}
