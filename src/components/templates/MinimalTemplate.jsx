import cn from '@/utils/cn'
import { toTitleCase, normalizeRole, buildFullDegree, normalizeUniversity } from '@/utils/normalize'
// ── Helpers ──────────────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <section className="mb-9">
      <h2 className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 mb-4">
        {title}
      </h2>
      {children}
    </section>
  )
}

function ExternalLink({ href, children, className }) {
  return (
    <a
      href={href.startsWith('http') ? href : `https://${href}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('hover:opacity-75 transition-opacity', className)}
    >
      {children}
    </a>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────
const MinimalTemplate = ({ profile, generated }) => {
  const info   = profile?.basicInfo  ?? {}
  const edu    = profile?.education  ?? {}
  const skills = profile?.skills     ?? []

  const projects     = Array.isArray(profile?.projects)     ? profile.projects     : []
  const experience   = Array.isArray(profile?.experience)   ? profile.experience   : []
  const achievements = Array.isArray(profile?.achievements) ? profile.achievements : []

  // AI-enhanced fields (fall back to raw data if not available)
  const tagline = generated?.tagline ?? normalizeRole(info.title ?? '') ?? ''
  const about        = generated?.about   ?? profile?.about?.summary ?? ''
  const skillCats    = generated?.skillCategories ?? null
  const aiProjects   = generated?.projects   ?? {}
  const aiExperience = generated?.experience ?? {}
  const aiAchievements = Array.isArray(generated?.achievements) && generated.achievements.length > 0
    ? generated.achievements
    : achievements

  const getProject  = (i) => aiProjects[String(i)] ?? {}
  const getExpResp  = (i) => aiExperience[String(i)]?.responsibilities ?? []

  return (
    <div className="bg-white dark:bg-zinc-950 p-5 sm:p-8 lg:p-14 rounded-2xl font-sans min-h-[600px]">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-8 mb-10">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-1.5">
          {toTitleCase(info.name || 'Your Name')}
        </h1>
        <p className="text-base font-medium text-zinc-500 dark:text-zinc-400 mb-5">
          {tagline}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-zinc-400">
          {info.location && <span>{toTitleCase(info.location)}</span>}
          {info.email    && <span>{info.email}</span>}
          {info.github   && <ExternalLink href={info.github} className="text-zinc-400">{info.github}</ExternalLink>}
          {info.linkedin && <ExternalLink href={info.linkedin} className="text-zinc-400">LinkedIn</ExternalLink>}
        </div>
      </div>

      {/* ── About ──────────────────────────────────────────────────────── */}
      {about && (
        <Section title="About">
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
            {about}
          </p>
        </Section>
      )}

      {/* ── Skills ─────────────────────────────────────────────────────── */}
      {(skills.length > 0 || skillCats) && (
        <Section title="Skills">
          {skillCats && Object.keys(skillCats).some(k => skillCats[k]?.length > 0) ? (
            <div className="space-y-2.5">
              {Object.entries(skillCats)
                .filter(([, list]) => list?.length > 0)
                .map(([cat, list]) => (
                  <div key={cat} className="flex gap-3 items-start flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 w-24 flex-shrink-0 mt-1.5">
                      {cat}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {list.map(s => (
                        <span key={s} className="px-2.5 py-0.5 border border-zinc-200 dark:border-zinc-700 rounded-full text-xs text-zinc-600 dark:text-zinc-400">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s} className="px-2.5 py-1 border border-zinc-200 dark:border-zinc-700 rounded-full text-xs text-zinc-600 dark:text-zinc-400">
                  {s}
                </span>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* ── Projects ───────────────────────────────────────────────────── */}
      {projects.length > 0 && (
        <Section title="Projects">
          <div className="space-y-6">
            {projects.slice(0, 4).map((p, i) => {
              const ai = getProject(i)
              const desc = ai.description ?? p.description ?? ''
              const highlights = ai.highlights ?? []
              return (
                <div key={i} className="border-l-2 border-zinc-200 dark:border-zinc-700 pl-5">
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{toTitleCase(p.name)}</h3>
                    {p.techStack?.length > 0 && (
                      <span className="text-xs text-zinc-400 flex-shrink-0 text-right">
                        {p.techStack.slice(0, 4).join(' · ')}
                      </span>
                    )}
                  </div>
                  {desc && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-1.5">
                      {desc}
                    </p>
                  )}
                  {highlights.length > 0 && (
                    <ul className="space-y-0.5">
                      {highlights.map((h, hi) => (
                        <li key={hi} className="text-xs text-zinc-400 flex items-start gap-1.5">
                          <span className="text-brand-500 flex-shrink-0 mt-0.5 font-bold">→</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                  {p.github && (
                    <ExternalLink href={p.github} className="text-xs text-brand-500 mt-1 inline-block">
                      {p.github}
                    </ExternalLink>
                  )}
                </div>
              )
            })}
          </div>
        </Section>
      )}

      {/* ── Experience ─────────────────────────────────────────────────── */}
      {experience.length > 0 && (
        <Section title="Experience">
          <div className="space-y-6">
            {experience.map((exp, i) => {
              const resps = getExpResp(i)
              return (
                <div key={i}>
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{normalizeRole(exp.role ?? '')}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {exp.company} · {exp.type}{exp.duration ? ` · ${exp.duration}` : ''}
                      </p>
                    </div>
                  </div>
                  {resps.length > 0 ? (
                    <ul className="mt-1.5 space-y-1">
                      {resps.map((r, ri) => (
                        <li key={ri} className="text-sm text-zinc-500 dark:text-zinc-400 flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-zinc-400 flex-shrink-0 mt-2" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  ) : exp.responsibilities ? (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{exp.responsibilities}</p>
                  ) : null}
                </div>
              )
            })}
          </div>
        </Section>
      )}

      {/* ── Education ──────────────────────────────────────────────────────── */}
      {edu.degree && (
        <Section title="Education">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              {buildFullDegree(edu.degree, edu.branch)}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              {normalizeUniversity(edu.college)}
              {edu.year ? ` · ${edu.year}` : ''}
              {edu.cgpa ? ` · CGPA: ${edu.cgpa}` : ''}
          </p>
        </Section>
      )}

      {/* ── Achievements ───────────────────────────────────────────────── */}
      {aiAchievements.length > 0 && (
        <Section title="Achievements &amp; Certifications">
          <ul className="space-y-1.5">
            {aiAchievements.slice(0, 6).map((a, i) => (
              <li key={i} className="text-sm text-zinc-500 dark:text-zinc-400 flex items-start gap-2.5">
                <span className="text-amber-500 flex-shrink-0">★</span>
                {a}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── Contact ────────────────────────────────────────────────────── */}
      {(info.email || info.github || info.linkedin) && (
        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-5">
          {info.email && (
            <a href={`mailto:${info.email}`} className="text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:underline">
              {info.email}
            </a>
          )}
          {info.github && (
            <ExternalLink href={info.github} className="text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
              {info.github}
            </ExternalLink>
          )}
          {info.linkedin && (
            <ExternalLink href={info.linkedin} className="text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
              LinkedIn Profile
            </ExternalLink>
          )}
        </div>
      )}

    </div>
  )
}

export default MinimalTemplate