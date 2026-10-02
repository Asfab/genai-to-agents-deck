import { Slide, Em } from '../../components'
import NextToken from './parts/NextToken'

export const meta = {
  title: 'LLM = next-token predictor',
  // one step per generated token (6) + one step holding the finished sentence; then it starts over
  steps: 7,
  loop: true,
  firstMs: 1300,
  stepMs: 1500,
  notes: `**The single most important slide of Act 1.** The animation runs on its own, non-stop — let it play for a cycle *before* talking over it.

- The model has "Chai tastes best with" and must guess the next token. Look at the bars: *biscuits* 34%, *friends* 21%, *rain* 14%…
- It picks one, appends it, and runs again with the longer text. Different text → different probabilities. That loop *is* the whole "writing" process
- **This is literally how ChatGPT works** — every reply you've ever got was produced one token at a time like this
- It's your phone keyboard's autocomplete — trained on a vastly bigger slice of human text
- It doesn't always pick the top bar: a setting called **temperature** adds randomness. Low = predictable, high = creative. That's why the same question gives different answers.

**Ask:** "If it only predicts the next word, how can it solve a coding problem?" (Because predicting well *requires* modelling the logic in the text.)

**Transition:** "I keep saying 'word' — but models don't actually see words. They see tokens."`,
}

export default function NextTokenSlide() {
  return (
    <Slide section="genai" kicker="What an LLM really does" title={<>It does one thing: <Em>guess the next token</Em></>}>
      <NextToken />
    </Slide>
  )
}
