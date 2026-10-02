// Diagram kit for the agents section: absolutely-positioned nodes on a fixed
// pixel stage, plus SVG wires that draw themselves in on a given click-step.
import { motion } from 'framer-motion'
import { Reveal } from '../../../components'
import { ease } from '../../../components/motion'
import { useSlide } from '../../../engine/SlideContext'

/** Fixed-size drawing area (canvas pixels). Children use <Pos> and <Wires>. */
export const Stage = ({ w = 1728, h = 600, style, children }) => (
  <div style={{ position: 'relative', width: w, height: h, flex: 'none', alignSelf: 'center', ...style }}>{children}</div>
)

/** Absolutely positioned, revealed box. */
export const Pos = ({ x, y, w, h, at = 0, delay = 0, as = 'up', dim, style, children }) => (
  <Reveal at={at} delay={delay} as={as} dim={dim}
    style={{ position: 'absolute', left: x, top: y, width: w, height: h, display: 'flex', zIndex: 1, ...style }}>
    {children}
  </Reveal>
)

/** SVG layer covering the stage. Put <Wire>s inside. */
export const Wires = ({ w = 1728, h = 600, children, style }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none', ...style }}>
    <Heads />
    {children}
  </svg>
)

export const Heads = () => (
  <defs>
    <marker id="ag-head-accent" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" style={{ fill: 'var(--accent)' }} />
    </marker>
    <marker id="ag-head-muted" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" style={{ fill: 'var(--line-strong)' }} />
    </marker>
    <marker id="ag-head-ink" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" style={{ fill: 'var(--ink-2)' }} />
    </marker>
  </defs>
)

const STROKE = { accent: 'var(--accent)', muted: 'var(--line-strong)', ink: 'var(--ink-2)', rose: 'var(--rose)' }

/** A path that draws itself in when `at` is reached. tone: accent | muted | ink */
export function Wire({ d, at = 0, delay = 0, tone = 'accent', dashed, head = true, both, width = 3.5 }) {
  const { step } = useSlide()
  const shown = step >= at
  const marker = `url(#ag-head-${tone === 'rose' ? 'ink' : tone})`
  const common = {
    d, fill: 'none', strokeWidth: width, strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { stroke: STROKE[tone] },
    markerEnd: head ? marker : undefined, markerStart: both ? marker : undefined,
  }
  if (dashed) {
    return <motion.path {...common} strokeDasharray="10 10" initial={{ opacity: 0 }}
      animate={{ opacity: shown ? 1 : 0 }} transition={{ duration: 0.6, ease, delay: shown ? delay : 0 }} />
  }
  return <motion.path {...common} initial={{ pathLength: 0, opacity: 0 }}
    animate={shown ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
    transition={{ duration: 0.9, ease, delay: shown ? delay : 0 }} />
}

/** Compact card used as a diagram node. */
export const Node = ({ variant = '', icon, title, sub, center, style, children }) => (
  <div className={`card ${variant}`} style={{
    padding: '22px 28px', gap: 8, width: '100%', height: '100%', justifyContent: 'center',
    alignItems: center ? 'center' : undefined, textAlign: center ? 'center' : undefined, ...style,
  }}>
    {(icon || title) && (
      <div className="row" style={{ gap: 14, alignItems: 'center', justifyContent: center ? 'center' : undefined }}>
        {icon && <span className="icon">{icon}</span>}
        {title && <div className="card-title">{title}</div>}
      </div>
    )}
    {sub && <div className="card-text">{sub}</div>}
    {children}
  </div>
)

/** Small label sitting on a wire. */
export const Tag = ({ children, ink, style }) => (
  <span className="mono" style={{
    display: 'inline-block', padding: '6px 14px', borderRadius: 10, whiteSpace: 'nowrap',
    background: ink ? 'var(--ink)' : 'var(--surface)', color: ink ? 'var(--surface)' : 'var(--accent)',
    border: '1.5px solid var(--accent-line)', fontSize: 'var(--fs-small)', lineHeight: 1.3, ...style,
  }}>{children}</span>
)
