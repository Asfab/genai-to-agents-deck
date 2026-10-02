import { AnimatePresence, motion } from 'framer-motion'
import { Slide, Card, Em, Label, Icon, ease } from '../../components'
import { useSlide } from '../../engine/SlideContext'
import { FileText } from 'lucide-react'
import Attention, { VARIANTS } from './parts/Attention'

export const meta = {
  title: 'Attention (intuition)',
  // the sentence swaps "tired" ↔ "wide" forever; everything else is on screen from the start
  steps: 1,
  loop: true,
  firstMs: 2800,
  stepMs: 2800,
  notes: `**Arguably the most important idea in the deck.** No maths — just the intuition. The sentence on screen keeps swapping its last word on its own.

- Read it with "…too **tired**." **Ask:** "What does *it* refer to?" (The animal — animals get tired.) You didn't read left to right — your brain jumped to the key words.
- Watch it switch to "…too **wide**." Now *it* = the street, and the arcs move.
- That's **self-attention**: every token looks at every other token and decides **which ones matter** — learned from millions of sentences, not from grammar rules.
- Because it looks at all words at once, it runs in parallel on GPUs → can scale to huge data. Stack it many layers deep → the **Transformer**, the "T" in GPT.

**The paper (point at the card):** *"Attention Is All You Need"* — Vaswani et al., Google, 2017. Eight authors, 12 pages. Most of the authors have since left to start their own AI companies. It's the paper that started the entire LLM revolution — genuinely worth reading.

**Transition:** "So it's brilliant at language. But being good at language is not the same as being right…"`,
}

export default function AttentionSlide() {
  const { step } = useSlide()
  const which = step % VARIANTS.length
  return (
    <Slide section="genai" kicker="The breakthrough · 2017" title={<>Attention: what does <Em>"it"</Em> mean?</>}>
      <Card style={{ padding: '24px 40px 32px', flex: 'none', gap: 0 }}>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Label>Change one word, and the arcs move</Label>
          <div className="row" style={{ gap: 14, alignItems: 'center' }}>
            <span className="small">“it” →</span>
            <AnimatePresence mode="wait">
              <motion.span key={which} className="pill" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.35, ease }}>
                {VARIANTS[which].refers}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <Attention which={which} />
      </Card>

      <div className="grid" style={{ gridTemplateColumns: '1.3fr 1fr' }}>
        {/* The paper citation */}
        <div className="card" style={{ flexDirection: 'row', gap: 32, padding: '30px 40px', borderLeft: '6px solid var(--accent)', alignItems: 'center' }}>
          <Icon of={FileText} chip style={{ width: 96, height: 96, borderRadius: 20 }} />
          <div className="col" style={{ gap: 10, minWidth: 0 }}>
            <Label>The paper · Google · 2017</Label>
            <div className="h2 em" style={{ color: 'var(--ink)', fontWeight: 400, fontSize: 58 }}>“Attention Is All You Need”</div>
            <div className="body"><b style={{ color: 'var(--ink)' }}>Vaswani et al.</b> — the 12-page paper that started the entire LLM revolution.</div>
          </div>
        </div>
        {/* What it means */}
        <div className="card tint" style={{ padding: '30px 40px', gap: 18, justifyContent: 'center' }}>
          <div className="card-title">Every token looks at every other token</div>
          <div className="card-text">…and decides which ones matter. All at once, in parallel — the heart of the <b>Transformer</b>, the T in GPT.</div>
          <div className="h3 em" style={{ borderLeft: '4px solid var(--accent-line)', paddingLeft: 18, fontSize: 32 }}>“Like reading an exam question — you jump to the key words.”</div>
        </div>
      </div>
    </Slide>
  )
}
