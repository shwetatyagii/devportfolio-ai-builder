import { CheckCircle2 } from 'lucide-react'
import cn from '@/utils/cn'

const StepIndicator = ({ steps, activeStep }) => (
  <div className="w-full overflow-x-auto scrollbar-hide">
    <div className="flex items-start min-w-max mx-auto px-2 py-1">
      {steps.map((step, i) => {
        const done    = i < activeStep
        const current = i === activeStep

        return (
          <div key={step.label} className="flex items-start">
            {/* Circle + label */}
            <div className="flex flex-col items-center gap-1">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0',
                done    && 'bg-brand-500 text-white',
                current && 'bg-brand-500 text-white ring-4 ring-brand-500/20',
                !done && !current && 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600'
              )}>
                {done ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span className={cn(
                'text-[10px] font-medium whitespace-nowrap',
                current ? 'text-brand-500' : 'text-zinc-400 dark:text-zinc-500'
              )}>
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {i < steps.length - 1 && (
              <div className={cn(
                'h-0.5 w-8 sm:w-10 mt-4 mx-1 transition-all duration-500',
                i < activeStep ? 'bg-brand-500' : 'bg-zinc-200 dark:bg-zinc-700'
              )} />
            )}
          </div>
        )
      })}
    </div>
  </div>
)

export default StepIndicator