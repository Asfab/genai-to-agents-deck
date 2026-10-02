import { SectionDivider, Em } from '../../components'

export const meta = {
  title: '01 · Generative AI',
  steps: 0,
  notes: `**Act 1 — ~30 min.** Set the promise, don't linger.

- First 10 min: what AI / GenAI is and how an LLM actually works
- Next 20 min: where it's genuinely useful — and where it breaks

**Ask:** "Who has a rough idea how ChatGPT decides what word to write next?" (Expect few hands — that's the hook.)

**Transition:** "Before the theory, let's see how much of this you've already been using."`,
}

const topics = [
  'AI → ML → DL → GenAI',
  'Next-token prediction',
  'Tokens, training & attention',
  'Limits: hallucination, no actions',
  'Use cases & RAG',
]

export default function Divider() {
  return (
    <SectionDivider section="genai" num={1} time="~30 min" topics={topics}
      title={<>Generative AI &amp; how <Em>LLMs</Em> work</>}
      lede={'What\'s actually happening when ChatGPT "writes", and where that\'s genuinely useful for you.'} />
  )
}
