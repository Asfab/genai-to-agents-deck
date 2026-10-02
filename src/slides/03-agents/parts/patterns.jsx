// Tiny orchestration-pattern diagrams (viewBox 280×200). Drawn in when `at` is reached.
import { Heads, Wire } from './kit'

const R = 20
const seg = (a, b, ra = R, rb = R, pad = 6) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy)
  const ux = dx / L, uy = dy / L
  return `M ${a[0] + ux * (ra + 2)} ${a[1] + uy * (ra + 2)} L ${b[0] - ux * (rb + pad)} ${b[1] - uy * (rb + pad)}`
}

const Dot = ({ p, hub, r = R, label }) => (
  <g>
    <circle cx={p[0]} cy={p[1]} r={r} style={{ fill: hub ? 'var(--accent)' : 'var(--accent-soft)', stroke: 'var(--accent)', strokeWidth: 3 }} />
    {label && <text x={p[0]} y={p[1] + 7} textAnchor="middle" style={{ fill: hub ? 'var(--surface)' : 'var(--accent)', font: '700 var(--fs-kicker) var(--font-mono)' }}>{label}</text>}
  </g>
)

const Frame = ({ children }) => (
  <svg viewBox="0 0 280 200" width="100%" height="100%" style={{ overflow: 'visible' }}>
    <Heads />
    {children}
  </svg>
)

export function Supervisor({ at = 0 }) {
  const hub = [140, 38], kids = [[50, 162], [140, 162], [230, 162]]
  return (
    <Frame>
      {kids.map((k, i) => <Wire key={i} d={seg(hub, k, 26)} at={at} delay={0.2 + i * 0.1} width={3} both />)}
      <Dot p={hub} r={26} hub label="S" />
      {kids.map((k, i) => <Dot key={i} p={k} />)}
    </Frame>
  )
}

export function Sequential({ at = 0 }) {
  const n = [[36, 100], [140, 100], [244, 100]]
  return (
    <Frame>
      <Wire d={seg(n[0], n[1])} at={at} delay={0.2} width={3} />
      <Wire d={seg(n[1], n[2])} at={at} delay={0.45} width={3} />
      {n.map((p, i) => <Dot key={i} p={p} label={String(i + 1)} />)}
    </Frame>
  )
}

export function Swarm({ at = 0 }) {
  const n = [[60, 44], [220, 44], [220, 156], [60, 156]]
  const ring = [[0, 1], [1, 2], [2, 3], [3, 0]]
  return (
    <Frame>
      <Wire d={seg(n[0], n[2], R, R, 2)} at={at} delay={0.2} tone="muted" width={2.5} head={false} />
      <Wire d={seg(n[1], n[3], R, R, 2)} at={at} delay={0.2} tone="muted" width={2.5} head={false} />
      {ring.map(([a, b], i) => <Wire key={i} d={seg(n[a], n[b])} at={at} delay={0.25 + i * 0.1} width={3} both />)}
      {n.map((p, i) => <Dot key={i} p={p} />)}
    </Frame>
  )
}

export function Mixture({ at = 0 }) {
  const l1 = [[36, 36], [36, 100], [36, 164]], l2 = [[136, 36], [136, 100], [136, 164]], agg = [244, 100]
  return (
    <Frame>
      {l1.flatMap((a, i) => l2.map((b, j) => <Wire key={`${i}${j}`} d={seg(a, b, R, R, 2)} at={at} delay={0.2} tone="muted" width={2} head={false} />))}
      {l2.map((b, i) => <Wire key={i} d={seg(b, agg, R, 24)} at={at} delay={0.4 + i * 0.1} width={3} />)}
      {[...l1, ...l2].map((p, i) => <Dot key={i} p={p} r={17} />)}
      <Dot p={agg} r={24} hub label="Σ" />
    </Frame>
  )
}

export function Debate({ at = 0 }) {
  const a = [52, 60], b = [228, 60], j = [140, 164]
  return (
    <Frame>
      <Wire d="M 78 48 Q 140 14 202 48" at={at} delay={0.2} width={3} />
      <Wire d="M 202 74 Q 140 106 78 74" at={at} delay={0.35} width={3} />
      <Wire d={seg(a, j, R, 24)} at={at} delay={0.5} tone="ink" width={2.5} />
      <Wire d={seg(b, j, R, 24)} at={at} delay={0.5} tone="ink" width={2.5} />
      <Dot p={a} label="A" />
      <Dot p={b} label="B" />
      <Dot p={j} r={24} hub label="J" />
    </Frame>
  )
}
