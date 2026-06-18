import { buildPrompt, buildSectionPrompt } from "@/data/promptTemplates";
import { MOCK_PROFILE } from "@/data/mockProfile";

// ── Model priority list ───────────────────────────────────────────────────────
const MODELS = [
  { api: "v1beta", name: "gemini-2.5-flash" },
  { api: "v1beta", name: "gemini-2.0-flash-lite" },
  { api: "v1beta", name: "gemini-flash-latest" },
  { api: "v1beta", name: "gemini-2.0-flash-001" },
  { api: "v1beta", name: "gemini-2.0-flash" },
];

const BASE = "https://generativelanguage.googleapis.com";

// ── Single model attempt ──────────────────────────────────────────────────────
const tryModel = async (
  api,
  model,
  prompt,
  requiredFields = ["about", "resumeSummary", "githubReadme"],
) => {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  const url = `${BASE}/${api}/models/${model}:generateContent?key=${key}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      body?.error?.message ?? `HTTP ${res.status} ${res.statusText}`,
    );
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const clean = text.replace(/^```(?:json)?\n?|```$/gm, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(clean);
  } catch {
    throw new Error(`Non-JSON from ${model}: ${clean.substring(0, 80)}`);
  }

  // Validate only the fields we actually need for this call
  if (requiredFields.length > 0) {
    const missing = requiredFields.filter((k) => {
      const val = parsed[k];
      if (val === undefined || val === null) return true;
      // String fields must be non-empty strings
      if (
        ["about", "resumeSummary", "githubReadme", "bio", "tagline"].includes(k)
      ) {
        return typeof val !== "string" || val.trim().length === 0;
      }
      // Object fields (projects, experience, skillCategories) must be objects
      if (["projects", "experience", "skillCategories"].includes(k)) {
        return typeof val !== "object";
      }
      // Array fields must be arrays
      if (["achievements"].includes(k)) {
        return !Array.isArray(val);
      }
      return false;
    });
    if (missing.length > 0) {
      throw new Error(`${model} missing fields: ${missing.join(", ")}`);
    }
  }

  return { ...parsed, _model: model };
};

// ── Gemini call with automatic model fallback ─────────────────────────────────
const callGemini = async (
  prompt,
  requiredFields = ["about", "resumeSummary", "githubReadme"],
) => {
  let lastError;

  for (const { api, name } of MODELS) {
    try {
      console.info(`[aiService] Trying ${name} (${api})…`);
      const result = await tryModel(api, name, prompt, requiredFields);
      console.info(`[aiService] ✓ Success with ${name}`);
      return result;
    } catch (err) {
      lastError = err;
      const msg = err.message;
      const shouldTryNext =
        msg.includes("not found") ||
        msg.includes("not supported") ||
        msg.includes("INVALID_ARGUMENT") ||
        msg.includes("404") ||
        msg.includes("limit: 0") ||
        msg.includes("high demand") ||
        msg.includes("temporarily") ||
        msg.includes("503");

      if (shouldTryNext) {
        console.warn(`[aiService] ${name} not available → trying next`);
        continue;
      }
      throw err;
    }
  }
  throw lastError ?? new Error("All Gemini models unavailable");
};

// ── Skill categorizer for fallback ───────────────────────────────────────────
const categorizeSkills = (skills = []) => {
  const cats = {
    Languages: [],
    Frontend: [],
    Backend: [],
    Database: [],
    Tools: [],
    "CS Fundamentals": [],
  };
  const rules = [
    [
      "Languages",
      /^(java|javascript|typescript|python|c#|kotlin|swift|go|php|ruby|c\+\+)$/i,
    ],
    [
      "Frontend",
      /^(react|angular|vue|html|css|tailwind|bootstrap|redux|next|sass|svelte)$/i,
    ],
    [
      "Backend",
      /^(spring boot|spring|node|express|django|flask|hibernate|jpa|servlet|jdbc|\.net|rails)$/i,
    ],
    [
      "Database",
      /^(mysql|postgresql|mongodb|redis|sqlite|oracle|firebase|supabase|dynamodb)$/i,
    ],
    [
      "CS Fundamentals",
      /^(dsa|oop|dbms|os|cn|operating systems|computer networks|data structures|algorithms)$/i,
    ],
    [
      "Tools",
      /^(git|github|maven|gradle|docker|kubernetes|aws|gcp|azure|jenkins|figma|postman|vs code|intellij|jira|webpack|vite)$/i,
    ],
  ];

  skills.forEach((skill) => {
    let placed = false;
    for (const [cat, regex] of rules) {
      if (regex.test(skill.trim())) {
        if (!cats[cat].includes(skill)) cats[cat].push(skill);
        placed = true;
        break;
      }
    }
    if (!placed && !cats.Tools.includes(skill)) cats.Tools.push(skill);
  });

  return cats;
};

// ── Smart template fallback ───────────────────────────────────────────────────
export const generateFallback = (profile) => {
  const name = profile.basicInfo?.name ?? MOCK_PROFILE.basicInfo.name;
  const title = profile.basicInfo?.title ?? MOCK_PROFILE.basicInfo.title;
  const location = profile.basicInfo?.location ?? "India";
  const email = profile.basicInfo?.email ?? "";
  const github = profile.basicInfo?.github ?? "";
  const linkedin = profile.basicInfo?.linkedin ?? "";

  const skillList = (
    profile.skills?.length ? profile.skills : MOCK_PROFILE.skills
  ).slice(0, 8);
  const skillStr = skillList.slice(0, 4).join(", ");
  const summary = profile.about?.summary ?? MOCK_PROFILE.about.summary;
  const goal = profile.about?.careerGoal ?? MOCK_PROFILE.about.careerGoal;
  const projects = Array.isArray(profile.projects) ? profile.projects : [];
  const experience = Array.isArray(profile.experience)
    ? profile.experience
    : [];
  const achievements = Array.isArray(profile.achievements)
    ? profile.achievements
    : [];
  const edu = profile.education ?? {};

  const eduLine = edu.degree
    ? `${edu.degree} graduate from ${edu.college ?? "a leading institution"}${edu.cgpa ? ` (CGPA: ${edu.cgpa})` : ""}`
    : "";

  // Build project descriptions
  const projectDescs = {};
  projects.slice(0, 4).forEach((p, i) => {
    const stack = (p.techStack ?? []).slice(0, 3).join(", ");
    projectDescs[String(i)] = {
      description:
        p.description?.length > 20
          ? p.description
          : `${p.name} — a ${title.toLowerCase()} project built using ${stack || "modern web technologies"}.`,
      highlights: p.achievement ? [p.achievement] : [`Built with ${stack}`],
    };
  });

  // Build experience responsibilities
  const expResps = {};
  experience.slice(0, 3).forEach((e, i) => {
    expResps[String(i)] = {
      responsibilities: e.responsibilities
        ? [e.responsibilities]
        : [`${e.type} role at ${e.company} (${e.duration ?? ""})`],
    };
  });

  // README contact section
  const contactLines = [
    email ? `- 📧 [${email}](mailto:${email})` : "",
    linkedin ? `- 💼 [LinkedIn Profile](https://${linkedin})` : "",
    github ? `- 💻 [GitHub](https://${github})` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    tagline: `${title} | ${skillList.slice(0, 3).join(" · ")}`,

    about: `${name.split(" ")[0]} is a ${title} based in ${location}, building scalable web applications with ${skillStr}. ${summary} ${goal}`,

    resumeSummary: `Results-driven ${title} with experience building scalable applications using ${skillStr}. ${summary} ${eduLine ? `${eduLine}.` : ""} Actively seeking ${title} roles at product-based companies.`,

    bio: `${name} is a ${title} specialising in ${skillStr}. ${summary.substring(0, 100)}${summary.length > 100 ? "…" : ""}`,

    skillCategories: categorizeSkills(skillList),

    projects: projectDescs,

    experience: expResps,

    achievements: achievements.slice(0, 5).filter((a) => a && a.length > 5),

    githubReadme: `# Hi, I'm ${name} 👋

**${title}** · ${location}

---

## About Me

${summary} ${goal}

## Tech Stack

${skillList.map((s) => `\`${s}\``).join(" · ")}

## Featured Projects

${
  projects
    .slice(0, 3)
    .map(
      (p) =>
        `**${p.name}** — ${p.description ?? ""} *(${(p.techStack ?? []).join(", ")})*`,
    )
    .join("\n\n") || "*(Add projects in the builder)*"
}

## Education

**${edu.degree ?? ""}** in ${edu.branch ?? ""} · ${edu.college ?? ""}${edu.cgpa ? ` · CGPA: ${edu.cgpa}` : ""}

## Let's Connect

${contactLines || "*(Add contact info in the builder)*"}
`.trim(),
  };
};

// ── Main export ───────────────────────────────────────────────────────────────
/**
 * Generates portfolio content using Gemini AI.
 * Always returns content + _source ('ai' | 'fallback' | 'error-fallback').
 * Never throws — callers can always read _source to know what happened.
 */
export const generateAll = async (profile) => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    return { ...generateFallback(profile), _source: "fallback" };
  }

  try {
    const content = await callGemini(buildPrompt(profile));
    return { ...content, _source: "ai" };
  } catch (err) {
    console.warn(
      "[aiService] All models failed → using fallback:",
      err.message,
    );
    return {
      ...generateFallback(profile),
      _source: "error-fallback",
      _error: err.message,
    };
  }
};

// Map of section → fields it returns
const SECTION_FIELDS = {
  about: ["about"],
  projects: ["projects"],
  resumeSummary: ["resumeSummary"],
  githubReadme: ["githubReadme"],
  experience: ["experience"],
  achievements: ["achievements"],
};

export const regenerateSection = async (section, profile, currentGenerated) => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error("No API key — cannot regenerate without Gemini");
  }
  const { buildSectionPrompt } = await import("@/data/promptTemplates");
  const prompt = buildSectionPrompt(section, profile, currentGenerated);
  const required = SECTION_FIELDS[section] ?? [section];
  const result = await callGemini(prompt, required);
  const { _model, ...content } = result;
  return { ...content, _source: "ai" };
};
