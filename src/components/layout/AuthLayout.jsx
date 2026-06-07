import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const AuthLayout = () => (
  <div className="min-h-screen flex flex-col">
    {/* Top bar */}
    <div className="flex items-center justify-between px-6 py-4">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
          <Sparkles size={15} className="text-white" />
        </div>
        <span className="font-bold text-zinc-900 dark:text-zinc-50">
          DevPortfolio <span className="gradient-text">AI</span>
        </span>
      </Link>
      <ThemeToggle />
    </div>

    {/* Centered content */}
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[420px]">
        <Outlet />
      </div>
    </div>

    {/* Subtle background blob */}
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[500px] h-[500px] rounded-full
                      bg-brand-500/5 dark:bg-brand-500/8 blur-[80px]" />
    </div>
  </div>
)

export default AuthLayout