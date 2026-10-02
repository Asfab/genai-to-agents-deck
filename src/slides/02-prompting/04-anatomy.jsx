import { Slide, Em } from '../../components'
import { AnatomyList, AnatomyPrompt } from './parts/Anatomy'

export const meta = {
  title: 'Anatomy of a prompt',
  steps: 5,
  notes: `Build the prompt one part per click. Read each highlighted line aloud.

- **Role** — who should answer? A mentor explains differently from a recruiter
- **Task** — the verb. Review, rewrite, compare, debug
- **Context** — what it can't know: your year, your goal, your project
- **Format** — the shape you want back: bullets, table, word limit
- **Constraints** — the "don'ts": no buzzwords, don't invent facts
- **Examples** — show one sample of what "good" looks like

You don't need all six every time. Short question → task + context is often enough. Anything you'll reuse → use all six.

**Ask:** "Which of these six do you usually skip?" (Usually context and format.)

**Transition:** "That last one — examples — is powerful enough to deserve its own slide."`,
}

const parts = [
  { key: 'role', name: 'Role', hint: 'Who should answer?', text: 'You are a placement mentor at an Indian engineering college.' },
  { key: 'task', name: 'Task', hint: 'What exactly to do', text: 'Review my resume summary and rewrite it.' },
  { key: 'ctx', name: 'Context', hint: 'What it can’t know', text: '3rd-year CSE, applying for SDE internships. Built a React app used by 200 students.' },
  { key: 'fmt', name: 'Format', hint: 'Shape of the answer', text: 'Give 3 issues as bullets, then the new summary in under 50 words.' },
  { key: 'con', name: 'Constraints', hint: 'Rules & limits', text: 'No buzzwords like “passionate”. Don’t invent achievements.' },
  { key: 'ex', name: 'Examples', hint: 'Show what good looks like', text: 'Style: “Built X that did Y for Z users.”' },
]

export default function Anatomy() {
  return (
    <Slide section="prompting" kicker="Anatomy of a prompt" title={<>Six parts of a <Em>great</Em> prompt</>}>
      <div className="grid" style={{ gridTemplateColumns: '0.8fr 1.6fr' }}>
        <AnatomyList parts={parts} />
        <AnatomyPrompt parts={parts} />
      </div>
    </Slide>
  )
}
