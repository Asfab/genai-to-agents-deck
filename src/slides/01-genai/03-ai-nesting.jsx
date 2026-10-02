import { Slide, Reveal, Em } from '../../components'

export const meta = {
  title: 'AI ⊃ ML ⊃ DL ⊃ GenAI',
  steps: 3,
  notes: `Build the rings one click at a time. Each ring sits *inside* the previous one.

- **AI** — any machine doing something "smart". Can be hand-written rules (old chess engines, Google Maps routing).
- **ML** (click) — instead of writing rules, we show examples and it learns the pattern. Spam filters, fraud alerts on UPI.
- **DL** (click) — ML with deep neural networks. Face unlock, speech-to-text.
- **GenAI** (click) — deep learning that *creates* new content: text, code, images, audio.

**Ask:** "Is a calculator AI? Is Google Maps?" (Maps routing = classic AI, not ML at its core.)

**Transition:** "GenAI is the innermost ring. What makes it different from the ML you study in class?"`,
}

const rings = [
  { at: 0, key: 'AI', name: 'Artificial Intelligence', what: 'Machines doing "smart" things — even with hand-written rules.', eg: 'Chess engines · Maps routing' },
  { at: 1, key: 'ML', name: 'Machine Learning', what: 'Learn patterns from examples instead of rules.', eg: 'Spam filter · UPI fraud alerts' },
  { at: 2, key: 'DL', name: 'Deep Learning', what: 'ML with many-layered neural networks.', eg: 'Face unlock · Speech-to-text' },
  { at: 3, key: 'GenAI', name: 'Generative AI', what: 'Deep learning that creates new content.', eg: 'ChatGPT · image & music generators' },
]

// concentric ring geometry: vertical / horizontal insets per ring
const dy = 78, dx = 92

export default function Nesting() {
  return (
    <Slide section="genai" kicker="The big picture" title={<>"AI" is a <Em>big word</Em></>}>
      <div className="row fill" style={{ gap: 72, alignItems: 'stretch' }}>
        <div style={{ position: 'relative', width: 760, flex: 'none' }}>
          {rings.map((r, i) => (
            <Reveal key={r.key} at={r.at} as="scale" style={{
              position: 'absolute', top: i * dy, bottom: i * dy, left: i * dx, right: i * dx,
              borderRadius: 40, border: '2px solid var(--accent-line)',
              background: i === 3 ? 'var(--accent)' : `color-mix(in srgb, var(--accent) ${4 + i * 5}%, var(--surface))`,
              display: 'flex', justifyContent: 'center', paddingTop: 22,
            }}>
              <span className="h3" style={{ color: i === 3 ? 'var(--surface)' : 'var(--accent)', ...(i === 3 ? { alignSelf: 'center', paddingBottom: 22 } : null) }}>{r.key}</span>
            </Reveal>
          ))}
        </div>
        <div className="col fill" style={{ justifyContent: 'space-between', gap: 20 }}>
          {rings.map((r) => (
            <Reveal key={r.key} at={r.at} as="left" dim className="row" style={{ gap: 28, alignItems: 'flex-start', flex: 1 }}>
              <div className="mono accent" style={{ width: 120, flex: 'none', fontWeight: 600, fontSize: 30, paddingTop: 4 }}>{r.key}</div>
              <div className="col" style={{ gap: 8 }}>
                <div className="h3">{r.name}</div>
                <div className="body">{r.what}</div>
                <div className="small">{r.eg}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Slide>
  )
}
