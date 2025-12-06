import { Routes, Route } from 'react-router'
import { BBFAdminPage } from './pages/BBFPage'
import { Home, About, Contact, Departament, DepartamentItems, DepartamentItem, NotFound } from './pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/bbf-admin" element={<BBFAdminPage />} />
      <Route path="/department" element={<Departament />} />
      <Route path="/department/items" element={<DepartamentItems />} />
      <Route path="/department/items/item" element={<DepartamentItem />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App