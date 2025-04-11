import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CrearHabitacion from './components/CrearHabitacion'
import DetalleHabitacion from './components/HabitacionDetalle'
import Footer from './components/Footer'
import AdminLayout from './components/AdminLayout'
import ListaHabitaciones from './components/ListaHabitaciones'
import ListaUsuarios from './components/ListaUsuarios'
import EditarHabitacion from './components/EditarHabitacion'
import ResultadosBusqueda from './components/ResultadosBusqueda'
import Habitaciones from './pages/Habitaciones'
import RegistroUsuario from './pages/RegistroUsuario'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="container mt-4">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Habitaciones />} />
          <Route path="/register" element={<RegistroUsuario />} />
          <Route path="/habitaciones/:id" element={<DetalleHabitacion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/buscar" element={<ResultadosBusqueda />} />


          {/* Panel administrativo */}
          <Route path="/administracion" element={<AdminLayout />}>
            <Route path="crear-habitacion" element={<CrearHabitacion />} />
            <Route path="lista-habitaciones" element={<ListaHabitaciones />} />
            <Route path="usuarios" element={<ListaUsuarios />} />
            <Route path="editar-habitacion/:id" element={<EditarHabitacion />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App
