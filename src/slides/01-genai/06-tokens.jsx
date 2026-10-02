import { Slide, Reveal, Stagger, Card, Em, Label } from '../../components'

export const meta = {
  title: 'Tokens',
  steps: 1,
  notes: `Models chop text into **tokens** — common words stay whole, rare words get split into pieces.

- "IRCTC" and "tatkal" are rare in training data → split into several tokens
- The split here is illustrative; every model has its own tokenizer
- (click) Rules of thumb for English: ~4 characters per token, ~100 tokens ≈ 75 words
- Indian languages (Hindi, Malayalam…) usually need *more* tokens for the same sentence → slower and costlier
- **Context window** = how many tokens the model can look at in one go. Your chat history, files, instructions all share it.

**Why care?** You pay per token, limits are in tokens, and "forgetting" in long chats happens at the token limit.

**Transition:** "Okay — so how does a model learn to predict tokens this well?"`,
}

const toks = ['Un', 'believ', 'able', '!', ' IR', 'CTC', ' tat', 'kal', ' opens', ' at', ' 10', ' AM', '.']
const hues = ['--violet', '--blue', '--amber', '--emerald', '--rose', '--cyan']

export default function Tokens() {
  return (
    <Slide section="genai" kicker="How the model reads" title={<>Models read <Em>tokens</Em>, not words</>}>
      <Card style={{ padding: '44px 52px', gap: 30, flex: 'none' }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <Label>One sentence → 13 tokens</Label>
          <span className="small">illustrative split · each model's tokenizer differs</span>
        </div>
        <Stagger gap={0.06} as="scale" className="row" style={{ gap: 10, flexWrap: 'wrap' }}>
          {toks.map((t, i) => (
            <span key={i} className="mono" style={{
              fontSize: 56, lineHeight: 1.2, padding: '10px 18px', borderRadius: 12, whiteSpace: 'pre',
              color: 'var(--ink)',
              background: `color-mix(in srgb, var(${hues[i % hues.length]}) 12%, var(--surface))`,
              borderBottom: `4px solid var(${hues[i % hues.length]})`,
            }}>{t}</span>
          ))}
        </Stagger>
      </Card>
      <Reveal at={1} className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <Card variant="tint" title="characters per token" text="in English, roughly. 100 tokens ≈ 75 words.">
          <div className="stat-value" style={{ order: -1 }}>~4</div>
        </Card>
        <Card variant="tint" title="Indian languages cost more" text="Hindi or Malayalam usually needs more tokens per word — slower & pricier.">
          <div className="stat-value" style={{ order: -1 }}>अ ക</div>
        </Card>
        <Card variant="tint" title="tokens of context" text="Many models today see 100K+ tokens at once — prompt, chat & files share it.">
          <div className="stat-value" style={{ order: -1 }}>100K+</div>
        </Card>
      </Reveal>
    </Slide>
  )
}
