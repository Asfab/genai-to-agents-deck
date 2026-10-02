import { motion } from 'framer-motion'
import { Children } from 'react'
import { useSlide } from '../engine/SlideContext'
import { ease, variants } from './motion'

/**
 * <Reveal> animates its content in.
 *   at     – click-step that reveals it (0 = on slide entry; 1 = first click …).
 *            Remember to set meta.steps to the highest `at` used on the slide.
 *   delay  – seconds after it is revealed
 *   as     – variant: up | down | left | right | fade | scale | blur
 *   dim    – while a later step is building, fade this to 35%; un-dims once the slide is fully built
 */
export function Reveal({ at = 0, delay = 0, as = 'up', dim, className, style, children, tag = 'div' }) {
  const { step, steps } = useSlide()
  const shown = step >= at
  const Tag = motion[tag]
  const v = variants[as]
  const target = shown ? { ...v.shown, opacity: dim && step > at && step < steps ? 0.35 : 1 } : v.hidden
  return (
    <Tag className={className} style={style} initial={v.hidden} animate={target}
      transition={{ duration: 0.65, ease, delay: shown ? delay : 0 }}>
      {children}
    </Tag>
  )
}

/**
 * <Stagger> reveals each child one after another.
 *   at     – step that starts the cascade (0 = on entry)
 *   each   – set true to give each child its own click: child i appears at step at+i
 *   gap    – seconds between children (cascade mode)
 *   className/style – applied to the wrapper (use it as your grid / flex container)
 */
export function Stagger({ at = 0, each = false, gap = 0.09, delay = 0.15, as = 'up', className, style, children }) {
  const items = Children.toArray(children)
  return (
    <div className={className} style={style}>
      {items.map((child, i) => (
        <Reveal key={i} as={as} at={each ? at + i : at} delay={each ? 0 : delay + i * gap} style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
