import { Slide, Stagger, Em } from '../../components'
import IconCard from './parts/IconCard'

export const meta = {
  title: 'Limits & responsible use',
  steps: 0,
  notes: `Not a lecture on ethics — six habits. Spend the most time on **privacy** and **learning**.

- **Verify** — treat output as a smart friend's first draft, not a textbook
- **Bias** — models learn from human text, including its stereotypes. Watch for it in hiring, grading, loans
- **Privacy** — never paste Aadhaar numbers, passwords, or your internship company's code into a public chatbot
- **Credit & copyright** — say when you used AI; don't pass off generated work or copied content as your own
- **Learn with it, not around it** — if AI writes your lab record, you lose the skill the lab was for
- **Keep a human in charge** — the more serious the decision (medical, legal, money), the more a person must check

**Ask:** "Where's the line between using AI to learn and using it to cheat?" (Good 1-minute debate.)

**Transition:** "Let's wrap Act 1 with what to remember."`,
}

const items = [
  { icon: '🔍', title: 'Verify', text: 'Treat output as a first draft, not a textbook.' },
  { icon: '⚖️', title: 'Watch for bias', text: 'It learned from human text — stereotypes included.' },
  { icon: '🔒', title: 'Protect privacy', text: 'No Aadhaar, passwords or company code in public bots.' },
  { icon: '©️', title: 'Give credit', text: 'Say when AI helped. Respect copyright.' },
  { icon: '🧠', title: 'Learn with it', text: "Not around it. Don't outsource the skill you're here to build." },
  { icon: '🧑‍⚖️', title: 'Human in charge', text: 'The higher the stakes, the more a person must check.' },
]

export default function Responsible() {
  return (
    <Slide section="genai" kicker="Use it well" title={<>Powerful, so use it <Em>responsibly</Em></>}>
      <Stagger className="grid" gap={0.07} style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gridTemplateRows: '1fr 1fr' }}>
        {items.map((it, i) => (
          <IconCard key={it.title} variant={i === 4 ? 'tint' : ''} icon={it.icon} title={it.title} text={it.text} />
        ))}
      </Stagger>
    </Slide>
  )
}
