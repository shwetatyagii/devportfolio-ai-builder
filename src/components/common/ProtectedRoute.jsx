import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '@/context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading…</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute