import { Slide, Reveal, Stagger, Em, Pill } from '../../components'

export const meta = {
  title: '01 · Generative AI',
  steps: 0,
  notes: `**Act 1 — ~30 min.** Set the promise, don't linger.

- First 10 min: what AI / GenAI is and how an LLM actually works
- Next 20 min: where it's genuinely useful — and where it breaks

**Ask:** "Who has a rough idea how ChatGPT decides what word to write next?" (Expect few hands — that's the hook.)

**Transition:** "Before the theory, let's see how much of this you've already been using."`,
}

const topics = ['AI → ML → DL → GenAI', 'Next-token prediction', 'Tokens & training', 'Attention', 'Limits', 'Use cases & RAG']

export default function Divider() {
  return (
    <Slide section="genai" footer={false}>
      <div className="row fill" style={{ alignItems: 'stretch', gap: 0 }}>
        <div className="col fill" style={{ justifyContent: 'space-between', gap: 40 }}>
          <Reveal as="fade"><div className="divider-num">PART 01 · ~30 MIN</div></Reveal>
          <div className="col" style={{ gap: 44 }}>
            <Reveal delay={0.1}><h1 className="hero">Generative AI<br />&amp; how <Em>LLMs</Em> work</h1></Reveal>
            <Reveal delay={0.3}><p className="lede">What's actually happening when ChatGPT "writes" — and where that's genuinely useful for you.</p></Reveal>
          </div>
          <Stagger delay={0.5} gap={0.07} as="fade" className="row" style={{ flexWrap: 'wrap', gap: 14 }}>
            {topics.map((t) => <Pill key={t} outline>{t}</Pill>)}
          </Stagger>
        </div>
        <Reveal as="scale" delay={0.15} style={{ display: 'grid', placeItems: 'center', width: 640, flex: 'none' }}>
          <div aria-hidden style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 560, lineHeight: 0.8,
            letterSpacing: '-0.06em', color: 'var(--accent-line)',
          }}>01</div>
        </Reveal>
      </div>
    </Slide>
  )
}
