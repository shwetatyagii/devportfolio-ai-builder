import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import DashboardSidebar from './DashboardSidebar'
import MobileMenu from './MobileMenu'
import ThemeToggle from './ThemeToggle'

const DashboardLayout = () => {
  const [collapsed,      setCollapsed]      = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-950">

      {/* Sidebar — desktop only */}
      <div className="hidden md:flex flex-shrink-0">
        <DashboardSidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(p => !p)}
        />
      </div>

      {/* Mobile drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="h-14 sticky top-0 z-20 flex-shrink-0 flex items-center justify-between px-4 md:px-6 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Desktop spacer — plain div, no comment inside props */}
          <div className="hidden md:block" />

          <ThemeToggle />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default DashboardLayout