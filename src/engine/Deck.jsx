import { AnimatePresence, motion } from 'framer-motion'
import QRCode from 'qrcode'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SlideContext } from './SlideContext'
import { slides } from './slides'
import { hostRoom, newCode } from './transport'
import { useScale } from './useScale'

const total = slides.length
const readHash = () => {
  const [i, s] = location.hash.replace('#/', '').split('.').map(Number)
  const index = Math.min(Math.max((i || 1) - 1, 0), total - 1)
  return { index, step: Math.min(s || 0, slides[index].steps) }
}
// ?shot → screenshot mode: no remote room (keeps headless Chrome from hanging)
const SHOT = new URLSearchParams(location.search).has('shot')
const storedCode = () => {
  try { return localStorage.getItem('deck-room') || '' } catch { return '' }
}

export default function Deck() {
  const [pos, setPos] = useState(readHash)
  const [dir, setDir] = useState(1)
  const [panel, setPanel] = useState(null) // null | 'remote' | 'overview' | 'help'
  const [room, setRoom] = useState(() => storedCode() || newCode())
  const [remote, setRemote] = useState({ ready: false, clients: 0 })
  const [qr, setQr] = useState('')
  const startedAt = useRef(Date.now())
  const scale = useScale()
  const { index, step } = pos
  const slide = slides[index]

  // ── navigation ──
  const go = useCallback((delta) => {
    setPos(({ index, step }) => {
      const s = slides[index]
      if (delta > 0) {
        if (step < s.steps) return { index, step: step + 1 }
        if (index < total - 1) { setDir(1); return { index: index + 1, step: 0 } }
      } else {
        if (step > 0) return { index, step: step - 1 }
        if (index > 0) { setDir(-1); return { index: index - 1, step: slides[index - 1].steps } }
      }
      return { index, step }
    })
  }, [])
  const goTo = useCallback((i, s = 0) => {
    setPos(({ index }) => { setDir(i >= index ? 1 : -1); return { index: Math.min(Math.max(i, 0), total - 1), step: s } })
  }, [])

  useEffect(() => { history.replaceState(null, '', `#/${index + 1}${step ? '.' + step : ''}`) }, [index, step])

  // ── keyboard (also covers presentation clickers: PageUp/PageDown) ──
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown', 'Enter', 'n'].includes(k)) { e.preventDefault(); go(1) }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace', 'p'].includes(k)) { e.preventDefault(); go(-1) }
      else if (k === 'Home') goTo(0)
      else if (k === 'End') goTo(total - 1)
      else if (k === 'f' || k === 'F') document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.()
      else if (k === 'r' || k === 'R') setPanel((p) => (p === 'remote' ? null : 'remote'))
      else if (k === 'g' || k === 'G') setPanel((p) => (p === 'overview' ? null : 'overview'))
      else if (k === 's' || k === 'S') window.open(`${location.pathname}?presenter=1`, 'presenter', 'width=1100,height=760')
      else if (k === '?' || k === 'h') setPanel((p) => (p === 'help' ? null : 'help'))
      else if (k === 'Escape') setPanel(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, goTo])

  // ── touch swipe on the deck itself ──
  useEffect(() => {
    let x0 = null
    const s = (e) => { x0 = e.touches[0].clientX }
    const t = (e) => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); x0 = null }
    window.addEventListener('touchstart', s); window.addEventListener('touchend', t)
    return () => { window.removeEventListener('touchstart', s); window.removeEventListener('touchend', t) }
  }, [go])

  // ── remote control room (phone + presenter window) ──
  const roomRef = useRef(null)
  useEffect(() => {
    if (SHOT) return
    try { localStorage.setItem('deck-room', room) } catch {}
    const r = hostRoom(room, {
      onCommand: (c) => {
        if (c.cmd === 'next') go(1)
        else if (c.cmd === 'prev') go(-1)
        else if (c.cmd === 'goto') goTo(c.index, 0)
        else if (c.cmd === 'reset-timer') startedAt.current = Date.now()
      },
      onStatus: (st) => { if (st.error === 'taken') setRoom(newCode()); else setRemote(st) },
    })
    roomRef.current = r
    return () => r.close()
  }, [room, go, goTo])

  useEffect(() => {
    roomRef.current?.broadcast({
      index, step, total, steps: slide.steps, startedAt: startedAt.current,
      title: slide.title, notes: slide.notes, section: slide.section,
      next: slides[index + 1]?.title || null,
      outline: slides.map((s) => s.title),
    })
  }, [index, step, remote.clients, slide])

  const remoteUrl = useMemo(() => `${location.origin}${location.pathname}?remote=${room}`, [room])
  useEffect(() => { QRCode.toDataURL(remoteUrl, { margin: 1, width: 520, color: { dark: '#111114', light: '#ffffff' } }).then(setQr) }, [remoteUrl])

  const ctx = { step, active: true, number: index + 1, total, static: false }

  return (
    <>
      <div className="viewport">
        <div className="canvas" style={{ transform: `scale(${scale})` }}>
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div key={slide.id} custom={dir} style={{ position: 'absolute', inset: 0 }}
              initial={{ opacity: 0, x: dir * 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <SlideContext.Provider value={ctx}><slide.Component /></SlideContext.Provider>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="progress" style={{ width: `${((index + 1) / total) * 100}%` }} data-section={slide.section} />
      {remote.clients > 0 && <div className="remote-badge" title="Remote connected" />}

      {panel === 'remote' && (
        <div className="overlay" onClick={() => setPanel(null)}>
          <div className="overlay-card" onClick={(e) => e.stopPropagation()}>
            {qr && <img src={qr} alt="QR code for the phone remote" width={260} height={260} />}
            <div>
              <h2>Phone remote</h2>
              <p>Scan with your phone to get speaker notes, a timer and next / previous buttons. Works over any internet connection.</p>
              <div className="code-chip">{room}</div>
              <div className={`status ${remote.clients ? 'on' : ''}`}>
                {remote.clients ? `● ${remote.clients} remote connected` : remote.ready ? '○ Waiting for phone…' : remote.error ? `Offline (${remote.error}) — retrying` : 'Starting…'}
              </div>
              <p style={{ marginTop: 14, fontSize: 14 }}>
                <button className="kbd" style={{ cursor: 'pointer' }} onClick={() => setRoom(newCode())}>New code</button>{' '}
                · <span className="kbd">Esc</span> to close
              </p>
            </div>
          </div>
        </div>
      )}

      {panel === 'help' && (
        <div className="overlay" onClick={() => setPanel(null)}>
          <div className="overlay-card" style={{ display: 'block' }}>
            <h2>Keys</h2>
            <p style={{ lineHeight: 2.1, maxWidth: 'none' }}>
              <span className="kbd">→</span> <span className="kbd">Space</span> next · <span className="kbd">←</span> back · <span className="kbd">F</span> full screen<br />
              <span className="kbd">R</span> phone remote (QR) · <span className="kbd">S</span> speaker view on laptop<br />
              <span className="kbd">G</span> slide grid · <span className="kbd">Home</span>/<span className="kbd">End</span> first/last · <span className="kbd">Esc</span> close
            </p>
          </div>
        </div>
      )}

      {panel === 'overview' && <Overview current={index} onPick={(i) => { goTo(i); setPanel(null) }} />}
    </>
  )
}

function Overview({ current, onPick }) {
  const ref = useRef(null)
  const [w, setW] = useState(300)
  useEffect(() => {
    const el = ref.current?.querySelector('.thumb')
    if (el) setW(el.clientWidth)
    ref.current?.querySelector('.cur')?.scrollIntoView({ block: 'center' })
  }, [])
  return (
    <div className="overview" ref={ref}>
      {slides.map((s, i) => (
        <button key={s.id} className={i === current ? 'cur' : ''} onClick={() => onPick(i)}>
          <div className="thumb">
            <div className="canvas" style={{ transform: `scale(${w / 1920})` }}>
              <SlideContext.Provider value={{ step: 99, active: false, number: i + 1, total, static: true }}>
                <s.Component />
              </SlideContext.Provider>
            </div>
          </div>
          <div className="cap"><b>{String(i + 1).padStart(2, '0')}</b>{s.title}</div>
        </button>
      ))}
    </div>
  )
}
