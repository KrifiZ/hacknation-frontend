import { Routes, Route, Navigate } from 'react-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthProvider } from './features/auth/context/index.tsx'
import { LoginForm } from './features/auth/components'
import { Home, About, Contact, Departament, DepartamentItems, DepartamentItem, NotFound } from './pages'
import { BBFAdminPage } from './pages/BBFPage'
import { MainLayout, DepartmentLayout, BBFLayout } from './shared/components/layout'
import { ErrorBoundary, ErrorFallback } from './shared/utils'

const queryClient = new QueryClient()

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
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginForm />} />

            {/* Public routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

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
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App