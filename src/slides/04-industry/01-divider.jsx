import { SectionDivider, Em } from '../../components'

export const meta = {
  title: '04 · Industry & Careers',
  steps: 0,
  notes: `**Act 4 — the last stretch.** Energy up: this is the part with demos.

- We've seen what an agent is. Now: what companies are actually shipping in 2026
- Then two live demos: **watsonx Orchestrate** (build an agent) and **IBM Bob** (have AI build it for you)
- Finish with careers: skills, roles, weekend projects, free resources, Q&A

**Ask the room:** "Hands up if you think you could build an agent by Sunday." (Few hands.) "By the end of this section, I want all of you to say yes."

**Transition:** "First — what's changed in the industry in the last two years?"`,
}

const topics = [
  'From chatbots to agents',
  'watsonx Orchestrate + demo',
  'IBM Bob + demo',
  'Skills, projects & resources',
  'Q&A',
]

export default function Divider() {
  return (
    <SectionDivider section="industry" num={4} time="~25 min" topics={topics}
      title={<>What the industry is <Em>building</Em></>}
      lede={'Enterprise agent platforms, two live demos, and how you get into this field.'} />
  )
}
