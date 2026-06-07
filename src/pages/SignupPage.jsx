import { useState, useContext } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { AuthContext } from '@/context/AuthContext'
import { Button, Input } from '@/components/ui'
import cn from '@/utils/cn'

// ── Password strength ────────────────────────────────────────
const getStrength = (pwd) => {
  if (!pwd) return 0
  let s = 0
  if (pwd.length >= 8)                                     s++
  if (pwd.length >= 12)                                    s++
  if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd))             s++
  if (/[^A-Za-z0-9]/.test(pwd))                           s++
  return s // 0 – 4
}

const STRENGTH = [
  { label: '',       barColor: '',                  textColor: '' },
  { label: 'Weak',   barColor: 'bg-red-500',        textColor: 'text-red-500' },
  { label: 'Fair',   barColor: 'bg-amber-500',      textColor: 'text-amber-500' },
  { label: 'Good',   barColor: 'bg-yellow-500',     textColor: 'text-yellow-600 dark:text-yellow-400' },
  { label: 'Strong', barColor: 'bg-emerald-500',    textColor: 'text-emerald-500' },
]

const PERKS = [
  'Free AI generation',
  '3 premium templates',
  'GitHub README builder',
  'One-click export',
]

// ────────────────────────────────────────────────────────────
const SignupPage = () => {
  const { user, isLoading: authLoading, login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [showPwd,     setShowPwd]     = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading,   setIsLoading]   = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm()

  const passwordValue = watch('password', '')
  const strength      = getStrength(passwordValue)
  const { label: sLabel, barColor, textColor } = STRENGTH[strength]

  // Already logged in
  if (!authLoading && user) return <Navigate to="/dashboard" replace />

  const onSubmit = async (data) => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1000))

    try {
      const newUser = {
        id:        crypto.randomUUID(),
        name:      data.name.trim(),
        email:     data.email.toLowerCase().trim(),
        createdAt: new Date().toISOString(),
      }
      login(newUser)
      toast.success(`Welcome, ${newUser.name.split(' ')[0]}! 🎉`)
      navigate('/dashboard')
    } catch {
      setError('root', { message: 'Something went wrong. Please try again.' })
      setIsLoading(false)
    }
  }

  const eyeBtn = (show, toggle) => (
    <button
      type="button"
      tabIndex={-1}
      onClick={() => toggle(p => !p)}
      className="p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
    >
      {show ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Create your account
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm">
          Start building your developer brand for free
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

        {/* Root error */}
        {errors.root && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5 p-3.5 rounded-xl text-sm text-red-600 dark:text-red-400 bg-red-500/8 border border-red-500/20"
          >
            <AlertCircle size={15} className="flex-shrink-0" />
            {errors.root.message}
          </motion.div>
        )}

        <Input
          label="Full name"
          type="text"
          placeholder="Shweta Tyagi"
          autoComplete="name"
          leftIcon={<User size={16} />}
          error={errors.name?.message}
          {...register('name', {
            required:  'Full name is required',
            minLength: { value: 2,  message: 'Name must be at least 2 characters' },
            maxLength: { value: 50, message: 'Name is too long' },
            validate: v => v.trim().length >= 2 || 'Name must be at least 2 characters',
          })}
        />

        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          leftIcon={<Mail size={16} />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern:  {
              value:   /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
        />

        {/* Password + strength meter */}
        <div>
          <Input
            label="Password"
            type={showPwd ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            leftIcon={<Lock size={16} />}
            rightIcon={eyeBtn(showPwd, setShowPwd)}
            error={errors.password?.message}
            {...register('password', {
              required:  'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            })}
          />

          <AnimatePresence>
            {passwordValue.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit  ={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 space-y-1.5">
                  {/* 4-segment bar */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(lvl => (
                      <div
                        key={lvl}
                        className={cn(
                          'h-1 flex-1 rounded-full transition-all duration-300',
                          strength >= lvl ? barColor : 'bg-zinc-200 dark:bg-zinc-700'
                        )}
                      />
                    ))}
                  </div>
                  {sLabel && (
                    <p className={cn('text-xs font-medium', textColor)}>
                      {sLabel} password
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Confirm password */}
        <Input
          label="Confirm password"
          type={showConfirm ? 'text' : 'password'}
          placeholder="Repeat your password"
          autoComplete="new-password"
          leftIcon={<Lock size={16} />}
          rightIcon={eyeBtn(showConfirm, setShowConfirm)}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: v => v === passwordValue || 'Passwords do not match',
          })}
        />

        {/* What you get */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 py-1">
          {PERKS.map(perk => (
            <div key={perk} className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
              {perk}
            </div>
          ))}
        </div>

        <Button
          type="submit"
          size="lg"
          isLoading={isLoading}
          className="w-full py-3 mt-2"
        >
          {isLoading ? 'Creating account…' : 'Create Free Account'}
        </Button>

        <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center">
          By signing up you agree to our{' '}
          <span className="text-brand-500 cursor-pointer hover:underline">Terms</span>
          {' '}and{' '}
          <span className="text-brand-500 cursor-pointer hover:underline">Privacy Policy</span>
        </p>

      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-200 dark:border-zinc-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-950">
            Already have an account?
          </span>
        </div>
      </div>

      <Link to="/login">
        <Button variant="secondary" size="lg" className="w-full py-3">
          Sign in instead
        </Button>
      </Link>

    </motion.div>
  )
}

export default SignupPage