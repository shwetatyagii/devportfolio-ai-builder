import cn from '@/utils/cn'

const variants = {
  brand:  'bg-brand-500/10 text-brand-600 dark:text-brand-400',
  green:  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  amber:  'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  red:    'bg-red-500/10 text-red-600 dark:text-red-400',
  gray:   'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400',
  purple: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  cyan:   'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
}

const Badge = ({ variant = 'gray', children, className = '' }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
      variants[variant],
      className
    )}
  >
    {children}
  </span>
)

export default Badge