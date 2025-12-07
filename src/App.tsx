import { Routes, Route, Navigate } from 'react-router'
import { AuthProvider } from './features/auth/context/index.tsx'
import { BBFAdminPage } from './pages/BBFPage'
import { Departament, DepartamentItems, DepartamentItem, NotFound } from './pages'
import { LoginForm } from './features/auth/components'
import { MainLayout, DepartmentLayout, BBFLayout } from './shared/components/layout'
import { ErrorBoundary, ErrorFallback } from './shared/utils'

function App() {
  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          error={new Error('Wystąpił nieoczekiwany błąd')}
          resetErrorBoundary={() => window.location.reload()}
        />
      }
    >
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginForm />} />
          
          {/* BBF protected routes */}
          <Route element={<BBFLayout />}>
            <Route element={<MainLayout />}>
              <Route path="/bbf-admin" element={<BBFAdminPage />} />
            </Route>
          </Route>

          {/* Department protected routes (user and admin roles) */}
          <Route element={<DepartmentLayout />}>
            <Route element={<MainLayout />}>
              <Route path="/department" element={<Departament />} />
              <Route path="/department/items" element={<DepartamentItems />} />
              <Route path="/department/items/item" element={<DepartamentItem />} />
            </Route>
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App