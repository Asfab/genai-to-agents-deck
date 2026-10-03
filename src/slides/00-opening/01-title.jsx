import { motion } from 'framer-motion'
import { Slide, Reveal, Em, ease } from '../../components'
import { presenters } from '../../presenters'

export const meta = {
  title: 'From GenAI to AI Agents',
  steps: 0,
  notes: `Welcome everyone. Introduce yourself and Pranav: Asfab takes GenAI and Agents, Pranav takes Prompting and Industry.

**Opening question:** "How many of you used ChatGPT, Gemini or Claude this week?" (hands up). "And how many of you had it *do* something for you, not just answer?" That gap is today's talk.

- ~95 minutes, four acts, recorded demos in Act 4
- Ask questions anytime`,
}

// The journey top → bottom, in the order we present it.
const acts = ['Generative AI', 'Prompting', 'AI Agents', 'Industry']

export default function Title() {
  return (
    <Slide section="opening" footer={false}>
      <div className="row fill" style={{ gap: 96 }}>
        <div className="col" style={{ flex: 1.25, justifyContent: 'center', gap: 120 }}>
          <div className="col" style={{ gap: 40 }}>
            <Reveal delay={0.1}><h1 className="hero">From Generative AI to <Em>AI Agents</Em></h1></Reveal>
            <Reveal delay={0.3}><p className="lede">How LLMs work, how to talk to them, how they learn to act, and what the industry is building right now.</p></Reveal>
          </div>
          <Reveal delay={0.5} as="fade" className="row" style={{ gap: 64 }}>
            {presenters.map((p, i) => (
              <div key={i} className="col" style={{ gap: 6 }}>
                <div className="h3" style={{ fontSize: 30 }}>{p.name}</div>
                <div className="small">{p.role}</div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="col" style={{ flex: 1, justifyContent: 'center', gap: 18 }}>
          {acts.map((a, i) => (
            <motion.div key={a}
              initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.35 + i * 0.14 }}
              style={{
                marginLeft: i * 56, padding: '34px 40px', borderRadius: 'var(--radius)',
                background: i === acts.length - 1 ? 'var(--accent)' : 'var(--accent-soft)',
                color: i === acts.length - 1 ? '#fff' : 'var(--ink)', border: '1px solid var(--accent-line)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              }}>
              <span className="h2" style={{ fontSize: 44 }}>{a}</span>
              <span className="mono" style={{ fontSize: 22, color: i === acts.length - 1 ? '#fff' : 'var(--accent)' }}>0{i + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  )
}
