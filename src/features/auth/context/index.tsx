import { createContext, useState, useCallback, type ReactNode } from 'react'
import type { AuthContextType, UserRole } from '../types'

export const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState<UserRole | null>(null)

  const login = useCallback((userRole: UserRole) => {
    setIsLoading(true)
    // Simulate async login
    setTimeout(() => {
      setIsAuthenticated(true)
      setRole(userRole)
      setIsLoading(false)
    }, 500)
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setRole(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
