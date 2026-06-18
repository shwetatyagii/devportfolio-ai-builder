import { Check, Copy } from 'lucide-react'
import useClipboard from '@/hooks/useClipboard'
import cn from '@/utils/cn'

const CopyButton = ({ text, label = 'Copy', size = 'sm', className = '' }) => {
  const { copy, copied } = useClipboard()

  return (
    <button
      onClick={() => copy(text)}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg font-medium transition-all duration-200',
        size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
        copied
          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-transparent',
        className
      )}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied!' : label}
    </button>
  )
}

export default CopyButton