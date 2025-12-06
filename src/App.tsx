import { Routes, Route, Navigate } from 'react-router'
import { BBFAdminPage } from './pages/BBFPage'
import { Departament, DepartamentItems, DepartamentItem, NotFound } from './pages'
import { LoginForm } from './features/auth/components'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/bbf-admin" element={<BBFAdminPage />} />
      <Route path="/department" element={<Departament />} />
      <Route path="/department/items" element={<DepartamentItems />} />
      <Route path="/department/items/item" element={<DepartamentItem />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App