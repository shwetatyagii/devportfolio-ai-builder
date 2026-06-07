import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, PlusCircle } from 'lucide-react'
import { PortfolioContext } from '@/context/PortfolioContext'
import { Button }           from '@/components/ui'
import DraftCard            from './DraftCard'

const DraftsList = () => {
  const { state }  = useContext(PortfolioContext)
  const navigate   = useNavigate()
  const { drafts } = state

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="dp-section-label">Saved drafts</p>
        {drafts.length > 0 && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {drafts.length} draft{drafts.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {drafts.length === 0 ? (
        <div className="dp-card p-10 flex flex-col items-center text-center border-dashed">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-4">
            <Sparkles size={24} className="text-brand-500" />
          </div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-1.5">No drafts yet</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5 max-w-sm">
            Create your first portfolio profile and generate professional content with AI.
          </p>
          <Button leftIcon={<PlusCircle size={16} />} onClick={() => navigate('/builder')}>
            Create Profile
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {drafts.map(draft => (
            <DraftCard key={draft.id} draft={draft} />
          ))}
        </div>
      )}
    </div>
  )
}

export default DraftsList