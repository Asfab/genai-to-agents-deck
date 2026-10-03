import { MessageCircleQuestion, ArrowLeftRight, Puzzle, Layers, EyeOff, KeyRound } from 'lucide-react'
import { Slide, Stagger, Em, Icon } from '../../components'

export const meta = {
  title: 'Common mistakes',
  steps: 0,
  notes: `Rapid-fire — one line each, don't read the cards. All six cards cascade in together on entry. Each card: the mistake (title), a real example (red box), and the fix (bottom line).

- **Vague:** no target, no audience
- **Contradictory:** "brief but cover everything" — the model has to pick one, randomly
- **No context:** "fix this bug" with no code or error message
- **Five tasks in one:** split it, or number the steps
- **Blind trust:** LLMs hallucinate — fake citations, APIs that don't exist. Run the code, check the source
- **Leaking secrets:** API keys, Aadhaar numbers, company code into public chatbots. Treat it like posting on a public forum

**Ask:** "Which one have you done this week?" (Be honest — I've done all six.)

**Transition:** "Enough theory. Let's practise — your turn."`,
}

const mistakes = [
  { icon: MessageCircleQuestion, title: 'Too vague', ex: '“Write about AI.”', fix: 'Say who it’s for and why.' },
  { icon: ArrowLeftRight, title: 'Contradictory', ex: '“Be brief but cover everything.”', fix: 'Pick one: “5 bullets, max 80 words.”' },
  { icon: Puzzle, title: 'Missing context', ex: '“Fix this bug.” (no code, no error)', fix: 'Paste the code and the exact error.' },
  { icon: Layers, title: 'Five tasks in one', ex: '“Summarise, translate, quiz me, make a PPT.”', fix: 'One task per prompt, or number the steps.' },
  { icon: EyeOff, title: 'Blind trust', ex: 'Copying a fake citation or made-up API.', fix: 'Run the code. Check the source.' },
  { icon: KeyRound, title: 'Leaking secrets', ex: 'Pasting API keys or Aadhaar into a chatbot.', fix: 'Treat it like a public forum.' },
]

export default function Mistakes() {
  return (
    <Slide section="prompting" kicker="Anti-patterns" title={<>Six ways to get a <Em>bad</Em> answer</>}>
      <Stagger className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr' }}>
        {mistakes.map((m) => (
          <div key={m.title} className="card" style={{ flex: 1, gap: 18, padding: "30px 36px" }}>
            <div className="row" style={{ alignItems: 'center', gap: 18 }}>
              <Icon of={m.icon} chip />
              <div className="card-title">{m.title}</div>
            </div>
            <div className="prompt-box bad" style={{ fontSize: 'var(--fs-small)', padding: '18px 22px' }}>{m.ex}</div>
            <div className="card-text" style={{ marginTop: 'auto' }}><span className="accent" style={{ fontWeight: 600 }}>Fix →</span> {m.fix}</div>
          </div>
        ))}
      </Stagger>
    </Slide>
  )
}
