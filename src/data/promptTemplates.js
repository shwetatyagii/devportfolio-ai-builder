export const buildPrompt = (profile) => {
  const {
    basicInfo,
    about,
    skills,
    projects,
    experience,
    education,
    achievements,
  } = profile;

  return `
You are an expert technical writer and portfolio coach.
Based on the developer profile below, generate professional portfolio content.
Return ONLY a valid JSON object. No markdown fences, no explanation — just raw JSON.

PROFILE:
Name: ${basicInfo?.name ?? ""}
Title: ${basicInfo?.title ?? ""}
Location: ${basicInfo?.location ?? ""}
Skills: ${skills?.join(", ") ?? ""}
Summary: ${about?.summary ?? ""}
Career Goal: ${about?.careerGoal ?? ""}
Projects: ${JSON.stringify((projects ?? []).slice(0, 4))}
Experience: ${JSON.stringify((experience ?? []).slice(0, 3))}
Education: ${education?.degree ?? ""} in ${education?.branch ?? ""} from ${education?.college ?? ""} (${education?.year ?? ""}) CGPA: ${education?.cgpa ?? ""}
Achievements: ${(achievements ?? []).join(" | ")}

GENERATE THIS JSON:
{
  "about": "3-4 paragraph professional about section in first person",
  "resumeSummary": "3-4 sentence ATS-optimised resume summary",
  "githubReadme": "complete GitHub profile README in markdown with badges, tech stack table, and projects",
  "bio": "2-3 sentence LinkedIn-style professional bio"
}
`.trim();
};
