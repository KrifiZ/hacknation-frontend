import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../../features/auth/hooks'

export function BBFLayout() {
  const { isAuthenticated, role, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (role !== 'bbf') {
    // Redirect to appropriate page based on role
    if (role === 'admin') {
      return <Navigate to="/admin" replace />
    }
    return <Navigate to="/department" replace />
  }

  return <Outlet />
}
