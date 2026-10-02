import { Slide, Reveal, Grid, Em, Label, Typewriter } from '../../components'

export const meta = {
  title: 'Weak vs strong prompt',
  steps: 1,
  notes: `Same model, two prompts. Ideally run both live.

- **Left:** "Write code for login" — which language? framework? database? security? The model has to guess, so it guesses the most *average* answer
- **(click) Right:** language, framework, auth method, output format, error handling — every guess removed

**Ask:** "What exactly changed between the two?" Let them call out: language, framework, format, constraints.

Key line: prompting isn't a trick — it's **removing guesswork**.

**Transition:** "So what goes into a strong prompt? Let's dissect one."`,
}

const strong = `Write a Python Flask endpoint POST /login.
- Check email + password against a SQLite users table
- Passwords are bcrypt-hashed
- On success, return a JWT as JSON
- On failure, return 401 with {"error": "..."}
Add short comments. No HTML.`

const Checks = ({ items, ok }) => (
  <div className="row" style={{ gap: 12, flexWrap: 'wrap' }}>
    {items.map((t) => <span key={t} className={`pill ${ok ? '' : 'outline'}`}>{ok ? '✓' : '✗'} {t}</span>)}
  </div>
)

export default function WeakVsStrong() {
  return (
    <Slide section="prompting" kicker="Same model, two prompts" title={<>Vague in, vague out. <Em>Specific in</Em>, useful out.</>}>
      <Grid cols={2} style={{ gridTemplateColumns: '1fr 1.25fr' }}>
        <Reveal delay={0.15} className="col" style={{ gap: 20 }}>
          <Label>✗ Weak prompt</Label>
          <div className="prompt-box bad" style={{ fontSize: 'var(--fs-h3)' }}>Write code for login</div>
          <Label style={{ marginTop: 20 }}>What you get</Label>
          <div className="card flat fill" style={{ justifyContent: 'space-between' }}>
            <div className="h2 muted">“Technically an answer.”</div>
            <div className="body">Some generic form, in some language — the model had to guess everything.</div>
            <Checks items={['framework', 'hashing', 'errors', 'format']} ok={false} />
          </div>
        </Reveal>
        <Reveal at={1} className="col" style={{ gap: 20 }}>
          <Label>✓ Strong prompt</Label>
          <Typewriter at={1} speed={90} className="prompt-box good" text={strong} />
          <Label style={{ marginTop: 20 }}>What you get</Label>
          <div className="card tint fill" style={{ justifyContent: 'space-between' }}>
            <div className="h2 accent">“Actually usable.”</div>
            <div className="body">A working Flask route with hashing, JWT and clean JSON errors — ready to test.</div>
            <Checks items={['Flask', 'bcrypt', 'JWT', 'JSON errors']} ok />
          </div>
        </Reveal>
      </Grid>
    </Slide>
  )
}
