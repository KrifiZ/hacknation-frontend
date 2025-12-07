import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../../features/auth/hooks'

export function DepartmentLayout() {
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

  if (role !== 'user' && role !== 'admin') {
    // Redirect to appropriate page based on role
    if (role === 'bbf') {
      return <Navigate to="/bbf-admin" replace />
    }
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
