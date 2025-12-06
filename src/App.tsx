import { Routes, Route } from 'react-router'
import { Home, About, Contact, Departament, DepartamentItems, DepartamentItem } from './pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/department" element={<Departament />} />
      <Route path="/department/items" element={<DepartamentItems />} />
      <Route path="/department/items/item" element={<DepartamentItem />} />
    </Routes>
  )
}

export default App

