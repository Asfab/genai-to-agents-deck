import { Slide, Em } from '../../components'
import NextToken from './parts/NextToken'

export const meta = {
  title: 'LLM = next-token predictor',
  steps: 5,
  notes: `**The single most important slide of Act 1.** Click slowly — one word per click.

- An LLM looks at all the text so far and gives a probability to *every* possible next token
- It picks one, adds it to the text, and runs again. That loop *is* the whole "writing" process
- It's your phone keyboard's autocomplete — trained on a vastly bigger slice of human text
- It doesn't always pick the top choice: a setting called **temperature** adds randomness. Low = predictable, high = creative. That's why the same question gives different answers.

**Ask:** "If it only predicts the next word, how can it solve a coding problem?" (Because predicting well *requires* modelling the logic in the text.)

**Transition:** "I said 'word' — but models don't actually see words. They see tokens."`,
}

export default function NextTokenSlide() {
  return (
    <Slide section="genai" kicker="What an LLM really does" title={<>It does one thing: <Em>guess the next token</Em></>}>
      <NextToken />
    </Slide>
  )
}
