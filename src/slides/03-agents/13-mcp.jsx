import { Plug, Wrench, FileText, MessageSquareText } from 'lucide-react'
import { Slide, Reveal, Em, Label } from '../../components'
import { Stage, Pos, Wires, Wire } from './parts/kit'

export const meta = {
  title: 'MCP: Model Context Protocol',
  steps: 4,
  notes: `**The hidden bottleneck** in agentic systems: tool silos, the same glue code rewritten for every app, context scattered everywhere, tight coupling to one platform.

- Left (builds first): 3 AI apps × 4 tools = **12 custom integrations**. Add one app → 4 more
- Right: **MCP** (Model Context Protocol, open-sourced by Anthropic, Nov 2024). Each tool is wrapped once as an *MCP server*; every app speaks MCP. 3 + 4 = **7**
- Analogy: **USB-C**. One port, any device

An MCP server exposes three things (they build in last):

- **Tools**: actions the model can call
- **Resources**: data it can read
- **Prompts**: reusable templates the server ships

Now supported across OpenAI, Google, Microsoft, IBM (watsonx Orchestrate) and most IDEs.

**Ask:** "Who has used an MCP server in VS Code or Cursor?" (Some hands. Tell them they can write one in ~20 lines.)

**Transition:** "MCP connects agents to tools. What connects agents to *other agents*?"`,
}

const apps = ['Claude', 'ChatGPT', 'VS Code']
const tools = ['GitHub', 'Slack', 'Postgres', 'Drive']
const W = 780, H = 300
const ay = (i) => 30 + i * 95 + 28, ty = (i) => 10 + i * 75 + 26

function Diagram({ mcp, at }) {
  return (
    <Stage w={W} h={H}>
      <Wires w={W} h={H}>
        {mcp
          ? <>
              {apps.map((_, i) => <Wire key={'a' + i} d={`M 200 ${ay(i)} C 250 ${ay(i)}, 250 150, 296 150`} at={at} delay={0.2 + i * 0.08} width={3} head={false} />)}
              {tools.map((_, i) => <Wire key={'t' + i} d={`M 484 150 C 530 150, 530 ${ty(i)}, 574 ${ty(i)}`} at={at} delay={0.4 + i * 0.08} width={3} head={false} />)}
            </>
          : apps.flatMap((_, i) => tools.map((__, j) => <Wire key={`${i}${j}`} d={`M 200 ${ay(i)} L 574 ${ty(j)}`} at={at} delay={0.15 + (i * 4 + j) * 0.04} tone="muted" width={2.5} head={false} />))}
      </Wires>
      {apps.map((a, i) => (
        <Pos key={a} x={0} y={30 + i * 95} w={200} h={56} at={at} as="right"><Chip>{a}</Chip></Pos>
      ))}
      {tools.map((t, i) => (
        <Pos key={t} x={580} y={10 + i * 75} w={200} h={52} at={at} as="left"><Chip>{t}</Chip></Pos>
      ))}
      {mcp && (
        <Pos x={300} y={95} w={180} h={110} at={at} delay={0.2} as="scale">
          <div className="card ink" style={{ width: '100%', padding: 0, alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <div className="row" style={{ gap: 10, alignItems: 'center' }}><span className="icon"><Plug /></span><span className="card-title">MCP</span></div>
          </div>
        </Pos>
      )}
    </Stage>
  )
}

const Chip = ({ children }) => (
  <div className="small" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '1.5px solid var(--line-strong)', borderRadius: 'var(--radius-sm)', color: 'var(--ink)', fontWeight: 600, whiteSpace: 'nowrap' }}>{children}</div>
)

const prims = [
  { icon: <Wrench />, t: 'Tools', d: 'Actions the model can call', ex: 'create_issue()' },
  { icon: <FileText />, t: 'Resources', d: 'Data the model can read', ex: 'file://, db rows' },
  { icon: <MessageSquareText />, t: 'Prompts', d: 'Reusable templates', ex: '/summarise-pr' },
]

export default function MCP() {
  return (
    <Slide section="agents" kicker="MCP · Model Context Protocol" title={<>MCP: a <Em>USB-C port</Em> for AI tools</>}>
      <div className="row" style={{ gap: 28, flex: 'none' }}>
        <Reveal as="up" className="card flat" style={{ flex: 1, gap: 12, padding: '26px 32px' }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Label>Without a standard</Label><span className="small" style={{ color: 'var(--rose)', fontWeight: 600 }}>3 × 4 = 12 integrations</span>
          </div>
          <Diagram at={0} />
        </Reveal>
        <Reveal at={1} as="up" className="card tint" style={{ flex: 1, gap: 12, padding: '26px 32px' }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Label>With MCP</Label><span className="small accent" style={{ fontWeight: 600 }}>3 + 4 = 7 connections</span>
          </div>
          <Diagram mcp at={1} />
        </Reveal>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'auto repeat(3, minmax(0, 1fr))', gap: 24, alignItems: 'stretch' }}>
        <Reveal at={2} as="fade" className="col" style={{ justifyContent: 'center', gap: 6, paddingRight: 8 }}>
          <span className="label">An MCP server</span>
          <span className="h3">exposes</span>
        </Reveal>
        {prims.map((p, i) => (
          <Reveal key={p.t} at={2 + i} as="up" style={{ display: 'flex' }}>
            <div className="card" style={{ flex: 1, gap: 10, padding: '28px 34px', justifyContent: 'center' }}>
              <div className="row" style={{ gap: 18, alignItems: 'center' }}>
                <span className="icon">{p.icon}</span>
                <div className="card-title">{p.t}</div>
              </div>
              <div className="card-text">{p.d}</div>
              <div className="mono small accent">{p.ex}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Slide>
  )
}
