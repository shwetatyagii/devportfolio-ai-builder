import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, LayoutDashboard, PlusCircle, Eye, Layers, LogOut, Sparkles } from 'lucide-react'
import { AuthContext } from '@/context/AuthContext'

const NAV = [
  { icon: LayoutDashboard, label: 'Dashboard',  path: '/dashboard' },
  { icon: PlusCircle,      label: 'New Profile', path: '/builder'   },
  { icon: Eye,             label: 'Preview',     path: '/preview'   },
  { icon: Layers,          label: 'Templates',   path: '/templates' },
]

const MobileMenu = ({ isOpen, onClose }) => {
  const { pathname } = useLocation()
  const { user, logout } = useContext(AuthContext)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-72 flex flex-col
                       bg-white dark:bg-zinc-900
                       border-r border-zinc-200 dark:border-zinc-800
                       md:hidden shadow-2xl"
          >
            {/* Header */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                  <Sparkles size={13} className="text-white" />
                </div>
                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-50">DevPortfolio AI</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200
                           hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
              {NAV.map(({ icon: Icon, label, path }) => {
                const active = pathname === path
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                      transition-all duration-150
                      ${active
                        ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }
                    `}
                  >
                    <Icon size={17} />
                    <span>{label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* User */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-purple-600
                                flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                    {user?.name ?? 'Developer'}
                  </p>
                  <p className="text-xs text-zinc-400 truncate">{user?.email ?? ''}</p>
                </div>
              </div>
              <button
                onClick={() => { logout(); onClose() }}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg
                           text-sm text-red-500 dark:text-red-400
                           hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu