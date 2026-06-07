import Spinner from './Spinner'
import cn from '@/utils/cn'

const variants = {
  primary:
    'bg-brand-500 hover:bg-brand-600 text-white ' +
    'shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] ' +
    'hover:-translate-y-px active:translate-y-0 active:shadow-none',
  secondary:
    'border border-zinc-200 dark:border-zinc-700 ' +
    'text-zinc-700 dark:text-zinc-300 ' +
    'hover:bg-zinc-50 dark:hover:bg-zinc-800/60 ' +
    'hover:border-zinc-300 dark:hover:border-zinc-600',
  ghost:
    'text-zinc-500 dark:text-zinc-400 ' +
    'hover:text-zinc-900 dark:hover:text-zinc-100 ' +
    'hover:bg-zinc-100 dark:hover:bg-zinc-800',
  danger:
    'text-red-500 dark:text-red-400 ' +
    'border border-transparent ' +
    'hover:bg-red-500/10 hover:border-red-500/20',
  success:
    'bg-emerald-500 hover:bg-emerald-600 text-white ' +
    'hover:-translate-y-px active:translate-y-0',
}

const sizes = {
  xs: 'px-2.5 py-1.5 text-xs gap-1',
  sm: 'px-3 py-2 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-5 py-3 text-base gap-2',
  xl: 'px-6 py-3.5 text-base gap-2',
}

const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon = null,
  rightIcon = null,
  children,
  className = '',
  disabled,
  type = 'button',
  ...rest
}) => {
  const isDisabled = disabled || isLoading

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        // base
        'inline-flex items-center justify-center font-medium rounded-lg',
        'transition-all duration-200 cursor-pointer select-none whitespace-nowrap',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        // variant + size
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {isLoading ? (
        <Spinner size="sm" />
      ) : leftIcon ? (
        <span className="flex-shrink-0 inline-flex">{leftIcon}</span>
      ) : null}

      {children}

      {!isLoading && rightIcon && (
        <span className="flex-shrink-0 inline-flex">{rightIcon}</span>
      )}
    </button>
  )
}

export default Button