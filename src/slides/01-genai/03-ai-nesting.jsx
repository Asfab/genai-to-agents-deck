import { Slide, Reveal, Em } from '../../components'

export const meta = {
  title: 'AI ⊃ ML ⊃ DL ⊃ GenAI',
  steps: 4,
  notes: `"Your washing machine has 'AI mode'. Your phone camera has 'AI enhancement'. Everything is 'AI-powered'. What does that actually mean?" The boxes build from the outside in.

- **Artificial Intelligence** — broadest term, around since the 1950s. Any machine that mimics human reasoning — even with hand-written rules. Chess programs, Maps routing.
- **Machine Learning** — instead of writing rules, you feed the machine *data* and let it figure out the rules itself. Spam filters, UPI fraud alerts.
- **Deep Learning** — ML with layered neural networks. Exploded around 2012 when GPUs got powerful enough. Face unlock, speech-to-text.
- **Generative AI** — the newest. Doesn't just analyse or classify — it **creates**: new text, images, code. Mainstream only since ~2022.

Mental model: **Russian nesting dolls.** Every GenAI model *is* a deep-learning model *is* an ML model *is* AI. Each layer is narrower, more powerful and more recent.

**Ask:** "When your uncle says 'AI will take our jobs' — which box does he mean?" (Usually the innermost one.)

**Transition:** "So what makes that innermost box different from everything before it?"`,
}

const layers = [
  { name: 'Artificial Intelligence', desc: 'Machines that mimic human reasoning', era: 'since 1950s', eg: 'Chess engines · Maps routing' },
  { name: 'Machine Learning', desc: 'Systems that learn rules from data', era: '1990s →', eg: 'Spam filter · UPI fraud alerts' },
  { name: 'Deep Learning', desc: 'Many-layered neural networks', era: '2012 →', eg: 'Face unlock · Speech-to-text' },
  { name: 'Generative AI', desc: 'Creates entirely new content', era: '2022 →', eg: null },
]

// nested-box geometry (px): each layer is inset from its parent
const TOP = 118, SIDE = 56, BOTTOM = 24

export default function Nesting() {
  return (
    <Slide section="genai" kicker="The big picture" title={<>"AI" is a <Em>big word</Em></>}>
      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        {layers.map((l, i) => {
          const gen = i === 3
          return (
            <Reveal key={l.name} at={i} as="scale" style={{
              position: 'absolute', top: i * TOP, bottom: i * BOTTOM, left: i * SIDE, right: i * SIDE,
              borderRadius: 'var(--radius)',
              border: gen ? '2px solid var(--accent)' : '1.5px solid var(--accent-line)',
              background: `color-mix(in srgb, var(--accent) ${gen ? 10 : i * 3}%, var(--surface))`,
              padding: '22px 36px', display: 'flex', flexDirection: 'column',
            }}>
              <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
                <div className="col" style={{ gap: 4 }}>
                  <div className="h3" style={{ color: gen ? 'var(--accent)' : 'var(--ink)' }}>{l.name}</div>
                  <div className="body" style={{ color: gen ? 'var(--accent)' : undefined }}>{l.desc}</div>
                </div>
                <div className="col" style={{ gap: 8, alignItems: 'flex-end', paddingTop: 4 }}>
                  <span className="mono" style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)' }}>{l.era}</span>
                  {l.eg && <span className="small">{l.eg}</span>}
                </div>
              </div>
              {gen && (
                <div className="row" style={{ flex: 1, gap: 16, alignItems: 'center', alignContent: 'center', flexWrap: 'wrap' }}>
                  {['ChatGPT', 'Gemini', 'Claude', 'Copilot', 'Midjourney', 'Suno'].map((p) => <span key={p} className="pill" style={{ fontSize: 26, padding: '12px 24px', background: 'var(--surface)', border: '1.5px solid var(--accent-line)' }}>{p}</span>)}
                </div>
              )}
            </Reveal>
          )
        })}
      </div>
      <Reveal at={4} as="fade" className="lede" style={{ textAlign: 'center', alignSelf: 'center', marginTop: -8 }}>
        Each layer builds on the last. <span className="em">Generative AI is the frontier.</span>
      </Reveal>
    </Slide>
  )
}
