import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Menu, Sparkles } from 'lucide-react'
import DashboardSidebar from './DashboardSidebar'
import ThemeToggle      from './ThemeToggle'
import cn from '@/utils/cn'

const DashboardLayout = () => {
  const [collapsed,  setCollapsed]  = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">

      {/* ── Mobile backdrop ──────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar wrapper ─────────────────────────────────────── */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40',
          'lg:static lg:z-auto lg:block',
          'transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <DashboardSidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(p => !p)}
        />
      </div>

      {/* ── Main column ─────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Mobile top bar — hidden on lg+ */}
        <header className="lg:hidden sticky top-0 z-20 flex items-center gap-3 px-4 h-14 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
          <Link to="/dashboard" className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Sparkles size={11} className="text-white" />
            </div>
            <span className="font-bold text-sm text-zinc-900 dark:text-zinc-50 truncate">
              DevPortfolio AI
            </span>
          </Link>
          <ThemeToggle />
        </header>

        {/* Desktop theme toggle */}
        <div className="hidden lg:block fixed top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden" role="main">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout