import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { PortfolioContext } from '@/context/PortfolioContext'
import { Button, Badge }    from '@/components/ui'

const RecentGeneration = () => {
  const { state }  = useContext(PortfolioContext)
  const navigate   = useNavigate()
  const { generatedContent } = state

  if (!generatedContent) return null

  const preview = (generatedContent.about ?? generatedContent.resumeSummary ?? '').substring(0, 150)

  return (
    <div>
      <p className="dp-section-label mb-3">Recent generation</p>
      <div className="dp-card p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <Sparkles size={17} className="text-emerald-500" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
                  Portfolio content generated
                </p>
                <Badge variant="green">Ready</Badge>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {preview}…
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            rightIcon={<ArrowRight size={13} />}
            className="flex-shrink-0"
            onClick={() => navigate('/preview')}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RecentGeneration