// Small shared pieces for the Industry section (not a slide: lives in parts/).
import { Reveal } from '../../../components'

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

/** Numbered demo step row, revealed on click `at`. */
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
    <span className="accent">⚙</span>{name}
  </div>
)

/** Card with a big icon pinned top and title/text pinned bottom — fills tall grid cells cleanly. */
export const BigCard = ({ icon, num, title, text, variant = '', children, style }) => (
  <div className={`card ${variant}`} style={{ flex: 1, justifyContent: 'space-between', ...style }}>
    <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span style={{ fontSize: 64, lineHeight: 1 }}>{icon}</span>
      {num && <span className="tag-num">{num}</span>}
    </div>
    <div className="col" style={{ gap: 12 }}>
      <div className="h2">{title}</div>
      {text && <div className="card-text">{text}</div>}
      {children}
    </div>
  </div>
)
