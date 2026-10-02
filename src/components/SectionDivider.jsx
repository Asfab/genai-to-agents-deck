import { Fragment } from 'react'
import Slide from './Slide'
import { Reveal } from './Reveal'
import { presentersFor } from '../presenters'

const ACTS = ['Generative AI', 'Prompting', 'AI Agents', 'Industry']

/**
 * Opening slide of each act. Same layout for all four so the deck reads as one system.
 *   num    – 1..4
 *   title  – hero headline (JSX allowed, use <Em>)
 *   lede   – one-line promise
 *   topics – what this act covers (shown as a numbered route)
 */
export default function SectionDivider({ section, num, title, lede, topics = [] }) {
  const who = presentersFor(num)
  return (
    <Slide section={section} footer={false}>
      <div className="row fill" style={{ gap: 96 }}>
        <div className="col" style={{ flex: 1.3, justifyContent: 'space-between' }}>
          <Reveal as="fade" className="kicker">Act 0{num}{who.length ? ` · ${who.map((p) => p.name).join(' & ')}` : ''}</Reveal>
          <div className="col" style={{ gap: 36 }}>
            <Reveal delay={0.1}><h1 className="hero">{title}</h1></Reveal>
            <Reveal delay={0.25}><p className="lede">{lede}</p></Reveal>
          </div>
          <Reveal as="fade" delay={0.5} className="row small" style={{ gap: 20, alignItems: 'center' }}>
            {ACTS.map((a, i) => (
              <Fragment key={a}>
                {i > 0 && <span style={{ color: 'var(--faint)' }}>→</span>}
                <span style={i + 1 === num ? { color: 'var(--accent)', fontWeight: 600 } : undefined}>{a}</span>
              </Fragment>
            ))}
          </Reveal>
        </div>

        <div className="col" style={{ flex: 1, justifyContent: 'space-between', borderLeft: '1px solid var(--line)', paddingLeft: 72 }}>
          <Reveal as="blur" delay={0.15}>
            <div className="em" style={{ fontSize: 300, lineHeight: 0.85, color: 'var(--accent-line)' }}>0{num}</div>
          </Reveal>
          <div className="col" style={{ gap: 18 }}>
            <Reveal as="fade" delay={0.3} className="label">In this act</Reveal>
            {topics.map((t, i) => (
              <Reveal key={t} as="left" delay={0.35 + i * 0.06} className="row" style={{ gap: 20, alignItems: 'baseline' }}>
                <span className="mono accent" style={{ fontSize: 20 }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="body" style={{ fontSize: 28 }}>{t}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  )
}
