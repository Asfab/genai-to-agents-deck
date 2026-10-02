// Small shared pieces for the Industry section (not a slide: lives in parts/).
import { Wrench } from 'lucide-react'
import { Reveal } from '../../../components'

/** Lucide icon in a soft accent tile. One size per slide: pass the same `size` (tile px) to every tile. */
export const IconTile = ({ of: Of, size = 72, style }) => (
  <span className="icon-chip" style={{ width: size, height: size, borderRadius: Math.round(size / 4), ...style }}>
    <Of strokeWidth={1.6} style={{ width: Math.round(size * 0.52), height: Math.round(size * 0.52) }} />
  </span>
)

/** Outlined chip at readable size (24px via .small). tone: 'line' | 'accent' | 'ink' */
export const Chip = ({ children, tone = 'line', style }) => (
  <span className="small" style={{
    display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 18px', borderRadius: 999, lineHeight: 1.2,
    whiteSpace: 'nowrap',
    border: `1.5px solid ${tone === 'accent' ? 'var(--accent-line)' : 'var(--line-strong)'}`,
    background: tone === 'accent' ? 'var(--accent-soft)' : 'var(--surface)',
    color: tone === 'accent' ? 'var(--accent)' : 'var(--ink-2)', fontWeight: tone === 'accent' ? 600 : 500,
    ...style,
  }}>{children}</span>
)

/** Pulsing red-dot "LIVE DEMO" badge. */
export const LiveBadge = ({ label = 'Live demo' }) => (
  <span className="pill" style={{ gap: 14, padding: '12px 24px' }}>
    <span style={{ position: 'relative', width: 14, height: 14, display: 'inline-block' }}>
      <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--rose)' }} />
      <span className="live-ping" style={{ position: 'absolute', inset: -6, borderRadius: '50%', border: '2px solid var(--rose)', animation: 'industryPing 1.6s var(--ease) infinite' }} />
    </span>
    {label}
    <style>{'@keyframes industryPing { 0% { transform: scale(.5); opacity: .9 } 100% { transform: scale(1.6); opacity: 0 } }'}</style>
  </span>
)

/** Numbered demo step row, built in at step `at` (dims while later steps build, un-dims at the end). */
export const DemoStep = ({ n, title, text, at, dim = true }) => (
  <Reveal at={at} as="left" dim={dim} className="row" style={{ gap: 28, alignItems: 'flex-start' }}>
    <div className="h3 accent mono" style={{ flex: 'none', width: 72, height: 72, borderRadius: 20, display: 'grid', placeItems: 'center', background: 'var(--accent-soft)', border: '1.5px solid var(--accent-line)' }}>{n}</div>
    <div className="col" style={{ gap: 6, paddingTop: 4 }}>
      <div className="h3">{title}</div>
      {text && <div className="small" style={{ color: 'var(--ink-2)' }}>{text}</div>}
    </div>
  </Reveal>
)

/** Tool-call trace line used in chat mock-ups. */
export const ToolCall = ({ name }) => (
  <div className="mono small" style={{ alignSelf: 'flex-start', display: 'inline-flex', gap: 12, alignItems: 'center', padding: '8px 16px', borderRadius: 12, background: 'var(--surface-2)', color: 'var(--ink-2)' }}>
    <Wrench className="accent" strokeWidth={1.8} style={{ width: 22, height: 22, flex: 'none' }} />{name}
  </div>
)

/** Card with an icon tile pinned top and title/text pinned bottom — fills tall grid cells cleanly.
 *  icon = a lucide component, e.g. icon={Bot} */
export const BigCard = ({ icon, iconSize = 80, num, title, text, variant = '', children, style }) => (
  <div className={`card ${variant}`} style={{ flex: 1, justifyContent: 'space-between', ...style }}>
    <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
      {icon ? <IconTile of={icon} size={iconSize} style={variant === 'tint' ? { background: 'var(--surface)' } : undefined} /> : <span />}
      {num && <span className="tag-num">{num}</span>}
    </div>
    <div className="col" style={{ gap: 12 }}>
      <div className="h2">{title}</div>
      {text && <div className="card-text">{text}</div>}
      {children}
    </div>
  </div>
)
