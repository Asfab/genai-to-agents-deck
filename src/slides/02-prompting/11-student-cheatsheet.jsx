import { BookOpen, Bug, Mic, FileText } from 'lucide-react'
import { Slide, Stagger, Em, Icon } from '../../components'

export const meta = {
  title: 'Prompts for students',
  steps: 0,
  notes: `Tell them to take a photo of this slide — all four prompts appear together on entry. The [square brackets] are the blanks they fill in.

- **Study:** the "quiz me one at a time" bit turns passive reading into active recall
- **Debug:** always paste the *exact* error. "Root cause first" stops it from rewriting your whole file
- **Interview:** make it wait for your answer — that's a free mock interviewer at 2 AM
- **Resume:** "don't invent anything" is the most important line — recruiters spot fake metrics

Notice every one has role/task/context/format/constraints — the anatomy slide in action.

**Ask:** "Which one will you try first?"

**Transition:** "Let's wrap up prompting."`,
}

const tips = [
  { icon: BookOpen, title: 'Study a topic', p: 'Explain [topic] like I’m a 2nd-year CSE student. Use one real-life analogy, then quiz me with 3 questions — one at a time.' },
  { icon: Bug, title: 'Debug your code', p: 'Here’s my [language] code and the exact error. Explain the root cause first, then the smallest fix. Don’t rewrite everything.' },
  { icon: Mic, title: 'Interview prep', p: 'Act as an interviewer for an SDE intern role. Ask one DSA question, wait for my answer, then give honest feedback.' },
  { icon: FileText, title: 'Resume bullets', p: 'Rewrite these 3 bullets with strong verbs and numbers. Don’t invent anything — ask me if a metric is missing.' },
]

export default function StudentCheatsheet() {
  return (
    <Slide section="prompting" kicker="Cheatsheet · save this" title={<>Prompts you can use <Em>tonight</Em></>}>
      <Stagger className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: '1fr 1fr' }}>
        {tips.map((t) => (
          <div key={t.title} className="card" style={{ flex: 1, gap: 18 }}>
            <div className="row" style={{ alignItems: 'center', gap: 16 }}>
              <Icon of={t.icon} chip />
              <div className="card-title">{t.title}</div>
            </div>
            <div className="prompt-box good fill" style={{ display: 'flex', alignItems: 'center' }}>{t.p}</div>
          </div>
        ))}
      </Stagger>
    </Slide>
  )
}
