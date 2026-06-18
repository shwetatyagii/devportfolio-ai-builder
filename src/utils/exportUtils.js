import { buildFullDegree, normalizeUniversity } from "./normalize";

// ── File download helper ──────────────────────────────────────────────────────
const triggerDownload = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ── Markdown file download ────────────────────────────────────────────────────
export const downloadMarkdown = (content, name = "README") => {
  const safe = name.replace(/\s+/g, "_");
  triggerDownload(
    new Blob([content ?? ""], { type: "text/markdown;charset=utf-8" }),
    `${safe}_README.md`,
  );
};

// ── Plain-text file download ──────────────────────────────────────────────────
export const downloadText = (content, name = "resume") => {
  const safe = name.replace(/\s+/g, "_");
  triggerDownload(
    new Blob([content ?? ""], { type: "text/plain;charset=utf-8" }),
    `${safe}_Resume.txt`,
  );
};

// ── JSON portfolio backup ─────────────────────────────────────────────────────
export const downloadJSON = (profile, generated, name = "portfolio") => {
  const safe = name.replace(/\s+/g, "_");
  const payload = {
    exportedAt: new Date().toISOString(),
    version: "1.0",
    profile,
    generatedContent: generated,
  };
  triggerDownload(
    new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }),
    `${safe}_Portfolio_Backup.json`,
  );
};

// ── PDF via browser print (reliable, no html2canvas) ─────────────────────────
// Caller adds a print-class to body, window.print() fires, class is removed after.
export const printPDF = (printClass) => {
  return new Promise((resolve) => {
    document.body.classList.add("printing", printClass);
    // Give browser one frame to apply print styles before printing
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.print();
        // Remove class after dialog closes (print/cancel)
        const cleanup = () => {
          document.body.classList.remove("printing", printClass);
          resolve();
        };
        // Slight delay ensures print dialog has dismissed
        setTimeout(cleanup, 500);
      });
    });
  });
};

// ── Portfolio standalone HTML export ────────────────────────────────────────
export const downloadPortfolioHTML = (profile, generated, selectedTemplate) => {
  // ── Local title-case helper ───────────────────────────────────────────────
  const toTitleCaseFn = (str = "") =>
    str.trim().replace(/\b\w+/g, (w) => {
      const UPPER = new Set([
        "mern",
        "mean",
        "html",
        "css",
        "api",
        "sql",
        "ai",
        "ml",
        "aws",
        "ui",
        "ux",
      ]);
      return UPPER.has(w.toLowerCase())
        ? w.toUpperCase()
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    });

  const info = profile?.basicInfo ?? {};
  const edu = profile?.education ?? {};
  const skills = profile?.skills ?? [];
  const projects = profile?.projects ?? [];
  const achievements =
    Array.isArray(generated?.achievements) && generated.achievements.length > 0
      ? generated.achievements
      : (profile?.achievements ?? []);
  const about = generated?.about ?? profile?.about?.summary ?? "";
  const tagline = generated?.tagline ?? info.title ?? "";
  const skillCats = generated?.skillCategories ?? {};
  const aiProjects = generated?.projects ?? {};

  const skillsHTML =
    Object.entries(skillCats)
      .filter(([, l]) => l?.length > 0)
      .map(
        ([cat, list]) => `
    <div class="sg">
      <span class="sc">${cat}</span>
      <div class="sl">${list.map((s) => `<span class="st">${s}</span>`).join("")}</div>
    </div>`,
      )
      .join("") || skills.map((s) => `<span class="st">${s}</span>`).join("");

  const projectsHTML = projects
    .slice(0, 4)
    .map((p, i) => {
      const ai = aiProjects[String(i)] ?? {};
      const desc = ai.description ?? p.description ?? "";
      const hls = ai.highlights ?? [];
      return `
    <div class="pc">
      <div class="ph">
        <h3>${p.name}</h3>
        <span class="ps">${(p.techStack ?? []).slice(0, 3).join(" · ")}</span>
      </div>
      ${desc ? `<p class="pd">${desc}</p>` : ""}
      ${hls.length ? `<ul class="pl">${hls.map((h) => `<li>${h}</li>`).join("")}</ul>` : ""}
      ${p.github ? `<a href="https://${p.github}" class="pg" target="_blank">${p.github}</a>` : ""}
    </div>`;
    })
    .join("");

  // ── Theme config based on selected template ───────────────────────────────
  const isGlass = selectedTemplate === "glassmorphism";
  const isModern = selectedTemplate === "modern";
  const isTerminal = selectedTemplate === "terminal";
  const isCorp = selectedTemplate === "corporate";
  // minimal = default light theme

  const isDark = isGlass || isModern || isTerminal;

  const theme = {
    bodyBg: isDark ? "#0f172a" : isCorp ? "#f8fafc" : "#ffffff",
    bodyText: isDark ? "#e2e8f0" : "#111827",
    heroBg: isGlass
      ? "linear-gradient(135deg,#1e1b4b,#1a1a2e)"
      : isModern
        ? "#18181b"
        : isTerminal
          ? "#1e1e2e"
          : isCorp
            ? "#1e293b"
            : "linear-gradient(135deg,#f8fafc,#eef2ff)", // minimal: soft gradient
    heroText: isDark || isCorp ? "#e2e8f0" : "#111827",
    heroSubText: isDark || isCorp ? "#94a3b8" : "#6b7280",
    heroBorder: isDark ? "rgba(99,102,241,0.3)" : "#e0e7ff",
    nameBg: isDark
      ? "linear-gradient(90deg,#e0e7ff,#c7d2fe)"
      : "linear-gradient(90deg,#312e81,#4f46e5)",
    cardBg: isDark ? "#1e293b" : isCorp ? "#ffffff" : "#f8fafc",
    cardBorder: isDark ? "#334155" : "#e2e8f0",
    badgeBg: isDark ? "#313244" : "#f1f5f9",
    badgeText: isTerminal ? "#a6e3a1" : isDark ? "#c7d2fe" : "#6366f1",
    skillCatColor: isTerminal ? "#f38ba8" : isModern ? "#818cf8" : "#6366f1",
    sectionTitle: isDark ? "#475569" : "#9ca3af",
    dividerColor: isDark ? "#1e293b" : "#f1f5f9",
    bodyLink: isDark ? "#818cf8" : "#4f46e5",
    bulletColor: isTerminal ? "#a6e3a1" : isDark ? "#c7d2fe" : "#6366f1",
    highlightColor: isTerminal ? "#a6e3a1" : isDark ? "#a5b4fc" : "#4f46e5",
    footerColor: isDark ? "#1e293b" : "#d1d5db",
  };

  const css = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:${theme.bodyBg};color:${theme.bodyText};line-height:1.65}
a{color:${theme.bodyLink};text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:860px;margin:0 auto;padding:40px 24px}
.hero{border-radius:16px;background:${theme.heroBg};padding:44px;margin-bottom:28px;border:1px solid ${theme.heroBorder}}
.opp{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:100px;background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.3);font-size:11px;color:#a5b4fc;margin-bottom:18px}
.name{font-size:44px;font-weight:800;background:${theme.nameBg};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:6px}
.tl{font-size:15px;color:${theme.heroSubText};margin-bottom:18px}
.cr{display:flex;flex-wrap:wrap;gap:10px}
.ci{font-size:12px;color:${theme.heroSubText};background:rgba(255,255,255,.07);padding:4px 11px;border-radius:7px;border:1px solid rgba(255,255,255,.12)}
.ci a{color:${theme.heroSubText}}
.sec{margin-bottom:28px}
.sh{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:${theme.sectionTitle};margin-bottom:14px;padding-bottom:7px;border-bottom:1px solid ${theme.dividerColor}}
.at{color:${theme.heroSubText};font-size:14px;line-height:1.8}
.sg{display:flex;align-items:flex-start;gap:12px;margin-bottom:8px;flex-wrap:wrap}
.sc{font-size:10px;font-weight:700;color:${theme.skillCatColor};width:110px;flex-shrink:0;padding-top:3px;font-family:monospace}
.sl{display:flex;flex-wrap:wrap;gap:5px}
.st{font-size:11px;padding:2px 9px;border-radius:6px;background:${theme.badgeBg};color:${theme.badgeText};border:1px solid ${theme.cardBorder};font-family:monospace}
.pc{background:${theme.cardBg};border:1px solid ${theme.cardBorder};border-radius:11px;padding:18px;margin-bottom:14px}
.ph{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:7px;gap:16px}
.ph h3{font-size:15px;font-weight:700;color:${theme.highlightColor}}
.ps{font-size:10px;color:${theme.sectionTitle};text-align:right;flex-shrink:0}
.pd{font-size:13px;color:${theme.heroSubText};margin-bottom:8px;line-height:1.7}
.pl{padding-left:16px;margin-bottom:8px}.pl li{font-size:12px;color:${theme.bulletColor};margin-bottom:3px}
.pg{font-size:11px;color:${theme.bodyLink}}
.eb{background:${theme.cardBg};border:1px solid ${theme.cardBorder};border-radius:10px;padding:14px}
.ed{font-size:14px;font-weight:600;color:${isDark ? "#fbbf24" : "#4f46e5"};margin-bottom:3px}
.em{font-size:12px;color:${theme.sectionTitle}}
.al{list-style:none}.al li{font-size:13px;color:${theme.heroSubText};padding:7px 0;border-bottom:1px solid ${theme.dividerColor};display:flex;gap:8px;align-items:flex-start}
.al li::before{content:"★";color:#fbbf24;flex-shrink:0}
.expb{border-left:2px solid ${theme.bulletColor};padding-left:14px;margin-bottom:18px}
.exprole{font-size:14px;font-weight:700;color:${theme.highlightColor};margin-bottom:2px}
.expmeta{font-size:12px;color:${theme.sectionTitle};margin-bottom:6px}
.expli{font-size:12px;color:${theme.heroSubText};margin-bottom:3px;padding-left:12px;position:relative}
.expli::before{content:"▸";position:absolute;left:0;color:${theme.bulletColor}}
.ft{text-align:center;padding:28px 0 0;border-top:1px solid ${theme.dividerColor};font-size:11px;color:${theme.footerColor};margin-top:28px}
@media(max-width:640px){.hero{padding:28px}.name{font-size:30px}}
`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${info.name ?? "Portfolio"}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
${css}
</style>
</head>
<body>
<div class="wrap">
<div class="hero">
  <div class="opp">● Open to opportunities</div>
  <h1 class="name">${info.name ?? "Your Name"}</h1>
  <p class="tl">${tagline}</p>
  <div class="cr">
    ${info.location ? `<span class="ci">📍 ${info.location}</span>` : ""}
    ${info.email ? `<span class="ci"><a href="mailto:${info.email}">${info.email}</a></span>` : ""}
    ${info.github ? `<span class="ci"><a href="https://${info.github}" target="_blank">${info.github}</a></span>` : ""}
    ${info.linkedin ? `<span class="ci"><a href="https://${info.linkedin}" target="_blank">LinkedIn</a></span>` : ""}
  </div>
</div>

${about ? `<div class="sec"><h2 class="sh">About</h2><p class="at">${about}</p></div>` : ""}

${skills.length > 0 || Object.keys(skillCats).length > 0 ? `<div class="sec"><h2 class="sh">Skills</h2>${skillsHTML}</div>` : ""}

${projects.length > 0 ? `<div class="sec"><h2 class="sh">Projects</h2>${projectsHTML}</div>` : ""}

${
  Array.isArray(profile.experience) && profile.experience.length > 0
    ? `
<div class="sec">
  <h2 class="sh">Experience</h2>
  ${profile.experience
    .map((exp, i) => {
      const resps =
        (generated?.experience ?? {})[String(i)]?.responsibilities ?? [];
      return `
    <div class="expb">
      <div class="exprole">${toTitleCaseFn(exp.role ?? "")}</div>
      <div class="expmeta">${exp.company ?? ""}${exp.type ? ` · ${exp.type}` : ""}${exp.duration ? ` · ${exp.duration}` : ""}</div>
      ${resps.map((r) => `<div class="expli">${r}</div>`).join("")}
    </div>`;
    })
    .join("")}
</div>`
    : ""
}

${edu.degree ? `<div class="sec"><h2 class="sh">Education</h2><div class="eb"><div class="ed">${buildFullDegree(edu.degree, edu.branch)}</div><div class="em">${normalizeUniversity(edu.college ?? "")}${edu.year ? ` · ${edu.year}` : ""}${edu.cgpa ? ` · CGPA: ${edu.cgpa}` : ""}</div></div></div>` : ""}

${achievements.length > 0 ? `<div class="sec"><h2 class="sh">Achievements</h2><ul class="al">${achievements.map((a) => `<li>${a}</li>`).join("")}</ul></div>` : ""}

<div class="ft">Generated with <a href="#">DevPortfolio AI</a></div>
</div>
</body>
</html>`;

  const safeName = (info.name ?? "portfolio").replace(/\s+/g, "_");
  triggerDownload(
    new Blob([html], { type: "text/html;charset=utf-8" }),
    `${safeName}_Portfolio.html`,
  );
  return safeName;
};

// ── Resume DOCX export ───────────────────────────────────────────────────────
// Requires: npm install docx
export const downloadResumeDOCX = async (profile, generated) => {
  // Dynamic import so it doesn't break the bundle if docx isn't installed
  let docxLib;
  try {
    docxLib = await import("docx");
  } catch {
    console.warn("[export] docx not installed — run: npm install docx");
    return false;
  }

  const { Document, Paragraph, TextRun, AlignmentType, BorderStyle, Packer } =
    docxLib;

  const info = profile?.basicInfo ?? {};
  const edu = profile?.education ?? {};
  const skillCats = generated?.skillCategories ?? {};
  const aiProjects = generated?.projects ?? {};
  const aiExp = generated?.experience ?? {};
  const aiAchievements =
    Array.isArray(generated?.achievements) && generated.achievements.length > 0
      ? generated.achievements
      : (profile?.achievements ?? []);
  const resumeSummary = generated?.resumeSummary ?? "";

  const kids = [];

  const sH = (txt) =>
    new Paragraph({
      children: [
        new TextRun({
          text: txt.toUpperCase(),
          bold: true,
          size: 20,
          color: "111827",
        }),
      ],
      spacing: { before: 280, after: 100 },
      border: {
        bottom: {
          color: "E5E7EB",
          size: 4,
          style: BorderStyle.SINGLE,
          space: 4,
        },
      },
    });

  // Name
  kids.push(
    new Paragraph({
      children: [
        new TextRun({
          text: info.name ?? "",
          bold: true,
          size: 52,
          color: "111827",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
    }),
  );
  // Title
  kids.push(
    new Paragraph({
      children: [
        new TextRun({ text: info.title ?? "", size: 24, color: "6B7280" }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
    }),
  );
  // Contact
  const contacts = [
    info.location,
    info.email,
    info.github,
    info.linkedin,
  ].filter(Boolean);
  if (contacts.length) {
    kids.push(
      new Paragraph({
        children: contacts.flatMap((c, i) => [
          new TextRun({ text: c, size: 18, color: "6B7280" }),
          ...(i < contacts.length - 1
            ? [new TextRun({ text: "  |  ", size: 18, color: "D1D5DB" })]
            : []),
        ]),
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
    );
  }

  // Summary
  if (resumeSummary) {
    kids.push(sH("Professional Summary"));
    kids.push(
      new Paragraph({
        children: [new TextRun({ text: resumeSummary, size: 19 })],
        spacing: { after: 80 },
      }),
    );
  }

  // Skills
  const catEntries = Object.entries(skillCats).filter(([, l]) => l?.length > 0);
  if (catEntries.length) {
    kids.push(sH("Technical Skills"));
    catEntries.forEach(([cat, list]) => {
      kids.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${cat}: `, bold: true, size: 19 }),
            new TextRun({ text: list.join(", "), size: 19 }),
          ],
          spacing: { after: 60 },
        }),
      );
    });
  } else if (profile.skills?.length) {
    kids.push(sH("Technical Skills"));
    kids.push(
      new Paragraph({
        children: [new TextRun({ text: profile.skills.join(" · "), size: 19 })],
        spacing: { after: 80 },
      }),
    );
  }

  // Experience
  if (profile.experience?.length) {
    kids.push(sH("Work Experience"));
    profile.experience.forEach((exp, i) => {
      const resps = aiExp[String(i)]?.responsibilities ?? [];
      kids.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.role ?? "", bold: true, size: 21 }),
            new TextRun({
              text: `  —  ${exp.company ?? ""}`,
              size: 19,
              color: "6B7280",
            }),
          ],
          spacing: { before: 120, after: 40 },
        }),
      );
      if (exp.type || exp.duration) {
        kids.push(
          new Paragraph({
            children: [
              new TextRun({
                text: [exp.type, exp.duration].filter(Boolean).join(" · "),
                size: 17,
                color: "9CA3AF",
              }),
            ],
            spacing: { after: 60 },
          }),
        );
      }
      resps.forEach((r) =>
        kids.push(
          new Paragraph({
            children: [new TextRun({ text: r, size: 18 })],
            bullet: { level: 0 },
            spacing: { after: 40 },
          }),
        ),
      );
      if (!resps.length && exp.responsibilities) {
        kids.push(
          new Paragraph({
            children: [new TextRun({ text: exp.responsibilities, size: 18 })],
            spacing: { after: 60 },
          }),
        );
      }
    });
  }

  // Projects
  if (profile.projects?.length) {
    kids.push(sH("Projects"));
    profile.projects.slice(0, 4).forEach((p, i) => {
      const ai = aiProjects[String(i)] ?? {};
      const desc = ai.description ?? p.description ?? "";
      const hls = ai.highlights ?? [];
      kids.push(
        new Paragraph({
          children: [
            new TextRun({ text: p.name ?? "", bold: true, size: 21 }),
            ...(p.techStack?.length
              ? [
                  new TextRun({
                    text: `  |  ${p.techStack.slice(0, 4).join(", ")}`,
                    size: 17,
                    color: "9CA3AF",
                  }),
                ]
              : []),
          ],
          spacing: { before: 120, after: 40 },
        }),
      );
      if (desc)
        kids.push(
          new Paragraph({
            children: [new TextRun({ text: desc, size: 18 })],
            spacing: { after: 40 },
          }),
        );
      hls.forEach((h) =>
        kids.push(
          new Paragraph({
            children: [new TextRun({ text: h, size: 18 })],
            bullet: { level: 0 },
            spacing: { after: 40 },
          }),
        ),
      );
    });
  }

  // Education
  if (edu.degree) {
    kids.push(sH("Education"));
    kids.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${edu.degree} in ${edu.branch}`,
            bold: true,
            size: 21,
          }),
        ],
        spacing: { before: 80, after: 40 },
      }),
    );
    kids.push(
      new Paragraph({
        children: [
          new TextRun({
            text: [edu.college, edu.year, edu.cgpa ? `CGPA: ${edu.cgpa}` : ""]
              .filter(Boolean)
              .join(" · "),
            size: 18,
            color: "6B7280",
          }),
        ],
        spacing: { after: 60 },
      }),
    );
  }

  // Achievements
  if (aiAchievements.length) {
    kids.push(sH("Achievements & Certifications"));
    aiAchievements.forEach((a) =>
      kids.push(
        new Paragraph({
          children: [new TextRun({ text: a, size: 18 })],
          bullet: { level: 0 },
          spacing: { after: 50 },
        }),
      ),
    );
  }

  const doc = new Document({
    creator: "DevPortfolio AI",
    sections: [
      {
        properties: {
          page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } },
        },
        children: kids,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const safeName = (info.name ?? "resume").replace(/\s+/g, "_");
  triggerDownload(blob, `${safeName}_Resume.docx`);
  return true;
};
