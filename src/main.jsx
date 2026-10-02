
import { createRoot } from 'react-dom/client'
import Deck from './engine/Deck'
import Remote from './engine/Remote'
import './theme/global.css'

// One app, three views:
//   /             → the deck
//   /?remote=CODE → phone remote (scan QR, key R)
//   /?presenter=1 → speaker view window on the laptop (key S)
const q = new URLSearchParams(location.search)
const view = q.get('remote') ? <Remote code={q.get('remote').toUpperCase()} />
  : q.get('presenter') ? <Remote local />
  : <Deck />

createRoot(document.getElementById('root')).render(view)
