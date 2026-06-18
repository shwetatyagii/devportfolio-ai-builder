// ─── Academic degree expansion ────────────────────────────────────────────────
const DEGREE_MAP = {
  btech: "Bachelor of Technology (B.Tech)",
  "b.tech": "Bachelor of Technology (B.Tech)",
  be: "Bachelor of Engineering (B.E.)",
  "b.e": "Bachelor of Engineering (B.E.)",
  bca: "Bachelor of Computer Applications (BCA)",
  bsc: "Bachelor of Science (B.Sc.)",
  "b.sc": "Bachelor of Science (B.Sc.)",
  bcom: "Bachelor of Commerce (B.Com)",
  ba: "Bachelor of Arts (B.A.)",
  mtech: "Master of Technology (M.Tech)",
  "m.tech": "Master of Technology (M.Tech)",
  me: "Master of Engineering (M.E.)",
  mca: "Master of Computer Applications (MCA)",
  mba: "Master of Business Administration (MBA)",
  msc: "Master of Science (M.Sc.)",
  ma: "Master of Arts (M.A.)",
  phd: "Doctor of Philosophy (Ph.D.)",
};

// ─── Branch / major expansion ─────────────────────────────────────────────────
const BRANCH_MAP = {
  cse: "Computer Science & Engineering",
  cs: "Computer Science",
  it: "Information Technology",
  ece: "Electronics & Communication Engineering",
  eee: "Electrical & Electronics Engineering",
  ee: "Electrical Engineering",
  me: "Mechanical Engineering",
  ce: "Civil Engineering",
  ai: "Artificial Intelligence",
  ml: "Machine Learning",
  ds: "Data Science",
  aids: "AI & Data Science",
  csit: "Computer Science & IT",
};

// ─── Role title expansion ──────────────────────────────────────────────────────
const ROLE_MAP = {
  sde: "Software Development Engineer",
  sde1: "Software Development Engineer I",
  sde2: "Software Development Engineer II",
  swe: "Software Engineer",
  sse: "Senior Software Engineer",
  ase: "Associate Software Engineer",
  fsd: "Full Stack Developer",
  be: "Backend Engineer",
  fe: "Frontend Engineer",
  fs: "Full Stack Developer",
  dev: "Software Developer",
  intern: "Software Engineer Intern",
  trainee: "Software Trainee",
  sdet: "Software Development Engineer in Test",
  qa: "Quality Assurance Engineer",
  devops: "DevOps Engineer",
  ml: "Machine Learning Engineer",
  de: "Data Engineer",
  da: "Data Analyst",
  ds: "Data Scientist",
  pm: "Product Manager",
};

// ─── Skill aliases ────────────────────────────────────────────────────────────
const SKILL_ALIASES = {
  js: "JavaScript",
  ts: "TypeScript",
  reactjs: "React",
  "react.js": "React",
  nodejs: "Node.js",
  "node.js": "Node.js",
  node: "Node.js",
  spring: "Spring Boot",
  springboot: "Spring Boot",
  "spring-boot": "Spring Boot",
  mongo: "MongoDB",
  postgres: "PostgreSQL",
  pg: "PostgreSQL",
  mysql: "MySQL",
  html5: "HTML",
  css3: "CSS",
  scss: "SCSS/Sass",
  sass: "SCSS/Sass",
  tailwind: "Tailwind CSS",
  bootstrap5: "Bootstrap",
  redux: "Redux",
  nextjs: "Next.js",
  "next.js": "Next.js",
  vuejs: "Vue.js",
  "vue.js": "Vue.js",
  angular: "Angular",
  express: "Express.js",
  expressjs: "Express.js",
  java17: "Java",
  java11: "Java",
  java8: "Java",
  git: "Git",
  github: "GitHub",
  docker: "Docker",
  k8s: "Kubernetes",
  aws: "AWS",
  gcp: "GCP",
  azure: "Azure",
  dsa: "Data Structures & Algorithms",
  "data structures": "Data Structures & Algorithms",
  oop: "Object-Oriented Programming",
  dbms: "DBMS",
  "operating systems": "OS",
};

// ─── Skill category rules ─────────────────────────────────────────────────────
const CATEGORY_RULES = [
  [
    "Languages",
    /^(java|javascript|typescript|python|c\+\+|c#|kotlin|swift|go|php|ruby|rust|scala|r|matlab)$/i,
  ],
  [
    "Frontend",
    /^(react|angular|vue|next\.js|html|css|tailwind|bootstrap|redux|sass|svelte|jquery|figma|webpack|vite)$/i,
  ],
  [
    "Backend",
    /^(spring boot|spring|node\.js|express\.js|django|flask|fastapi|hibernate|jpa|servlet|jdbc|\.net|rails|laravel|asp\.net)$/i,
  ],
  [
    "Database",
    /^(mysql|postgresql|mongodb|redis|sqlite|oracle|firebase|supabase|dynamodb|cassandra|mariadb)$/i,
  ],
  [
    "DevOps & Tools",
    /^(git|github|docker|kubernetes|aws|gcp|azure|ci\/cd|jenkins|linux|bash|maven|gradle|nginx|webpack|vite|postman|figma|jira|vs code|intellij)$/i,
  ],
  [
    "CS Fundamentals",
    /^(data structures & algorithms|object-oriented programming|dbms|os|cn|operating systems|computer networks|algorithms)$/i,
  ],
];

// ─── Public normalization functions ──────────────────────────────────────────

export const normalizeDegree = (degree = "") => {
  const key = degree.toLowerCase().replace(/[\s\._\-\/]/g, "");
  return DEGREE_MAP[key] ?? degree;
};

export const normalizeBranch = (branch = "") => {
  const key = branch.toLowerCase().replace(/[\s\._\-\/]/g, "");
  return BRANCH_MAP[key] ?? branch;
};

// ─── Common role typos ────────────────────────────────────────────────────────
const ROLE_TYPOS = {
  stck: "stack",
  devloper: "developer",
  develper: "developer",
  enginner: "engineer",
  engneer: "engineer",
  programer: "programmer",
  manageer: "manager",
  frontent: "frontend",
  forntend: "frontend",
  bakend: "backend",
  fullstck: "full stack",
  fullstack: "full stack",
  "java full stck": "java full stack developer",
};

export const normalizeRole = (role = "") => {
  if (!role) return "";
  let corrected = role.toLowerCase().trim();

  // Apply known typo corrections
  Object.entries(ROLE_TYPOS).forEach(([typo, fix]) => {
    corrected = corrected.replace(new RegExp(`\\b${typo}\\b`, "gi"), fix);
  });

  // Check abbreviation map (strip spaces for lookup)
  const key = corrected.replace(/[\s\._\-]/g, "");
  if (ROLE_MAP[key]) return ROLE_MAP[key];

  // Return title-cased corrected version
  return toTitleCase(corrected);
};

export const normalizeSkill = (skill = "") => {
  const key = skill
    .toLowerCase()
    .trim()
    .replace(/[\s\._\-]/g, "");
  return SKILL_ALIASES[key] ?? skill.trim();
};

export const categorizeSkill = (skill = "") => {
  const normalized = normalizeSkill(skill);
  for (const [cat, regex] of CATEGORY_RULES) {
    if (regex.test(normalized.trim())) return cat;
  }
  return "Others";
};

export const buildFullDegree = (degree = "", branch = "") => {
  const d = normalizeDegree(degree);
  const b = normalizeBranch(branch);
  if (!d && !b) return "";
  if (!b) return d;
  if (!d) return b;
  return `${d} in ${b}`;
};

// Tech acronyms that should print ALL CAPS
const FORCE_UPPER_WORDS = new Set([
  "mern",
  "mean",
  "lamp",
  "html",
  "css",
  "php",
  "sql",
  "nosql",
  "api",
  "rest",
  "crud",
  "ui",
  "ux",
  "ai",
  "ml",
  "aws",
  "gcp",
  "azure",
  "ios",
  "sde",
  "oop",
  "dbms",
  "dsa",
  "os",
  "cn",
  "json",
  "xml",
  "jwt",
  "http",
  "https",
  "ci",
  "cd",
  "git",
]);

export const toTitleCase = (str = "") =>
  str.trim().replace(/\b\w+/g, (word) => {
    const lower = word.toLowerCase();
    if (FORCE_UPPER_WORDS.has(lower)) return lower.toUpperCase();
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

// ─── University name normalization ────────────────────────────────────────────
// Known abbreviations that should be ALL-CAPS
const KNOWN_UPPER_UNIS = new Set([
  "kuk",
  "iit",
  "nit",
  "iiit",
  "du",
  "bits",
  "vit",
  "srm",
  "lpu",
  "dtu",
  "nsut",
  "ignou",
  "mdu",
  "hpu",
  "ptu",
  "gndu",
  "hbtu",
  "uiet",
  "aktu",
  "ggsipu",
]);

export const normalizeUniversity = (name = "") => {
  if (!name) return "";
  return name
    .trim()
    .split(/\s+/)
    .map((word) => {
      const lower = word.toLowerCase().replace(/[^a-z]/g, "");
      return KNOWN_UPPER_UNIS.has(lower)
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

// ─── URL normalization ────────────────────────────────────────────────────────
export const normalizeUrl = (url = "") => {
  if (!url) return "";
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
    return trimmed;
  return `https://${trimmed}`;
};
