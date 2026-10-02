import { Slide, Reveal, Em, Pill } from '../../components'
import { Chip } from './parts/bits'

export const meta = {
  title: '04 · Industry & Careers',
  steps: 0,
  notes: `**Act 4 — the last stretch.** Energy up: this is the part with demos.

- We've seen what an agent is. Now: what companies are actually shipping in 2026
- Then two live demos: **watsonx Orchestrate** (build an agent) and **IBM Bob** (have AI build it for you)
- Finish with careers: skills, roles, weekend projects, free resources, Q&A

**Ask the room:** "Hands up if you think you could build an agent by Sunday." (Few hands.) "By the end of this section, I want all of you to say yes."

**Transition:** "First — what's changed in the industry in the last two years?"`,
}

export default function Divider() {
  return (
    <Slide section="industry" footer={false}>
      <div className="row fill" style={{ alignItems: 'stretch', gap: 80 }}>
        <Reveal as="scale" style={{ flex: '0 0 760px', display: 'flex', alignItems: 'center' }}>
          <svg viewBox="0 0 400 300" style={{ width: '100%', height: 'auto', overflow: 'visible' }} aria-hidden>
            <text x="-8" y="262" fontFamily="var(--font-display)" fontWeight="800" fontSize="300" letterSpacing="-18"
              fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2.5">04</text>
          </svg>
        </Reveal>
        <div className="col" style={{ flex: 1, justifyContent: 'center', gap: 40 }}>
          <Reveal as="fade"><Pill>Act 4 · Industry &amp; Careers</Pill></Reveal>
          <Reveal delay={0.15}><h1 className="hero">What the industry is <Em>building</Em></h1></Reveal>
          <Reveal delay={0.3}><p className="lede">Enterprise agent platforms, two live demos, and how you get into this field.</p></Reveal>
          <Reveal delay={0.45} as="fade" className="row" style={{ gap: 14, flexWrap: 'wrap' }}>
            <Chip tone="accent">watsonx Orchestrate</Chip><Chip tone="accent">IBM Bob</Chip><Chip>Careers</Chip><Chip>Q&amp;A</Chip>
          </Reveal>
        </div>
      </div>
    </Slide>
  )
}
