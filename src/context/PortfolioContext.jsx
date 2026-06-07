import { createContext, useReducer, useEffect } from 'react'
import { portfolioReducer, initialPortfolioState } from '@/reducers/portfolioReducer'

export const PortfolioContext = createContext(null)

// Lazy initializer — hydrates drafts + template from localStorage immediately
const init = () => {
  try {
    const drafts   = JSON.parse(localStorage.getItem('dpab_drafts') || '[]')
    const template = localStorage.getItem('dpab_template') || 'minimal'
    return { ...initialPortfolioState, drafts, selectedTemplate: template }
  } catch {
    return initialPortfolioState
  }
}

export const PortfolioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, undefined, init)

  // Sync drafts to localStorage whenever they change
  useEffect(() => {
    try { localStorage.setItem('dpab_drafts', JSON.stringify(state.drafts)) } catch {}
  }, [state.drafts])

  // Sync selected template
  useEffect(() => {
    try { localStorage.setItem('dpab_template', state.selectedTemplate) } catch {}
  }, [state.selectedTemplate])

  return (
    <PortfolioContext.Provider value={{ state, dispatch }}>
      {children}
    </PortfolioContext.Provider>
  )
}