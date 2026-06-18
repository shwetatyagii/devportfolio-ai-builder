import { toTitleCase, normalizeRole, buildFullDegree, normalizeUniversity } from '@/utils/normalize'

const GlassCard = ({ children, className = '' }) => (
  <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 ${className}`}>
    {children}
  </div>
)

const GlowChip = ({ children }) => (
  <span className="px-3 py-1 rounded-full text-xs font-medium border bg-brand-500/10 border-brand-500/30 text-brand-300">
    {children}
  </span>
)

const GlassSection = ({ title, children }) => (
  <GlassCard>
    <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40 mb-4">{title}</h2>
    {children}
  </GlassCard>
)

const GlassmorphismTemplate = ({ profile, generated }) => {
  const info = profile?.basicInfo ?? {}
  const edu  = profile?.education ?? {}
  const experience = profile?.experience ?? []

  const aiProjects = generated?.projects ?? {}
  const aiAchievements = generated?.achievements ?? profile?.achievements ?? []

  return (
    <div className="relative bg-[#050510] rounded-2xl overflow-hidden font-sans">

      {/* Background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand-600/20 blur-[100px] rounded-full" />
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-violet-600/15 blur-[80px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-600/10 blur-[90px] rounded-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 space-y-4">

        {/* Hero card */}
        <GlassCard>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-[11px] font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                Available for opportunities
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1 tracking-tight">
                {toTitleCase(info.name || 'Your Name')}
              </h1>
              <p className="text-zinc-400 text-lg">
                {normalizeRole(info.title ?? '') || 'Your Title'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {[
              info.location ? toTitleCase(info.location) : null,
              info.email,
              info.github,
              info.linkedin
            ]
              .filter(Boolean)
              .map((v, i) => (
                <span
                  key={i}
                  className="text-xs text-white/50 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                >
                  {v}
                </span>
            ))}
          </div>
        </GlassCard>

        {/* About */}
        {generated?.about && (
          <GlassSection title="About">
            <p className="text-sm text-white/70 leading-relaxed">{generated.about}</p>
          </GlassSection>
        )}

        {/* Skills */}
        {profile?.skills?.length > 0 && (
          <GlassSection title="Skills">
            <div className="flex flex-wrap gap-2">
              {profile.skills.map(s => <GlowChip key={s}>{s}</GlowChip>)}
            </div>
          </GlassSection>
        )}

        {/* Projects */}
        {profile?.projects?.length > 0 && (
          <GlassSection title="Projects">
            <div className="grid gap-3">

              {profile.projects.slice(0, 4).map((p, i) => {
                const ai = aiProjects[String(i)] ?? {}
                const desc = ai.description ?? p.description ?? ''
                const highlights = ai.highlights ?? []

                return (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/8 rounded-xl p-4 hover:border-white/15 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-white text-sm">
                        {toTitleCase(p.name)}
                      </h3>

                      {p.techStack?.length > 0 && (
                        <span className="text-[10px] text-white/30 flex-shrink-0">
                          {p.techStack.slice(0, 3).join(' · ')}
                        </span>
                      )}
                    </div>

                    {desc && (
                      <p className="text-xs text-white/50 leading-relaxed">
                        {desc}
                      </p>
                    )}

                    {highlights.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {highlights.map((h, hi) => (
                          <li
                            key={hi}
                            className="text-xs flex items-start gap-1.5"
                            style={{ color: 'rgba(255,255,255,0.6)' }}
                          >
                            <span
                              className="flex-shrink-0 mt-0.5"
                              style={{ color: '#a6e3a1' }}
                            >
                              +
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    {p.achievement && (
                      <p className="text-[11px] text-cyan-400 mt-1.5">
                        ✦ {p.achievement}
                      </p>
                    )}
                  </div>
                )
              })}


            </div>
          </GlassSection>
        )}

        {/* Education + Achievements row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {edu.degree && (
            <GlassSection title="Education">
              <p className="font-semibold text-white text-sm">
                {buildFullDegree(edu.degree, edu.branch)}
              </p>

              <p className="text-xs text-white/40 mt-0.5">
                {normalizeUniversity(edu.college)}
              </p>

              <p className="text-xs text-white/30 mt-0.5">
                {edu.year}
                {edu.cgpa ? ` · ${edu.cgpa} CGPA` : ''}
              </p>
            </GlassSection>
          )}

          {aiAchievements.length > 0 && (
            <GlassSection title="Achievements">
              <ul className="space-y-2">
                {aiAchievements.slice(0, 4).map((a, i) => (
                  <li
                    key={i}
                    className="text-xs text-white/50 flex items-start gap-1.5"
                  >
                    <span className="text-cyan-400 flex-shrink-0 mt-0.5">
                      ✦
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </GlassSection>
          )}
          
        </div>

        {/* ── Experience ─────────────────────────────────────────────── */}
         {experience.length > 0 && (
           <div className="mb-7">
             <h2 className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
               Experience
             </h2>
             <div className="space-y-5">
               {experience.map((exp, i) => {
                 const resps = (generated?.experience ?? {})[String(i)]?.responsibilities ?? []
                 return (
                   <div key={i} className="border-l-2 pl-4" style={{ borderColor: 'rgba(167,139,250,0.5)' }}>
                     <p className="font-bold text-sm text-white">{normalizeRole(exp.role ?? '')}</p>
                        <p className="text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                       {exp.company}{exp.type ? ` · ${exp.type}` : ''}{exp.duration ? ` · ${exp.duration}` : ''}
                     </p>
                     {resps.length > 0 && (
                       <ul className="space-y-1">
                         {resps.map((r, ri) => (
                           <li key={ri} className="text-xs flex items-start gap-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                             <span style={{ color: '#a78bfa', flexShrink: 0 }}>▸</span> {r}
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

        {/* ── Contact ──────────────────────────────────────────────── */}
        {(info.email || info.github || info.linkedin) && (
          <div className="pt-5 border-t flex flex-wrap gap-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            {info.email && (
              <a href={`mailto:${info.email}`} className="text-xs hover:underline" style={{ color: 'rgba(167,139,250,0.8)' }}>
                {info.email}
              </a>
            )}
            {info.github && (
              <a href={`https://${info.github}`} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline" style={{ color: 'rgba(167,139,250,0.8)' }}>
                {info.github}
              </a>
            )}
            {info.linkedin && (
              <a href={`https://${info.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline" style={{ color: 'rgba(167,139,250,0.8)' }}>
                LinkedIn
              </a>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default GlassmorphismTemplate