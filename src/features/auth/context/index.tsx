import { createContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { AuthContextType, UserRole } from '../types'

const AUTH_STORAGE_KEY = 'auth_state'

interface StoredAuthState {
  isAuthenticated: boolean
  role: UserRole | null
}

function getStoredAuth(): StoredAuthState {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // Ignore parsing errors
  }
  return { isAuthenticated: false, role: null }
}

function setStoredAuth(state: StoredAuthState) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state))
}

function clearStoredAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const storedAuth = getStoredAuth()
  const [isAuthenticated, setIsAuthenticated] = useState(storedAuth.isAuthenticated)
  const [role, setRole] = useState<UserRole | null>(storedAuth.role)

  const login = useCallback((userRole: UserRole) => {
    setIsLoading(true)
    // Simulate async login
    setTimeout(() => {
      setIsAuthenticated(true)
      setRole(userRole)
      setStoredAuth({ isAuthenticated: true, role: userRole })
      setIsLoading(false)
    }, 500)
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
    setRole(null)
    clearStoredAuth()
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
