import { PenLine, Play, ScanSearch, Wrench, CircleHelp, Shuffle, Ruler, EyeOff } from 'lucide-react'
import { Slide, Stagger, Flow, Card, Em, Label } from '../../components'

export const meta = {
  title: 'Iterate & refine',
  steps: 1,
  notes: `Prompting is debugging, but in English. The four-step loop (top) cascades in first; a moment later the four "symptom → fix" cards fill the bottom row.

- The loop: draft → run → inspect → refine. Usually 2–3 rounds
- Don't start a new chat in frustration — tell it what was wrong ("too long", "use Python not Java")
- **Bottom row:** match the symptom to the fix —
  - generic answer → it lacked context
  - inconsistent answers → give examples
  - wrong format → spell out the structure
  - ignores a rule → make it explicit and put it last

**Ask:** "What's the longest you've argued with ChatGPT?" Usually the fix was one of these four.

**Transition:** "Some mistakes are so common they're worth naming."`,
}

const fixes = [
  { icon: <CircleHelp />, title: 'Too generic?', text: 'Add context: who, why, for what.' },
  { icon: <Shuffle />, title: 'Inconsistent?', text: 'Add 1–2 examples of the output.' },
  { icon: <Ruler />, title: 'Wrong format?', text: 'Spell out the exact structure.' },
  { icon: <EyeOff />, title: 'Ignores a rule?', text: 'State it plainly, and put it last.' },
]

export default function Iterate() {
  return (
    <Slide section="prompting" kicker="Iterate & refine" title={<>Your first prompt is a <Em>first draft</Em></>}>
      <Flow style={{ flex: 'none', height: 290 }} nodes={[
        <Card variant="tint" num="01" icon={<PenLine />} title="Draft" text="Write your best first try" />,
        <Card variant="tint" num="02" icon={<Play />} title="Run" text="See what comes back" />,
        <Card variant="tint" num="03" icon={<ScanSearch />} title="Inspect" text="What's wrong or missing?" />,
        <Card variant="ink" num="04 · repeat ↺" icon={<Wrench />} title="Refine" text="Change one thing, run again" />,
      ]} />
      <Label>Symptom → fix</Label>
      <Stagger at={1} className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', flex: 1 }}>
        {fixes.map((f) => <Card key={f.title} icon={f.icon} title={f.title} text={<>→ {f.text}</>} style={{ justifyContent: 'center' }} />)}
      </Stagger>
    </Slide>
  )
}
