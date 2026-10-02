import { Slide, Stagger, Card, Grid } from '../../components'

export const meta = {
  title: 'Agenda',
  steps: 0,
  notes: `Walk the four acts quickly — don't read the cards.

- Act 1: what GenAI is and how an LLM actually produces text
- Act 2: prompting — the cheapest skill with the highest return
- Act 3: agents — LLM + tools + memory + a loop
- Act 4: what IBM and the industry are shipping, demos, careers

Tell them the demos are at the end so they stay.`,
}

const acts = [
  { num: '01', icon: '🧠', title: 'Generative AI & LLMs', text: 'What they are, how they predict, where they shine.', section: 'genai' },
  { num: '02', icon: '✍️', title: 'Prompt Engineering', text: 'Turning vague asks into reliable results.', section: 'prompting' },
  { num: '03', icon: '🤖', title: 'AI Agents', text: 'Tools, memory, planning and orchestration.', section: 'agents' },
  { num: '04', icon: '🏢', title: 'Industry & Careers', text: 'watsonx Orchestrate, Bob, live demos, Q&A.', section: 'industry' },
]

export default function Agenda() {
  return (
    <Slide section="opening" kicker="Today" title="Four acts, one story">
      <Stagger className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {acts.map((a) => (
          <div key={a.num} data-section={a.section} style={{ display: 'flex', flex: 1 }}>
            <Card variant="tint" num={a.num} icon={a.icon} title={a.title} text={a.text} style={{ justifyContent: 'flex-end' }} />
          </div>
        ))}
      </Stagger>
    </Slide>
  )
}
