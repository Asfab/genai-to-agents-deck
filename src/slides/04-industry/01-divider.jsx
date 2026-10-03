import { SectionDivider, Em } from '../../components'

export const meta = {
  title: '04 · Industry & Careers',
  steps: 0,
  notes: `**Act 4 — the last stretch.** Energy up: this is the part with the recorded demos.

- We've seen what an agent is. Now: what companies are actually shipping in 2026
- Two recorded demos: **watsonx Orchestrate** (after the Orchestrate slides) and **IBM Bob** (after the Bob slide)
- Finish with careers: skills, roles, weekend projects, free resources, Q&A

**Ask the room:** "Hands up if you think you could build an agent by Sunday." (Few hands.) "By the end of this section, I want all of you to say yes."

**Transition:** "First — what's changed in the industry in the last two years?"`,
}

const topics = [
  'From chatbots to agents',
  'watsonx Orchestrate + recorded demo',
  'IBM Bob + recorded demo',
  'Skills, projects & resources',
  'Q&A',
]

export default function Divider() {
  return (
    <SectionDivider section="industry" num={4} topics={topics}
      title={<>What the industry is <Em>building</Em></>}
      lede={'Enterprise agent platforms, two recorded demos, and how you get into this field.'} />
  )
}
