import { Slide, Em } from '../../components'
import LearningLoop, { LOOP_STEPS } from './parts/LearningLoop'

export const meta = {
  title: 'How it learns (training loop)',
  steps: LOOP_STEPS + 1, // 3 steps per example + a summary beat, then it replays
  loop: true,
  firstMs: 1300,
  stepMs: 1300,
  notes: `"The model predicts the next word. But how did it *learn* to do that — from knowing nothing to writing poetry?"

**You already know how this works.** At 2 years old you didn't learn English from grammar books. You heard thousands of sentences, tried to speak, got corrected, tried again. Your brain learned the patterns.

The demo runs on its own, on a loop:
- The model sees "The cat sat on the ___". It guesses *car*. Wrong — the answer was *mat*.
- Point at the network when it pulses: every connection is a **weight** — just a number. When it guesses wrong, it traces back: "which connections led me to say *car*?" and nudges those numbers slightly. That's **backpropagation** — literally propagating the error backward.
- When it guesses right, the weights stay as they are.
- The four boxes below light up with each phase: forward pass → compare → backpropagate → update.

**Scale:** our demo does 4 examples. GPT-3 was trained on ~300 billion tokens — after that much practice, you'd be pretty good at predicting language too.

**Transition:** "That's how it learns to *predict*. But a raw predictor isn't a helpful assistant yet — that takes three stages."`,
}

export default function HowItLearns() {
  return (
    <Slide section="genai" kicker="The learning loop" title={<>How does it actually <Em>learn</Em>?</>}>
      <LearningLoop />
    </Slide>
  )
}
