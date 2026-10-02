import { useEffect, useState } from 'react'

// Scale factor that fits a 1920×1080 canvas inside the window.
export function useScale(w = 1920, h = 1080) {
  const get = () => Math.min(window.innerWidth / w, window.innerHeight / h)
  const [scale, setScale] = useState(get)
  useEffect(() => {
    const on = () => setScale(get())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return scale
}
