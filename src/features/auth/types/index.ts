export type UserRole = 'user' | 'admin' | 'bbf'

export interface AuthState {
  isLoading: boolean
  isAuthenticated: boolean
  role: UserRole | null
}

export interface AuthContextType extends AuthState {
  login: (role: UserRole) => void
  logout: () => void
}
