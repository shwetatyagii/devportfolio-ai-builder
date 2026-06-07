import WelcomeBanner          from '@/components/dashboard/WelcomeBanner'
import QuickActions           from '@/components/dashboard/QuickActions'
import RecentGeneration       from '@/components/dashboard/RecentGeneration'
import TemplateSelectorWidget from '@/components/dashboard/TemplateSelectorWidget'
import DraftsList             from '@/components/dashboard/DraftsList'

const DashboardPage = () => (
  <div className="space-y-8 max-w-5xl">
    <WelcomeBanner />
    <QuickActions />
    <RecentGeneration />
    <TemplateSelectorWidget />
    <DraftsList />
  </div>
)

export default DashboardPage