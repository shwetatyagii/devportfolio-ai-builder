import { buildPrompt } from "@/data/promptTemplates";
import { MOCK_PROFILE, MOCK_GENERATED } from "@/data/mockProfile";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

// ── Smart fallback (no API key needed) ───────────────────────────────────────
export const generateFallback = (profile) => {
  const name = profile.basicInfo?.name ?? MOCK_PROFILE.basicInfo.name;
  const title = profile.basicInfo?.title ?? MOCK_PROFILE.basicInfo.title;
  const skills =
    profile.skills?.slice(0, 5).join(", ") ?? "React, Java, Spring Boot";
  const summary = profile.about?.summary ?? MOCK_PROFILE.about.summary;
  const goal = profile.about?.careerGoal ?? MOCK_PROFILE.about.careerGoal;
  const projects = profile.projects ?? [];
  const edu = profile.education ?? MOCK_PROFILE.education;

  return {
    about: `${name} is a passionate ${title} based in ${profile.basicInfo?.location ?? "India"}, specialising in ${skills}. ${summary} With a strong foundation in modern development practices and a drive for clean, scalable architecture, ${name.split(" ")[0]} brings both technical depth and creative problem-solving to every project. ${goal}`,
    resumeSummary: `Results-driven ${title} with hands-on experience building scalable web applications using ${skills}. ${summary} ${edu.degree ? `${edu.degree} graduate from ${edu.college}${edu.cgpa ? ` (CGPA: ${edu.cgpa})` : ""}.` : ""} Seeking ${title} roles at product-based companies.`,
    githubReadme: `# Hi, I'm ${name} 👋\n\n**${title}**\n\n## 🛠 Tech Stack\n${skills
      .split(", ")
      .map((s) => `\`${s}\``)
      .join(" · ")}\n\n## 📌 Projects\n${projects
      .slice(0, 3)
      .map((p) => `- **${p.name}** — ${p.description ?? ""}`)
      .join(
        "\n",
      )}\n\n## 📬 Contact\n- Email: ${profile.basicInfo?.email ?? ""}\n- LinkedIn: ${profile.basicInfo?.linkedin ?? ""}`,
    bio: `${name} is a ${title} specialising in ${skills}. ${summary.substring(0, 120)} ${goal}`,
  };
};

// ── Gemini call ───────────────────────────────────────────────────────────────
const callGemini = async (prompt) => {
  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${res.statusText}`);
  const json = await res.json();
  const text = json.candidates[0].content.parts[0].text;
  const clean = text.replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(clean);
};

// ── Main export ───────────────────────────────────────────────────────────────
export const generateAll = async (profile) => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    console.info("[aiService] No API key — using template fallback.");
    return generateFallback(profile);
  }
  try {
    return await callGemini(buildPrompt(profile));
  } catch (err) {
    console.warn("[aiService] API failed — falling back.", err.message);
    return generateFallback(profile);
  }
};
