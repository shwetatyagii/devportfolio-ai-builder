// ─────────────────────────────────────────────────────────────────────────────
// DEMO IDENTITY — Shweta Tyagi
// This is the single source of truth for all placeholder, preview, seed, and
// fallback data across the entire project. Never introduce ad-hoc names again.
// ─────────────────────────────────────────────────────────────────────────────

export const DEMO_USER = {
  id: "demo-shweta-001",
  name: "Shweta Tyagi",
  email: "shwetatyagi489@gmail.com",
  createdAt: "2025-01-01T00:00:00.000Z",
};

export const MOCK_PROFILE = {
  basicInfo: {
    name: "Shweta Tyagi",
    title: "Java Full Stack Developer",
    location: "Delhi, India",
    email: "shwetatyagi489@gmail.com",
    github: "github.com/shwetatyagi",
    linkedin: "linkedin.com/in/shwetatyagi",
    website: "",
  },
  about: {
    summary:
      "Passionate Java Full Stack Developer with expertise in Spring Boot and React, building scalable web applications with clean architecture and modern UI design principles.",
    careerGoal:
      "To work as a Full Stack Developer at a product-based company where I can contribute to building impactful, user-centric software.",
    uniqueStrength:
      "Ability to bridge backend complexity with beautiful, accessible frontend experiences.",
  },
  skills: [
    "React",
    "JavaScript",
    "Java",
    "Spring Boot",
    "Hibernate",
    "MySQL",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Git",
  ],
  projects: [
    {
      name: "DevPortfolio AI Builder",
      description:
        "An AI-powered portfolio and developer branding tool built with React and Gemini AI.",
      techStack: ["React", "Tailwind CSS", "Framer Motion", "Gemini AI"],
      github: "github.com/shwetatyagi/devportfolio",
      live: "",
      achievement:
        "Reduced portfolio creation time from hours to under 5 minutes.",
    },
    {
      name: "E-Learning Management System",
      description:
        "Full-stack LMS with course management, quizzes, and progress tracking.",
      techStack: ["Spring Boot", "Hibernate", "MySQL", "React", "JWT Auth"],
      github: "github.com/shwetatyagi/lms",
      live: "",
      achievement:
        "Supports 500+ concurrent users with role-based access control.",
    },
    {
      name: "Online Exam Portal",
      description:
        "Secure exam platform with real-time proctoring and auto-grading.",
      techStack: ["Spring Boot", "React", "MySQL", "WebSocket"],
      github: "github.com/shwetatyagi/exam-portal",
      live: "",
      achievement: "Used by 200+ students in internal assessments.",
    },
  ],
  education: {
    degree: "B.Tech",
    branch: "Computer Science & Engineering",
    college: "XYZ Institute of Technology",
    year: "2025",
    cgpa: "8.4",
  },
  achievements: [
    "Qualified Smart India Hackathon 2024 — Internal Round",
    "Completed Java Full Stack certification from NIIT",
    "Top 10% on LeetCode — 250+ problems solved",
    "Published open-source DevPortfolio AI Builder on GitHub",
  ],
};

export const MOCK_GENERATED = {
  about: `Shweta Tyagi is a passionate Java Full Stack Developer based in Delhi, India, with strong expertise in Spring Boot and React. She builds scalable, production-grade web applications that combine robust backend architecture with clean, modern frontend design. With deep understanding of the full development lifecycle — from database design to responsive UI — she brings both technical precision and creative problem-solving to every project. Currently seeking opportunities at a product-based company where she can contribute to meaningful, high-impact software.`,

  resumeSummary: `Results-driven Java Full Stack Developer with hands-on experience building scalable web applications using Spring Boot, Hibernate, and React. Delivered production-quality projects including an AI-powered portfolio builder and a full-stack LMS. Strong Computer Science foundation from XYZ Institute of Technology (CGPA: 8.4). Adept at translating complex backend logic into intuitive frontend experiences. Actively seeking Full Stack Developer roles at product-based companies.`,

  readme: `# Hi, I'm Shweta Tyagi 👋

**Java Full Stack Developer** · Spring Boot · React · Java

## 🚀 About Me
I build end-to-end web applications with clean architecture and great UX.
Specialising in **Spring Boot** for backend and **React** for frontend.

## 🛠 Tech Stack
\`Java\` \`Spring Boot\` \`Hibernate\` \`React\` \`Tailwind CSS\` \`MySQL\` \`Git\`

## 📌 Featured Projects
| Project | Description | Stack |
|---|---|---|
| DevPortfolio AI Builder | AI-powered portfolio generator | React · Gemini AI |
| LMS Platform | Full-stack learning management system | Spring Boot · MySQL |
| Exam Portal | Secure online exam with auto-grading | Spring Boot · WebSocket |

## 📬 Contact
- Email: shwetatyagi489@gmail.com
- LinkedIn: linkedin.com/in/shwetatyagi`,
};
