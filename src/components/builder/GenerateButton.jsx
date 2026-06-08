import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { Spinner } from '@/components/ui'
import cn from '@/utils/cn'

const MSGS = [
  'Writing your about section…',
  'Crafting your resume…',
  'Building your README…',
  'Polishing your bio…',
]

const GenerateButton = ({ isGenerating }) => {
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    if (!isGenerating) { setMsgIdx(0); return }
    const id = setInterval(() => setMsgIdx(i => (i + 1) % MSGS.length), 2200)
    return () => clearInterval(id)
  }, [isGenerating])

  return (
    <button
      type="submit"
      form="step-form"
      disabled={isGenerating}
      className={cn(
        'inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold',
        'transition-all duration-300 disabled:cursor-not-allowed',
        isGenerating
          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
          : 'bg-gradient-to-r from-brand-500 to-violet-600 text-white',
        !isGenerating && 'shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.5)] hover:-translate-y-0.5'
      )}
    >
      {isGenerating
        ? <><Spinner size="sm" /><span className="w-52 text-left">{MSGS[msgIdx]}</span></>
        : <><Sparkles size={16} /> Generate with AI</>
      }
    </button>
  )
}

export default GenerateButton