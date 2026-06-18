import { toTitleCase, normalizeRole, buildFullDegree, normalizeUniversity } from '@/utils/normalize'

// Named outside component — avoids <a tag stripping in any renderer
function ExtLink({ href, children, className }) {
  const url = href ? (href.startsWith('http') ? href : `https://${href}`) : '#'
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className ?? ''}>
      {children}
    </a>
  )
}

function SideLabel({ children }) {
  return (
    <h2 className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-3 pb-1.5 border-b border-slate-200">
      {children}
    </h2>
  )
}

function MainLabel({ children }) {
  return (
    <h2 className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-3 pb-1.5 border-b border-slate-200">
      {children}
    </h2>
  )
}

const CorporateTemplate = ({ profile, generated }) => {
  const info       = profile?.basicInfo  ?? {}
  const edu        = profile?.education  ?? {}
  const skills     = profile?.skills     ?? []
  const projects   = Array.isArray(profile?.projects)     ? profile.projects     : []
  const experience = Array.isArray(profile?.experience)   ? profile.experience   : []
  const achievements = Array.isArray(profile?.achievements) ? profile.achievements : []

  const about          = generated?.about          ?? profile?.about?.summary ?? ''
  const skillCats      = generated?.skillCategories ?? null
  const aiProjects     = generated?.projects        ?? {}
  const aiExperience   = generated?.experience      ?? {}
  const aiAchievements =
    Array.isArray(generated?.achievements) && generated.achievements.length > 0
      ? generated.achievements
      : achievements

  return (
    <div className="bg-white text-zinc-900 font-sans rounded-2xl overflow-hidden min-h-[600px]">

      {/* ── Dark header banner ─────────────────────────────────────── */}
      <div className="bg-slate-800 px-7 py-7 corporate-header">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-0.5">
          {toTitleCase(info.name || 'Your Name')}
        </h1>
        <p className="text-slate-300 text-base font-medium mb-4">
          {normalizeRole(info.title ?? '')}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-400">
          {info.location && <span>📍 {toTitleCase(info.location)}</span>}
          {info.email    && <span>✉ {info.email}</span>}
          {info.github   && (
            <ExtLink href={info.github} className="text-slate-400 hover:text-white">
              🔗 {info.github}
            </ExtLink>
          )}
          {info.linkedin && (
            <ExtLink href={info.linkedin} className="text-slate-400 hover:text-white">
              💼 LinkedIn
            </ExtLink>
          )}
        </div>
      </div>

        {/* ── Two-column layout ───────────────────────────────────────── */}
         <div className="corporate-layout" style={{ display: 'flex', minHeight: 500 }}>

              {/* ── Left sidebar ── */}
              <div
                 className="bg-slate-50 border-r border-slate-100 p-6 space-y-6 corporate-sidebar"
                   style={{ width: 260, flexShrink: 0 }}
            >

          {/* Skills */}
          {(skills.length > 0 || skillCats) && (
            <div>
              <SideLabel>Technical Skills</SideLabel>
              {skillCats && Object.values(skillCats).some(l => l?.length > 0) ? (
                <div className="space-y-3">
                  {Object.entries(skillCats)
                    .filter(([, list]) => list?.length > 0)
                    .map(([cat, list]) => (
                      <div key={cat}>
                        <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                          {cat}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {list.map(s => (
                            <span key={s} className="px-1.5 py-0.5 text-[10px] bg-slate-200 text-slate-700 rounded font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {skills.map(s => (
                    <span key={s} className="px-1.5 py-0.5 text-[10px] bg-slate-200 text-slate-700 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Education */}
          {edu.degree && (
            <div>
              <SideLabel>Education</SideLabel>
              <p className="font-semibold text-xs text-slate-800 leading-snug">
                {buildFullDegree(edu.degree, edu.branch)}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">{normalizeUniversity(edu.college)}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {edu.year}{edu.cgpa ? ` · CGPA: ${edu.cgpa}` : ''}
              </p>
            </div>
          )}

          {/* Achievements */}
          {aiAchievements.length > 0 && (
            <div>
              <SideLabel>Achievements</SideLabel>
              <ul className="space-y-1.5">
                {aiAchievements.slice(0, 5).map((a, i) => (
                  <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                    <span className="text-amber-500 flex-shrink-0 mt-0.5">★</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── Right main content ────────────────────────────────────── */}
        <div className="p-6 space-y-6 corporate-main" style={{ flex: 1, minWidth: 0 }}>

          {/* About */}
          {about && (
            <div>
              <MainLabel>Professional Summary</MainLabel>
              <p className="text-sm text-slate-700 leading-relaxed">{about}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <MainLabel>Experience</MainLabel>
              <div className="space-y-4">
                {experience.map((exp, i) => {
                  const resps = aiExperience[String(i)]?.responsibilities ?? []
                  return (
                    <div key={i}>
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <div>
                          <p className="font-semibold text-sm text-slate-800">{normalizeRole(exp.role ?? '')}</p>
                          <p className="text-xs text-slate-500">{exp.company} · {exp.type}</p>
                        </div>
                        <p className="text-xs text-slate-400 flex-shrink-0">{exp.duration}</p>
                      </div>
                      {resps.length > 0 ? (
                        <ul className="mt-1 space-y-0.5 ml-3">
                          {resps.map((r, ri) => (
                            <li key={ri} className="text-xs text-slate-600 flex items-start gap-1.5">
                              <span className="text-blue-500 flex-shrink-0 mt-0.5">▸</span> {r}
                            </li>
                          ))}
                        </ul>
                      ) : exp.responsibilities ? (
                        <p className="text-xs text-slate-600 mt-1">{exp.responsibilities}</p>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <MainLabel>Projects</MainLabel>
              <div className="space-y-4">
                {projects.slice(0, 4).map((p, i) => {
                  const ai   = aiProjects[String(i)] ?? {}
                  const desc = ai.description ?? p.description ?? ''
                  const highlights = ai.highlights ?? []
                  return (
                    <div key={i}>
                      <div className="flex items-start justify-between gap-4 mb-0.5">
                        <p className="font-semibold text-sm text-slate-800">{toTitleCase(p.name)}</p>
                        {p.techStack?.length > 0 && (
                          <span className="text-[10px] text-slate-400 flex-shrink-0">
                            {p.techStack.slice(0, 3).join(' · ')}
                          </span>
                        )}
                      </div>
                      {desc && (
                        <p className="text-xs text-slate-600 leading-relaxed mb-1">{desc}</p>
                      )}
                      {highlights.map((h, hi) => (
                        <p key={hi} className="text-xs text-slate-500 flex items-start gap-1.5">
                          <span className="text-blue-400 flex-shrink-0">▸</span> {h}
                        </p>
                      ))}
                      {p.github && (
                        <ExtLink href={p.github} className="text-[10px] text-blue-600 hover:underline mt-0.5 inline-block">
                          {p.github}
                        </ExtLink>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Contact CTA */}
          {(info.email || info.github || info.linkedin) && (
            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-4">
              {info.email && (
                <a href={`mailto:${info.email}`} className="text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:underline">
                  {info.email}
                </a>
              )}
              {info.github && (
                <ExtLink href={info.github} className="text-xs text-slate-500 hover:text-slate-800">
                  {info.github}
                </ExtLink>
              )}
              {info.linkedin && (
                <ExtLink href={info.linkedin} className="text-xs text-slate-500 hover:text-slate-800">
                  LinkedIn Profile
                </ExtLink>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CorporateTemplate