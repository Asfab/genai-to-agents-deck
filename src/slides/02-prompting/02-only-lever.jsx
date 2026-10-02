import { Brain, Library, PenLine } from 'lucide-react'
import { Slide, Reveal, Card, Grid, Em } from '../../components'

export const meta = {
  title: 'The one lever you control',
  steps: 1,
  notes: `Why prompting matters, in one picture. The two grey "FIXED" cards appear first; a second later the black "YOURS" card lands on the right — let it land, then talk through left to right.

- **Model weights (grey):** fixed. Someone spent crores training them — you can't touch them in a chat window
- **Training data (grey):** fixed, with a cutoff date. It has never seen your notes, your code or your college
- **Your prompt (black):** the only thing you control — free, instant, and it changes everything

Same model, two people, totally different results — the difference is almost always the prompt.

**Ask:** "If you hired a brilliant intern on day one, what would you have to tell them before they could help you?" That list *is* a prompt.

**Transition:** "Let me show you how big the difference is."`,
}

export default function OnlyLever() {
  return (
    <Slide section="prompting" kicker="Why prompting matters" title={<>The model is fixed. <Em>Your words</Em> aren’t.</>}
      lede="An LLM is a brilliant, very literal intern: it does exactly what you ask — nothing more.">
      <style>{`.lever .icon { order: -1; margin: auto 0; } .lever .icon svg { width: 104px; height: 104px; stroke-width: 1.3; } .lever .tag-num { order: -2; }`}</style>
      <Grid cols={3}>
        <Reveal delay={0.15} style={{ display: 'flex' }}>
          <Card variant="flat" icon={<Brain />} num="FIXED" title="Model weights" text="Billions of parameters, trained once at huge cost. You can't change them from a chat box." className="lever" style={{ justifyContent: 'space-between' }} />
        </Reveal>
        <Reveal delay={0.25} style={{ display: 'flex' }}>
          <Card variant="flat" icon={<Library />} num="FIXED" title="Training data" text="Whatever it read before its cutoff date. It doesn't know your code, notes or college." className="lever" style={{ justifyContent: 'space-between' }} />
        </Reveal>
        <Reveal at={1} as="scale" style={{ display: 'flex' }}>
          <Card variant="ink" icon={<PenLine />} num="YOURS" title="Your prompt" className="lever" style={{ justifyContent: 'space-between' }}>
            <div className="card-text">Free, instant, 100% in your hands — and it decides whether the answer is generic or genuinely useful.</div>
          </Card>
        </Reveal>
      </Grid>
    </Slide>
  )
}
