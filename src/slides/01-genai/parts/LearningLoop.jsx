import { motion, AnimatePresence } from 'framer-motion'
import { useSlide } from '../../../engine/SlideContext'
import { ease, Label } from '../../../components'

// Training demo driven by the engine's step counter (the slide loops).
// Each example takes 3 steps: 0 forward pass → 1 compare → 2 backprop/update (or "correct").
// One final step shows the "now imagine this trillions of times" summary.
export const EXAMPLES = [
  { prompt: 'The cat sat on the', guess: 'car', correct: 'mat' },
  { prompt: 'The sun is very', guess: 'bright', correct: 'bright' },
  { prompt: 'I need to charge my', guess: 'horse', correct: 'phone' },
  { prompt: 'He opened the front', guess: 'door', correct: 'door' },
]
export const LOOP_STEPS = EXAMPLES.length * 3 // + 1 summary step

const PHASES = [
  { num: '01', title: 'Forward pass', desc: 'Feed the words through the network, get a prediction' },
  { num: '02', title: 'Compare', desc: 'How far off was it from the real next word?' },
  { num: '03', title: 'Backpropagate', desc: 'Trace the error back through every connection' },
  { num: '04', title: 'Update weights', desc: 'Nudge each connection to reduce the error next time' },
]

export default function LearningLoop() {
  const { step } = useSlide()
  const done = step >= LOOP_STEPS
  const ex = Math.min(Math.floor(step / 3), EXAMPLES.length - 1)
  const phase = done ? -1 : step % 3
  const cur = EXAMPLES[ex]
  const wrong = cur.guess !== cur.correct
  const adjusting = !done && phase === 2 && wrong
  // how many weight updates have happened so far → reshuffles the connection strengths
  const iteration = EXAMPLES.slice(0, done ? EXAMPLES.length : ex + (phase === 2 ? 1 : 0)).filter((e) => e.guess !== e.correct).length
  const activePhases = done ? [] : phase === 0 ? [0] : phase === 1 ? [1] : wrong ? [2, 3] : [1]

  return (
    <div className="grid" style={{ gridTemplateColumns: '1.25fr 1fr', gridTemplateRows: 'minmax(0, 1fr) auto' }}>
      {/* Left: the example being trained on */}
      <div className="card" style={{ padding: '28px 44px', gap: 20, minHeight: 0 }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Label style={{ color: 'var(--accent)' }}>Training in action</Label>
          <span className="mono small">{done ? `${EXAMPLES.length} / ${EXAMPLES.length} … and billions more` : `Example ${ex + 1} / ${EXAMPLES.length}`}</span>
        </div>
        <div className="col" style={{ flex: 1, justifyContent: 'center', gap: 22 }}>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" className="col" style={{ gap: 18 }}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }}>
                <div className="h2 em">Now imagine this — trillions of times.</div>
                <div className="body">Each mistake tunes the network a little. After enough text, it picks up grammar, facts and reasoning — all from next-word prediction.</div>
              </motion.div>
            ) : (
              <motion.div key={ex} className="col" style={{ gap: 22 }}
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease }}>
                <div className="prompt-box" style={{ fontSize: 40, padding: '22px 30px' }}>
                  {cur.prompt} <span className="accent">___</span>
                </div>
                <Row show={phase >= 1} label="Predicted">
                  <Chip ok={!wrong}>{cur.guess}</Chip>
                  <span className="h3" style={{ color: wrong ? 'var(--rose)' : 'var(--emerald)' }}>{wrong ? '✗' : '✓'}</span>
                </Row>
                <Row show={phase >= 2} label={wrong ? 'Expected' : ''}>
                  {wrong
                    ? <><Chip ok>{cur.correct}</Chip><span className="pill">Error → backpropagate → adjust weights</span></>
                    : <span className="body" style={{ color: 'var(--emerald)', fontWeight: 600 }}>Correct — weights stay as they are</span>}
                </Row>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right: a toy neural network that lights up when weights are adjusted */}
      <div className="card tint" style={{ padding: '24px 32px', gap: 4, minHeight: 0 }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', minHeight: 40 }}>
          <Label>Neural network</Label>
          {adjusting && (
            <motion.span className="pill" style={{ background: 'var(--accent)', color: 'var(--surface)' }}
              animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 0.8, repeat: Infinity }}>Updating weights</motion.span>
          )}
        </div>
        <NeuralNet adjusting={adjusting} iteration={iteration} />
      </div>

      {/* Bottom: the four phases of every training step */}
      <div className="grid" style={{ gridColumn: '1 / -1', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 20 }}>
        {PHASES.map((p, i) => {
          const on = activePhases.includes(i)
          return (
            <div key={p.num} className={`card ${on ? 'tint' : ''}`} style={{ padding: '18px 26px', gap: 4, transition: 'background .3s, border-color .3s', borderColor: on ? 'var(--accent)' : undefined }}>
              <div className="row" style={{ gap: 14, alignItems: 'baseline' }}>
                <span className="tag-num">{p.num}</span>
                <span className="card-title" style={{ fontSize: 30, color: on ? 'var(--accent)' : undefined }}>{p.title}</span>
              </div>
              <div className="card-text" style={{ fontSize: 24 }}>{p.desc}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Row = ({ show, label, children }) => (
  <motion.div className="row" style={{ gap: 18, alignItems: 'center', minHeight: 60 }}
    initial={false} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }} transition={{ duration: 0.3, ease }}>
    <span className="small" style={{ width: 150, flex: 'none' }}>{label}</span>
    {children}
  </motion.div>
)

const Chip = ({ ok, children }) => (
  <span className="mono" style={{
    fontSize: 34, fontWeight: 600, padding: '8px 20px', borderRadius: 10,
    color: ok ? 'var(--emerald)' : 'var(--rose)',
    background: `color-mix(in srgb, var(${ok ? '--emerald' : '--rose'}) 9%, var(--surface))`,
    border: `1.5px solid color-mix(in srgb, var(${ok ? '--emerald' : '--rose'}) 35%, var(--surface))`,
  }}>{children}</span>
)

// ── toy network: 4 → 6 → 6 → 3 ──
const SIZES = [4, 6, 6, 3]
const W = 300, H = 250
const LX = [40, 113, 187, 260]
const ny = (l, i) => { const gap = 34, tot = (SIZES[l] - 1) * gap; return (H - 34 - tot) / 2 + i * gap }

function weights(seed) {
  const w = []
  for (let l = 0; l < SIZES.length - 1; l++)
    for (let i = 0; i < SIZES[l]; i++)
      for (let j = 0; j < SIZES[l + 1]; j++) w.push(0.2 + (((seed * 31 + l * 7 + i * 13 + j * 17) % 100) / 100) * 0.8)
  return w
}

function NeuralNet({ adjusting, iteration }) {
  const w = weights(iteration)
  const lines = []
  let k = 0
  for (let l = 0; l < SIZES.length - 1; l++)
    for (let i = 0; i < SIZES[l]; i++)
      for (let j = 0; j < SIZES[l + 1]; j++) { lines.push({ l, x1: LX[l], y1: ny(l, i), x2: LX[l + 1], y2: ny(l + 1, j), w: w[k], k }); k++ }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ flex: 1, minHeight: 0, width: '100%', height: '100%' }}>
      {lines.map((c) => (
        <motion.line key={c.k} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
          style={{ stroke: adjusting ? 'var(--accent)' : 'var(--ink-2)' }}
          animate={adjusting
            ? { strokeOpacity: [c.w * 0.3, c.w * 0.95, c.w * 0.45], strokeWidth: [c.w * 0.8, c.w * 2.6, c.w * 1.1] }
            : { strokeOpacity: c.w * 0.32, strokeWidth: c.w * 1.1 }}
          transition={adjusting ? { duration: 0.8, delay: (2 - c.l) * 0.14, ease: 'easeInOut' } : { duration: 0.5 }} />
      ))}
      {SIZES.map((n, l) => Array.from({ length: n }).map((_, i) => {
        const io = l === 0 || l === SIZES.length - 1
        return (
          <motion.circle key={`${l}-${i}`} cx={LX[l]} cy={ny(l, i)} r={io ? 8 : 6}
            strokeWidth={io ? 2.4 : 1.8}
            style={{ fill: 'var(--surface)', stroke: io || adjusting ? 'var(--accent)' : 'var(--ink-2)', transformBox: 'fill-box', transformOrigin: 'center' }}
            animate={{ scale: adjusting && l > 0 ? [1, 1.45, 1] : 1 }}
            transition={{ duration: 0.5, delay: (SIZES.length - 1 - l) * 0.12 + i * 0.02 }} />
        )
      }))}
      {[[LX[0], 'Input'], [(LX[1] + LX[2]) / 2, 'Hidden layers'], [LX[3], 'Output']].map(([x, t]) => (
        <text key={t} x={x} y={H - 4} textAnchor="middle" fontSize="13" fontWeight="600" style={{ fill: 'var(--muted)', fontFamily: 'var(--font-body)' }}>{t}</text>
      ))}
    </svg>
  )
}
