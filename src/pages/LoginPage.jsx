import { useState, useContext } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { DEMO_USER } from '@/data/mockProfile'
import { AuthContext } from '@/context/AuthContext'
import { Button, Input } from '@/components/ui'

const LoginPage = () => {
  const { user, isLoading: authLoading, login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [showPwd,   setShowPwd]   = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  // Already logged in — redirect away
  if (!authLoading && user) return <Navigate to="/dashboard" replace />

  const onSubmit = async (data) => {
  setIsLoading(true)
  await new Promise(r => setTimeout(r, 900))

  try {
    // Check for a stored user matching the entered email
    const raw = localStorage.getItem('dpab_user')

    if (raw) {
      const saved = JSON.parse(raw)

      if (saved.email.toLowerCase() === data.email.toLowerCase()) {
        login(saved)
        toast.success(`Welcome back, ${saved.name.split(' ')[0]}!`)
        navigate('/dashboard')
        return
      }
    }

    // Fallback: use Shweta Tyagi demo identity
    const mockUser = {
      ...DEMO_USER,
      id: crypto.randomUUID(),
      email: data.email.toLowerCase(),
    }

    login(mockUser)
    toast.success(`Welcome back, ${DEMO_USER.name.split(' ')[0]}!`)
    navigate('/dashboard')

  } catch {
    setError('root', {
      message: 'Something went wrong. Please try again.',
    })
    setIsLoading(false)
  }
}

  const eyeToggle = (
    <button
      type="button"
      tabIndex={-1}
      onClick={() => setShowPwd(p => !p)}
      className="p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
    >
      {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
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
          Welcome back
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm">
          Sign in to continue building your portfolio
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

        {/* Root / server error */}
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
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          leftIcon={<Mail size={16} />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value:   /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
        />

        <div>
          <Input
            label="Password"
            type={showPwd ? 'text' : 'password'}
            placeholder="••••••••"
            autoComplete="current-password"
            leftIcon={<Lock size={16} />}
            rightIcon={eyeToggle}
            error={errors.password?.message}
            {...register('password', {
              required:  'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />
          <div className="flex justify-end mt-1.5">
            <button
              type="button"
              className="text-xs text-brand-500 hover:text-brand-600 transition-colors"
            >
              Forgot password?
            </button>
          </div>
        </div>

        {/* Remember me */}
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-600 accent-brand-500 cursor-pointer"
          />
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Remember me for 30 days
          </span>
        </label>

        <Button
          type="submit"
          size="lg"
          isLoading={isLoading}
          className="w-full py-3 mt-2"
        >
          {isLoading ? 'Signing in…' : 'Sign In'}
        </Button>

      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-200 dark:border-zinc-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-950">
            New to DevPortfolio AI?
          </span>
        </div>
      </div>

      <Link to="/signup">
        <Button variant="secondary" size="lg" className="w-full py-3">
          Create free account
        </Button>
      </Link>

    </motion.div>
  )
}

export default LoginPage