import { motion, AnimatePresence } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { useSlide } from '../../../engine/SlideContext'
import { ease } from '../../../components'

// "it" attends to different words depending on the last word of the sentence.
const BASE = ['The', 'animal', "didn't", 'cross', 'the', 'street', 'because', 'it', 'was', 'too']
const IT = 7
const VARIANTS = [
  { last: 'tired.', weights: { 1: 0.9, 5: 0.15, 0: 0.08 } },
  { last: 'wide.', weights: { 5: 0.9, 1: 0.15, 4: 0.08 } },
]

export default function Attention() {
  const { step } = useSlide()
  const v = VARIANTS[Math.min(step, 1)]
  const words = [...BASE, v.last]
  const box = useRef(null)
  const refs = useRef([])
  const [pos, setPos] = useState([])

  useLayoutEffect(() => {
    const measure = () => setPos(refs.current.map((el) => el && { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop }))
    measure()
    document.fonts?.ready.then(measure)
  }, [v.last])

  const H = 270 // vertical space above words for arcs
  return (
    <div ref={box} style={{ position: 'relative', paddingTop: H }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
        <AnimatePresence>
          {pos.length > 0 && Object.entries(v.weights).map(([j, w]) => {
            const a = pos[IT], b = pos[j]
            if (!a || !b) return null
            const y = H - 14, lift = 60 + Math.abs(a.x - b.x) * 0.32
            return (
              <motion.path key={v.last + j} d={`M ${a.x} ${y} C ${a.x} ${y - lift}, ${b.x} ${y - lift}, ${b.x} ${y}`}
                fill="none" stroke="var(--accent)" strokeLinecap="round" strokeWidth={4 + w * 14} strokeOpacity={0.25 + w * 0.75}
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.2 }} />
            )
          })}
        </AnimatePresence>
      </svg>
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: 8, justifyContent: 'center', position: 'relative' }}>
        {words.map((w, i) => {
          const wt = v.weights[i] || 0
          const isIt = i === IT, isLast = i === words.length - 1
          return (
            <motion.span key={i + (isLast ? v.last : '')} ref={(el) => (refs.current[i] = el)}
              initial={isLast ? { opacity: 0, y: -20 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}
              style={{
                fontFamily: 'var(--font-display)', fontWeight: isIt || wt > 0.5 ? 700 : 500, fontSize: 46, letterSpacing: '-0.02em',
                padding: '8px 12px', borderRadius: 12, whiteSpace: 'nowrap',
                color: isIt ? 'var(--surface)' : wt > 0.5 ? 'var(--accent)' : isLast ? 'var(--ink)' : 'var(--ink-2)',
                background: isIt ? 'var(--accent)' : wt > 0.5 ? 'var(--accent-soft)' : 'transparent',
                outline: isLast ? '2px dashed var(--accent-line)' : 'none', outlineOffset: 2,
                transition: 'background .4s, color .4s',
              }}>{w}</motion.span>
          )
        })}
      </div>
    </div>
  )
}
