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
  { num: '01', icon: '📚', title: 'Pretraining', text: 'Predict the next token across a huge slice of the internet, books & code.', like: 'Reading the entire library', tags: ['Months · thousands of GPUs'] },
  { num: '02', icon: '🎯', title: 'Fine-tuning', text: 'Study curated question → good-answer pairs. Learns to follow instructions.', like: 'A coaching class for one exam', tags: ['Much smaller data'] },
  { num: '03', icon: '👍', title: 'RLHF', text: 'Humans rank answers; the model is nudged toward the ones people prefer.', like: "A mentor's feedback", tags: ['Helpful · polite · safer'] },
]

export default function Training() {
  return (
    <Slide section="genai" kicker="How it learns" title={<>From text predictor to <Em>assistant</Em></>}>
      <Flow stepped at={0} style={{ flex: 1, minHeight: 0 }} nodes={stages.map((s, i) => (
        <Card variant={i === 0 ? 'tint' : ''} style={{ gap: 24 }}>
          <div className="col" style={{ gap: 14 }}>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 56, lineHeight: 1 }}>{s.icon}</span>
              <span className="tag-num">{s.num}</span>
            </div>
            <div className="card-title">{s.title}</div>
            <div className="card-text" style={{ minHeight: '4.35em' }}>{s.text}</div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <div className="h3 em" style={{ borderLeft: '4px solid var(--accent-line)', paddingLeft: 20 }}>“{s.like}”</div>
          </div>
          <div className="row" style={{ gap: 10, flexWrap: 'wrap' }}>{s.tags.map((t) => <Pill key={t} outline>{t}</Pill>)}</div>
        </Card>
      ))} />
      <Reveal at={3} as="scale">
        <div className="card ink" style={{ padding: '26px 44px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
          <span className="h3">Autocomplete → instruction-follower → assistant</span>
          <span className="body">The recipe behind ChatGPT, Claude & Gemini</span>
        </div>
      </Reveal>
    </Slide>
  )
}
