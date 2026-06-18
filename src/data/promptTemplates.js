// ─── Main full-profile prompt ─────────────────────────────────────────────────
export const buildPrompt = (profile) => {
  const {
    basicInfo = {},
    about = {},
    skills = [],
    projects = [],
    experience = [],
    education = {},
    achievements = [],
  } = profile;

  const hasExperience = experience.length > 0;
  const hasAchievements = achievements.length > 0;
  const hasProjects = projects.length > 0;

  const projBlock = hasProjects
    ? projects
        .slice(0, 4)
        .map(
          (p, i) => `
[PROJECT ${i}]
Name: ${p.name ?? ""}
User wrote: "${p.description ?? "(not provided)"}"
Stack: ${(p.techStack ?? []).filter((t) => t && !/(etc|misc|others|\.\.\.)$/i.test(t)).join(", ")}
GitHub: ${p.github ?? ""}
Achievement: ${p.achievement ?? ""}
`,
        )
        .join("")
    : "None";

  const expBlock = hasExperience
    ? experience
        .slice(0, 3)
        .map(
          (e, i) => `
[EXPERIENCE ${i}]
Role: ${e.role ?? ""} at ${e.company ?? ""}
Type: ${e.type ?? ""} | Duration: ${e.duration ?? ""}
User wrote: "${e.responsibilities ?? "(not provided)"}"
`,
        )
        .join("")
    : "None";

  const achieveBlock = hasAchievements
    ? achievements.map((a, i) => `${i + 1}. ${a}`).join("\n")
    : "NONE PROVIDED";

  return `You are a senior technical writer for software engineers at top product companies.
Generate recruiter-quality portfolio content from this profile.

DEVELOPER PROFILE:
Name: ${basicInfo.name ?? ""}
Title: ${basicInfo.title ?? ""}
Location: ${basicInfo.location ?? ""}
Email: ${basicInfo.email ?? ""}
GitHub: ${basicInfo.github ?? ""}
LinkedIn: ${basicInfo.linkedin ?? ""}

About (user wrote): ${about.summary ?? ""}
Career goal: ${about.careerGoal ?? ""}
Unique strength: ${about.uniqueStrength ?? ""}

All skills: ${skills.join(", ")}

PROJECTS:
${projBlock}

EXPERIENCE:
${expBlock}

Education: ${education.degree ?? ""} in ${education.branch ?? ""}, ${education.college ?? ""} (${education.year ?? ""})${education.cgpa ? `, CGPA: ${education.cgpa}` : ""}

ACHIEVEMENTS:
${achieveBlock}

━━━━ CRITICAL RULES ━━━━
1. about → 3–5 sentences MAX. Do NOT open with "I am passionate". Start with what you build.
   No repeating skills already listed. No biography. Confident, modern tone.

2. resumeSummary → EXACTLY 3 sentences. ATS-optimized. Action verbs. NO filler phrases.
   Sentence 1: role + key skills. Sentence 2: projects/impact. Sentence 3: education + target role.

3. tagline → 8–14 words. Format: "Title | Skill1 · Skill2 · Skill3"

4. Projects → REWRITE every user description professionally. If user wrote garbage, fix it.
   Remove: "etc", "etc...", "misc", "many more", any placeholder text.
   Use: "Engineered", "Developed", "Built", "Implemented", "Designed", "Integrated".
   Add: what problem it solves, what tech makes it interesting.
   Each description: 1–2 sentences. Each highlights array: 2 specific impact bullets.
   Capitalize project names properly: 'eventia' → 'Eventia', 'codementor' → 'CodeMentor'.

5. Experience → 2–4 ATS bullet points per role. Strong action verbs. Results-focused.
   If user wrote nothing useful, infer responsibilities from role title and company type.

6. achievements → KEEP and professionally rewrite ANY of these:
   - Certifications or training (even self-learned, even online, even from institutes)
   - Hackathons, coding competitions, contests, quizzes
   - Academic honours, scholarships, rank holders
   - Open-source contributions
   - Technical workshops, seminars, bootcamps attended
   - IIT/NIT/top institute certified courses = ALWAYS keep and rewrite professionally
   Remove ONLY: jokes, personal relationships ("have girlfriend"), memes, abusive content.
   If achieveBlock is "NONE PROVIDED", return [].
   Rewrite each achievement in 1 professional sentence. Max 5.

7. skillCategories → Categorize ALL skills. Use: Languages, Frontend, Backend, Database,
   DevOps & Tools, CS Fundamentals. Every skill in exactly one category.

8. githubReadme → Real data only. NO placeholder text. NO "please replace". NO GitHub stat widgets.
   If email/github/linkedin empty, omit that section. Professional, clean markdown.

9. Return ONLY raw JSON. No markdown fences, no explanation, no comments.
━━━━━━━━━━━━━━━━━━━━

{
  "tagline": "string",
  "about": "string (max 5 sentences)",
  "resumeSummary": "string (exactly 3 sentences)",
  "bio": "string (2 sentences, LinkedIn-style)",
  "skillCategories": {
    "Languages": [],
    "Frontend": [],
    "Backend": [],
    "Database": [],
    "DevOps & Tools": [],
    "CS Fundamentals": []
  },
  "projects": {
    "0": { "description": "string", "highlights": ["string", "string"] }
  },
  "experience": {
    "0": { "responsibilities": ["string", "string", "string"] }
  },
  "achievements": [],
  "githubReadme": "string"
}`.trim();
};

// ─── Section-specific regeneration prompts ───────────────────────────────────
export const buildSectionPrompt = (section, profile, currentGenerated) => {
  const name = profile.basicInfo?.name ?? "";
  const title = profile.basicInfo?.title ?? "";
  const skills = profile.skills?.join(", ") ?? "";

  const base = `You are a senior technical writer for software engineers.
Return ONLY raw JSON. No markdown fences. No explanation.
Developer: ${name} | ${title}
Skills: ${skills}`;

  switch (section) {
    case "about":
      return `${base}
Summary they wrote: ${profile.about?.summary ?? ""}
Career goal: ${profile.about?.careerGoal ?? ""}
Unique strength: ${profile.about?.uniqueStrength ?? ""}

Rewrite the About section. MAX 5 sentences. Professional first person. Impact-focused.
No opening "I am passionate about". Start with what you build.

Return JSON: { "about": "3–5 sentence professional about section." }`;

    case "projects":
      return `${base}
Projects:
${(profile.projects ?? [])
  .slice(0, 4)
  .map(
    (p, i) =>
      `[${i}] ${p.name}: "${p.description ?? "no description"}" | Stack: ${(p.techStack ?? []).join(", ")}`,
  )
  .join("\n")}

Rewrite each project description professionally. 1–2 sentences. Fix grammar. Impact language.
For EACH project generate: description (1–2 sentences) + highlights (2 impact bullets).

Return JSON: { "projects": { "0": { "description": "...", "highlights": ["...", "..."] } } }`;

    case "resumeSummary":
      return `${base}
Career goal: ${profile.about?.careerGoal ?? ""}
Education: ${profile.education?.degree ?? ""} from ${profile.education?.college ?? ""}
Projects: ${(profile.projects ?? []).map((p) => p.name).join(", ")}
Experience: ${(profile.experience ?? []).map((e) => `${e.role} at ${e.company}`).join(", ") || "none"}

Rewrite the Resume Summary. EXACTLY 3 sentences. ATS-optimized. Strong action verbs.
Sentence 1: role + specialization. Sentence 2: projects/experience. Sentence 3: education + goal.

Return JSON: { "resumeSummary": "Exactly 3 sentence ATS resume summary." }`;

    case "githubReadme":
      return `${base}
Full name: ${name}
Location: ${profile.basicInfo?.location ?? ""}
Email: ${profile.basicInfo?.email ?? ""}
GitHub: ${profile.basicInfo?.github ?? ""}
LinkedIn: ${profile.basicInfo?.linkedin ?? ""}
Projects: ${(profile.projects ?? []).map((p) => `${p.name} (${(p.techStack ?? []).join(", ")})`).join("; ")}
Education: ${profile.education?.degree ?? ""} in ${profile.education?.branch ?? ""}, ${profile.education?.college ?? ""}
Achievements: ${(profile.achievements ?? []).slice(0, 3).join(", ")}

Generate a premium GitHub profile README. Rules:
- NO placeholder text whatsoever
- Use real email/GitHub/LinkedIn from profile above only  
- If any field is empty, skip that section completely
- NO GitHub stats badges or widgets
- Structure: intro, about, tech stack table, projects, education, contact

Return JSON: { "githubReadme": "# Full README markdown" }`;

    default:
      throw new Error(`Unknown section: ${section}`);
  }
};
