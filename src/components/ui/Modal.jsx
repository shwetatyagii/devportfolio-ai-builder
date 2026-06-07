import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import cn from '@/utils/cn'

const widths = {
  sm:   'max-w-sm',
  md:   'max-w-lg',
  lg:   'max-w-2xl',
  xl:   'max-w-4xl',
  full: 'max-w-[95vw]',
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className = '',
}) => {
  const backdropRef = useRef(null)

  // ESC to close
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Click backdrop to close
  const onBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose()
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onBackdropClick}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit  ={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            className={cn(
              'relative w-full rounded-2xl',
              'bg-white dark:bg-zinc-900',
              'border border-zinc-200 dark:border-zinc-800',
              'shadow-2xl',
              widths[size],
              className
            )}
          >
            {/* Header with title */}
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 id="modal-title" className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Floating close (no title) */}
            {!title && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            )}

            {/* Content */}
            <div className="px-6 py-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Modal