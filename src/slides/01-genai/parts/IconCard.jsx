// Card with a large icon on top and title + text anchored to the bottom,
// so tall grid cells read as intentional instead of half-empty.
export default function IconCard({ icon, title, text, variant = '' }) {
  return (
    <div className={`card ${variant}`} style={{ flex: 1, justifyContent: 'space-between', gap: 20 }}>
      <div style={{ fontSize: 72, lineHeight: 1 }}>{icon}</div>
      <div className="col" style={{ gap: 12 }}>
        <div className="card-title">{title}</div>
        <div className="card-text" style={{ minHeight: '4.35em' }}>{text}</div>
      </div>
    </div>
  )
}
