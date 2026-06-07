import { useContext } from 'react'
import { CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { PortfolioContext } from '@/context/PortfolioContext'
import cn from '@/utils/cn'

const TEMPLATES = [
  {
    id: 'minimal',   label: 'Minimal',
    bg: 'bg-white dark:bg-zinc-950',
    bars: [
      { cls: 'bg-zinc-900 dark:bg-zinc-100', w: 56 },
      { cls: 'bg-zinc-200 dark:bg-zinc-700', w: 72 },
      { cls: 'bg-zinc-100 dark:bg-zinc-800', w: 40 },
    ],
  },
  {
    id: 'modern',    label: 'Modern',
    bg: 'bg-zinc-950',
    bars: [
      { cls: 'bg-brand-500',    w: 56 },
      { cls: 'bg-zinc-700',     w: 72 },
      { cls: 'bg-zinc-600',     w: 40 },
    ],
  },
  {
    id: 'glassmorphism', label: 'Glass',
    bg: 'bg-[#0d0015]',
    bars: [
      { cls: 'bg-brand-400',           w: 56 },
      { cls: 'bg-purple-400 opacity-60', w: 72 },
      { cls: 'bg-cyan-400 opacity-50',   w: 40 },
    ],
  },
]

const TemplateSelectorWidget = () => {
  const { state, dispatch } = useContext(PortfolioContext)

  const select = (id) => {
    dispatch({ type: 'SET_TEMPLATE', payload: id })
    const label = TEMPLATES.find(t => t.id === id)?.label
    toast.success(`Template switched to ${label}`)
  }

  return (
    <div>
      <p className="dp-section-label mb-3">Active template</p>
      <div className="grid grid-cols-3 gap-3">
        {TEMPLATES.map(({ id, label, bg, bars }) => {
          const active = state.selectedTemplate === id
          return (
            <button
              key={id}
              onClick={() => select(id)}
              className={cn(
                'rounded-xl overflow-hidden border-2 transition-all duration-200',
                'hover:-translate-y-0.5 text-left w-full focus-visible:outline-none',
                active
                  ? 'border-brand-500 ring-2 ring-brand-500/25'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              )}
            >
              {/* Mini preview */}
              <div className={`h-16 ${bg} p-3 space-y-1.5`}>
                {bars.map((b, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full ${b.cls}`}
                    style={{ width: b.w }}
                  />
                ))}
              </div>
              {/* Label row */}
              <div className="px-3 py-2 bg-white dark:bg-zinc-900 flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-50">{label}</span>
                {active && <CheckCircle2 size={13} className="text-brand-500" />}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TemplateSelectorWidget