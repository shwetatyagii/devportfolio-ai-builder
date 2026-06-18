import cn from '@/utils/cn'
import { toTitleCase, normalizeRole, buildFullDegree, normalizeUniversity } from '@/utils/normalize'

function ExternalLink({ href, children, className }) {
  return (
    <a
      href={href.startsWith('http') ? href : `https://${href}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('transition-opacity hover:opacity-80', className)}
    >
      {children}
    </a>
  )
}

const ModernTemplate = ({ profile, generated }) => {
  const info   = profile?.basicInfo  ?? {}
  const edu    = profile?.education  ?? {}
  const skills = profile?.skills     ?? []

  const projects     = Array.isArray(profile?.projects)     ? profile.projects     : []
  const experience   = Array.isArray(profile?.experience)   ? profile.experience   : []
  const achievements = Array.isArray(profile?.achievements) ? profile.achievements : []

  const tagline      = generated?.tagline ?? normalizeRole(info.title ?? '') ?? ''
  const about        = generated?.about   ?? profile?.about?.summary ?? ''
  const skillCats    = generated?.skillCategories ?? null
  const aiProjects   = generated?.projects   ?? {}
  const aiExperience = generated?.experience ?? {}
  const aiAchievements = Array.isArray(generated?.achievements) && generated.achievements.length > 0
    ? generated.achievements
    : achievements

  const getProject = (i) => aiProjects[String(i)] ?? {}
  const getExpResp = (i) => aiExperience[String(i)]?.responsibilities ?? []

  return (
    <div className="bg-zinc-950 text-zinc-50 rounded-2xl overflow-hidden font-sans min-h-[600px]">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <div className="relative p-5 sm:p-8 lg:p-10 border-b border-zinc-800">
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-600/15 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-8 left-1/4 w-52 h-52 bg-violet-600/8 blur-[70px] rounded-full pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-400">Open to opportunities</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-1.5">
            <span className="gradient-text">{toTitleCase(info.name || 'Your Name')}</span>
          </h1>
          <p className="text-zinc-400 text-lg mb-5">{tagline}</p>

          <div className="flex flex-wrap gap-2">
            {[
               info.location ? toTitleCase(info.location) : null,
               info.email
             ]
               .filter(Boolean)
               .map(v => (
                 <span
                   key={v}
                   className="text-xs bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-full text-zinc-400"
                 >
                   {v}
                 </span>
             ))}
            {info.github && (
              <ExternalLink href={info.github} className="text-xs bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-full text-zinc-400">
                {info.github}
              </ExternalLink>
            )}
            {info.linkedin && (
              <ExternalLink href={info.linkedin} className="text-xs bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-full text-zinc-400">
                LinkedIn
              </ExternalLink>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Grid ─────────────────────────────────────────────────── */}
      <div className="p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

        {/* Left column */}
        {/* Left column — spans full width if no right-side content */}
             <div className={cn(
               experience.length > 0 || projects.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3',
               'space-y-8'
             )}>

          {/* About */}
          {about && (
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">About</h2>
              <p className="text-sm text-zinc-300 leading-relaxed">{about}</p>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">Projects</h2>
              <div className="space-y-4">
                {projects.slice(0, 4).map((p, i) => {
                  const ai = getProject(i)
                  const desc = ai.description ?? p.description ?? ''
                  const highlights = ai.highlights ?? []
                  return (
                    <div key={i} className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 transition-colors">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-semibold text-zinc-100">{toTitleCase(p.name)}</h3>
                        {p.techStack?.length > 0 && (
                          <span className="text-[11px] text-zinc-500 flex-shrink-0 text-right">
                            {p.techStack.slice(0, 4).join(' · ')}
                          </span>
                        )}
                      </div>
                      {desc && (
                        <p className="text-xs text-zinc-400 leading-relaxed mb-2">{desc}</p>
                      )}
                      {highlights.length > 0 && (
                        <ul className="space-y-0.5 mb-2">
                          {highlights.map((h, hi) => (
                            <li key={hi} className="text-[11px] text-brand-400 flex items-start gap-1.5">
                              <span className="flex-shrink-0 mt-0.5">▸</span> {h}
                            </li>
                          ))}
                        </ul>
                      )}
                      {p.github && (
                        <ExternalLink href={p.github} className="text-[11px] text-zinc-500 hover:text-zinc-300 mt-1 inline-block">
                          {p.github}
                        </ExternalLink>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">Experience</h2>
              <div className="space-y-5">
                {experience.map((exp, i) => {
                  const resps = getExpResp(i)
                  return (
                    <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                      <h3 className="font-semibold text-zinc-100 text-sm">{normalizeRole(exp.role ?? '')}</h3>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {exp.company} · {exp.type}{exp.duration ? ` · ${exp.duration}` : ''}
                      </p>
                      {resps.length > 0 && (
                        <ul className="mt-2.5 space-y-1">
                          {resps.map((r, ri) => (
                            <li key={ri} className="text-xs text-zinc-400 flex items-start gap-1.5">
                              <span className="text-brand-500 flex-shrink-0 mt-0.5">▸</span> {r}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        {/* Right column — only render if there's content */}
          {(skills.length > 0 || edu.degree || aiAchievements.length > 0 || skillCats) && (
        <div className="space-y-7">

          {/* Skills */}
          {(skills.length > 0 || skillCats) && (
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Skills</h2>
              {skillCats && Object.keys(skillCats).some(k => skillCats[k]?.length > 0) ? (
                <div className="space-y-3">
                  {Object.entries(skillCats)
                    .filter(([, list]) => list?.length > 0)
                    .map(([cat, list]) => (
                      <div key={cat}>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 mb-1.5">{cat}</p>
                        <div className="flex flex-wrap gap-1">
                          {list.map(s => (
                            <span key={s} className="px-2 py-0.5 rounded-lg bg-brand-500/10 text-brand-400 text-[11px] font-medium border border-brand-500/20">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {skills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-lg bg-brand-500/10 text-brand-400 text-xs font-medium">
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
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Education</h2>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <p className="font-semibold text-zinc-100 text-sm">
                  {buildFullDegree(edu.degree, edu.branch)}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {normalizeUniversity(edu.college)}
                </p>
                <p className="text-xs text-zinc-600 mt-0.5">
                  {edu.year}{edu.cgpa ? ` · CGPA: ${edu.cgpa}` : ''}
                </p>
              </div>
            </div>
          )}

          {/* Achievements */}
          {aiAchievements.length > 0 && (
            <div>
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">Achievements</h2>
              <ul className="space-y-2">
                {aiAchievements.slice(0, 5).map((a, i) => (
                  <li key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                    <span className="text-amber-400 flex-shrink-0">★</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
 )
}

export default ModernTemplate