import { Slide, Stagger, Em } from '../../components'

export const meta = {
  title: 'Common mistakes',
  steps: 0,
  notes: `Rapid-fire — one line each, don't read the cards.

- **Vague:** no target, no audience
- **Contradictory:** "brief but cover everything" — the model has to pick one, randomly
- **No context:** "fix this bug" with no code or error message
- **Five tasks in one:** split it, or number the steps
- **Blind trust:** LLMs hallucinate — fake citations, APIs that don't exist. Run the code, check the source
- **Leaking secrets:** API keys, Aadhaar numbers, company code into public chatbots. Treat it like posting on a public forum

**Ask:** "Which one have you done this week?" (Be honest — I've done all six.)

**Transition:** "Now the good part — prompts you can use tonight."`,
}

const mistakes = [
  { icon: '🌫️', title: 'Too vague', ex: '“Write about AI.”' },
  { icon: '🔀', title: 'Contradictory', ex: '“Be brief but cover everything.”' },
  { icon: '🕳️', title: 'Missing context', ex: '“Fix this bug.” (no code, no error)' },
  { icon: '🧺', title: 'Five tasks in one', ex: '“Summarise, translate, quiz me and make a PPT.”' },
  { icon: '🙏', title: 'Blind trust', ex: 'Fake citations, made-up APIs — always verify.' },
  { icon: '🔑', title: 'Leaking secrets', ex: 'API keys, Aadhaar, company code in public chatbots.' },
]

export default function Mistakes() {
  return (
    <Slide section="prompting" kicker="Anti-patterns" title={<>Six ways to get a <Em>bad</Em> answer</>}>
      <Stagger className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr' }}>
        {mistakes.map((m) => (
          <div key={m.title} className="card" style={{ flex: 1, justifyContent: 'space-between' }}>
            <div className="row" style={{ alignItems: 'center', gap: 18 }}>
              <div className="icon" style={{ fontSize: 44 }}>{m.icon}</div>
              <div className="card-title">{m.title}</div>
            </div>
            <div className="prompt-box bad" style={{ fontSize: 'var(--fs-small)', padding: '18px 22px' }}>{m.ex}</div>
          </div>
        ))}
      </Stagger>
    </Slide>
  )
}
