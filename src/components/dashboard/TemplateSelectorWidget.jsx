import { useContext } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { PortfolioContext } from '@/context/PortfolioContext'
import toast from 'react-hot-toast'
import cn from '@/utils/cn'

const TEMPLATES = [
  {
    id: 'minimal',
    label: 'Minimal',
    preview: (
      <div className="h-16 bg-white dark:bg-zinc-950 p-2.5">
        <div className="h-2 w-14 bg-zinc-800 dark:bg-zinc-200 rounded-full mb-1.5" />
        <div className="h-1.5 w-20 bg-zinc-300 dark:bg-zinc-600 rounded-full mb-2" />
        <div className="flex gap-1">
          {[24, 32, 20].map((w, i) => (
            <div key={i} className="h-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded" style={{ width: w }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'modern',
    label: 'Modern',
    preview: (
      <div className="h-16 bg-zinc-950 p-2.5">
        <div className="h-2 w-14 bg-brand-400 rounded-full mb-1.5" />
        <div className="h-1.5 w-20 bg-zinc-600 rounded-full mb-2" />
        <div className="flex gap-1">
          {[24, 32, 20].map((w, i) => (
            <div key={i} className="h-4 rounded" style={{ width: w, background: 'rgba(99,102,241,0.25)', border: '1px solid rgba(99,102,241,0.3)' }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'glassmorphism',
    label: 'Glass',
    preview: (
      <div className="h-16 p-2.5" style={{ background: '#0d0015' }}>
        <div className="h-2 w-14 rounded-full mb-1.5" style={{ background: '#818cf8' }} />
        <div className="h-1.5 w-20 rounded-full mb-2" style={{ background: 'rgba(167,139,250,0.5)' }} />
        <div className="flex gap-1">
          {[24, 32, 20].map((w, i) => (
            <div key={i} className="h-4 rounded" style={{ width: w, background: 'rgba(139,92,246,0.25)', border: '1px solid rgba(139,92,246,0.35)' }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'corporate',
    label: 'Corporate',
    preview: (
      <div className="h-16 overflow-hidden">
        {/* Dark header */}
        <div className="bg-slate-800 px-2 py-1.5 flex items-center gap-2">
          <div className="space-y-0.5">
            <div className="h-1.5 w-12 bg-slate-300 rounded" />
            <div className="h-1 w-8 bg-slate-500 rounded" />
          </div>
        </div>
        {/* Two-column body */}
        <div className="flex h-9">
          <div className="w-9 bg-slate-100 dark:bg-slate-800 p-1 space-y-0.5 border-r border-slate-200 dark:border-slate-700">
            {[70, 50, 80, 60].map((w, i) => (
              <div key={i} className="h-0.5 bg-slate-300 dark:bg-slate-600 rounded" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="flex-1 bg-white dark:bg-zinc-900 p-1 space-y-0.5">
            {[90, 70, 85, 65].map((w, i) => (
              <div key={i} className="h-0.5 bg-slate-200 dark:bg-zinc-700 rounded" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'terminal',
    label: 'Terminal',
    preview: (
      <div className="h-16 p-2" style={{ background: '#1e1e2e' }}>
        <div className="flex items-center gap-1 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#f38ba8' }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#fab387' }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#a6e3a1' }} />
        </div>
        <div className="space-y-1">
          {[{ g: true, w: 65 }, { g: false, w: 80 }, { g: true, w: 50 }].map((l, i) => (
            <div key={i} className="flex items-center gap-1">
              {l.g && <span style={{ color: '#a6e3a1', fontSize: 5, lineHeight: 1 }}>➜</span>}
              <div className="h-0.5 rounded" style={{
                width: `${l.w}%`,
                background: l.g ? '#a6e3a1' : '#313244',
              }} />
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

const TemplateSelectorWidget = () => {
  const { state, dispatch } = useContext(PortfolioContext)

  const handleSelect = (id) => {
    dispatch({ type: 'SET_TEMPLATE', payload: id })
    const meta = TEMPLATES.find(t => t.id === id)
    toast.success(`Switched to ${meta?.label} template`)
  }

  return (
    <div>
      <p className="dp-section-label mb-3">Active Template</p>

      {/* 3 cols on medium, 5 on xl */}
      <div className="grid grid-cols-3 xl:grid-cols-5 gap-2 overflow-x-auto scrollbar-hide">
        {TEMPLATES.map(({ id, label, preview }) => {
          const isActive = state.selectedTemplate === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleSelect(id)}
              className={cn(
                'rounded-xl overflow-hidden border-2 transition-all duration-200 text-left',
                'hover:-translate-y-0.5 hover:shadow-md',
                isActive
                  ? 'border-brand-500 shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              )}
            >
              {preview}
              <div className={cn(
                'px-2 py-1.5 flex items-center justify-between gap-1',
                'bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800'
              )}>
                <span className={cn(
                  'text-[10px] font-semibold truncate',
                  isActive
                    ? 'text-brand-600 dark:text-brand-400'
                    : 'text-zinc-500 dark:text-zinc-400'
                )}>
                  {label}
                </span>
                {isActive && (
                  <CheckCircle2 size={10} className="text-brand-500 flex-shrink-0" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      <p className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-2 hidden sm:block">
        Click any template to switch. Content stays the same.
      </p>
    </div>
  )
}

export default TemplateSelectorWidget
