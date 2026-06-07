import { forwardRef } from 'react'
import cn from '@/utils/cn'

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  required,
  id,
  className = '',
  ...rest
}, ref) => {
  const uid = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={uid} className="dp-label">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 pointer-events-none">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={uid}
          className={cn(
            'dp-input',
            leftIcon  && 'pl-9',
            rightIcon && 'pr-9',
            error && 'border-red-400 dark:border-red-500 focus:border-red-400 focus:ring-red-400/20',
            className
          )}
          {...rest}
        />

        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
            {rightIcon}
          </span>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-500">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
export default Input