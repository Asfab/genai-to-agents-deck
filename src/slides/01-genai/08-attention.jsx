import { Slide, Reveal, Stagger, Card, Em, Label } from '../../components'
import Attention from './parts/Attention'

export const meta = {
  title: 'Attention (intuition)',
  steps: 2,
  notes: `No maths — just the intuition behind the 2017 paper *"Attention Is All You Need"*, which introduced the **Transformer** (the "T" in GPT).

- Read the sentence. **Ask:** "What does *it* refer to?" (The animal — because animals get tired.)
- (click) Change one word: "too **wide**". Now *it* = the street. The arcs move.
- That's attention: for every token, the model decides **which other tokens matter** for understanding it
- (click) Why it was a breakthrough: older models read one word at a time (slow, forgetful). Transformers look at all words at once → parallel on GPUs → can scale to huge data.

**Transition:** "So it's brilliant at language. But being good at language is not the same as being right…"`,
}

const points = [
  { icon: '👀', title: 'Every token looks at every other', text: 'and decides which ones matter for its meaning.' },
  { icon: '⚡', title: 'All at once, in parallel', text: 'Older models read word by word. This runs fast on GPUs.' },
  { icon: '🧱', title: 'Stack it many layers deep', text: "That's the Transformer — the T in GPT (2017)." },
]

export default function AttentionSlide() {
  return (
    <Slide section="genai" kicker="The breakthrough idea" title={<>Attention: what does <Em>"it"</Em> mean?</>}>
      <Card style={{ padding: '24px 40px 44px', flex: 'none', gap: 0 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <Label>Change one word, and the arcs move</Label>
          <Reveal at={1} as="fade"><span className="pill">“tired” → “wide”</span></Reveal>
        </div>
        <Attention />
      </Card>
      <Stagger at={2} gap={0.1} className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        {points.map((p) => <Card key={p.title} variant="tint" icon={p.icon} title={p.title} text={p.text} />)}
      </Stagger>
    </Slide>
  )
}
