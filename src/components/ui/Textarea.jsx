import { forwardRef } from 'react'
import cn from '@/utils/cn'

const Textarea = forwardRef(({
  label,
  error,
  helperText,
  maxLength,
  required,
  id,
  rows = 4,
  className = '',
  ...rest
}, ref) => {
  const uid = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor={uid} className="dp-label !mb-0">
            {label}
            {required && <span className="text-red-400 ml-0.5">*</span>}
          </label>
          {maxLength && (
            <span className="text-xs text-zinc-400 dark:text-zinc-500">max {maxLength}</span>
          )}
        </div>
      )}

      <textarea
        ref={ref}
        id={uid}
        rows={rows}
        maxLength={maxLength}
        className={cn(
          'dp-input resize-none',
          error && 'border-red-400 dark:border-red-500 focus:border-red-400 focus:ring-red-400/20',
          className
        )}
        {...rest}
      />

      {error      && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{error}</p>}
      {!error && helperText && <p className="mt-1.5 text-xs text-zinc-400 dark:text-zinc-500">{helperText}</p>}
    </div>
  )
})

Textarea.displayName = 'Textarea'
export default Textarea