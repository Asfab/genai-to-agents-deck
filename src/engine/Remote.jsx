import { useEffect, useRef, useState } from 'react'
import { joinLocal, joinRoom } from './transport'
import './remote.css'

/** Notes are plain text: blank line = new paragraph, lines starting "- " = bullets, **bold** allowed. */
function Notes({ text }) {
  if (!text) return <p className="r-empty">No notes for this slide.</p>
  const bold = (s) => s.split(/(\*\*[^*]+\*\*)/).map((p, i) => (p.startsWith('**') ? <b key={i}>{p.slice(2, -2)}</b> : p))
  return text.trim().split(/\n\s*\n/).map((block, i) => {
    const lines = block.split('\n').map((l) => l.trim())
    if (lines.every((l) => l.startsWith('- '))) return <ul key={i}>{lines.map((l, j) => <li key={j}>{bold(l.slice(2))}</li>)}</ul>
    return <p key={i}>{bold(lines.join(' '))}</p>
  })
}

const fmt = (ms) => { const s = Math.max(0, Math.floor(ms / 1000)); const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); return `${h ? h + ':' : ''}${String(m).padStart(h ? 2 : 1, '0')}:${String(s % 60).padStart(2, '0')}` }

/**
 * Speaker remote.
 *   ?remote=CODE    – phone, over WebRTC (scan the QR from the deck, key R)
 *   ?presenter=1    – laptop window in the same browser (key S)
 */
export default function Remote({ code, local }) {
  const [state, setState] = useState(null)
  const [status, setStatus] = useState('connecting')
  const [now, setNow] = useState(Date.now())
  const [list, setList] = useState(false)
  const link = useRef(null)
  const slideStart = useRef(Date.now())
  const lastIndex = useRef(-1)

  useEffect(() => {
    const handlers = {
      onState: (s) => { if (s.index !== lastIndex.current) { lastIndex.current = s.index; slideStart.current = Date.now() } setState(s) },
      onStatus: setStatus,
    }
    link.current = local ? joinLocal(handlers) : joinRoom(code, handlers)
    return () => link.current.close()
  }, [code, local])

  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])

  // keep the phone screen awake while presenting
  useEffect(() => {
    let lock
    const req = async () => { try { lock = await navigator.wakeLock?.request('screen') } catch {} }
    req()
    const vis = () => document.visibilityState === 'visible' && req()
    document.addEventListener('visibilitychange', vis)
    return () => { document.removeEventListener('visibilitychange', vis); lock?.release?.() }
  }, [])

  // laptop presenter window: keyboard works here too
  useEffect(() => {
    const k = (e) => {
      if (['ArrowRight', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); send('next') }
      if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); send('prev') }
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [])

  const send = (cmd, extra) => { navigator.vibrate?.(15); link.current?.send({ cmd, ...extra }) }
  const connected = status === 'connected'
  const label = { connecting: 'Connecting…', connected: 'Live', lost: 'Reconnecting…', 'deck-offline': 'Deck not found — is it open?' }[status]

  return (
    <div className={`remote ${local ? 'wide' : ''}`}>
      <header className="r-top">
        <span className={`r-dot ${connected ? 'on' : ''}`} />
        <span className="r-status">{label}</span>
        {state && <span className="r-count">{state.index + 1} / {state.total}{state.steps ? ` · step ${state.step}/${state.steps}` : ''}</span>}
      </header>

      {state && (
        <div className="r-timers">
          <div><small>Talk</small><b>{fmt(now - state.startedAt)}</b></div>
          <div><small>This slide</small><b>{fmt(now - slideStart.current)}</b></div>
          <div><small>Clock</small><b>{new Date(now).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</b></div>
        </div>
      )}

      <main className="r-main">
        {state ? (
          <>
            <div className="r-section">{state.section}</div>
            <h1 className="r-title">{state.title}</h1>
            <div className="r-notes"><Notes text={state.notes} /></div>
            {state.next && <div className="r-next">Next → {state.next}</div>}
          </>
        ) : (
          <p className="r-empty">{local ? 'Open the deck in another tab of this browser.' : `Waiting for deck ${code}…`}</p>
        )}
      </main>

      <nav className="r-controls">
        <button className="r-btn back" onClick={() => send('prev')} disabled={!connected}>‹ Back</button>
        <button className="r-btn list" onClick={() => setList(true)} disabled={!state}>☰</button>
        <button className="r-btn next" onClick={() => send('next')} disabled={!connected}>Next ›</button>
      </nav>

      {list && state && (
        <div className="r-sheet" onClick={() => setList(false)}>
          <div className="r-sheet-inner" onClick={(e) => e.stopPropagation()}>
            <div className="r-sheet-head"><b>Jump to slide</b><button onClick={() => { send('reset-timer'); setList(false) }}>Reset talk timer</button></div>
            {state.outline.map((t, i) => (
              <button key={i} className={i === state.index ? 'cur' : ''} onClick={() => { send('goto', { index: i }); setList(false) }}>
                <span>{String(i + 1).padStart(2, '0')}</span>{t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
