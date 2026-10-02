import { Slide, Reveal, Flow, Card, Em, Pill } from '../../components'

export const meta = {
  title: 'How an LLM is trained',
  steps: 3,
  notes: `Three stages. Use the student analogy — it lands every time.

- **Pretraining** — read a huge slice of the internet, books and code; predict the next token billions of times. Learns language, facts, patterns. *Like reading the entire library.* This is the expensive part: months, thousands of GPUs. "Large" = billions of adjustable numbers (parameters).
- (click) **Fine-tuning** — study many curated question → good-answer examples. Learns to follow instructions instead of rambling. *Like joining a coaching class for one exam.*
- (click) **RLHF** — humans compare answers and pick the better one; the model is nudged toward what people prefer. *Like a mentor's feedback on your mock interviews.*
- (click) Result: a raw text-predictor becomes a helpful assistant.

**Ask:** "Which stage do you think costs the most?" (Pretraining, by far.)

**Transition:** "There's one architectural idea that made all of this scale. It's called attention."`,
}

const stages = [
  { num: '01', icon: '📚', title: 'Pretraining', text: 'Predict the next token across a huge slice of the internet, books & code.', like: 'Reading the entire library', tags: ['Billions of parameters', 'Months of GPUs'] },
  { num: '02', icon: '🎯', title: 'Fine-tuning', text: 'Study curated question → good-answer pairs. Learns to follow instructions.', like: 'A coaching class for one exam', tags: ['Much smaller data'] },
  { num: '03', icon: '👍', title: 'RLHF', text: 'Humans rank answers; the model is nudged toward the ones people prefer.', like: "A mentor's feedback", tags: ['Helpful · polite · safer'] },
]

export default function Training() {
  return (
    <Slide section="genai" kicker="How it learns" title={<>From text predictor to <Em>assistant</Em></>}>
      <Flow stepped at={0} style={{ flex: 1, minHeight: 0 }} nodes={stages.map((s, i) => (
        <Card variant={i === 0 ? 'tint' : ''} num={s.num} icon={s.icon} title={s.title} style={{ gap: 18 }}>
          <div className="card-text">{s.text}</div>
          <div className="col" style={{ gap: 14, marginTop: 'auto' }}>
            <div className="body" style={{ fontStyle: 'italic' }}>≈ {s.like}</div>
            <div className="row" style={{ gap: 10, flexWrap: 'wrap' }}>{s.tags.map((t) => <Pill key={t} outline>{t}</Pill>)}</div>
          </div>
        </Card>
      ))} />
      <Reveal at={3} as="scale">
        <div className="card ink" style={{ padding: '26px 44px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <span className="h3">Raw autocomplete → instruction-follower → helpful assistant</span>
          <span className="body">ChatGPT, Claude, Gemini all follow this recipe</span>
        </div>
      </Reveal>
    </Slide>
  )
}
