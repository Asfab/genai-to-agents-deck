import { Slide, Reveal, Em, Label } from '../../components'
import { LiveBadge, DemoStep, ToolCall } from './parts/bits'

export const meta = {
  title: 'Live demo · watsonx Orchestrate',
  steps: 4,
  stepMs: 1100,
  notes: `**DEMO SCRIPT — watsonx Orchestrate (≈6 min).** Goal: a movie-booking agent ("Teena") for TicketTown that books real seats through the same backend the website uses. Can be run by the IBM presenter; whoever drives the browser needs the login.

**On screen:** the slide builds itself in ~5 s — the four demo steps on the left, and a mock preview chat on the right showing what the test in step 3 will look like. Read the four steps aloud as the plan, then switch to the browser and do them for real. Come back to this slide (or move on to the recap) when done.

**Before the talk:** logged in to watsonx Orchestrate in a browser tab; TicketTown MCP server URL copied; tickettown.netlify.app open in a 2nd tab; browser zoomed to 150%; phone hotspot ready.

- **Step 1 — Create the agent.** Agent Builder → Create agent → name "Teena". Description: "Helps customers find shows, pick seats and book movie tickets at TicketTown." Say: *the description is a prompt — everything from the prompting section applies.*
- **Step 2 — Add tools.** Toolset → Add tool → MCP server → paste the TicketTown MCP URL. Show the ~12 tools it discovers (shows, seats, booking, pay). Say: *no code — the tools describe themselves.*
- **Step 3 — Test in the preview chat.** Type: "Book 2 seats for Agent 404 tomorrow morning." Expand the reasoning/trace: get_showtimes_for_movie → suggest_seats → create_booking. Point at each tool call.
- **Step 4 — Deploy.** Click Deploy → switch to the TicketTown tab and refresh — the 2 seats are now taken. *Same seats the website sells.*

**Ask the room** while it thinks: "What should the agent do *before* it takes payment?" (Ask the human — human in the loop.)

**FALLBACK (no network / login fails):** don't debug on stage. Say "The demo gods have spoken" and go to the next slide — it walks the exact same flow with the trace (the mock chat on this slide also shows it). Screenshots/recording in the backup folder.

**Transition:** "Here's what just happened under the hood."`,
}

export default function DemoOrchestrate() {
  return (
    <Slide section="industry" kicker="Demo 1 · watsonx Orchestrate" title={<>Let's build a movie-booking <Em>agent</Em></>}>
      <div className="row fill" style={{ alignItems: 'stretch', gap: 56 }}>
        <div className="col" style={{ flex: '1 1 0', justifyContent: 'space-between', gap: 28 }}>
          <Reveal as="fade" className="row" style={{ gap: 20, alignItems: 'center' }}>
            <LiveBadge />
            <span className="body">Agent <b>“Teena”</b> for TicketTown</span>
          </Reveal>
          <DemoStep at={1} n="1" title="Create the agent" text="Name it, describe its job in plain English." />
          <DemoStep at={2} n="2" title="Add tools via MCP" text="Paste one URL → 12 tools: shows, seats, booking, pay." />
          <DemoStep at={3} n="3" title="Test in the preview chat" text="Watch it pick tools, step by step." />
          <DemoStep at={4} n="4" title="Deploy & book for real" text="Seats disappear from the live website." dim={false} />
        </div>
        <Reveal at={0} delay={0.3} as="right" className="card" style={{ flex: '0 0 760px', padding: 0, overflow: 'hidden', gap: 0 }}>
          <div className="row" style={{ gap: 16, alignItems: 'center', padding: '22px 30px', borderBottom: '1px solid var(--line)', background: 'var(--surface-2)' }}>
            <span className="h3 accent mono" style={{ width: 56, height: 56, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--accent-soft)' }}>T</span>
            <div className="col" style={{ gap: 2 }}>
              <div className="h3">Teena</div>
              <div className="small">watsonx Orchestrate · preview</div>
            </div>
          </div>
          <div className="chat fill" style={{ padding: '28px 30px', justifyContent: 'flex-end' }}>
            <Reveal at={3} className="bubble user" style={{ alignSelf: 'flex-end' }}>Book 2 seats for Agent 404 tomorrow morning</Reveal>
            <Reveal at={3} delay={0.25}><Label>Reasoning · tools called</Label></Reveal>
            <Reveal at={3} delay={0.45}><ToolCall name="get_showtimes_for_movie" /></Reveal>
            <Reveal at={3} delay={0.65}><ToolCall name="suggest_seats" /></Reveal>
            <Reveal at={3} delay={0.85}><ToolCall name="create_booking" /></Reveal>
            <Reveal at={3} delay={1.1} className="bubble ai" style={{ alignSelf: 'flex-start' }}>Done! 2 seats held for <b>Agent 404</b> tomorrow morning. Shall I take payment now?</Reveal>
          </div>
        </Reveal>
      </div>
    </Slide>
  )
}
