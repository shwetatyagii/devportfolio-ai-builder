import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { AuthContext } from '@/context/AuthContext'

const NAV_LINKS = [
  { label: 'Features',     href: '#features'     },
  { label: 'Showcase',     href: '#showcase'      },
  { label: 'Templates',    href: '#templates'     },
  { label: 'How it works', href: '#how-it-works'  },
]

function NavLink(props) {
  return (
    <a
      href={props.href}
      className="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150"
    >
      {props.label}
    </a>
  )
}

function MobileNavLink(props) {
  return (
    <a
      href={props.href}
      onClick={props.onClose}
      className="flex items-center px-3 py-2.5 rounded-lg text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
    >
      {props.label}
    </a>
  )
}

const Navbar = () => {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrolledClass = 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800'
  const navClass = 'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ' + (scrolled ? scrolledClass : 'bg-transparent')

  return (
    <>
      <nav className={navClass}>
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.4)]">
              <Sparkles size={15} className="text-white" />
            </div>
            <span className="font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              DevPortfolio <span className="gradient-text">AI</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(function(link) {
              return <NavLink key={link.label} href={link.href} label={link.label} />
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {user ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="dp-btn-primary hidden sm:flex px-4 py-2 text-sm"
              >
                Dashboard <ArrowRight size={14} />
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login"  className="dp-btn-ghost  px-4 py-2 text-sm">Login</Link>
                <Link to="/signup" className="dp-btn-primary px-4 py-2 text-sm">Get Started</Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(function(p) { return !p })}
              className="md:hidden p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-xl p-4 space-y-1"
          >
            {NAV_LINKS.map(function(link) {
              return (
                <MobileNavLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  onClose={() => setMobileOpen(false)}
                />
              )
            })}

            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700 flex flex-col gap-2">
              {user ? (
                <button
                  onClick={() => { navigate('/dashboard'); setMobileOpen(false) }}
                  className="dp-btn-primary w-full py-2.5"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="dp-btn-secondary w-full py-2.5 justify-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="dp-btn-primary w-full py-2.5 justify-center"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar