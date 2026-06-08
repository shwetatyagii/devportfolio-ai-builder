import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui'

const AboutStep = ({ defaultValues, onNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues ?? {},
  })

  return (
    <form id="step-form" onSubmit={handleSubmit(onNext)} className="space-y-4" noValidate>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">About You</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          Write in your own words — AI will expand and polish everything.
        </p>
      </div>

      <Textarea
        label="Professional Summary" rows={4} maxLength={500} required
        placeholder="I'm a passionate Java Full Stack Developer who loves building scalable apps with Spring Boot and React…"
        error={errors.summary?.message}
        helperText="2–4 sentences about your skills and background."
        {...register('summary', {
          required: 'Please add a short summary',
          minLength: { value: 20, message: 'At least 20 characters' },
        })}
      />

      <Textarea
        label="Career Goal" rows={2} maxLength={250}
        placeholder="I want to work as a Full Stack Developer at a product-based company…"
        helperText="What role or company type are you targeting?"
        {...register('careerGoal')}
      />

      <Textarea
        label="What makes you unique?" rows={2} maxLength={250}
        placeholder="I bridge backend complexity with beautiful frontend experiences…"
        helperText="1–2 sentences on your standout quality."
        {...register('uniqueStrength')}
      />
    </form>
  )
}

export default AboutStep