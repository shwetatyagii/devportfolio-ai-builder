import { useState, useContext, useEffect } from 'react'
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
  const navigate            = useNavigate()
  const [activeStep,   setActiveStep]   = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  // Reset profile when starting a completely fresh build (no active draft)
  useEffect(() => {
    if (!state.activeDraftId) {
      dispatch({ type: 'RESET_PROFILE' })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Run once on mount only

  const step      = STEPS[activeStep]
  const defaultVals = step.key ? state.profile[step.key] : state.profile

  // ── AI generation ───────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    setIsGenerating(true)
    dispatch({ type: 'SET_GENERATING', payload: true })

    try {
      const result               = await generateAll(state.profile)
      const { _source, _error, ...content } = result

      // Save content + source to context
      dispatch({
        type:    'SET_GENERATED_CONTENT',
        payload: { content, source: _source },
      })

      // Persist generated content to the active draft so it can be viewed later
        if (state.activeDraftId) {
          dispatch({
            type:    'UPDATE_DRAFT_GENERATED',
            payload: {
              id:               state.activeDraftId,
              generatedContent: content,
              generationSource: _source,
            },
          })
        }

      // Source-aware user feedback
      if (_source === 'ai') {
        toast.success('Portfolio generated with Gemini AI! 🎉', { duration: 5000 })

      } else if (_source === 'error-fallback') {
        toast.error(
          `Gemini AI unavailable — using smart template.\n(${_error ?? 'unknown error'})`,
          { duration: 7000 }
        )

      } else {
        // 'fallback' — no API key
        toast(
          'Generated with smart templates.\nAdd VITE_GEMINI_API_KEY to .env.local for real AI output.',
          { icon: '💡', duration: 8000 }
        )
      }

      navigate('/preview')
    } catch (err) {
      // This should not happen (generateAll never throws), but just in case
      toast.error('Generation failed unexpectedly. Please try again.')
      dispatch({ type: 'SET_ERROR', payload: err.message })
    } finally {
      setIsGenerating(false)
      dispatch({ type: 'SET_GENERATING', payload: false })
    }
  }

  // ── Step submission ─────────────────────────────────────────────────────────
  const handleStepSubmit = async (data) => {
    // Last step (Review) → trigger AI generation
    if (activeStep === STEPS.length - 1) {
      await handleGenerate()
      return
    }

    // Compute the updated profile locally BEFORE dispatching
    // (we can't read updated state synchronously after dispatch)
    const updatedProfile = step.key
      ? { ...state.profile, [step.key]: data }
      : state.profile

    // 1. Save step data to context
    if (step.key) {
      dispatch({ type: 'UPDATE_STEP_DATA', payload: { step: step.key, data } })
    }

    // 2. Auto-save draft (uses locally computed profile, not stale state.profile)
    const draftName = updatedProfile.basicInfo?.name
      ? `${updatedProfile.basicInfo.name}'s Portfolio`
      : 'Untitled Draft'

    dispatch({
      type:    'SAVE_DRAFT',
      payload: {
        id:      state.activeDraftId ?? null,  // null = new draft, id = update existing
        name:    draftName,
        profile: updatedProfile,
      },
    })

    // 3. Advance step
    setActiveStep(prev => prev + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrev = () => {
    setActiveStep(prev => Math.max(0, prev - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const CurrentStep = step.component

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Portfolio Builder
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-xs sm:text-sm leading-relaxed">
            Fill in your details — AI generates a professional portfolio from this.
          {state.activeDraftId && (
            <span className="ml-1.5 text-emerald-500">● Autosaving</span>
          )}
        </p>
      </div>

      <StepIndicator steps={STEPS} activeStep={activeStep} />

      <div className="dp-card p-5 sm:p-7">
        {/*
          key forces full remount when:
          - activeStep changes (new step, new form)
          - activeDraftId changes (different draft loaded from dashboard)
          This ensures local useState inside each step resets correctly.
        */}
        <CurrentStep
          key={`${activeStep}-${state.activeDraftId ?? 'new'}`}
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