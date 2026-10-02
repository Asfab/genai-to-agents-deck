import { Slide, Reveal, Stagger, Em, Label } from '../../components'

export const meta = {
  title: 'Multimodal',
  steps: 1,
  notes: `Modern models are **multimodal**: they take in, and produce, more than text.

- Images, audio, video and documents get turned into tokens too — same next-token idea underneath
- (click) Concrete things students can do *today*:
  - Photo of a circuit diagram → step-by-step explanation
  - Malayalam voice note → English summary
  - Screenshot of a red error → the likely fix

**Ask:** "What's the weirdest thing you've uploaded to an AI?" (Fun answers — keep it short.)

**Transition:** "Let's zoom out to where this is genuinely useful — for you, now."`,
}

const ins = [['📝', 'Text'], ['🖼️', 'Images'], ['🎙️', 'Audio'], ['🎬', 'Video'], ['📄', 'PDFs']]
const outs = [['📝', 'Text'], ['💻', 'Code'], ['🖼️', 'Images'], ['🔊', 'Speech'], ['🎞️', 'Video']]
const examples = [
  { a: '📸 Circuit diagram photo', b: 'Step-by-step explanation' },
  { a: '🎙️ Malayalam voice note', b: 'English summary' },
  { a: '🖥️ Screenshot of an error', b: 'The likely fix' },
]

const Chip = ([icon, label]) => (
  <div key={label} className="card" style={{ flexDirection: 'row', alignItems: 'center', gap: 20, padding: '14px 26px', flex: 1 }}>
    <span style={{ fontSize: 40, lineHeight: 1 }}>{icon}</span><span className="h3">{label}</span>
  </div>
)

export default function Multimodal() {
  return (
    <Slide section="genai" kicker="Beyond text" title={<>One model, many senses: <Em>multimodal</Em></>}>
      <div className="row fill" style={{ gap: 0, alignItems: 'stretch' }}>
        <div className="col" style={{ width: 360, gap: 14 }}>
          <Label>In</Label>
          <Stagger as="left" className="col" gap={0.07} style={{ gap: 14, flex: 1, justifyContent: 'space-between' }}>{ins.map(Chip)}</Stagger>
        </div>
        <Reveal as="fade" delay={0.5} className="flow-arrow" style={{ width: 110 }}>→</Reveal>
        <Reveal as="scale" delay={0.3} style={{ flex: 1, display: 'flex' }}>
          <div className="card tint" style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24, textAlign: 'center' }}>
            <span style={{ fontSize: 96, lineHeight: 1 }}>🧠</span>
            <div className="h2">Multimodal LLM</div>
            <div className="body">Everything becomes tokens.<br />Same next-token idea.</div>
          </div>
        </Reveal>
        <Reveal as="fade" delay={0.6} className="flow-arrow" style={{ width: 110 }}>→</Reveal>
        <div className="col" style={{ width: 360, gap: 14 }}>
          <Label>Out</Label>
          <Stagger as="right" delay={0.7} className="col" gap={0.07} style={{ gap: 14, flex: 1, justifyContent: 'space-between' }}>{outs.map(Chip)}</Stagger>
        </div>
      </div>
      <Stagger at={1} className="grid" gap={0.1} style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', flex: 'none' }}>
        {examples.map((e) => (
          <div key={e.a} className="card ink" style={{ flex: 1, padding: '24px 32px', gap: 8 }}>
            <div className="card-title" style={{ fontSize: 30 }}>{e.a}</div>
            <div className="card-text">→ {e.b}</div>
          </div>
        ))}
      </Stagger>
    </Slide>
  )
}
