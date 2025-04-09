import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import RegistroUsuario from './pages/RegistroUsuario'
import Habitaciones from './pages/Habitaciones'
import CrearHabitacion from './components/CrearHabitacion'
import DetalleHabitacion from './components/HabitacionDetalle'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Habitaciones />} />
          <Route path="/register" element={<RegistroUsuario />} />
          <Route path="/crear-habitacion" element={<CrearHabitacion />} />
          <Route path="/habitaciones/:id" element={<DetalleHabitacion />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
