import { Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import useTheme from '@/hooks/useTheme'

const ThemeToggle = ({ size = 'md' }) => {
  const { isDark, toggleTheme } = useTheme()

  const dim = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9'
  const iconSize = size === 'sm' ? 14 : 16

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle colour theme"
      className={`
        ${dim} rounded-lg flex items-center justify-center
        border border-zinc-200 dark:border-zinc-700
        bg-zinc-100 dark:bg-zinc-800
        hover:border-zinc-300 dark:hover:border-zinc-600
        hover:bg-zinc-200 dark:hover:bg-zinc-700
        transition-all duration-200 cursor-pointer
      `}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate:   0, opacity: 1, scale: 1   }}
            exit   ={{ rotate:  90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
          >
            <Sun size={iconSize} className="text-amber-400" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate:  90, opacity: 0, scale: 0.6 }}
            animate={{ rotate:   0, opacity: 1, scale: 1   }}
            exit   ={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
          >
            <Moon size={iconSize} className="text-brand-500" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

export default ThemeToggle