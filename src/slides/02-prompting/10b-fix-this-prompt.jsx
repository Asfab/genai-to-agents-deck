import { UserRound, Target, BookOpen, LayoutList, Ban, Lightbulb, Users } from 'lucide-react'
import { Slide, Reveal, Stagger, Em, Icon, Label } from '../../components'

export const meta = {
  title: 'Your turn: fix this prompt',
  steps: 0,
  notes: `**Live exercise, ~3–4 min. This is the flexible part of the clock.** Stretch it if you're early, cut it to one minute if you're late.

Read the prompt aloud: "Help me prepare for my placement interview."

**Ask:** "What would the model have to *guess* here?" Take answers from the room, and point at the checklist on the right as each part comes up:
- **Role:** who should it act as? A friend, an HR person, a technical interviewer?
- **Task:** prepare *how*? Tips, a mock interview, a study plan?
- **Context:** which role, which company type, what are you good or weak at?
- **Format:** one question at a time? A score? A table?
- **Constraints:** which topics, how long, don't give answers away?
- **Examples:** what does a good question look like?

If the room is quiet, call on a row: "Front row, give me one thing that's missing."

Optional: type the students' version into ChatGPT or Gemini live if you have a reliable network.

**Transition:** "Here's one way to fix it, using all six parts."`,
}

const parts = [
  { icon: UserRound, name: 'Role', q: 'Who should it act as?' },
  { icon: Target, name: 'Task', q: 'Prepare how, exactly?' },
  { icon: BookOpen, name: 'Context', q: 'Which role? Your strengths?' },
  { icon: LayoutList, name: 'Format', q: 'One question at a time? Scores?' },
  { icon: Ban, name: 'Constraints', q: 'Which topics? Hints or answers?' },
  { icon: Lightbulb, name: 'Examples', q: 'What does a good question look like?' },
]

export default function FixThisPrompt() {
  return (
    <Slide section="prompting" kicker="Live exercise" title={<>Your turn: <Em>fix</Em> this prompt</>}>
      <div className="row fill" style={{ gap: 48 }}>
        <div className="col" style={{ flex: 1.1, gap: 28 }}>
          <Reveal delay={0.1}><Label>The prompt</Label></Reveal>
          <Reveal delay={0.2} as="scale" className="prompt-box bad" style={{ fontSize: 58, lineHeight: 1.3, padding: '48px 56px', flex: 1, display: 'flex', alignItems: 'center' }}>
            “Help me prepare for my placement interview.”
          </Reveal>
          <Reveal delay={0.5} className="card flat" style={{ flexDirection: 'row', alignItems: 'center', gap: 24, flex: 'none' }}>
            <Icon of={Users} chip />
            <div className="col" style={{ gap: 6 }}>
              <div className="card-title" style={{ fontSize: 30 }}>What would the model have to guess?</div>
              <div className="card-text">Call out what's missing. We'll rebuild it together.</div>
            </div>
          </Reveal>
        </div>

        <div className="col" style={{ flex: 1, gap: 18 }}>
          <Reveal delay={0.3}><Label>Checklist · the six parts</Label></Reveal>
          <Stagger delay={0.45} gap={0.1} as="left" className="col" style={{ gap: 12, flex: 1, minHeight: 0 }}>
            {parts.map((p) => (
              <div key={p.name} className="card" style={{ flexDirection: 'row', alignItems: 'center', gap: 22, padding: '14px 28px', flex: 1 }}>
                <Icon of={p.icon} chip />
                <div className="col" style={{ gap: 2 }}>
                  <div className="card-title" style={{ fontSize: 28 }}>{p.name}</div>
                  <div className="card-text" style={{ fontSize: 24 }}>{p.q}</div>
                </div>
                <span className="mono muted" style={{ marginLeft: 'auto', fontSize: 28 }}>?</span>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </Slide>
  )
}
