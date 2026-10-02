import { Slide, Stagger, Em } from '../../components'
import { MessageSquare, Code2, Search, ScanLine, PenLine, MessageCircle, Image, AudioLines } from 'lucide-react'
import IconCard from './parts/IconCard'

export const meta = {
  title: "You've already used GenAI",
  steps: 0,
  notes: `**Hook — make it personal.** Before defining anything: "How many of you used ChatGPT this week?" (Wait for hands — there will be a lot.)

- "Copilot for coding? Image tools? Google Lens on a textbook problem?"
- Point at the tags: **text, code, images, audio** — every medium. Some are obvious (ChatGPT), some are hidden (smart reply, photo edits)
- Every card here is the *same core idea* underneath: a model generating new content

**Ask:** "Two or more of these? Five or more?"

**Transition:** "You've been using Generative AI all week — you just didn't call it that. So what *is* it? 'AI' gets used for everything — let's untangle the words."`,
}

const items = [
  { icon: MessageSquare, tag: 'Text', title: 'Chat assistants', text: 'ChatGPT, Gemini, Claude explaining a topic the night before the exam.' },
  { icon: Code2, tag: 'Code', title: 'Code autocomplete', text: 'Copilot or Cursor finishing your function in VS Code.' },
  { icon: Search, tag: 'Text', title: 'AI search answers', text: 'Google AI Overviews, Perplexity: a summary instead of ten links.' },
  { icon: ScanLine, tag: 'Vision', title: 'Point your camera', text: 'Google Lens / Circle to Search on a textbook problem.' },
  { icon: PenLine, tag: 'Text', title: 'Writing help', text: '"Help me write" in Gmail & Docs, smart replies on your phone.' },
  { icon: MessageCircle, tag: 'Text · Images', title: 'Inside WhatsApp', text: 'Meta AI answering questions and making stickers in chats.' },
  { icon: Image, tag: 'Images', title: 'Photo magic', text: 'Erase a stranger from your trip photo; generate a new background.' },
  { icon: AudioLines, tag: 'Audio', title: 'Voice & translation', text: 'Talk to an assistant, translate a Hindi voice note to English.' },
]

export default function DailyLife() {
  return (
    <Slide section="genai" kicker="GenAI today" title={<>You've already used GenAI <Em>this week</Em></>}>
      <Stagger className="grid" gap={0.07} style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gridTemplateRows: '1fr 1fr' }}>
        {items.map((it) => <IconCard key={it.title} {...it} />)}
      </Stagger>
    </Slide>
  )
}
