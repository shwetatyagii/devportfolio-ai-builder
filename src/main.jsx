import { StrictMode }    from 'react'
import { createRoot }    from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster }       from 'react-hot-toast'

import { ThemeProvider }    from '@/context/ThemeContext'
import { AuthProvider }     from '@/context/AuthContext'
import { PortfolioProvider } from '@/context/PortfolioContext'

import router from '@/router'
import '@/styles/globals.css'

createRoot(document.getElementById('root')).render(
<StrictMode>
<ThemeProvider>
<AuthProvider>
<PortfolioProvider>
<RouterProvider router={router} />
<Toaster
position="top-right"
gutter={8}
toastOptions={{
duration: 3500,
style: {
background:   'var(--toast-bg,    #18181b)',
color:        'var(--toast-color,  #f4f4f5)',
border:       '1px solid var(--toast-border, rgba(255,255,255,0.08))',
borderRadius: '12px',
fontSize:     '13px',
fontFamily:   'Inter, sans-serif',
padding:      '10px 14px',
},
success: { iconTheme: { primary: '#22c55e', secondary: 'white' } },
error:   { iconTheme: { primary: '#ef4444', secondary: 'white' } },
}}
/>
</PortfolioProvider>
</AuthProvider>
</ThemeProvider>
</StrictMode>,
)