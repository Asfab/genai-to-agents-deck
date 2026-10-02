import { Slide, Reveal, Stagger, Em } from '../../components'

export const meta = {
  title: 'Q&A',
  steps: 0,
  notes: `**Q&A — ~10 minutes.** Repeat each question into the mic before answering.

If the room is quiet, seed with one of the questions on screen:
- **"Will AI take my job?"** — It takes *tasks*. People who can build and supervise agents are in demand. Be that person
- **"Which framework should I learn first?"** — Concepts over frameworks: tools, memory, loops, evals. Then any one — LangGraph or watsonx Orchestrate ADK — and build something
- **"How do I get an AI internship?"** — Two shipped projects on GitHub with demo videos beat ten certificates. Write about what broke
- **"Is MCP worth learning?"** — Yes: it's becoming the standard way to plug tools into any agent; building one MCP server is a great weekend project
- **"Do I need a GPU / ML maths?"** — For *using* LLMs to build agents, no. For training models, yes — different path

Keep answers under a minute. Offer to take long ones after the session.

**Transition (when time's up):** "Let's take one last question… and close."`,
}

const seeds = ['Will AI take my job?', 'Which framework first?', 'How do I land an AI internship?', 'Do I need a GPU?', 'Is MCP worth learning?']

export default function QnA() {
  return (
    <Slide section="industry" footer>
      <div className="row fill" style={{ alignItems: 'center', gap: 96 }}>
        <div className="col" style={{ flex: 1, gap: 36 }}>
          <Reveal as="fade" className="kicker">Your turn</Reveal>
          <Reveal delay={0.1}><h1 className="hero">Questions<Em>?</Em></h1></Reveal>
          <Reveal delay={0.25}><p className="lede">Anything about agents, IBM, careers, or what you saw in the demos.</p></Reveal>
        </div>
        <Stagger delay={0.4} className="col" style={{ flex: '0 0 780px', gap: 30 }}>
          {seeds.map((s, i) => (
            <div key={s} className="bubble ai" style={{ maxWidth: '100%', alignSelf: i % 2 ? 'flex-end' : 'flex-start', padding: '26px 40px' }}><span className="h3">{s}</span></div>
          ))}
        </Stagger>
      </div>
    </Slide>
  )
}
