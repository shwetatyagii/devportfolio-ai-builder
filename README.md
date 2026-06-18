<div align="center">

# 🚀 DevPortfolio AI Builder

### Build your developer brand with AI — in 5 minutes.

Generate professional portfolios · ATS resumes · GitHub READMEs

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white&style=flat-square)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285f4?logo=google&logoColor=white&style=flat-square)](https://ai.google.dev/)

**[🌐 Live Demo](https://your-app.vercel.app)** · **[⭐ Star this repo](https://github.com/yourusername/devportfolio-ai-builder)**

</div>

---

## 📸 What It Generates

| Portfolio                                          | Resume                               | GitHub README                                     |
| -------------------------------------------------- | ------------------------------------ | ------------------------------------------------- |
| Professional card with skills, projects, education | ATS-friendly with categorized skills | Structured with tech table and project highlights |

---

## ✨ Features

- **5 Premium Templates** — Minimal, Modern SaaS, Glassmorphism, Corporate ATS, Developer Terminal
- **Real Gemini AI** — Generates professional content from your raw notes
- **8-Step Builder** — Guided form with autosave at every step
- **6 Export Formats** — Portfolio PDF, Resume PDF, DOCX, HTML website, TXT, JSON
- **Inline Content Editing** — Edit any AI-generated section without regenerating
- **Section Regeneration** — Regenerate just About, Projects, Resume, or README
- **Smart Normalization** — "b.tech in cse" → "Bachelor of Technology (B.Tech) in Computer Science & Engineering"
- **Draft Management** — Save, view, and edit multiple portfolio drafts
- **Dark / Light Mode** — Full theme support across all templates

---

## 🛠 Tech Stack

| Category | Technology                             |
| -------- | -------------------------------------- |
| Frontend | React 18, Vite 5.4, React Router v6    |
| Styling  | Tailwind CSS v3, Framer Motion         |
| State    | Context API + useReducer (no Redux)    |
| Forms    | React Hook Form                        |
| AI       | Google Gemini 2.5 Flash (via REST API) |
| Export   | browser print CSS, docx library, JSZip |
| Other    | DOMPurify, marked.js, react-hot-toast  |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A free Google AI Studio API key → [Get it here](https://aistudio.google.com/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/devportfolio-ai-builder.git
cd devportfolio-ai-builder

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Open .env.local and add your Gemini API key

# 4. Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** The app works without an API key using smart template-based generation. Add the key for real AI output.

---

## 📁 Project Structure

src/

├── components/

│ ├── builder/ # 8-step form system

│ ├── dashboard/ # Draft management widgets

│ ├── layout/ # Sidebar, navbar, layouts

│ ├── preview/ # Portfolio, resume, README previews

│ ├── sections/ # Landing page sections

│ ├── templates/ # 5 portfolio templates

│ └── ui/ # Button, Card, Badge, Modal, etc.

├── context/ # ThemeContext, AuthContext, PortfolioContext

├── data/ # Mock data, prompts, skill lists

├── hooks/ # useTheme, useDebounce, useClipboard

├── pages/ # Route-level page components

├── reducers/ # authReducer, portfolioReducer

├── services/ # aiService.js (Gemini integration)

├── styles/ # globals.css

└── utils/ # cn, normalize, exportUtils

---

## 🏗 Architecture Highlights

- **Context + useReducer** instead of Redux — demonstrates React fundamentals
- **Gemini API** with 5-model fallback chain — never crashes on quota limits
- **Print CSS** for PDF export — reliable cross-browser without html2canvas
- **Normalize utilities** — intelligent expansion of abbreviations (b.tech → B.Tech, MERN → MERN)
- **Smart template fallback** — generates content even without API key

---

## 📦 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## 🤝 Contributing

Pull requests welcome! For major changes, open an issue first.

---

## 📄 License

MIT

---

<div align="center">

Built with ❤️ using React + Gemini AI

**[⭐ Star this repo if it helped you!](https://github.com/yourusername/devportfolio-ai-builder)**

</div>
