import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Clock, Pencil, Trash2 } from 'lucide-react'
import { PortfolioContext } from '@/context/PortfolioContext'
import { Button, Modal }    from '@/components/ui'

const DraftCard = ({ draft }) => {
  const { dispatch } = useContext(PortfolioContext)
  const navigate     = useNavigate()
  const [open, setOpen] = useState(false)

  const handleEdit = () => {
    dispatch({ type: 'LOAD_DRAFT', payload: draft.id })
    navigate('/builder')
  }

  const handleDelete = () => {
    dispatch({ type: 'DELETE_DRAFT', payload: draft.id })
    setOpen(false)
  }

  const skills = draft.profile?.skills?.slice(0, 3) ?? []
  const draftName = draft.name ?? 'Untitled Draft'

  return (
    <>
      <div className="dp-card p-4 flex items-center justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
            <FileText size={16} className="text-brand-500" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-zinc-900 dark:text-zinc-50 text-sm truncate">{draftName}</p>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <p className="text-xs text-zinc-400 flex items-center gap-1 flex-shrink-0">
                <Clock size={10} />
                {new Date(draft.updatedAt).toLocaleDateString(undefined, {
                  month: 'short', day: 'numeric', year: 'numeric',
                })}
              </p>
              {skills.map(s => (
                <span
                  key={s}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Button variant="ghost"  size="sm" leftIcon={<Pencil size={13} />} onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="danger" size="sm" leftIcon={<Trash2 size={13} />} onClick={() => setOpen(true)}>
            Delete
          </Button>
        </div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Delete draft" size="sm">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5">
          Are you sure you want to delete{' '}
          <strong className="text-zinc-900 dark:text-zinc-50">{draftName}</strong>?{' '}
          This cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost"  size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>Delete draft</Button>
        </div>
      </Modal>
    </>
  )
}

export default DraftCard