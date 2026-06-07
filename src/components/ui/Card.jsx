import cn from '@/utils/cn'

const variants = {
  default:  'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800',
  glass:    'backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/50 dark:border-zinc-700/50',
  elevated: 'bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 shadow-sm',
  ghost:    'bg-transparent border border-dashed border-zinc-200 dark:border-zinc-700',
  flat:     'bg-zinc-50/50 dark:bg-zinc-900/50',
}

const paddings = {
  none: '',
  xs:   'p-3',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
}

const Card = ({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  onClick,
  ...rest
}) => (
  <div
    onClick={onClick}
    className={cn(
      'rounded-xl transition-all duration-200',
      variants[variant],
      paddings[padding],
      onClick && [
        'cursor-pointer',
        'hover:border-zinc-300 dark:hover:border-zinc-600',
        'hover:-translate-y-0.5',
      ],
      className
    )}
    {...rest}
  >
    {children}
  </div>
)

export default Card