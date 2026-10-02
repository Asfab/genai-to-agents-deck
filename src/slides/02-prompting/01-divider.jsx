import { Slide, Reveal, Em, Pill } from '../../components'

export const meta = {
  title: '02 · Prompt Engineering',
  steps: 0,
  notes: `Act two. Energy up — this is the most immediately useful 15 minutes of the talk.

- You now know an LLM predicts the next token from what it's given
- So **what you give it** decides what comes out — that's prompting
- Promise: by the end you'll have templates you can use tonight

**Ask the room:** "Who has ever got a useless answer from ChatGPT and blamed the AI?" (hands) "Today we'll see how often it was the prompt."

**Transition:** "Let's start with what you can and can't control."`,
}

export default function Divider() {
  return (
    <Slide section="prompting" footer={false}>
      <div aria-hidden style={{ position: 'absolute', right: 40, bottom: -150, font: '800 760px/1 var(--font-display)', letterSpacing: '-.06em', color: 'var(--accent-soft)', pointerEvents: 'none' }}>02</div>
      <div className="col fill" style={{ justifyContent: 'space-between', position: 'relative' }}>
        <Reveal as="fade"><Pill>Act 02 · ~15 min</Pill></Reveal>
        <div className="col" style={{ gap: 40 }}>
          <Reveal delay={0.05}><div className="divider-num">02 — Prompting</div></Reveal>
          <Reveal delay={0.12}><h1 className="hero">Prompt<br /><Em>Engineering</Em></h1></Reveal>
          <Reveal delay={0.3}><p className="lede">Same model. Better words. Wildly better results.</p></Reveal>
        </div>
        <Reveal delay={0.5} as="fade" className="row small" style={{ gap: 28 }}>
          <span>GenAI</span><span>→</span><span className="accent" style={{ fontWeight: 600 }}>Prompting</span><span>→</span><span>Agents</span><span>→</span><span>Industry</span>
        </Reveal>
      </div>
    </Slide>
  )
}
