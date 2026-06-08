import { useContext } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { PortfolioContext } from '@/context/PortfolioContext'
import { Badge } from '@/components/ui'

const Section = ({ title, children, filled }) => (
  <div className="flex items-start gap-3 py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
    <div className="mt-0.5">
      {filled
        ? <CheckCircle2 size={15} className="text-emerald-500" />
        : <AlertCircle  size={15} className="text-amber-400"  />
      }
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-0.5">
        {title}
      </p>
      <div className="text-sm text-zinc-700 dark:text-zinc-300">{children}</div>
    </div>
  </div>
)

const ReviewStep = ({ onNext }) => {
  const { state } = useContext(PortfolioContext)
  const p = state.profile

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext({})  // triggers generate in BuilderPage
  }

  return (
    <form id="step-form" onSubmit={handleSubmit}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Review &amp; Generate</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          Review your profile below, then click Generate. AI handles the rest.
        </p>
      </div>

      <div className="dp-card p-4 mb-4">
        <Section title="Basic Info" filled={!!(p.basicInfo?.name && p.basicInfo?.title)}>
          {p.basicInfo?.name
            ? <span><strong>{p.basicInfo.name}</strong> · {p.basicInfo.title} · {p.basicInfo.location}</span>
            : <span className="text-amber-500">Missing name or title — go back to fix.</span>
          }
        </Section>

        <Section title="Summary" filled={!!(p.about?.summary)}>
          {p.about?.summary
            ? <span className="line-clamp-2">{p.about.summary}</span>
            : <span className="text-amber-500">No summary added.</span>
          }
        </Section>

        <Section title="Skills" filled={(p.skills?.length ?? 0) >= 3}>
          {p.skills?.length > 0
            ? <div className="flex flex-wrap gap-1 mt-1">
                {p.skills.slice(0, 8).map(s => (
                  <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium">{s}</span>
                ))}
                {p.skills.length > 8 && <span className="text-xs text-zinc-400">+{p.skills.length - 8} more</span>}
              </div>
            : <span className="text-amber-500">No skills selected.</span>
          }
        </Section>

        <Section title="Projects" filled={(p.projects?.length ?? 0) > 0}>
          {p.projects?.length > 0
            ? <span>{p.projects.length} project{p.projects.length > 1 ? 's' : ''}: {p.projects.map(pr => pr.name).join(', ')}</span>
            : <span className="text-zinc-400">No projects added (optional).</span>
          }
        </Section>

        <Section title="Education" filled={!!(p.education?.degree && p.education?.college)}>
          {p.education?.degree
            ? <span>{p.education.degree} in {p.education.branch} · {p.education.college} ({p.education.year}){p.education.cgpa ? ` · ${p.education.cgpa} CGPA` : ''}</span>
            : <span className="text-zinc-400">No education added.</span>
          }
        </Section>

        <Section title="Achievements" filled={(p.achievements?.length ?? 0) > 0}>
          {p.achievements?.length > 0
            ? <span>{p.achievements.length} achievement{p.achievements.length > 1 ? 's' : ''} added.</span>
            : <span className="text-zinc-400">No achievements added (optional).</span>
          }
        </Section>
      </div>

      {/* API key hint */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-brand-500/8 border border-brand-500/20">
        <CheckCircle2 size={14} className="text-brand-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-brand-600 dark:text-brand-400">
          {import.meta.env.VITE_GEMINI_API_KEY
            ? 'Gemini AI connected — will generate personalised content.'
            : 'No API key found — will use smart template fallback. Add VITE_GEMINI_API_KEY to .env.local for real AI generation.'
          }
        </p>
      </div>
    </form>
  )
}

export default ReviewStep