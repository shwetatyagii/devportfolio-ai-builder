import CopyButton from './CopyButton'
import { toTitleCase, normalizeRole, buildFullDegree, normalizeUniversity } from '@/utils/normalize'

const Divider = () => (
  <hr className="border-zinc-200 dark:border-zinc-700 my-5" />
)

const SectionTitle = ({ children }) => (
  <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
    {children}
  </h2>
)

const ResumePreview = ({ profile, generated }) => {
  const info = profile?.basicInfo ?? {}
  const edu  = profile?.education  ?? {}

  // AI-enhanced data
  const generatedProjects  = generated?.projects  ?? {}
  const generatedExperience = generated?.experience ?? {}
  const aiAchievements = Array.isArray(generated?.achievements) && generated.achievements.length > 0
    ? generated.achievements
    : profile?.achievements ?? []

  const getProjectDesc = (i) =>
    generatedProjects[String(i)]?.description ?? profile?.projects?.[i]?.description ?? ''

  const getProjectHighlights = (i) =>
    generatedProjects[String(i)]?.highlights ?? []

  const getExpResponsibilities = (i) =>
    generatedExperience[String(i)]?.responsibilities ?? []

  // ── Plain-text for clipboard (uses AI descriptions) ──────────────────────
  const plainText = [
    info.name?.toUpperCase(),
    info.title,
    [info.location, info.email, info.github, info.linkedin].filter(Boolean).join(' | '),
    '',
    'PROFESSIONAL SUMMARY',
    generated?.resumeSummary ?? '',
    '',
    'TECHNICAL SKILLS',
    profile?.skills?.join(' · ') ?? '',
    '',
    ...(profile?.projects?.length > 0 ? [
      'PROJECTS',
      ...(profile.projects.slice(0, 4).flatMap((p, i) => {
        const desc = getProjectDesc(i)
        const highlights = getProjectHighlights(i)
        return [
          p.name + (p.github ? `  |  ${p.github}` : ''),
          desc,
          highlights.length > 0 ? highlights.map(h => `  • ${h}`).join('\n') : '',
          `Stack: ${(p.techStack ?? []).join(', ')}`,
          '',
        ].filter(l => l !== '' || l === '')
      })),
    ] : []),
    ...(profile?.experience?.length > 0 ? [
      'WORK EXPERIENCE',
      ...(profile.experience.flatMap((exp, i) => {
        const resps = getExpResponsibilities(i)
        return [
          `${exp.role} | ${exp.company} | ${exp.type}${exp.duration ? ` | ${exp.duration}` : ''}`,
          ...(resps.length > 0 ? resps.map(r => `  • ${r}`) : [exp.responsibilities ?? '']),
          '',
        ]
      })),
    ] : []),
    ...(edu.degree ? [
      'EDUCATION',
      `${edu.degree} in ${edu.branch}`,
      `${edu.college} · ${edu.year}${edu.cgpa ? ` · CGPA: ${edu.cgpa}` : ''}`,
      '',
    ] : []),
    ...(aiAchievements.length > 0 ? [
      'ACHIEVEMENTS & CERTIFICATIONS',
      ...aiAchievements.map(a => `• ${a}`),
    ] : []),
  ].join('\n')

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          Resume — ATS Friendly
        </h2>
        <CopyButton text={plainText} label="Copy Resume Text" />
      </div>

      {/* Resume card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-10 font-['Georgia',_serif]">

        {/* Name + contact header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight uppercase">
            {info.name || 'Your Name'}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
            {normalizeRole(info.title) || 'Your Title'}
         </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            {info.location && <span>{toTitleCase(info.location)}</span>}
            {info.email    && <span>{info.email}</span>}
            {info.github   && <span>{info.github}</span>}
            {info.linkedin && <span>{info.linkedin}</span>}
          </div>
        </div>

        <Divider />

        {/* Professional Summary */}
        {generated?.resumeSummary && (
          <>
            <SectionTitle>Professional Summary</SectionTitle>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5">
              {generated.resumeSummary}
            </p>
            <Divider />
          </>
        )}

        {/* Technical Skills — categorized if AI provided, flat otherwise */}
        {profile?.skills?.length > 0 && (
          <>
            <SectionTitle>Technical Skills</SectionTitle>
            {generated?.skillCategories &&
             Object.values(generated.skillCategories).some(v => v?.length > 0) ? (
              <div className="space-y-1.5 mb-5">
                {Object.entries(generated.skillCategories)
                  .filter(([, list]) => list?.length > 0)
                  .map(([cat, list]) => (
                    <div key={cat} className="flex gap-2 text-sm">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300 w-36 flex-shrink-0">
                        {cat}:
                      </span>
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {list.join(', ')}
                      </span>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-5 leading-relaxed">
                {profile.skills.join(' · ')}
              </p>
            )}
            <Divider />
          </>
        )}

        {/* Work Experience */}
        {profile?.experience?.length > 0 && (
          <>
            <SectionTitle>Work Experience</SectionTitle>
            <div className="space-y-5 mb-5">
              {profile.experience.map((exp, i) => {
                const resps = getExpResponsibilities(i)
                return (
                  <div key={i}>
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">{normalizeRole(exp.role ?? '')}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {exp.company} · {exp.type}
                        </p>
                      </div>
                      <p className="text-xs text-zinc-400 flex-shrink-0">{exp.duration}</p>
                    </div>
                    {resps.length > 0 ? (
                      <ul className="mt-1.5 space-y-1">
                        {resps.map((r, ri) => (
                          <li
                            key={ri}
                            className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed flex items-start gap-2"
                          >
                            <span className="text-brand-500 flex-shrink-0 mt-0.5">•</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    ) : exp.responsibilities ? (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                        {exp.responsibilities}
                      </p>
                    ) : null}
                  </div>
                )
              })}
            </div>
            <Divider />
          </>
        )}

        {/* Projects */}
        {profile?.projects?.length > 0 && (
          <>
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-4 mb-5">
              {profile.projects.slice(0, 4).map((p, i) => {
                const desc       = getProjectDesc(i)
                const highlights = getProjectHighlights(i)
                return (
                  <div key={i}>
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">{toTitleCase(p.name ?? '')}</p>
                      {p.github && (
                        <span className="text-xs text-zinc-400 flex-shrink-0">{p.github}</span>
                      )}
                    </div>

                    {/* AI-enhanced description (falls back to user input) */}
                    {desc && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                        {desc}
                      </p>
                    )}

                    {/* AI-generated impact highlights */}
                    {highlights.length > 0 && (
                      <ul className="mt-1 space-y-0.5">
                        {highlights.map((h, hi) => (
                          <li key={hi} className="text-xs text-zinc-500 dark:text-zinc-400 flex items-start gap-1.5">
                            <span className="text-brand-500 flex-shrink-0 mt-0.5">★</span> {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {p.techStack?.length > 0 && (
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Stack: {p.techStack.join(', ')}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
            <Divider />
          </>
        )}

        {/* Education */}
        {edu.degree && (
          <>
            <SectionTitle>Education</SectionTitle>
            <div className="mb-5">
              <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">
                {buildFullDegree(edu.degree, edu.branch)}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {normalizeUniversity(edu.college)} · {edu.year}{edu.cgpa ? ` · CGPA: ${edu.cgpa}` : ''}
              </p>
            </div>
            {aiAchievements.length > 0 && <Divider />}
          </>
        )}

        {/* Achievements — uses AI-filtered list when available */}
        {aiAchievements.length > 0 && (
          <>
            <SectionTitle>Achievements &amp; Certifications</SectionTitle>
            <ul className="space-y-1">
              {aiAchievements.map((a, i) => (
                <li
                  key={i}
                  className="text-sm text-zinc-600 dark:text-zinc-300 flex items-start gap-2"
                >
                  <span className="text-brand-500 flex-shrink-0 mt-0.5">•</span>
                  {a}
                </li>
              ))}
            </ul>
          </>
        )}

      </div>
    </div>
  )
}

export default ResumePreview