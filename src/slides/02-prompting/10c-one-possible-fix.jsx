import { Slide, Reveal, Stagger, Em, Label } from '../../components'

export const meta = {
  title: 'One possible fix',
  steps: 0,
  notes: `Compare with what the room suggested. Praise anything they got that's on here, and anything good they had that isn't.

Walk down the labels on the right, one line each:
- **Role:** a technical interviewer asks different questions from HR
- **Task:** "mock interview" turns advice into practice
- **Context:** your strengths and weak spots decide the questions
- **Format:** one question at a time, plus a score and a tip, makes it a conversation
- **Constraints:** focus areas, and no answers until you've tried
- **Example:** shows the level and style you want

**Point:** same model, same 30 seconds of typing, and a completely different session. "Try exactly this tonight with your own weak subjects."

**Transition:** "And here are four more prompts you can use tonight."`,
}

const lines = [
  ['Role', 'You are a technical interviewer at a product company.'],
  ['Task', 'Run a 15-minute mock interview for a fresher SDE role.'],
  ['Context', 'I’m a final-year CSE student. Strong in Java and DSA, weak in DBMS and OS.'],
  ['Format', 'Ask one question at a time. After my answer, score it out of 10 and give one tip.'],
  ['Constraints', 'Focus on DBMS and OS. Don’t reveal the answer until I’ve tried.'],
  ['Example', 'Q1: What is a deadlock? Explain it with a real example.'],
]

export default function OnePossibleFix() {
  return (
    <Slide section="prompting" kicker="Live exercise · answer" title={<>Same request. <Em>Six parts.</Em></>}>
      <div className="row fill" style={{ gap: 48 }}>
        <div className="col" style={{ flex: 0.7, gap: 20 }}>
          <Reveal delay={0.1}><Label>Before</Label></Reveal>
          <Reveal delay={0.15} className="prompt-box bad" style={{ fontSize: 30 }}>“Help me prepare for my placement interview.”</Reveal>
          <Reveal delay={0.3} as="fade" className="mono accent" style={{ fontSize: 48, textAlign: 'center' }}>↓</Reveal>
          <Reveal delay={0.4} className="card ink" style={{ marginTop: 'auto', gap: 12 }}>
            <div className="card-title">A conversation, not an answer</div>
            <div className="card-text">Questions at your level, a score after each one, and practice on exactly what you're weak at.</div>
          </Reveal>
        </div>

        <div className="col" style={{ flex: 1.3, gap: 20 }}>
          <Reveal delay={0.2}><Label>After</Label></Reveal>
          <Stagger delay={0.35} gap={0.14} as="left" className="col prompt-box good" style={{ gap: 0, flex: 1, justifyContent: 'space-around', padding: '28px 36px' }}>
            {lines.map(([k, v]) => (
              <div key={k} className="row" style={{ gap: 28, alignItems: 'baseline' }}>
                <span className="label accent" style={{ width: 150, flex: 'none' }}>{k}</span>
                <span style={{ fontSize: 27 }}>{v}</span>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </Slide>
  )
}
