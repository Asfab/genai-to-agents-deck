import { Slide, Reveal, Stagger, Em } from '../../components'

export const meta = {
  title: 'Act 1 takeaways',
  steps: 1,
  notes: `Recap in one breath each — don't re-teach.

1. GenAI = deep learning that **creates**
2. An LLM **predicts the next token**, over and over
3. Trained in 3 stages: read everything → learn to follow instructions → learn what humans prefer
4. It **hallucinates** and **can't act** on its own
5. RAG, tools and good prompts are how we make it reliable

**Transition:** "Everything the model does starts with what *you* type. So the cheapest, highest-return skill you can learn this year is… prompting. Let's go."`,
}

const points = [
  ['GenAI creates', 'Deep learning that produces new text, code, images and audio.'],
  ['One token at a time', 'An LLM predicts the next token — then repeats.'],
  ['Read → coached → feedback', 'Pretraining, fine-tuning, RLHF.'],
  ['Fluent, not always right', 'It hallucinates, and cannot act alone.'],
  ['Make it reliable', 'Good prompts, real sources (RAG), and tools.'],
]

export default function Takeaways() {
  return (
    <Slide section="genai" kicker="Act 1 · recap" title={<>Five things to <Em>remember</Em></>}>
      <div className="grid" style={{ gridTemplateColumns: '1.45fr 1fr', gap: 48 }}>
        <Stagger className="col" gap={0.09} as="left" style={{ gap: 0, justifyContent: 'space-between' }}>
          {points.map(([t, d], i) => (
            <div key={t} className="row" style={{ gap: 32, alignItems: 'baseline', padding: '20px 0', borderBottom: i < 4 ? '1px solid var(--line)' : 'none' }}>
              <span className="mono accent" style={{ fontSize: 30, fontWeight: 600, width: 50, flex: 'none' }}>{String(i + 1).padStart(2, '0')}</span>
              <div className="col" style={{ gap: 6 }}>
                <div className="h3">{t}</div>
                <div className="body">{d}</div>
              </div>
            </div>
          ))}
        </Stagger>
        <Reveal at={1} as="scale" style={{ display: 'flex' }}>
          <div className="card ink" data-section="prompting" style={{ flex: 1, justifyContent: 'space-between', padding: '48px 52px' }}>
            <div className="label" style={{ color: 'var(--accent)' }}>Next · Act 02</div>
            <div className="col" style={{ gap: 24 }}>
              <div className="h2" style={{ fontSize: 64 }}>Prompting</div>
              <div className="card-text">Everything the model does starts with what <i>you</i> type. Let's learn to type it well.</div>
            </div>
            <div className="h2" style={{ color: 'var(--accent)' }}>→</div>
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}
