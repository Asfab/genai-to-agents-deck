import { Slide, Reveal, Em } from '../../components'
import { Stage, Pos, Wires, Wire, Node } from './parts/kit'

export const meta = {
  title: 'What is an AI agent?',
  steps: 3,
  notes: `**Definition (from the slide):** a system that autonomously executes tasks, using an LLM as its reasoning engine.

- Entry: the LLM in the middle is the *brain*: it decides, it doesn't do
- Click 1 → **Tools** = hands: APIs, search, databases, code
- Click 2 → **Memory** = notebook: what happened so far + what it knows about you
- Click 3 → **Loop**: it keeps going (think → act → check) until the goal is met

**Ask:** "Is ChatGPT with web search an agent?" (Partly. It uses a tool, but usually one shot, no real goal-loop.)

**Transition:** "So how is this different from the chatbot you already use?"`,
}

const W = 1728, H = 500

export default function WhatIsAgent() {
  return (
    <Slide section="agents" kicker="Agent anatomy" title={<>An agent is an LLM that can <Em>act</Em></>}
      lede="A system that autonomously executes tasks, using an LLM as its reasoning engine.">
      <Stage w={W} h={H}>
        <Wires w={W} h={H}>
          <Wire d="M 634 210 L 470 210" at={1} both />
          <Wire d="M 1094 210 L 1258 210" at={2} both />
          <Wire d="M 1010 400 C 1010 488, 718 488, 718 410" at={3} width={4} />
        </Wires>

        <Pos x={634} y={30} w={460} h={360} as="scale">
          <Node variant="ink" center icon="🧠" title="LLM" sub="Reasoning engine: understands the goal, decides the next step" />
        </Pos>

        <Pos x={0} y={60} w={460} h={300} at={1} as="right">
          <Node variant="tint" icon="🛠️" title="Tools" sub="Hands. Call APIs, search, query a DB, run code, send email." />
        </Pos>

        <Pos x={1268} y={60} w={460} h={300} at={2} as="left">
          <Node variant="tint" icon="📒" title="Memory" sub="Notebook. The conversation so far, plus facts it knows about you." />
        </Pos>

        <Pos x={614} y={440} w={500} h={60} at={3} as="fade" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <span className="h3 accent">🔁 Loop until the goal is met</span>
        </Pos>
      </Stage>

      <Reveal at={3} delay={0.4} className="row" style={{ justifyContent: 'center', alignItems: 'center', gap: 22 }}>
        <span className="h2">Agent</span><span className="h2 muted">=</span>
        <span className="h2 accent">LLM</span><span className="h2 muted">+</span>
        <span className="h2 accent">Tools</span><span className="h2 muted">+</span>
        <span className="h2 accent">Memory</span><span className="h2 muted">+</span>
        <span className="h2 accent">Loop</span>
      </Reveal>
    </Slide>
  )
}
