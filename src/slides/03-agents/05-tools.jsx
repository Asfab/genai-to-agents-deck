import { Slide, Reveal, Em, Label, Pill } from '../../components'

export const meta = {
  title: 'Tools',
  steps: 3,
  notes: `Tools = specialised capabilities that let an agent reach external systems: search APIs, math engines, databases, your company's APIs.

The LLM never sees your code, only the **definition**. So the definition *is* the prompt for tool use:

- Click 1 → **Name**: says what it does. \`search_trains\`, not \`tool_7\`
- Click 2 → **Description**: when to use it. The model literally reads this to decide
- Click 3 → **Typed arguments**: names, types, a description per parameter, so it fills them correctly

Tip for students: most "the agent picked the wrong tool" bugs are bad descriptions, not bad models.

**Ask:** "If you had two tools, \`get_data\` and \`fetch_info\`, how would the model choose?" (It can't. Name them well.)

**Transition:** "So how does the model actually *call* one of these?"`,
}

const parts = [
  { n: '①', t: 'A descriptive name', d: 'Conveys the purpose at a glance' },
  { n: '②', t: 'A clear description', d: 'What it does and when to use it. The model reads this to choose.' },
  { n: '③', t: 'Well-typed arguments', d: 'Name, type and meaning of every parameter' },
]

const Mark = ({ at, n }) => (
  <Reveal at={at} as="fade" tag="span" style={{ display: 'inline' }}><span className="s">  ← {n}</span></Reveal>
)

export default function Tools() {
  return (
    <Slide section="agents" kicker="Tools" title={<>Tools give the agent <Em>hands</Em></>}
      lede="They let an agent reach the outside world: search, databases, APIs, code.">
      <div className="row fill" style={{ gap: 48, alignItems: 'stretch' }}>
        <div className="col" style={{ flex: 1.1, gap: 14 }}>
          <Label>A tool definition · Python</Label>
          <Reveal as="up" className="code fill" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div><span className="k">@tool</span></div>
            <div><span className="k">def</span> search_trains(<Mark at={1} n="①" /></div>
            <div>    origin: <span className="k">str</span>,       <span className="c"># "ERS" (Ernakulam)</span></div>
            <div>    destination: <span className="k">str</span>,  <span className="c"># "SBC" (Bengaluru)</span></div>
            <div>    date: <span className="k">str</span>,         <span className="c"># "2026-10-09"</span></div>
            <div>    after: <span className="k">str</span> = <span className="s">"17:00"</span>,<Mark at={3} n="③" /></div>
            <div>) -&gt; <span className="k">list</span>[Train]:</div>
            <div>    <span className="s">"""Find trains between two</span></div>
            <div><span className="s">    stations on a date, cheapest</span></div>
            <div><span className="s">    first."""</span><Mark at={2} n="②" /></div>
            <div className="c" style={{ marginTop: 18 }}># framework → JSON Schema → LLM</div>
          </Reveal>
        </div>

        <div className="col" style={{ flex: 1, gap: 20 }}>
          {parts.map((p, i) => (
            <Reveal key={p.n} at={i + 1} as="left" style={{ display: 'flex', flex: 1 }}>
              <div className="card tint row" style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 28, padding: '24px 36px' }}>
                <span className="h2 accent">{p.n}</span>
                <div className="col" style={{ gap: 6 }}>
                  <div className="card-title">{p.t}</div>
                  <div className="card-text">{p.d}</div>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal at={0} delay={0.4} as="fade" className="row" style={{ gap: 12, flexWrap: 'wrap' }}>
            {['🔎 Web search', '🧮 Calculator', '🗄️ SQL', '📧 Email', '🚆 Booking API'].map((t) => <Pill key={t} outline>{t}</Pill>)}
          </Reveal>
        </div>
      </div>
    </Slide>
  )
}
