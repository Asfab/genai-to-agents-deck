import { Slide, Reveal, Em } from '../../components'

export const meta = {
  title: 'Tool-calling LLMs',
  steps: 4,
  notes: `Tool calling = an LLM capability to interface with external tools or data. Five steps, one per click:

- **Define** the function (last slide)
- Click 1 → **Bind**: hand the tool schemas to the model with the prompt
- Click 2 → **Model selects**: it replies with *structured JSON*: tool name + arguments. It does NOT run anything
- Click 3 → **Execute**: *your* code runs the function, gets real data
- Click 4 → **Final response**: result goes back; model writes the answer in plain language

**Key line:** "The LLM never runs the tool. It only asks." That's what makes it safe to put checks in between.

Full worked example: IBM's Granite function-calling tutorial (ibm.com/think/tutorials/granite-function-calling).

**Transition:** "The loop also needs a memory, or step 5 forgets step 1."`,
}

const steps = [
  { n: '01', icon: '✍️', t: 'Define', d: 'Write the function + schema', lbl: '# python', code: '@tool\ndef search_trains(\n  origin, dest,\n  date, after)' },
  { n: '02', icon: '🔗', t: 'Bind', d: 'Send tool schemas with the prompt', lbl: '# python', code: 'llm.bind_tools(\n  [search_trains])' },
  { n: '03', icon: '🎯', t: 'Model selects', d: 'Replies with JSON, not prose', lbl: '# LLM output', code: '{"name":\n  "search_trains",\n "args": {\n  "origin": "ERS",\n  "dest": "SBC",\n  "after": "17:00"}}', cls: 'k' },
  { n: '04', icon: '⚙️', t: 'Execute', d: 'Your code runs it for real', lbl: '# tool result', code: '3 trains found\n18:15  SL  ₹485\n19:40  SL  ₹520\n21:05  3A  ₹1310', cls: 's' },
  { n: '05', icon: '💬', t: 'Final response', d: 'Result goes back; LLM answers', lbl: '# LLM output', code: '"Cheapest: the\n6:15 pm sleeper,\n₹485. Book it?"', ink: true },
]

export default function ToolCalling() {
  return (
    <Slide section="agents" kicker="Tool-calling LLMs" title={<>The model <Em>asks</Em>. Your code <Em>acts</Em>.</>}
      lede="The LLM never runs a tool. It only returns a structured request to run one.">
      <div className="fill" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 20 }}>
        {steps.map((s, i) => (
          <Reveal key={s.n} at={i} as="up" style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            <div className={`card ${s.ink ? 'ink' : 'tint'}`} style={{ padding: '28px 28px', gap: 10, flex: 1, justifyContent: 'space-between' }}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="tag-num">{s.n}</span>
                <span className="h3 accent" style={{ lineHeight: 1, visibility: i < 4 ? 'visible' : 'hidden' }}>→</span>
              </div>
              <div className="icon">{s.icon}</div>
              <div className="col" style={{ gap: 8 }}>
                <div className="card-title">{s.t}</div>
                <div className="card-text">{s.d}</div>
              </div>
            </div>
            <div className="code" style={{ height: 330, flex: 'none', padding: '24px 22px', whiteSpace: 'pre', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span className="c">{s.lbl}</span>
              <span className={s.cls}>{s.code}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Slide>
  )
}
