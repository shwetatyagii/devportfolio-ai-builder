import { StrictMode }     from 'react'
import { createRoot }     from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster }        from 'react-hot-toast'
import { ThemeProvider }     from '@/context/ThemeContext'
import { AuthProvider }      from '@/context/AuthContext'
import { PortfolioProvider } from '@/context/PortfolioContext'
import ErrorBoundary         from '@/components/common/ErrorBoundary'
import router from './router'
import '@/styles/globals.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <PortfolioProvider>
            <RouterProvider router={router} />
            <Toaster
              position="bottom-right"
              toastOptions={{ duration: 4000, className: 'text-sm font-medium' }}
            />
          </PortfolioProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
)