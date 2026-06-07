import { createContext, useReducer, useEffect, useCallback } from 'react'
import { authReducer, initialAuthState } from '@/reducers/authReducer'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)

  // Restore session on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('dpab_user')
      if (raw) {
        dispatch({ type: 'RESTORE_SESSION', payload: JSON.parse(raw) })
      } else {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    } catch {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  const login = useCallback((userData) => {
    try { localStorage.setItem('dpab_user', JSON.stringify(userData)) } catch {}
    dispatch({ type: 'LOGIN', payload: userData })
  }, [])

  const logout = useCallback(() => {
    try { localStorage.removeItem('dpab_user') } catch {}
    dispatch({ type: 'LOGOUT' })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}