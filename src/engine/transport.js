import Peer from 'peerjs'

// Two ways for a controller (phone remote / presenter window) to talk to the deck:
//   • PeerJS (WebRTC, free public broker) – works across devices, even on GitHub Pages
//   • BroadcastChannel – same browser, used by the laptop presenter window (P)
const PREFIX = 'genai-deck-'
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
export const newCode = () => Array.from({ length: 6 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('')

/** Deck side: host a room. onCommand(cmd) for incoming commands; returns { broadcast(state), close() } */
export function hostRoom(code, { onCommand, onStatus }) {
  const conns = new Set()
  let peer, destroyed = false, last = null

  const bc = new BroadcastChannel('genai-deck')
  bc.onmessage = (e) => { if (e.data?.type === 'cmd') onCommand(e.data); if (e.data?.type === 'hello' && last) bc.postMessage(last) }

  const start = () => {
    peer = new Peer(PREFIX + code)
    peer.on('open', () => onStatus({ ready: true, clients: conns.size }))
    peer.on('connection', (conn) => {
      conn.on('open', () => { conns.add(conn); onStatus({ ready: true, clients: conns.size }); if (last) conn.send(last) })
      conn.on('data', (d) => d?.type === 'cmd' && onCommand(d))
      conn.on('close', () => { conns.delete(conn); onStatus({ ready: true, clients: conns.size }) })
    })
    peer.on('disconnected', () => !destroyed && peer.reconnect())
    peer.on('error', (err) => {
      onStatus({ ready: false, clients: conns.size, error: err.type })
      if (err.type === 'unavailable-id') onStatus({ ready: false, clients: 0, error: 'taken' })
      else if (['network', 'server-error', 'socket-error'].includes(err.type)) setTimeout(() => !destroyed && peer.reconnect(), 3000)
    })
  }
  start()

  return {
    broadcast(state) {
      last = { type: 'state', ...state }
      conns.forEach((c) => c.open && c.send(last))
      bc.postMessage(last)
    },
    close() { destroyed = true; bc.close(); peer?.destroy() },
  }
}

/** Controller side over WebRTC. */
export function joinRoom(code, { onState, onStatus }) {
  let peer, conn, destroyed = false, retry
  const connect = () => {
    if (destroyed) return
    onStatus('connecting')
    conn = peer.connect(PREFIX + code, { reliable: true })
    conn.on('open', () => onStatus('connected'))
    conn.on('data', (d) => d?.type === 'state' && onState(d))
    conn.on('close', () => { onStatus('lost'); retry = setTimeout(connect, 1500) })
    conn.on('error', () => { onStatus('lost') })
  }
  peer = new Peer()
  peer.on('open', connect)
  peer.on('error', (err) => {
    onStatus(err.type === 'peer-unavailable' ? 'deck-offline' : 'lost')
    clearTimeout(retry); retry = setTimeout(() => (peer.disconnected ? peer.reconnect() : connect()), 2500)
  })
  peer.on('disconnected', () => !destroyed && peer.reconnect())
  // phones suspend sockets when locked – reconnect on wake
  const onVis = () => document.visibilityState === 'visible' && (!conn || !conn.open) && (peer.disconnected ? peer.reconnect() : connect())
  document.addEventListener('visibilitychange', onVis)
  return {
    send: (cmd) => conn?.open && conn.send({ type: 'cmd', ...cmd }),
    close() { destroyed = true; clearTimeout(retry); document.removeEventListener('visibilitychange', onVis); peer.destroy() },
  }
}

/** Controller side in the same browser (presenter window). */
export function joinLocal({ onState, onStatus }) {
  const bc = new BroadcastChannel('genai-deck')
  bc.onmessage = (e) => { if (e.data?.type === 'state') { onStatus('connected'); onState(e.data) } }
  bc.postMessage({ type: 'hello' })
  onStatus('connecting')
  return { send: (cmd) => bc.postMessage({ type: 'cmd', ...cmd }), close: () => bc.close() }
}
