import { motion } from 'framer-motion'
import { Slide, Reveal, Em, Pill, ease } from '../../components'

export const meta = {
  title: 'From GenAI to AI Agents',
  steps: 0,
  notes: `Welcome everyone. Quick intro: who I am, what I do at IBM.

**Hook:** "How many of you used ChatGPT, Gemini or Claude this week?" (hands up). "And how many of you had it *do* something for you, not just answer?" That gap is today's talk.

- ~95 minutes, four acts, live demos at the end
- Ask questions anytime`,
}

// The four acts as a rising staircase: each layer builds on the one below.
const layers = [
  { section: 'industry', label: 'Industry' },
  { section: 'agents', label: 'AI Agents' },
  { section: 'prompting', label: 'Prompting' },
  { section: 'genai', label: 'Generative AI' },
]

export default function Title() {
  return (
    <Slide section="opening" footer={false}>
      <div className="row fill" style={{ gap: 80 }}>
        <div className="col" style={{ flex: 1.25, justifyContent: 'space-between' }}>
          <Reveal as="fade"><Pill>BTech CSE · Guest Session</Pill></Reveal>
          <div className="col" style={{ gap: 40 }}>
            <Reveal delay={0.1}><h1 className="hero">From Generative AI to <Em>AI Agents</Em></h1></Reveal>
            <Reveal delay={0.3}><p className="lede">How LLMs work, how to talk to them, how they learn to act, and what the industry is building right now.</p></Reveal>
          </div>
          <Reveal delay={0.5} as="fade" className="col" style={{ gap: 6 }}>
            <div className="h3">Asfab K</div>
            <div className="small">IBM · watsonx Orchestrate</div>
          </Reveal>
        </div>

        <div className="col" style={{ flex: 1, justifyContent: 'center', gap: 18 }}>
          {layers.map((l, i) => (
            <motion.div key={l.section} data-section={l.section}
              initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.35 + (layers.length - i) * 0.14 }}
              style={{
                marginRight: i * 56,
                padding: '36px 40px', borderRadius: 'var(--radius)',
                background: i === 0 ? 'var(--accent)' : 'var(--accent-soft)',
                color: i === 0 ? '#fff' : 'var(--ink)', border: '1px solid var(--accent-line)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              }}>
              <span className="h2" style={{ fontSize: 46 }}>{l.label}</span>
              <span className="mono" style={{ fontSize: 22, color: i === 0 ? '#fff' : 'var(--accent)' }}>0{4 - i}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  )
}
