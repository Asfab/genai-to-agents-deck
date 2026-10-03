import { Slide, Reveal, Stagger, Em, Label } from '../../components'

export const meta = {
  title: 'Model landscape',
  steps: 1,
  notes: `**Pranav takes over here.** Opening line: \"Thanks, Asfab. So LLMs can think but can't act yet. Before we get to agents, let's see who builds these models and where they're genuinely useful today.\"

Two camps — don't rank them, they leapfrog every few months.

- **Closed models** — you use them through an app or a paid API; the weights stay with the company. GPT (OpenAI), Claude (Anthropic), Gemini (Google).
- **Open-weight models** (build in on the right) — you can download and run them yourself, fine-tune them, keep data in-house. Llama (Meta), **Granite (IBM** — built for enterprise, Apache 2.0 licence), Mistral, DeepSeek, Qwen, and Indian-language efforts like Sarvam.
- Companies pick by task, cost, privacy and licence — not by hype. Many use several.

**Ask:** "If you were building an app for a hospital, would you send patient data to a closed API or run an open model in-house? Why?"

**Tip for students:** you can run small open models on your own laptop with tools like Ollama.

**Transition:** "And these models aren't limited to text any more."`,
}

const closed = [
  { name: 'GPT', by: 'OpenAI', note: 'Powers ChatGPT' },
  { name: 'Claude', by: 'Anthropic', note: 'Strong at writing & code' },
  { name: 'Gemini', by: 'Google', note: 'Built into Google apps' },
]
const open = [
  { name: 'Llama', by: 'Meta', note: 'Popular open family' },
  { name: 'Granite', by: 'IBM', note: 'Enterprise-ready, Apache 2.0' },
  { name: 'Mistral', by: 'Mistral AI · France', note: 'Small & efficient' },
  { name: 'DeepSeek', by: 'DeepSeek · China', note: 'Strong reasoning models' },
  { name: 'Qwen', by: 'Alibaba', note: 'Many sizes, multilingual' },
  { name: 'Sarvam', by: 'Sarvam AI · India', note: 'Indian languages first' },
]

const Model = ({ m, tint }) => (
  <div className={`card ${tint ? 'tint' : ''}`} style={{ flex: 1, gap: 8, padding: '26px 32px', justifyContent: 'center' }}>
    <div className="h2">{m.name}</div>
    <div className="body" style={{ color: 'var(--ink)' }}>{m.by}</div>
    <div className="small">{m.note}</div>
  </div>
)

export default function Landscape() {
  return (
    <Slide section="genai" kicker="Who builds them" title={<>The model <Em>landscape</Em></>}>
      <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: 48 }}>
        <Reveal at={0} className="col" style={{ gap: 20 }}>
          <div className="col" style={{ gap: 8 }}>
            <Label>Closed · use via app or API</Label>
            <div className="small">Weights stay with the company</div>
          </div>
          <Stagger className="col" gap={0.08} style={{ gap: 20, flex: 1 }}>
            {closed.map((m) => <Model key={m.name} m={m} />)}
          </Stagger>
        </Reveal>
        <Reveal at={1} className="col" style={{ gap: 20 }}>
          <div className="col" style={{ gap: 8 }}>
            <Label>Open-weight · download, run, fine-tune</Label>
            <div className="small">Keep your data in-house</div>
          </div>
          <Stagger at={1} className="grid" gap={0.07} style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(3, 1fr)', gap: 20 }}>
            {open.map((m) => <Model key={m.name} m={m} tint />)}
          </Stagger>
        </Reveal>
      </div>
    </Slide>
  )
}
