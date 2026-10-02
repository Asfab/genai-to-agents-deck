import { Slide, Reveal, Flow, Card, Em, Label, Icon } from '../../components'
import { MessageCircleQuestion, Search, Paperclip, BadgeCheck, TrendingDown, Lock, RefreshCw } from 'lucide-react'

export const meta = {
  title: 'RAG in one picture',
  steps: 4,
  notes: `**RAG = Retrieval-Augmented Generation.** Turns a closed-book exam into an open-book exam.

Example: a chatbot for your college rulebook.
- **Question** — a student asks about attendance condonation
- **Retrieve** — search the rulebook PDF, pull the 3 most relevant paragraphs
- **Augment** — paste those paragraphs into the prompt along with the question
- **Generate** — the LLM answers *from those paragraphs*, and can cite the section
- Why everyone uses it (bottom row): fewer hallucinations, works with private & fresh data, no retraining needed

**Ask:** "What document at college would you most want a RAG bot for?" (Syllabus, placement rules, hostel rules…)

**Transition:** "Powerful tools need careful use — a minute on responsibility."`,
}

const nodes = [
  { num: '01', icon: MessageCircleQuestion, title: 'Question', desc: 'A student asks the college bot', art: '“Can I get attendance condonation for medical leave?”' },
  { num: '02', icon: Search, title: 'Retrieve', desc: 'Search the rulebook for the best-matching paragraphs', art: 'rulebook.pdf\n→ §4.2 Attendance\n→ §4.3 Medical leave\n→ §7.1 Exams' },
  { num: '03', icon: Paperclip, title: 'Augment', desc: 'Paste them into the prompt with the question', art: 'Answer using ONLY:\n§4.2 … §4.3 …\nQuestion: …' },
  { num: '04', icon: BadgeCheck, title: 'Generate', desc: 'The LLM answers from those paragraphs — and cites them', art: '“Yes, with a medical certificate — see §4.3.”' },
]

export default function Rag() {
  return (
    <Slide section="genai" kicker="Fixing hallucination" title={<>RAG: give the model an <Em>open book</Em></>}>
      <Flow stepped at={0} style={{ flex: 1, minHeight: 0 }} nodes={nodes.map((n, i) => (
        <Card variant={i === 3 ? 'tint' : ''} style={{ gap: 16, padding: '32px 32px' }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Icon of={n.icon} chip style={i === 3 ? { background: 'var(--surface)' } : undefined} />
            <span className="tag-num">{n.num}</span>
          </div>
          <div className="card-title">{n.title}</div>
          <div className="card-text">{n.desc}</div>
          <div className={`prompt-box ${i === 3 ? 'good' : ''}`} style={{ flex: 1, display: 'flex', alignItems: 'center', marginTop: 8, fontSize: 24, padding: '20px 22px', ...(i === 0 || i === 3 ? { fontFamily: 'var(--font-body)' } : null) }}>{n.art}</div>
        </Card>
      ))} />
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', flex: 'none' }}>
        {[
          [TrendingDown, 'Fewer hallucinations', 'Answers come from real text'],
          [Lock, 'Private & fresh data', 'Your docs, updated any time'],
          [RefreshCw, 'No retraining', 'Swap documents, not models'],
        ].map(([icon, t, s], i) => (
          <Reveal key={t} at={4} delay={i * 0.1} className="card ink" style={{ flexDirection: 'row', alignItems: 'center', gap: 22, padding: '24px 32px' }}>
            <Icon of={icon} chip />
            <div className="col" style={{ gap: 4 }}>
              <div className="card-title" style={{ fontSize: 30 }}>{t}</div>
              <div className="card-text" style={{ fontSize: 24 }}>{s}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Slide>
  )
}
