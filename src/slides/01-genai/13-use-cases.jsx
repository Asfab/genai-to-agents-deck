import { Slide, Stagger, Em } from '../../components'
import { Code2, GraduationCap, PenLine, FileSearch, BarChart3, Palette, Languages, Headset } from 'lucide-react'
import IconCard from './parts/IconCard'

export const meta = {
  title: 'Practical use cases',
  steps: 0,
  notes: `Eight areas where GenAI is genuinely useful *today*. Pick 3 to talk about based on the room's energy.

- **Code** — explain unfamiliar code, write tests, debug. Best student use: ask *why*, not just *what*.
- **Learning** — "explain like I'm in 2nd year", then quiz me. A tutor at 2 a.m.
- **Writing** — first drafts of SOPs, emails, reports. You edit; it drafts.
- **Search over your docs (RAG)** — chat with your notes or a 300-page PDF (next slide).
- **Data** — turn a messy CSV into charts and insights.
- **Images & design** — posters for your fest, UI mock-ups.
- **Voice & language** — translate, transcribe, speak in Indian languages.
- **Customer support** — bots that answer from a company's own help docs.

**Ask:** "Which one of these would save you the most time this semester?"

**Transition:** "That 'search over your docs' one is so important it deserves its own picture."`,
}

const uses = [
  { icon: Code2, title: 'Code', text: 'Explain a repo, write unit tests, find the bug in your DSA solution.' },
  { icon: GraduationCap, title: 'Learning', text: '"Explain backprop like I\'m in 2nd year — then quiz me."' },
  { icon: PenLine, title: 'Writing', text: 'First drafts of SOPs, emails, project reports. You edit.' },
  { icon: FileSearch, title: 'Search your docs', text: 'Chat with your notes or a 300-page PDF manual (RAG).' },
  { icon: BarChart3, title: 'Data', text: 'Turn a messy CSV of fest registrations into charts & insights.' },
  { icon: Palette, title: 'Images & design', text: 'Posters for the tech fest, quick UI mock-ups for your app.' },
  { icon: Languages, title: 'Voice & language', text: 'Transcribe lectures, translate between Indian languages.' },
  { icon: Headset, title: 'Customer support', text: 'Bots that answer from a company\'s own help docs, 24×7.' },
]

export default function UseCases() {
  return (
    <Slide section="genai" kicker="Practical use cases" title={<>Where GenAI is <Em>genuinely useful</Em></>}>
      <Stagger className="grid" gap={0.06} style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gridTemplateRows: '1fr 1fr' }}>
        {uses.map((u, i) => <IconCard key={u.title} variant={i % 3 === 0 ? 'tint' : ''} icon={u.icon} title={u.title} text={u.text} />)}
      </Stagger>
    </Slide>
  )
}
