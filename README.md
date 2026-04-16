# 💚 KeenKeeper — Keep Your Friendships Alive

> A personal relationship manager that helps you stay meaningfully connected with the people who matter most. Track interactions, set contact goals, and never let a friendship quietly fade.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **React.js** | Component-based UI |
| **React Router DOM** | Multi-page SPA navigation |
| **Tailwind CSS + DaisyUI** | Styling & responsive layouts |
| **Recharts** | Donut chart for analytics |
| **React-Toastify** | Toast notifications |
| **Vite** | Dev server & build tool |
| **LocalStorage** | Persisting timeline entries |

---

## ✨ Key Features

### 📋 Friend Management
Browse all your friends in a clean 4-column card grid. Each card shows their photo, days since last contact, relationship tags, and a colour-coded status badge (On-Track / Almost Due / Overdue). Click any card to dive into their full detail page.

### ⚡ Quick Check-In with Live Timeline
From any friend's detail page, log a Call, Text, or Video interaction in one click. Every check-in is instantly added to the global Timeline page with the current date, and a toast notification confirms the action.

### 📊 Friendship Analytics
The Stats page renders a real-time donut chart (Recharts) that visualises your interaction breakdown by type — Call, Text, and Video — so you can see at a glance how you're staying in touch.

---

## 📦 Project Structure

```
KeenKeeper/
├── public/
│   └── _redirects          # Netlify SPA routing fix
├── src/
│   ├── assets/             # Logos, icons (call/text/video/social)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── FriendCard.jsx
│   │   └── LoadingSpinner.jsx
│   ├── context/
│   │   └── TimelineContext.jsx
│   ├── data/
│   │   └── friends.json
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── FriendDetail.jsx
│   │   ├── Timeline.jsx
│   │   ├── Stats.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vercel.json             # Vercel SPA routing fix
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/keenkeeper.git
cd keenkeeper

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# Open http://localhost:****
```

## 🏗️ Production Build

```bash
npm run build
npm run preview
```

