import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, PlusCircle, Eye, Layers,
  ChevronLeft, ChevronRight, LogOut, Sparkles,
} from 'lucide-react'
import { AuthContext } from '@/context/AuthContext'

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard',  path: '/dashboard' },
  { icon: PlusCircle,      label: 'New Profile', path: '/builder'   },
  { icon: Eye,             label: 'Preview',     path: '/preview'   },
  { icon: Layers,          label: 'Templates',   path: '/templates' },
]

const DashboardSidebar = ({ collapsed, onToggleCollapse }) => {
  const { pathname } = useLocation()
  const { user, logout } = useContext(AuthContext)

  return (
    <aside
      className={`
        ${collapsed ? 'w-[60px]' : 'w-[220px]'}
        min-h-screen flex flex-col
        bg-white dark:bg-zinc-900
        border-r border-zinc-200 dark:border-zinc-800
        transition-all duration-300 ease-in-out flex-shrink-0
      `}
    >
      {/* Logo + collapse button */}
      <div className={`
        h-14 flex items-center border-b border-zinc-200 dark:border-zinc-800
        ${collapsed ? 'justify-center px-2' : 'justify-between px-4'}
      `}>
        {collapsed ? (
          <Link to="/dashboard" className="flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600
                            flex items-center justify-center">
              <Sparkles size={13} className="text-white" />
            </div>
          </Link>
        ) : (
          <Link to="/dashboard" className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600
                            flex items-center justify-center flex-shrink-0">
              <Sparkles size={13} className="text-white" />
            </div>
            <span className="font-bold text-sm text-zinc-900 dark:text-zinc-50 truncate">
              DevPortfolio AI
            </span>
          </Link>
        )}
        {!collapsed && (
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300
                       hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={15} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {NAV.map(({ icon: Icon, label, path }) => {
          const active = pathname === path
          return (
            <Link
              key={path}
              to={path}
              title={collapsed ? label : undefined}
              className={`
                flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm
                transition-all duration-150 select-none
                ${collapsed ? 'justify-center' : ''}
                ${active
                  ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }
              `}
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && (
                <motion.span
                  initial={false}
                  animate={{ opacity: 1 }}
                  className="truncate"
                >
                  {label}
                </motion.span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Expand button (collapsed state) */}
      {collapsed && (
        <button
          onClick={onToggleCollapse}
          className="p-3 flex justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300
                     hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Expand sidebar"
        >
          <ChevronRight size={15} />
        </button>
      )}

      {/* User section */}
      <div className={`
        p-3 border-t border-zinc-200 dark:border-zinc-800
        ${collapsed ? 'flex justify-center' : ''}
      `}>
        {!collapsed ? (
          <div className="flex items-center gap-2.5">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-600
                            flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                {user?.name ?? 'Developer'}
              </p>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate">
                {user?.email ?? ''}
              </p>
            </div>
            {/* Logout */}
            <button
              onClick={logout}
              title="Logout"
              className="p-1.5 rounded-md text-zinc-400 hover:text-red-500 dark:hover:text-red-400
                         hover:bg-red-500/10 transition-colors flex-shrink-0"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={logout}
            title="Logout"
            className="p-2 rounded-lg text-zinc-400 hover:text-red-500 dark:hover:text-red-400
                       hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={15} />
          </button>
        )}
      </div>
    </aside>
  )
}

export default DashboardSidebar