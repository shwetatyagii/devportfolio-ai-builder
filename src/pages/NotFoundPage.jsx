import { Link } from 'react-router-dom'
import { Home, AlertCircle } from 'lucide-react'

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
    <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center mb-6">
      <AlertCircle size={36} className="text-red-500" />
    </div>
    <h1 className="text-6xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-3">404</h1>
    <p className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Page not found</p>
    <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm">
      The page you&apos;re looking for doesn&apos;t exist or has been moved.
    </p>
    <Link to="/" className="dp-btn-primary px-6 py-3 gap-2">
      <Home size={17} /> Back to Home
    </Link>
  </div>
)

export default NotFoundPage