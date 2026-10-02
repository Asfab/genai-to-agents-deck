import { Slide, Stagger, Card, Em } from '../../components'

export const meta = {
  title: "You've already used GenAI",
  steps: 0,
  notes: `**Hook — make it personal.** Don't read the cards; point at 2–3.

**Ask:** "Hands up if you used at least one of these in the last 7 days." (Nearly everyone.) "Two or more?" "Five or more?"

- Every card here is the *same core idea* underneath: a model generating text, code, images or audio
- Some are obvious (ChatGPT), some are hidden (smart reply, photo edits)

**Transition:** "So what *is* this thing? 'AI' gets used for everything — let's untangle the words."`,
}

const items = [
  { icon: '💬', title: 'Chat assistants', text: 'ChatGPT, Gemini, Claude explaining a topic the night before the exam.' },
  { icon: '🧑‍💻', title: 'Code autocomplete', text: 'Copilot or Cursor finishing your function in VS Code.' },
  { icon: '🔎', title: 'AI search answers', text: 'Google AI Overviews, Perplexity: a summary instead of ten links.' },
  { icon: '📷', title: 'Point your camera', text: 'Google Lens / Circle to Search on a textbook problem.' },
  { icon: '✉️', title: 'Writing help', text: '"Help me write" in Gmail & Docs, smart replies on your phone.' },
  { icon: '🟢', title: 'Inside WhatsApp', text: 'Meta AI answering questions and making stickers in chats.' },
  { icon: '🖼️', title: 'Photo magic', text: 'Erase a stranger from your trip photo; generate a new background.' },
  { icon: '🎧', title: 'Voice & translation', text: 'Talk to an assistant, translate a Hindi voice note to English.' },
]

export default function DailyLife() {
  return (
    <Slide section="genai" kicker="Hook" title={<>You've already used GenAI <Em>this week</Em></>}>
      <Stagger className="grid" gap={0.07} style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gridTemplateRows: '1fr 1fr' }}>
        {items.map((it) => <Card key={it.title} icon={it.icon} title={it.title} text={it.text} style={{ justifyContent: 'flex-start' }} />)}
      </Stagger>
    </Slide>
  )
}
