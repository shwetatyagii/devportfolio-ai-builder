import { useContext } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { PortfolioContext } from '@/context/PortfolioContext'
import toast from 'react-hot-toast'

const TEMPLATES = [
  {
    id:    'minimal',
    name:  'Minimal Professional',
    desc:  'Clean typography, generous whitespace, zero distraction. Perfect for enterprise roles.',
    colors: ['#09090B', '#F8F8FF', '#6366F1'],
    tag:   'Most professional',
  },
  {
    id:    'modern',
    name:  'Modern SaaS',
    desc:  'Dark cards, indigo accents, bold headings. Built for startup applications.',
    colors: ['#6366F1', '#8B5CF6', '#111118'],
    tag:   'Most popular',
  },
  {
    id:    'glassmorphism',
    name:  'Glassmorphism Dev',
    desc:  'Frosted glass cards on a deep gradient canvas. Stands out from every other portfolio.',
    colors: ['#6366F1', '#06B6D4', '#A855F7'],
    tag:   'Most unique',
  },
]

const TemplatesPage = () => {
  const { state, dispatch } = useContext(PortfolioContext)

  const select = (id) => {
    dispatch({ type: 'SET_TEMPLATE', payload: id })
    toast.success(`Template set to ${TEMPLATES.find(t => t.id === id)?.name}`)
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Portfolio Templates</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
          Choose a theme. You can switch at any time — it applies immediately to your preview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TEMPLATES.map(({ id, name, desc, colors, tag }) => {
          const selected = state.selectedTemplate === id
          return (
            <button
              key={id}
              onClick={() => select(id)}
              className={`
                dp-card p-0 overflow-hidden text-left
                transition-all duration-200 hover:-translate-y-1 cursor-pointer w-full
                ${selected
                  ? 'border-brand-500 ring-2 ring-brand-500/30'
                  : 'hover:border-zinc-300 dark:hover:border-zinc-600'
                }
              `}
            >
              {/* Colour preview strip */}
              <div className="h-28 flex gap-1 p-3">
                {colors.map((c, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-lg opacity-90"
                    style={{ background: c }}
                  />
                ))}
              </div>

              {/* Info */}
              <div className="p-4 border-t border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">{name}</span>
                  {selected && <CheckCircle2 size={16} className="text-brand-500 flex-shrink-0" />}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3">{desc}</p>
                <span className="dp-badge dp-badge-brand text-[11px]">{tag}</span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="dp-card p-4 border-dashed">
        <p className="text-xs text-zinc-400 text-center">
          Full live template previews with your generated content → Phase 8
        </p>
      </div>
    </div>
  )
}

export default TemplatesPage