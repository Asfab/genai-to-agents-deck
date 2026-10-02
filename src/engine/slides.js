// Collects every slide file automatically.
// Order = folder name, then file name (e.g. slides/02-prompting/03-zero-shot.jsx).
// Each slide file exports:
//   default            – the React component
//   meta = { title, notes, steps }   – steps = number of click-reveals (0 if none)
const modules = import.meta.glob('../slides/*/*.jsx', { eager: true })

export const slides = Object.keys(modules)
  .sort()
  .map((path) => {
    const mod = modules[path]
    const meta = mod.meta || {}
    return {
      id: path.replace('../slides/', '').replace('.jsx', ''),
      Component: mod.default,
      title: meta.title || path.split('/').pop(),
      notes: meta.notes || '',
      steps: meta.steps || 0,
      section: path.split('/')[2].replace(/^\d+-/, ''),
    }
  })
