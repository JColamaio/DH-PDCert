import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import RegistroUsuario from './pages/RegistroUsuario'
import Habitaciones from './pages/Habitaciones'
import CrearHabitacion from './pages/CrearHabitacion'

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Habitaciones />} />
          <Route path="/register" element={<RegistroUsuario />} />
          <Route path="/crear-habitacion" element={<CrearHabitacion />} />
        </Routes>
      </div>
    </>
  )
}

export default App
