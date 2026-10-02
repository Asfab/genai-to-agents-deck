import { useEffect, useState } from 'react'
import { Slide, Reveal, Flow, Card, Em, Label } from '../../components'
import { useSlide } from '../../engine/SlideContext'

export const meta = {
  title: 'Why everything before 2017 was slow',
  steps: 3,
  notes: `The road to the Transformer, left to right. The little word strips animate how each model *reads*.

- **RNNs (~2014)** — read words one by one, like reading a book **through a keyhole**. You see one word, try to remember what came before, guess what's next. Slow, and it forgets the start of long sentences.
- **LSTMs (~2015)** — a smarter memory, so they remembered more (see the fading trail) — but still painfully one word at a time. Word 50 has to wait for words 1–49.
- **Transformers (2017)** — look at **every word at once**, like a panoramic window. No waiting → runs in parallel on GPUs → can be trained on the whole internet. Game over for sequential models.

**Ask:** "Why does 'one word at a time' make training slow on a GPU with thousands of cores?" (Because the cores sit idle waiting for the previous word.)

**Transition:** "So what's the trick that lets a model look at everything at once? One idea, from one paper."`,
}

const WORDS = ['The', 'cat', 'sat', 'on', 'the', 'mat']

// Animated strip showing how each architecture reads a sentence.
function Reading({ mode }) {
  const { active } = useSlide()
  const [t, setT] = useState(WORDS.length - 1)
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setT((v) => (v + 1) % (WORDS.length + 2)), 520)
    return () => clearInterval(id)
  }, [active])
  const level = (i) => {
    if (mode === 'all') return t < WORDS.length ? 1 : 0.55
    if (mode === 'one') return i === t ? 1 : 0.12
    return i <= t ? Math.max(0.16, 1 - (t - i) * 0.24) : 0.08 // 'trail'
  }
  return (
    <div className="row" style={{ gap: 8, flexWrap: 'nowrap' }}>
      {WORDS.map((w, i) => {
        const a = level(i)
        return (
          <span key={i} className="mono" style={{
            flex: 1, textAlign: 'center', fontSize: 26, padding: '16px 0', borderRadius: 10,
            background: `color-mix(in srgb, var(--accent) ${Math.round(a * 100)}%, var(--surface-2))`,
            color: a > 0.5 ? 'var(--surface)' : 'var(--ink-2)',
            transition: 'background .35s, color .35s',
          }}>{w}</span>
        )
      })}
    </div>
  )
}

const eras = [
  { label: 'RNNs', year: '~2014', mode: 'one', facts: [['Reads in parallel', '✗'], ['Long-range memory', 'Weak']], like: 'Reading through a keyhole', text: 'Read words one by one — and forget the start of long sentences.' },
  { label: 'LSTMs', year: '~2015', mode: 'trail', facts: [['Reads in parallel', '✗'], ['Long-range memory', 'Better']], like: 'A small window', text: 'Remembered more, but still painfully one word at a time.' },
  { label: 'Transformers', year: '2017', mode: 'all', facts: [['Reads in parallel', '✓'], ['Long-range memory', 'Strong']], like: 'A panoramic view', text: 'Process every word at once — in parallel, on GPUs.' },
]

export default function Journey() {
  return (
    <Slide section="genai" kicker="Evolution" title={<>Why everything before 2017 was <Em>slow</Em></>}>
      <Flow stepped at={0} style={{ flex: 1, minHeight: 0 }} nodes={eras.map((e, i) => (
        <Card variant={i === 2 ? 'tint' : ''} style={{ gap: 22, ...(i === 2 ? { borderColor: 'var(--accent)', borderWidth: 2 } : null) }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="h2" style={{ color: i === 2 ? 'var(--accent)' : 'var(--ink)' }}>{e.label}</div>
            <span className="tag-num" style={{ fontSize: 24 }}>{e.year}</span>
          </div>
          <div className="col" style={{ gap: 12 }}>
            <Label>How it reads</Label>
            <Reading mode={e.mode} />
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <div className="h3 em" style={{ borderLeft: '4px solid var(--accent-line)', paddingLeft: 20 }}>“{e.like}”</div>
          </div>
          <div className="card-text">{e.text}</div>
          <div className="col" style={{ gap: 0 }}>
            {e.facts.map(([k, v]) => (
              <div key={k} className="row" style={{ justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid var(--line)' }}>
                <span className="small">{k}</span>
                <span className="mono" style={{ fontSize: 26, fontWeight: 600, color: i === 2 ? 'var(--accent)' : 'var(--ink-2)' }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
      ))} />
      <Reveal at={3} as="scale">
        <div className="card ink" style={{ padding: '26px 44px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <span className="h3">One word at a time → slow & forgetful. All at once → fast & scalable.</span>
          <span className="body">The idea that made it possible: attention</span>
        </div>
      </Reveal>
    </Slide>
  )
}
