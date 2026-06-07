import { createBrowserRouter } from 'react-router-dom'

import RootLayout       from '@/components/layout/RootLayout'
import DashboardLayout  from '@/components/layout/DashboardLayout'
import AuthLayout       from '@/components/layout/AuthLayout'
import ProtectedRoute   from '@/components/common/ProtectedRoute'

import LandingPage   from '@/pages/LandingPage'
import LoginPage     from '@/pages/LoginPage'
import SignupPage    from '@/pages/SignupPage'
import DashboardPage from '@/pages/DashboardPage'
import BuilderPage   from '@/pages/BuilderPage'
import PreviewPage   from '@/pages/PreviewPage'
import TemplatesPage from '@/pages/TemplatesPage'
import NotFoundPage  from '@/pages/NotFoundPage'

const router = createBrowserRouter([
  // ── Public pages (Navbar + Footer)
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
    ],
  },

  // ── Auth pages (centered card layout, no nav)
  {
    element: <AuthLayout />,
    children: [
      { path: '/login',  element: <LoginPage />  },
      { path: '/signup', element: <SignupPage /> },
    ],
  },

  // ── Protected dashboard pages (sidebar layout)
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/builder',   element: <BuilderPage />   },
      { path: '/preview',   element: <PreviewPage />   },
      { path: '/templates', element: <TemplatesPage /> },
    ],
  },

  // ── 404
  { path: '*', element: <NotFoundPage /> },
])

export default router