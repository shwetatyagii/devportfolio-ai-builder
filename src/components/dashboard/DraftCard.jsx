import { useState, useContext } from 'react'
import { useNavigate }          from 'react-router-dom'
import { Eye, Pencil, Trash2, FileText, Sparkles } from 'lucide-react'
import { PortfolioContext } from '@/context/PortfolioContext'
import { Modal, Badge }    from '@/components/ui'
import toast               from 'react-hot-toast'

const DraftCard = ({ draft }) => {
  const { dispatch }   = useContext(PortfolioContext)
  const navigate       = useNavigate()
  const [confirm, setConfirm] = useState(false)

  const skills       = draft.profile?.skills?.slice(0, 3) ?? []
  const hasGenerated = !!draft.generatedContent

  const handleView = () => {
    dispatch({ type: 'LOAD_DRAFT', payload: draft.id })
    navigate('/preview')
  }

  const handleEdit = () => {
    dispatch({ type: 'LOAD_DRAFT', payload: draft.id })
    navigate('/builder')
  }

  const handleDelete = () => {
    dispatch({ type: 'DELETE_DRAFT', payload: draft.id })
    setConfirm(false)
    toast.success('Draft deleted')
  }

  return (
    <>
      <div className="dp-card p-4 flex items-center gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group">

        {/* Icon */}
        <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
          <FileText size={16} className="text-brand-500" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 truncate max-w-[180px]">
              {draft.name ?? 'Untitled Draft'}
            </p>
            {hasGenerated && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">
                <Sparkles size={9} /> Generated
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <span className="text-[11px] text-zinc-400">
              {new Date(draft.updatedAt ?? draft.createdAt).toLocaleDateString('en-IN', {
                day: '2-digit', month: 'short', year: 'numeric',
              })}
            </span>
            {skills.map(s => (
              <Badge key={s} variant="gray" className="text-[10px] px-1.5 py-0">{s}</Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 flex-shrink-0 ml-2">
          {hasGenerated && (
            <button
              onClick={handleView}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              <Eye size={13} />
              <span className="hidden sm:inline">View</span>
            </button>
          )}
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Pencil size={13} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={() => setConfirm(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 size={13} />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>

      {/* Delete confirmation */}
      <Modal isOpen={confirm} onClose={() => setConfirm(false)} title="Delete draft?" size="sm">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          <strong className="text-zinc-900 dark:text-zinc-50">{draft.name}</strong> will be
          permanently deleted. This cannot be undone.
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setConfirm(false)}
            className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  )
}

export default DraftCard