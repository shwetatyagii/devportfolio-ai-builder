import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle, ArrowRight } from 'lucide-react'
import { AuthContext }      from '@/context/AuthContext'
import { PortfolioContext } from '@/context/PortfolioContext'
import { Button }           from '@/components/ui'

const WelcomeBanner = () => {
  const { user }   = useContext(AuthContext)
  const { state }  = useContext(PortfolioContext)
  const navigate   = useNavigate()

  const hour      = new Date().getHours()
  const greeting  = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = user?.name?.split(' ')[0] ?? 'Developer'
  const count     = state.drafts.length
  const sub       = count > 0
    ? `You have ${count} saved draft${count > 1 ? 's' : ''}. Keep building!`
    : "Let's build your developer brand today."

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {greeting}, {firstName} 👋
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">{sub}</p>
      </div>
      <Button
        leftIcon={<PlusCircle size={16} />}
        rightIcon={<ArrowRight size={14} />}
        className="hidden sm:inline-flex flex-shrink-0"
        onClick={() => navigate('/builder')}
      >
        New Profile
      </Button>
    </div>
  )
}

export default WelcomeBanner