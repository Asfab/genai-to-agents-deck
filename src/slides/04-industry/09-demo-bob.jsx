import { Slide, Reveal, Em, Label } from '../../components'
import { LiveBadge, DemoStep } from './parts/bits'

export const meta = {
  title: 'Live demo · IBM Bob',
  steps: 4,
  notes: `**DEMO SCRIPT — IBM Bob (≈5 min).** Goal: Bob writes the same TicketTown agent as code and deploys it to watsonx Orchestrate with the ADK.

**Before the talk:** Bob open on an empty folder; ADK installed and env active (\`orchestrate --version\`, \`orchestrate env activate <env>\`); TicketTown MCP URL in the clipboard; font size up to 20+.

- **Click 1 — Tell Bob the goal.** In Agent mode, paste: "Create a watsonx Orchestrate agent called Teena that helps customers book movie tickets at TicketTown using this MCP server: <url>. Write the agent YAML and import it with the ADK CLI." Say: *this is just a good prompt — role, goal, context, output.*
- **Click 2 — Bob plans & writes.** Show the plan it proposes, then the files it creates (agent YAML, toolkit config). Approve each step — *you stay in control.*
- **Click 3 — Bob deploys.** Bob runs \`orchestrate toolkits import\` / \`orchestrate agents import -f teena.yaml\`. Point at the terminal output.
- **Click 4 — It's live.** Switch to watsonx Orchestrate: Teena appears. Send one message to prove it works.

**Ask the room:** "What did I actually write?" (One paragraph of English. The skill is *describing the problem well*.)

**FALLBACK (no network / Bob slow):** skip to the agent YAML in the backup folder, show it on screen, and say "this is what Bob generated in rehearsal." Don't wait more than ~30 s on any step.

**Transition:** "Building is the easy part. Running 100 of these in a bank is the hard part."`,
}

export default function DemoBob() {
  return (
    <Slide section="industry" kicker="Demo 2 · IBM Bob" title={<>Now let <Em>Bob</Em> build the agent for us</>}>
      <div className="row fill" style={{ alignItems: 'stretch', gap: 56 }}>
        <div className="col" style={{ flex: '1 1 0', justifyContent: 'space-between', gap: 28 }}>
          <Reveal as="fade" className="row" style={{ gap: 20, alignItems: 'center' }}>
            <LiveBadge />
            <span className="body">Same agent, written as code</span>
          </Reveal>
          <DemoStep at={1} n="1" title="Tell Bob the goal" text="One paragraph of plain English." />
          <DemoStep at={2} n="2" title="Bob plans and writes" text="Agent YAML + tool config. You approve each step." />
          <DemoStep at={3} n="3" title="Bob deploys with the ADK" text="Imports the agent into watsonx Orchestrate." />
          <DemoStep at={4} n="4" title="TicketTown talks to it" text="Same agent, built in minutes." dim={false} />
        </div>
        <Reveal delay={0.3} as="right" className="col" style={{ flex: '0 0 800px', gap: 18 }}>
          <Label>You → Bob</Label>
          <div className="prompt-box">Create a watsonx Orchestrate agent “Teena” that books movie tickets via the TicketTown MCP server. Write the YAML and deploy it with the ADK.</div>
          <Reveal at={2}><Label>Bob writes · teena.yaml</Label></Reveal>
          <Reveal at={2} className="code fill">
            <span className="k">spec_version:</span> v1{'\n'}
            <span className="k">kind:</span> native{'\n'}
            <span className="k">name:</span> <span className="s">teena</span>{'\n'}
            <span className="k">description:</span> <span className="s">Books movie tickets at TicketTown</span>{'\n'}
            <span className="k">tools:</span>{'\n'}  - get_showtimes_for_movie{'\n'}  - suggest_seats{'\n'}  - create_booking{'\n'}
            <Reveal at={3} tag="span" as="fade"><span className="c">$ orchestrate agents import -f teena.yaml</span>{'\n'}<span className="s">✓ Agent 'teena' imported</span></Reveal>
          </Reveal>
        </Reveal>
      </div>
    </Slide>
  )
}
