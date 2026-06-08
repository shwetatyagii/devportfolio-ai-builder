import { useState, useContext } from 'react'
import { useNavigate }          from 'react-router-dom'
import toast                    from 'react-hot-toast'
import { PortfolioContext }      from '@/context/PortfolioContext'
import { generateAll }          from '@/services/aiService'

import StepIndicator    from '@/components/builder/StepIndicator'
import StepNavigation   from '@/components/builder/StepNavigation'

import BasicInfoStep    from '@/components/builder/steps/BasicInfoStep'
import AboutStep        from '@/components/builder/steps/AboutStep'
import SkillsStep       from '@/components/builder/steps/SkillsStep'
import ProjectsStep     from '@/components/builder/steps/ProjectsStep'
import ExperienceStep   from '@/components/builder/steps/ExperienceStep'
import EducationStep    from '@/components/builder/steps/EducationStep'
import AchievementsStep from '@/components/builder/steps/AchievementsStep'
import ReviewStep       from '@/components/builder/steps/ReviewStep'

// ── Step registry ─────────────────────────────────────────────────────────────
const STEPS = [
  { label: 'Basic Info',   component: BasicInfoStep,    key: 'basicInfo'    },
  { label: 'About',        component: AboutStep,        key: 'about'        },
  { label: 'Skills',       component: SkillsStep,       key: 'skills'       },
  { label: 'Projects',     component: ProjectsStep,     key: 'projects'     },
  { label: 'Experience',   component: ExperienceStep,   key: 'experience'   },
  { label: 'Education',    component: EducationStep,    key: 'education'    },
  { label: 'Achievements', component: AchievementsStep, key: 'achievements' },
  { label: 'Review',       component: ReviewStep,       key: null           },
]

const BuilderPage = () => {
  const { state, dispatch } = useContext(PortfolioContext)
  const navigate    = useNavigate()
  const [activeStep,   setActiveStep]   = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const step = STEPS[activeStep]

  // ── AI generation ─────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    setIsGenerating(true)
    dispatch({ type: 'SET_GENERATING', payload: true })

    try {
      const result = await generateAll(state.profile)
      dispatch({ type: 'SET_GENERATED_CONTENT', payload: result })
      toast.success('Portfolio generated! 🎉')
      navigate('/preview')
    } catch (err) {
      toast.error('Generation failed. Please try again.')
      dispatch({ type: 'SET_ERROR', payload: err.message })
    } finally {
      setIsGenerating(false)
      dispatch({ type: 'SET_GENERATING', payload: false })
    }
  }

  // ── Step submission ────────────────────────────────────────────────────────
  const handleStepSubmit = async (data) => {
    // Last step → generate
    if (activeStep === STEPS.length - 1) {
      await handleGenerate()
      return
    }

    // Save to context
    if (step.key) {
      dispatch({ type: 'UPDATE_STEP_DATA', payload: { step: step.key, data } })
    }

    setActiveStep(prev => prev + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrev = () => {
    setActiveStep(prev => Math.max(0, prev - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const CurrentStep = step.component
  const defaultVals = step.key ? state.profile[step.key] : state.profile

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Portfolio Builder</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
          Fill in your details — AI generates a professional portfolio from this.
        </p>
      </div>

      {/* Step indicator */}
      <StepIndicator steps={STEPS} activeStep={activeStep} />

      {/* Step card */}
      <div className="dp-card p-5 sm:p-7">
        <CurrentStep
          defaultValues={defaultVals}
          onNext={handleStepSubmit}
        />
        <StepNavigation
          activeStep={activeStep}
          totalSteps={STEPS.length}
          onPrev={handlePrev}
          isGenerating={isGenerating}
        />
      </div>

    </div>
  )
}

export default BuilderPage