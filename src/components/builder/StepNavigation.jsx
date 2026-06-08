import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import GenerateButton from './GenerateButton'

const StepNavigation = ({ activeStep, totalSteps, onPrev, isGenerating }) => {
  const isLast = activeStep === totalSteps - 1

  return (
    <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
      <Button
        variant="ghost"
        leftIcon={<ArrowLeft size={16} />}
        onClick={onPrev}
        disabled={activeStep === 0}
        type="button"
      >
        Previous
      </Button>

      <span className="text-xs text-zinc-400 dark:text-zinc-500 hidden sm:block">
        Step {activeStep + 1} of {totalSteps}
      </span>

      {isLast
        ? <GenerateButton isGenerating={isGenerating} />
        : (
          <Button type="submit" form="step-form" rightIcon={<ArrowRight size={16} />}>
            Next
          </Button>
        )
      }
    </div>
  )
}

export default StepNavigation