import { motion } from 'framer-motion'
import { useSlide } from '../../../engine/SlideContext'
import { ease } from '../../../components'

/**
 * Build-up of a prompt's parts, then a looping highlight. parts = [{ key, name, hint, text }]
 * With n parts (slide meta: steps = 2n + 1, loop, loopFrom = n):
 *   steps 0 … n-1   build: part i is "cur" at step i, "done" before it, "todo" (faded) after
 *   step  n         everything shown, nothing highlighted (hold)
 *   steps n+1 … 2n  cycle: highlight part (step - n - 1), the rest stay fully visible
 *   step  2n+1 / 99 everything shown (hold; also the static/screenshot state) → loop back to n
 */
export function partState(step, i, n) {
  if (step < n) return step === i ? 'cur' : step > i ? 'done' : 'todo'
  if (step > n && step <= 2 * n) return step - n - 1 === i ? 'cur' : 'done'
  return 'done'
}

export function AnatomyList({ parts }) {
  const { step } = useSlide()
  return (
    <div className="col" style={{ gap: 14, height: '100%' }}>
      {parts.map((p, i) => {
        const state = partState(step, i, parts.length)
        return (
          <motion.div key={p.key} className="card" initial={false}
            animate={{ opacity: state === 'todo' ? 0.35 : 1, x: state === 'cur' ? 12 : 0 }}
            transition={{ duration: 0.5, ease }}
            style={{
              flex: 1, flexDirection: 'row', alignItems: 'center', gap: 22, padding: '0 28px',
              boxShadow: state === 'cur' ? 'var(--shadow)' : 'none',
              background: state === 'cur' ? 'var(--accent-soft)' : 'var(--surface)',
              borderColor: state === 'cur' ? 'var(--accent)' : 'var(--line)',
            }}>
            <span className="mono" style={{ color: state === 'todo' ? 'var(--faint)' : 'var(--accent)', fontWeight: 600, fontSize: 'var(--fs-small)' }}>{String(i + 1).padStart(2, '0')}</span>
            <div className="col" style={{ gap: 4 }}>
              <div className="h3" style={{ fontSize: 'var(--fs-body)' }}>{p.name}</div>
              <div className="small" style={{ lineHeight: 1.2 }}>{p.hint}</div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export function AnatomyPrompt({ parts }) {
  const { step } = useSlide()
  return (
    <div className="prompt-box" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16, padding: '28px 44px', whiteSpace: 'normal', fontSize: 'var(--fs-body)' }}>
      {parts.map((p, i) => {
        const state = partState(step, i, parts.length)
        return (
          <motion.div key={p.key} initial={false}
            animate={{ opacity: state === 'todo' ? 0.12 : 1 }}
            transition={{ duration: 0.5, ease }}
            style={{
              borderLeft: '4px solid', borderColor: state === 'cur' ? 'var(--accent)' : 'var(--line)',
              paddingLeft: 22, borderRadius: 4,
            }}>
            <div className="label" style={{ color: state === 'cur' ? 'var(--accent)' : 'var(--muted)', marginBottom: 8 }}>{p.name}</div>
            <div>{p.text}</div>
          </motion.div>
        )
      })}
    </div>
  )
}
