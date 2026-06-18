# 📋 RollCall — Attendance System

A React.js student attendance management system built with functional components, custom hooks, and localStorage persistence.

## Features

- ✅ Enroll & remove students
- 📊 Mark attendance: Present / Absent / Late / Excused
- 💾 Save sessions with subject & date
- 📈 Per-student attendance rate with visual progress bar
- 📁 Export attendance to CSV
- 🕐 Live clock & session history
- 🔍 Search & filter students
- 💡 localStorage persistence (data survives page refresh)

## Tech Stack

- **React 18** — functional components + hooks
- **Custom Hook** — `useAttendance` manages all state & localStorage
- **No external UI libraries** — pure CSS-in-JS styling

## Project Structure

```
src/
├── App.jsx                      # Root component, layout orchestrator
├── index.js                     # React entry point
├── index.css                    # Global CSS variables & resets
├── components/
│   ├── TopBar.jsx               # Sticky nav with live clock
│   ├── StatStrip.jsx            # Summary stat cards
│   ├── AddStudentForm.jsx       # Enroll student form with validation
│   ├── SessionPanel.jsx         # Date/subject picker + save/export
│   ├── HistoryPanel.jsx         # Past session log
│   ├── AttendanceTable.jsx      # Main roster with mark buttons
│   ├── DeleteModal.jsx          # Confirm-delete dialog
│   └── Toast.jsx                # Notification toast + useToast hook
├── hooks/
│   └── useAttendance.js         # Custom hook: students, sessions, all actions
└── utils/
    └── helpers.js               # Pure utility functions (rate, labels, CSV)
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/rollcall-attendance.git
cd rollcall-attendance

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000).

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Leave all settings as default (Vercel auto-detects Create React App)
5. Click **Deploy** — your live URL is ready in ~60 seconds

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
3. Select your repository
4. Build command: `npm run build`
5. Publish directory: `build`
6. Click **Deploy site**

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"
# Also add: "homepage": "https://YOUR_USERNAME.github.io/rollcall-attendance"

npm run deploy
```

## React Concepts Used

| Concept | Where Used |
|---|---|
| `useState` | Form inputs, search/filter, modal target |
| `useEffect` | Clock ticker, localStorage sync |
| `useCallback` | Toast handler memoization |
| Custom Hook | `useAttendance` — encapsulates all business logic |
| Props / Prop drilling | Parent → child data + callback flow |
| Conditional rendering | Empty states, modal, toast visibility |
| List rendering | Student rows, session history items |
| Controlled inputs | All form fields |
| Component composition | App assembles all panels |

## License

MIT
