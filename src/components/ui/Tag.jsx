import { X } from 'lucide-react'
import cn from '@/utils/cn'

const colors = {
  default: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700',
  brand:   'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20',
  green:   'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
  amber:   'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
  red:     'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
  purple:  'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20',
  cyan:    'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20',
}

const Tag = ({ children, onRemove, color = 'default', className = '' }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 px-2.5 py-1 rounded-lg',
      'text-xs font-medium border',
      colors[color],
      className
    )}
  >
    {children}
    {onRemove && (
      <button
        onClick={onRemove}
        className="flex-shrink-0 hover:opacity-70 transition-opacity ml-0.5"
        aria-label={`Remove ${children}`}
      >
        <X size={11} />
      </button>
    )}
  </span>
)

export default Tag