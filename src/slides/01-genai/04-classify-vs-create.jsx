import { Slide, Reveal, Em } from '../../components'
import { ImageIcon, Brain, FileText, Image, Code2, ArrowRight } from 'lucide-react'

export const meta = {
  title: 'Discriminative vs generative',
  steps: 2,
  notes: `**The key distinction** that makes Generative AI different from everything before it.

- **Discriminative** (traditional ML) — *classifies*. Show it a photo, ask "is this a cat or a dog?" — it picks one. It sorts things into buckets: spam filters, image labelling. Most of your ML coursework lives here.
- **Generative** — the opposite. Say "draw me a new cat" and it **creates something that never existed before**: ChatGPT, DALL·E, Copilot.
- Punchline: discriminative models *label* things; generative models learn what the data looks like — so they can *imagine* new ones.

**Ask:** "One is picking from options. The other is creating from nothing. Which is harder?" (Someone will say "creating".) "Exactly — and that's why it took until 2017 to do it well."

**Transition:** "So how does a generative model actually write a whole paragraph? It's simpler — and weirder — than you think."`,
}

const Node = ({ icon, label, on, muted }) => (
  <div className="col" style={{ gap: 10, alignItems: 'center' }}>
    <span className="icon-chip" style={{
      width: 104, height: 104, borderRadius: 22,
      background: 'var(--surface)', border: '1.5px solid var(--accent-line)',
      ...(on ? { background: 'var(--accent)', color: 'var(--surface)', borderColor: 'var(--accent)' } : null),
      ...(muted ? { background: 'var(--surface-2)', color: 'var(--faint)', borderColor: 'transparent' } : null),
    }}>{icon}</span>
    <span className="small" style={{ color: muted ? 'var(--faint)' : 'var(--ink-2)', fontWeight: 600 }}>{label}</span>
  </div>
)
const Arrow = () => <span className="muted" style={{ display: 'flex' }}><ArrowRight size={40} strokeWidth={1.6} /></span>

const Panel = ({ variant, tag, name, quote, diagram, traits }) => (
  <div className={`card ${variant}`} style={{ flex: 1, gap: 22, padding: '34px 44px', justifyContent: 'space-between' }}>
    <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="h2">{name}</div>
      <span className={`pill ${variant ? '' : 'outline'}`} style={variant ? { background: 'var(--accent)', color: 'var(--surface)' } : null}>{tag}</span>
    </div>
    <div className="row" style={{ justifyContent: 'center', alignItems: 'center', gap: 28, padding: '30px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      {diagram}
    </div>
    <div className="h2 em" style={{ fontWeight: 400 }}>“{quote}”</div>
    <ul className="bullets" style={{ gap: 16 }}>
      {traits.map((t) => <li key={t} style={{ fontSize: 28 }}>{t}</li>)}
    </ul>
  </div>
)

export default function ClassifyVsCreate() {
  return (
    <Slide section="genai" kicker="Core concept" title={<>Classify, or <Em>create</Em>?</>}>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr auto' }}>
        <Reveal at={0} style={{ display: 'flex' }}>
          <Panel tag="Classification" name="Discriminative" quote="Is this a cat or a dog?"
            diagram={<>
              <Node icon={<ImageIcon size={40} />} label="Photo" />
              <Arrow />
              <div className="row" style={{ gap: 18 }}>
                <Node icon={<span className="h3">Cat</span>} label="97% ✓" on />
                <Node icon={<span className="h3">Dog</span>} label="3%" muted />
              </div>
            </>}
            traits={['Looks at data and answers a question about it', 'Sorts things into categories', 'e.g. spam filter, image labelling']} />
        </Reveal>
        <Reveal at={1} style={{ display: 'flex' }}>
          <Panel variant="tint" tag="Creation" name="Generative" quote="Draw me a new cat."
            diagram={<>
              <Node icon={<Brain size={40} />} label="Learned patterns" />
              <Arrow />
              <div className="row" style={{ gap: 18 }}>
                <Node icon={<FileText size={40} />} label="Text" on />
                <Node icon={<Image size={40} />} label="Image" on />
                <Node icon={<Code2 size={40} />} label="Code" on />
              </div>
            </>}
            traits={['Learns patterns, then creates new examples', 'Produces things that never existed before', 'e.g. ChatGPT, DALL·E, Copilot']} />
        </Reveal>
        <Reveal at={2} as="scale" style={{ gridColumn: '1 / -1' }}>
          <div className="card ink" style={{ padding: '24px 44px', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <span className="h3">Generative models don't just label things — they <span className="em" style={{ color: 'inherit' }}>imagine new ones</span>.</span>
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}
