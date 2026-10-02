# From Generative AI → Prompting → AI Agents → Industry

Slide deck for the BTech CSE guest session. React + Vite + Framer Motion, light theme, 1920×1080 canvas that scales to any screen or projector.

## Run locally
```bash
npm install
npm run dev          # http://localhost:5173
```

## Present
| Key | Action |
|---|---|
| → ↓ Space PageDown | next (step or slide) — clickers work too |
| ← ↑ PageUp | back |
| F | full screen |
| R | **phone remote**: shows a QR code |
| S | speaker view in a separate laptop window (notes + timers) |
| G | slide grid, click to jump |
| Home / End | first / last slide |

### Phone remote (speaker notes + next/back on your phone)
1. Open the deck on the presenting laptop (the GitHub Pages URL).
2. Press **R**, then scan the QR with your phone. It opens `…/?remote=CODE`.
3. The phone shows the slide title, **speaker notes**, talk/slide timers, the next slide's title, big **Back / Next** buttons, and a ☰ list to jump to any slide.

It uses WebRTC through the free PeerJS broker, so the phone and laptop **don't need to be on the same Wi-Fi**. Both just need internet. The code is remembered between reloads. If a venue firewall blocks WebRTC, use a cheap Bluetooth clicker plus **S** (speaker view) on the laptop.

## Deploy (GitHub Pages)
The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
1. Publish this folder as a repository from GitHub Desktop.
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push. The site appears at `https://<you>.github.io/<repo>/`.

## Edit
See [AUTHORING.md](AUTHORING.md). One file per slide in `src/slides/<NN-section>/`, the design lives in `src/theme/tokens.css`, and speaker notes live in each slide's `meta.notes`.

Screenshots of every slide: `npm run dev -- --port 5181` then `node scripts/shot.mjs ./shots all`.
