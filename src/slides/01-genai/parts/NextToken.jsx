import { motion, AnimatePresence } from 'framer-motion'
import { useSlide } from '../../../engine/SlideContext'
import { ease } from '../../../components'

// Illustrative numbers only — the point is the mechanism, not the values.
const PROMPT = ['Chai', 'tastes', 'best', 'with']
const ROUNDS = [
  { pick: 'biscuits', cands: [['biscuits', 34], ['friends', 21], ['rain', 14], ['samosa', 11], ['ginger', 6]] },
  { pick: 'and', cands: [['and', 46], ['.', 29], [',', 12], ['on', 5], ['in', 3]] },
  { pick: 'a', cands: [['a', 38], ['friends', 24], ['good', 12], ['some', 9], ['rain', 6]] },
  { pick: 'good', cands: [['good', 31], ['rainy', 22], ['friend', 17], ['long', 9], ['warm', 7]] },
  { pick: 'story', cands: [['story', 29], ['book', 24], ['friend', 21], ['chat', 11], ['view', 5]] },
  { pick: '.', cands: [['.', 62], ['!', 17], [',', 9], ['and', 5], ['to', 3]] },
]

export default function NextToken() {
  const { step } = useSlide()
  const k = Math.min(step, ROUNDS.length - 1) // tokens generated so far
  const generated = ROUNDS.slice(0, k).map((r) => r.pick)
  const round = ROUNDS[k]
  const max = round.cands[0][1]

  return (
    <div className="grid" style={{ gridTemplateColumns: '1.1fr 1fr' }}>
      {/* Left: the growing sentence */}
      <div className="card" style={{ padding: '44px 52px', gap: 28 }}>
        <div className="label">Text so far</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 14px', alignContent: 'flex-start', minHeight: 300 }}>
          {PROMPT.map((w) => (
            <span key={w} style={tokenStyle(false)}>{w}</span>
          ))}
          <AnimatePresence>
            {generated.map((w, i) => (
              <motion.span key={i + w} style={tokenStyle(true)}
                initial={{ opacity: 0, y: 24, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }}>{w}</motion.span>
            ))}
          </AnimatePresence>
          <motion.span style={{ ...tokenStyle(true), background: 'transparent', border: '2px dashed var(--accent-line)', color: 'var(--accent)' }}
            animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>?</motion.span>
        </div>
        <div className="row" style={{ gap: 14, marginTop: 'auto', flexWrap: 'wrap' }}>
          {['Read all tokens', 'Score every possible next token', 'Pick one', 'Append & repeat'].map((s, i) => (
            <div key={s} className="row" style={{ gap: 14, alignItems: 'center' }}>
              <span className="pill">{i + 1} · {s}</span>
              {i < 3 && <span className="muted" style={{ fontSize: 28 }}>→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Right: probability bars for the next token */}
      <div className="card tint" style={{ padding: '44px 52px', gap: 30 }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div className="label">Next-token probabilities</div>
          <div className="small">illustrative</div>
        </div>
        <div className="col" style={{ gap: 26, flex: 1, justifyContent: 'center' }}>
          {round.cands.map(([w, p], i) => (
            <div key={k + '-' + i} className="row" style={{ gap: 22, alignItems: 'center' }}>
              <motion.span className="mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, delay: i * 0.05 }}
                style={{ width: 170, flex: 'none', textAlign: 'right', fontSize: 32, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? 'var(--accent)' : 'var(--ink-2)' }}>{w}</motion.span>
              <div style={{ flex: 1, height: 40, borderRadius: 10, background: 'var(--surface)', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(p / max) * 100}%` }} transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.06 }}
                  style={{ height: '100%', borderRadius: 10, background: i === 0 ? 'var(--accent)' : 'var(--accent-line)' }} />
              </div>
              <span className="mono" style={{ width: 80, flex: 'none', fontSize: 28, color: i === 0 ? 'var(--accent)' : 'var(--muted)' }}>{p}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const tokenStyle = (gen) => ({
  display: 'inline-flex', alignItems: 'center', padding: '12px 22px', borderRadius: 14,
  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 52, lineHeight: 1.1, letterSpacing: '-0.02em',
  background: gen ? 'var(--accent)' : 'var(--surface-2)', color: gen ? 'var(--surface)' : 'var(--ink)',
})
