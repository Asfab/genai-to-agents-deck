import { SectionDivider, Em } from '../../components'

export const meta = {
  title: '03 · AI Agents',
  steps: 0,
  notes: `**Act 3 — AI Agents.** This is the heart of the talk (~25 min).

- So far: LLMs predict text; prompting steers that text
- Now: what happens when we let the model *do* things
- Map on the right = our route for the next 25 minutes

**Ask the room:** "Who has heard the word 'agentic' in the last month?" (expect most hands) "By the end you'll be able to explain it better than most LinkedIn posts."

**Transition:** "Let's start with a definition you can actually remember."`,
}

const topics = [
  'What an agent is & the loop',
  'Tools, tool calling & memory',
  'ReAct & multi-agent patterns',
  'MCP & A2A standards',
  'Observability, failures, frameworks',
]

export default function Divider() {
  return (
    <SectionDivider section="agents" num={3} time="~25 min" topics={topics}
      title={<>AI <Em>Agents</Em></>}
      lede={'When LLMs stop answering and start doing: reasoning, tools, memory, and teams of agents.'} />
  )
}
