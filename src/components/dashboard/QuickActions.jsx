import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle, Eye, Layers, FileText } from 'lucide-react'
import { PortfolioContext } from '@/context/PortfolioContext'
import { Card } from '@/components/ui'

const ACTIONS = [
  { icon: PlusCircle, label: 'New Profile',  desc: 'Start the 8-step builder', href: '/builder',   color: 'text-brand-500 bg-brand-500/10',    reset: true },
  { icon: Layers,     label: 'Templates',    desc: 'Browse portfolio themes',  href: '/templates',  color: 'text-violet-500 bg-violet-500/10',  reset: false },
  { icon: Eye,        label: 'Preview',      desc: 'View generated content',   href: '/preview',    color: 'text-cyan-500 bg-cyan-500/10',      reset: false },
  { icon: FileText,   label: 'Export',       desc: 'Download your portfolio',  href: '/preview',    color: 'text-emerald-500 bg-emerald-500/10', reset: false },
]

const QuickActions = () => {
  const { dispatch } = useContext(PortfolioContext)
  const navigate     = useNavigate()

  const handleClick = (href, reset) => {
    if (reset) dispatch({ type: 'RESET_PROFILE' })
    navigate(href)
  }

  return (
    <div>
      <p className="dp-section-label mb-3">Quick actions</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ACTIONS.map(({ icon: Icon, label, desc, href, color, reset }) => (
          <Card
            key={label}
            variant="default"
            padding="sm"
            onClick={() => handleClick(href, reset)}
            className="h-full"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}>
              <Icon size={19} />
            </div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">{label}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{desc}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default QuickActions