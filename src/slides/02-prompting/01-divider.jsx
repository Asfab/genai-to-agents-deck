import { SectionDivider, Em } from '../../components'

export const meta = {
  title: '02 · Prompt Engineering',
  steps: 0,
  notes: `Act two. Energy up — this is the most immediately useful 15 minutes of the talk.

- You now know an LLM predicts the next token from what it's given
- So **what you give it** decides what comes out — that's prompting
- Promise: by the end you'll have templates you can use tonight

**Ask the room:** "Who has ever got a useless answer from ChatGPT and blamed the AI?" (hands) "Today we'll see how often it was the prompt."

**Transition:** "Let's start with what you can and can't control."`,
}

const topics = [
  'Weak vs strong prompts',
  'Anatomy of a prompt',
  'Few-shot & step-by-step',
  'JSON output & system prompts',
  'Prompts you can use tonight',
]

export default function Divider() {
  return (
    <SectionDivider section="prompting" num={2} topics={topics}
      title={<>Prompt <Em>Engineering</Em></>}
      lede={'Same model. Better words. Wildly better results.'} />
  )
}
