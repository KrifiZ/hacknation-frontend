import { Routes, Route } from 'react-router'
import { Home, About, Contact } from './pages'
import { BBFAdminPage } from './pages/BBFPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/bbf-admin" element={<BBFAdminPage />} />
    </Routes>
  )
}

export default App

