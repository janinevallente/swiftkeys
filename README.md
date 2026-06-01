# SwiftKeys — Retro Typing Speed Test

A retro arcade-themed typing speed test built with **Next.js** and **Framer Motion**. Test your typing speed across three difficulty levels, track your WPM and accuracy, and review your score history — all wrapped in a pixel-art aesthetic inspired by classic arcade games.

---

## Features

- **Retro arcade theme** — pixel-art UI with Press Start 2P and VT323 fonts, chunky pixel borders, CRT-style flicker animation, and a forest-green dark mode palette
- **Three difficulty levels** — Easy (simple sentences), Medium (thoughtful paragraphs), and Hard (complex technical vocabulary)
- **Configurable test duration** — choose between 15s, 30s, or 60s timed tests
- **Live stats** — real-time WPM and accuracy displayed as the test runs, with a prominent countdown timer that turns red when time is low
- **Score history** — results are saved locally (up to 50 entries); view a bar chart of your last 10 runs and a full scrollable log table with date, WPM, accuracy, correct/incorrect keystrokes, and duration
- **Clear history modal** — pixel-art confirmation modal with a danger theme before wiping saved scores
- **About modal** — pixel info button in the navbar opens a modal covering what SwiftKeys is, the developer's background, and why it was built
- **Pixel toggle** — custom SVG dark/light mode switch with a moon icon (dark) and sun icon (light), stars and clouds in the track background
- **Sound effects** — Web Audio API 8-bit click sounds on keystrokes (correct = crisp blip, incorrect = low buzz) and a C major arpeggio fanfare on test completion, with a shared dynamics compressor for consistent volume
- **Word-safe text wrapping** — typing text never breaks mid-word at the right edge
- **Mobile-friendly** — fully responsive across all screen sizes with an `xs: 380px` custom breakpoint; difficulty labels shorten to single letters on small screens
- **Keyboard shortcut** — press `Tab` at any time to instantly restart the test

---

## Tech Stack

| Layer      | Technology                                                        |
| ---------- | ----------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router)                     |
| UI Library | [React 19](https://react.dev)                                     |
| Language   | TypeScript                                                        |
| Styling    | [Tailwind CSS v3](https://tailwindcss.com) (custom design tokens) |
| Animation  | [Framer Motion](https://www.framer-motion.com)                    |
| Charts     | [Recharts](https://recharts.org)                                  |
| Icons      | [Lucide React](https://lucide.dev)                                |
| Fonts      | Press Start 2P + VT323 via Google Fonts                           |
| Audio      | Web Audio API (no dependencies)                                   |
| Deployment | [Vercel](https://vercel.com)                                      |

---

## Project Structure

```
src/
├── app/
│   ├── globals.css                             # CSS custom properties (dark/light tokens), CRT effects
│   ├── layout.tsx                              # Root layout with metadata
│   └── page.tsx                                # Home page — theme state and layout shell
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                          # Top bar with logo, pixel info button, and theme toggle
│   │   └── Footer.tsx                          # Minimal copyright footer
│   ├── sections/
│   │   ├── Results/
│   │   │   ├── Results.tsx                     # Stage clear screen with WPM hero and stat grid
│   │   │   ├── ScoreHistory.tsx                # Full log table + clear modal trigger
│   │   │   └── WpmChart.tsx                    # Recharts bar chart for last 10 runs
│   │   └── TypingTest/
│   │       ├── TypingTest.tsx                  # Main test orchestrator — state, keyboard, mobile input
│   │       ├── TypingArea.tsx                  # Character-by-character text renderer with cursor
│   │       ├── ControlBar.tsx                  # Duration + difficulty selectors and icon buttons
│   │       └── StatsBar.tsx                    # Live timer + WPM + accuracy bar during test
│   ├── styling/
│   │   ├── CornerDeco.tsx                      # Reusable pixel corner bracket decoration
│   │   └── SectionLabel.tsx                    # Pixel-font section heading label
│   └── ui/
│       ├── modals/
│       │   ├── AboutModal.tsx                  # About the app, developer, and motivation modal
│       │   └── ClearModal.tsx                  # Confirmation modal for clearing score history
│       ├── PixelBtn.tsx                        # Reusable pixel-style toggle button
│       ├── PixelDivider.tsx                    # Decorative pixel horizontal rule
│       ├── PixelIconBtn.tsx                    # Reusable pixel-style icon button
│       ├── PixelInfoBtn.tsx                    # Pixel "i" button that opens the About modal
│       ├── PixelLogo.tsx                       # SVG pixel keyboard logo mark
│       ├── PixelStat.tsx                       # Stat display panel (WPM / ACC readouts)
│       └── PixelToggle.tsx                     # Minecraft-style dark/light mode SVG toggle
├── hooks/
│   ├── useScoreHistory.ts                      # localStorage read/write for score entries (max 50)
│   ├── useSoundEffects.ts                      # Web Audio API tick and finish sounds
│   └── useTypingTest.ts                        # Core typing test logic — chars, cursor, timer, results
└── lib/
    ├── data.ts                                 # Site metadata and developer info
    └── texts.ts                                # Text pools for easy / medium / hard difficulty
```

---

## Getting Started

### Prerequisites

- Node.js **18+**
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/janinevallente/swiftkeys.git
cd swiftkeys

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm start
```

---

## Content Management

All text prompts used in the typing test live in a single file:

```
src/lib/texts.ts
```

Each difficulty level has its own pool of 15–20 passages. To add, remove, or edit prompts, update the corresponding array in `textPools`.

### Adding a Text Prompt

```ts
// src/lib/texts.ts
easy: [
  // ... existing entries
  "Your new easy passage goes here, written in plain everyday language.",
],

medium: [
  // ... existing entries
  "Your new medium passage, with moderately complex vocabulary and sentence structure.",
],

hard: [
  // ... existing entries
  "Your new hard passage featuring advanced vocabulary, technical terminology, or complex syntax.",
],
```

---

## Color Themes

Themes are defined entirely through CSS custom properties in `globals.css` and toggled via a `body.light` class.

| Token                | Dark Mode | Light Mode |
| -------------------- | --------- | ---------- |
| `--bg-base`          | `#0d1117` | `#ffffff`  |
| `--bg-surface`       | `#161b22` | `#f0f0f0`  |
| `--default` (accent) | `#5d8c3e` | `#222222`  |
| `--amber`            | `#8fb86a` | `#555555`  |
| `--text-primary`     | `#f0f6fc` | `#111111`  |
| `--text-secondary`   | `#8fb86a` | `#444444`  |
| `--red`              | `#f85149` | `#cc2222`  |

---

## Deployment

This project is deployed on [Vercel](https://vercel.com). To deploy your own fork:

1. Push the repository to GitHub
2. Import the project on [vercel.com](https://vercel.com/new)
3. Vercel auto-detects Next.js — no configuration needed
4. Every push to `main` triggers a new deployment automatically

---

## Acknowledgements

- Animations powered by [Framer Motion](https://www.framer-motion.com)
- Charts powered by [Recharts](https://recharts.org)
- Pixel fonts from [Google Fonts](https://fonts.google.com) — Press Start 2P & VT323
- Deployed and hosted on [Vercel](https://vercel.com)

---

_Built by Janine Vallente._
