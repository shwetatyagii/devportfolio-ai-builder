import { Link } from 'react-router-dom'
import { PlusCircle, ArrowRight } from 'lucide-react'

const BuilderPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-5">
      <PlusCircle size={28} className="text-brand-500" />
    </div>
    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
      Portfolio Builder
    </h1>
    <p className="text-zinc-500 dark:text-zinc-400 mb-2 max-w-md">
      The 8-step guided builder with AI generation is being implemented.
    </p>
    <span className="dp-badge dp-badge-brand mb-6">Phase 6</span>
    <Link to="/dashboard" className="dp-btn-secondary gap-2">
      <ArrowRight size={15} className="rotate-180" /> Back to Dashboard
    </Link>
  </div>
)

export default BuilderPage