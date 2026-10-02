import { motion, animate, useMotionValue, useTransform } from 'framer-motion'
import { Children, useEffect, useState } from 'react'
import { useSlide } from '../engine/SlideContext'
import { Reveal, Stagger } from './Reveal'
import { ease } from './motion'

/** Serif-italic accent word inside a title: <>Prompting is <Em>programming</Em></> */
export const Em = ({ children }) => <span className="em">{children}</span>

/** Grid with N equal columns. rows optional. */
export const Grid = ({ cols = 3, rows, gap, className = '', style, children }) => (
  <div className={`grid ${className}`} style={{ gridTemplateColumns: typeof cols === 'number' ? `repeat(${cols}, minmax(0, 1fr))` : cols, gridTemplateRows: rows, gap, ...style }}>
    {children}
  </div>
)

/**
 * Card. variant: default | tint (accent wash) | flat (grey) | ink (black)
 * icon (emoji or JSX), num ("01"), title, text, children for anything else.
 */
export const Card = ({ variant = '', icon, num, title, text, className = '', style, children }) => (
  <div className={`card ${variant} ${className}`} style={{ flex: 1, ...style }}>
    {num && <div className="tag-num">{num}</div>}
    {icon && <div className="icon">{icon}</div>}
    {title && <div className="card-title">{title}</div>}
    {text && <div className="card-text">{text}</div>}
    {children}
  </div>
)

export const Pill = ({ outline, children }) => <span className={`pill ${outline ? 'outline' : ''}`}>{children}</span>

/** Bullet list. stepped=true → each bullet on its own click starting at `at`. */
export const Bullets = ({ items, stepped, at = stepped ? 1 : 0, dim, style }) => (
  <ul className="bullets" style={style}>
    {items.map((it, i) => (
      <Reveal key={i} tag="li" as="left" at={stepped ? at + i : at} delay={stepped ? 0 : 0.15 + i * 0.09} dim={dim}>{it}</Reveal>
    ))}
  </ul>
)

/** Big number. value can be numeric (counts up) or a string. */
export const Stat = ({ value, prefix = '', suffix = '', label, decimals = 0 }) => (
  <div className="col" style={{ gap: 12 }}>
    <div className="stat-value">{typeof value === 'number' ? <CountUp to={value} prefix={prefix} suffix={suffix} decimals={decimals} /> : `${prefix}${value}${suffix}`}</div>
    {label && <div className="stat-label">{label}</div>}
  </div>
)

export function CountUp({ to, prefix = '', suffix = '', decimals = 0, duration = 1.6 }) {
  const { active } = useSlide()
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => `${prefix}${v.toLocaleString('en-IN', { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}${suffix}`)
  useEffect(() => { if (!active) { mv.set(to); return } mv.set(0); const c = animate(mv, to, { duration, ease }); return c.stop }, [active, to])
  return <motion.span>{text}</motion.span>
}

/**
 * Horizontal (or vertical) chain of nodes with arrows; nodes reveal one per click when stepped.
 *   nodes – array of JSX (usually <Card/>)
 */
export const Flow = ({ nodes, stepped, at = stepped ? 1 : 0, vertical, arrow = vertical ? '↓' : '→', style }) => (
  <div className={`flow ${vertical ? 'vertical' : ''}`} style={style}>
    {nodes.map((n, i) => (
      <FlowPart key={i} i={i} at={stepped ? at + i : at} delay={stepped ? 0 : 0.15 + i * 0.12} arrow={arrow} node={n} />
    ))}
  </div>
)
const FlowPart = ({ i, at, delay, arrow, node }) => (
  <>
    {i > 0 && <Reveal at={at} delay={delay} as="fade" className="flow-arrow">{arrow}</Reveal>}
    <Reveal at={at} delay={delay + 0.05} as="up" className="flow-node" style={{ display: 'flex' }}>{node}</Reveal>
  </>
)

/** Types text out when the slide/step is shown. */
export function Typewriter({ text, at = 0, speed = 22, className = 'prompt-box', style }) {
  const { step, active } = useSlide()
  const run = active && step >= at
  const [n, setN] = useState(run ? 0 : text.length)
  useEffect(() => {
    if (!active) { setN(text.length); return }
    if (!run) { setN(0); return }
    setN(0)
    let i = 0
    const t = setInterval(() => { i += 1; setN(i); if (i >= text.length) clearInterval(t) }, 1000 / speed)
    return () => clearInterval(t)
  }, [run, active, text])
  return <div className={className} style={style}>{text.slice(0, n)}<span style={{ opacity: n < text.length ? 1 : 0, color: 'var(--accent)' }}>▍</span></div>
}

/** Chat transcript: messages = [{ from: 'user'|'ai', text }]; stepped → one per click. */
export const Chat = ({ messages, stepped, at = stepped ? 1 : 0, style }) => (
  <Stagger className="chat" at={at} each={stepped} gap={0.35} style={style}>
    {messages.map((m, i) => <div key={i} className={`bubble ${m.from}`} style={{ alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start' }}>{m.text}</div>)}
  </Stagger>
)

/** Small uppercase label used above prompt boxes etc. */
export const Label = ({ children, style }) => <div className="label" style={style}>{children}</div>

/** Image that fills its box. Put files in /public and pass src="images/x.png" */
export const Media = ({ src, alt, fit = 'cover', style }) => (
  <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: fit, borderRadius: 'var(--radius)', ...style }} />
)

export { Reveal, Stagger }

/**
 * Line icon from lucide-react, sized & coloured by the theme.
 *   import { Brain } from 'lucide-react';  <Icon of={Brain} />        → plain accent icon
 *   <Icon of={Brain} chip />                                          → icon in a soft rounded tile
 * Browse names at https://lucide.dev/icons
 */
export const Icon = ({ of: Of, chip, size, style }) => {
  const svg = <Of size={size} strokeWidth={1.6} />
  return chip ? <span className="icon-chip" style={style}>{svg}</span> : <span className="icon" style={{ color: 'var(--accent)', display: 'inline-flex', ...style }}>{svg}</span>
}
