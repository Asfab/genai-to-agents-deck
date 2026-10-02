// Shared motion presets so every slide moves the same way.
export const ease = [0.22, 1, 0.36, 1]

export const variants = {
  up:    { hidden: { opacity: 0, y: 36 },      shown: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -28 },     shown: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -48 },     shown: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 },      shown: { opacity: 1, x: 0 } },
  fade:  { hidden: { opacity: 0 },             shown: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.9 }, shown: { opacity: 1, scale: 1 } },
  blur:  { hidden: { opacity: 0, filter: 'blur(12px)' }, shown: { opacity: 1, filter: 'blur(0px)' } },
}
