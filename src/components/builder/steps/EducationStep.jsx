import { useForm } from 'react-hook-form'
import { GraduationCap, Calendar, Hash } from 'lucide-react'
import { Input } from '@/components/ui'

const YEARS = Array.from({ length: 12 }, (_, i) => String(new Date().getFullYear() + 2 - i))

const EducationStep = ({ defaultValues, onNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues ?? {},
  })

  return (
    <form id="step-form" onSubmit={handleSubmit(onNext)} className="space-y-4" noValidate>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Education</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Your highest qualification.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Degree" placeholder="B.Tech / B.Sc / BCA…" required
          leftIcon={<GraduationCap size={15} />}
          error={errors.degree?.message}
          {...register('degree', { required: 'Degree is required' })}
        />
        <Input
          label="Branch / Major" placeholder="Computer Science & Engineering" required
          error={errors.branch?.message}
          {...register('branch', { required: 'Branch is required' })}
        />
      </div>

      <Input
        label="College / University" placeholder="XYZ Institute of Technology" required
        error={errors.college?.message}
        {...register('college', { required: 'College name is required' })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Graduation year */}
        <div>
          <label className="dp-label">Graduation Year</label>
          <select
            className="dp-input"
            {...register('year')}
          >
            <option value="">Select year…</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <Input
          label="CGPA / Percentage" placeholder="8.4 or 85%"
          leftIcon={<Hash size={15} />}
          helperText="Optional — only include if strong."
          {...register('cgpa')}
        />
      </div>
    </form>
  )
}

export default EducationStep