import { Routes, Route } from 'react-router'
import { BBFAdminPage } from './pages/BBFPage'
import { Home, About, Contact, Departament, DepartamentItems, DepartamentItem } from './pages'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bbf-admin" element={<BBFAdminPage />} />
        <Route path="/department" element={<Departament />} />
        <Route path="/department/items" element={<DepartamentItems />} />
        <Route path="/department/items/item" element={<DepartamentItem />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App

