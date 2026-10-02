import { Icon } from '../../../components'

// Card with a line icon (lucide component) in a soft tile on top and title + text
// anchored to the bottom, so tall grid cells read as intentional instead of half-empty.
//   icon – a lucide-react component, e.g. `import { Code2 } from 'lucide-react'` → icon={Code2}
//   tag  – optional small pill shown top-right (e.g. the medium: Text, Code, Images…)
export default function IconCard({ icon, title, text, tag, variant = '' }) {
  return (
    <div className={`card ${variant}`} style={{ flex: 1, justifyContent: 'space-between', gap: 20 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <Icon of={icon} chip style={variant === 'tint' ? { background: 'var(--surface)' } : undefined} />
        {tag && <span className="pill outline" style={{ fontSize: 18, padding: '8px 14px' }}>{tag}</span>}
      </div>
      <div className="col" style={{ gap: 12 }}>
        <div className="card-title">{title}</div>
        <div className="card-text" style={{ minHeight: '4.35em' }}>{text}</div>
      </div>
    </div>
  )
}
