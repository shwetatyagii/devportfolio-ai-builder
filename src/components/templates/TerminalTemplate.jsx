import { toTitleCase, normalizeRole, buildFullDegree, normalizeUniversity } from '@/utils/normalize'

function ExtLink({ href, children, className }) {
  const url = href ? (href.startsWith('http') ? href : `https://${href}`) : '#'
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className ?? ''}>
      {children}
    </a>
  )
}

const Prompt = ({ cmd }) => (
  <p className="text-[11px] mb-2.5 font-mono">
    <span className="text-[#a6e3a1]">➜</span>{' '}
    <span className="text-[#89b4fa]">~/portfolio</span>{' '}
    <span className="text-[#6c7086]">{cmd}</span>
  </p>
)

const TerminalTemplate = ({ profile, generated }) => {
  const info       = profile?.basicInfo  ?? {}
  const edu        = profile?.education  ?? {}
  const skills     = profile?.skills     ?? []
  const projects   = Array.isArray(profile?.projects)     ? profile.projects     : []
  const experience = Array.isArray(profile?.experience)   ? profile.experience   : []
  const achievements = Array.isArray(profile?.achievements) ? profile.achievements : []

  const about          = generated?.about          ?? profile?.about?.summary ?? ''
  const tagline        = generated?.tagline        ?? ''
  const skillCats      = generated?.skillCategories ?? null
  const aiProjects     = generated?.projects        ?? {}
  const aiExperience   = generated?.experience      ?? {}
  const aiAchievements =
    Array.isArray(generated?.achievements) && generated.achievements.length > 0
      ? generated.achievements
      : achievements

  return (
    <div
      className="rounded-2xl overflow-hidden font-mono min-h-[600px]"
      style={{ background: '#1e1e2e', color: '#cdd6f4' }}
    >

      {/* ── Terminal title bar ──────────────────────────────────────── */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ background: '#181825', borderColor: '#313244' }}
      >
        <span className="w-3 h-3 rounded-full" style={{ background: '#f38ba8' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#fab387' }} />
        <span className="w-3 h-3 rounded-full" style={{ background: '#a6e3a1' }} />
        <span className="ml-3 text-[11px]" style={{ color: '#6c7086' }}>
          {(info.name ?? 'developer').toLowerCase().replace(/\s+/g, '-')}.portfolio — zsh
        </span>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded" style={{ background: '#313244', color: '#a6e3a1' }}>
          ● LIVE
        </span>
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="p-6 sm:p-8 space-y-7">

        {/* Identity block */}
        <div>
          <Prompt cmd="cat profile.json" />
          <div className="rounded-xl border p-5" style={{ background: '#181825', borderColor: '#313244' }}>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{toTitleCase(info.name || 'Your Name')}</h1>
            <p className="text-sm font-medium mb-3" style={{ color: '#cba6f7' }}>
              {tagline || normalizeRole(info.title ?? '')}
            </p>
            <div className="flex flex-wrap gap-2">
              {info.location && (
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{ background: '#313244', color: '#cdd6f4' }}
                >
                  📍 {toTitleCase(info.location)}
                </span>
              )}
              {info.email && (
                <a href={`mailto:${info.email}`} className="text-xs px-2 py-0.5 rounded" style={{ background: '#313244', color: '#a6e3a1' }}>
                  {info.email}
                </a>
              )}
              {info.github && (
                <ExtLink href={info.github} className="text-xs px-2 py-0.5 rounded" style={{ background: '#313244', color: '#89dceb' }}>
                  {info.github}
                </ExtLink>
              )}
              {info.linkedin && (
                <ExtLink href={info.linkedin} className="text-xs px-2 py-0.5 rounded" style={{ background: '#313244', color: '#89b4fa' }}>
                  LinkedIn
                </ExtLink>
              )}
            </div>
          </div>
        </div>

        {/* About */}
        {about && (
          <div>
            <Prompt cmd="cat about.txt" />
            <div className="border-l-2 pl-4" style={{ borderColor: '#cba6f7' }}>
              <p className="text-sm leading-relaxed" style={{ color: '#cdd6f4' }}>{about}</p>
            </div>
          </div>
        )}

        {/* Skills */}
        {(skills.length > 0 || skillCats) && (
          <div>
            <Prompt cmd="ls skills/ --group" />
            {skillCats && Object.values(skillCats).some(l => l?.length > 0) ? (
              <div className="space-y-2.5">
                {Object.entries(skillCats)
                  .filter(([, list]) => list?.length > 0)
                  .map(([cat, list]) => (
                    <div key={cat} className="flex items-start gap-3 flex-wrap">
                      <span className="text-[10px] font-bold w-28 flex-shrink-0 mt-1" style={{ color: '#f38ba8' }}>
                        {cat.toLowerCase()}:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {list.map(s => (
                          <span key={s} className="text-[11px] px-2 py-0.5 rounded" style={{ background: '#313244', color: '#a6e3a1' }}>
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
                  <span key={s} className="text-[11px] px-2 py-0.5 rounded" style={{ background: '#313244', color: '#a6e3a1' }}>
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <Prompt cmd="ls projects/ -la" />
            <div className="space-y-3">
              {projects.slice(0, 4).map((p, i) => {
                const ai   = aiProjects[String(i)] ?? {}
                const desc = ai.description ?? p.description ?? ''
                const highlights = ai.highlights ?? []
                return (
                  <div key={i} className="rounded-xl border p-4 transition-colors" style={{ background: '#181825', borderColor: '#313244' }}>
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h3 className="font-bold text-sm" style={{ color: '#cba6f7' }}>{toTitleCase(p.name)}</h3>
                      {p.techStack?.length > 0 && (
                        <span className="text-[10px] flex-shrink-0" style={{ color: '#6c7086' }}>
                          [{p.techStack.slice(0, 3).join(', ')}]
                        </span>
                      )}
                    </div>
                    {desc && (
                      <p className="text-xs leading-relaxed mb-1.5" style={{ color: '#bac2de' }}>
                        <span style={{ color: '#6c7086' }}>// </span>{desc}
                      </p>
                    )}
                    {highlights.map((h, hi) => (
                      <p key={hi} className="text-[11px]" style={{ color: '#a6e3a1' }}>
                        <span style={{ color: '#6c7086' }}>+ </span>{h}
                      </p>
                    ))}
                    {p.github && (
                      <ExtLink href={p.github} className="text-[10px] mt-1.5 inline-block" style={{ color: '#89dceb' }}>
                        $ git clone {p.github}
                      </ExtLink>
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
            <Prompt cmd="cat experience.log" />
            <div className="space-y-4">
              {experience.map((exp, i) => {
                const resps = aiExperience[String(i)]?.responsibilities ?? []
                return (
                  <div key={i} className="border-l-2 pl-4" style={{ borderColor: '#89b4fa' }}>
                    <p className="font-bold text-sm" style={{ color: '#89b4fa' }}>{normalizeRole(exp.role ?? '')}</p>
                    <p className="text-xs mb-1" style={{ color: '#6c7086' }}>
                      {exp.company} · {exp.type}{exp.duration ? ` · ${exp.duration}` : ''}
                    </p>
                    {resps.map((r, ri) => (
                      <p key={ri} className="text-xs flex items-start gap-1.5" style={{ color: '#cdd6f4' }}>
                        <span style={{ color: '#a6e3a1' }} className="flex-shrink-0">→</span> {r}
                      </p>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Education */}
        {edu.degree && (
          <div>
            <Prompt cmd="cat education.json" />
            <div className="rounded-xl border p-4" style={{ background: '#181825', borderColor: '#313244' }}>
              <p className="font-semibold text-sm" style={{ color: '#f9e2af' }}>
                {buildFullDegree(edu.degree, edu.branch)}
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#6c7086' }}>{normalizeUniversity(edu.college)}</p>
              <p className="text-xs mt-0.5" style={{ color: '#6c7086' }}>
                {edu.year}{edu.cgpa ? ` | CGPA: ${edu.cgpa}` : ''}
              </p>
            </div>
          </div>
        )}

        {/* Achievements */}
        {aiAchievements.length > 0 && (
          <div>
            <Prompt cmd="cat achievements.log" />
            <ul className="space-y-1.5">
              {aiAchievements.slice(0, 5).map((a, i) => (
                <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: '#cdd6f4' }}>
                  <span style={{ color: '#f9e2af' }} className="flex-shrink-0 font-mono">[★]</span> {a}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default TerminalTemplate