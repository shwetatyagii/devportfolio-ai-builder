import { useForm } from 'react-hook-form'
import { User, Briefcase, MapPin, Mail, Globe } from 'lucide-react'
import { Input } from '@/components/ui'

const BasicInfoStep = ({ defaultValues, onNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues ?? {},
  })

  return (
    <form id="step-form" onSubmit={handleSubmit(onNext)} className="space-y-4" noValidate>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Basic Information</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Your public-facing identity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name" placeholder="Shweta Tyagi"
          leftIcon={<User size={15} />}
          error={errors.name?.message} required
          {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })}
        />
        <Input
          label="Professional Title" placeholder="Java Full Stack Developer"
          leftIcon={<Briefcase size={15} />}
          error={errors.title?.message} required
          {...register('title', { required: 'Title is required' })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Location" placeholder="Delhi, India"
          leftIcon={<MapPin size={15} />}
          {...register('location')}
        />
        <Input
          label="Email" type="email" placeholder="you@example.com"
          leftIcon={<Mail size={15} />}
          error={errors.email?.message} required
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
          })}
        />
      </div>

      <Input
        label="GitHub URL" placeholder="github.com/username"
        leftIcon={<Globe size={15} />}
        helperText="e.g. github.com/shwetatyagi"
        {...register('github')}
      />
      <Input
        label="LinkedIn URL" placeholder="linkedin.com/in/username"
        leftIcon={<Globe size={15} />}
        {...register('linkedin')}
      />
      <Input
        label="Personal Website" placeholder="yourwebsite.com (optional)"
        leftIcon={<Globe size={15} />}
        {...register('website')}
      />
    </form>
  )
}

export default BasicInfoStep