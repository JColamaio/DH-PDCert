// src/components/AdminLayout.jsx
import { Link, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

function AdminLayout() {
  const [esMobile, setEsMobile] = useState(false)

  useEffect(() => {
    const ancho = window.innerWidth
    if (ancho < 768) setEsMobile(true)
  }, [])

  if (esMobile) {
    return (
      <div className="container mt-5 text-center">
        <h3 className="text-danger">⚠️ Panel no disponible en dispositivos móviles.</h3>
      </div>
    )
  }

  return (
    <div className="d-flex">
      <aside className="bg-dark text-white p-3" style={{ width: '250px', minHeight: '100vh' }}>
        <h5>Panel Admin</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/administracion/crear-habitacion" className="nav-link text-white">Crear Habitación</Link>
          </li>
          <li className="nav-item">
            <Link to="/administracion/lista-habitaciones" className="nav-link text-white">Lista de Habitaciones</Link>
          </li>
          <li className="nav-item">
  <Link to="/administracion/usuarios" className="nav-link text-white">Usuarios</Link>
</li>

        </ul>
      </aside>
      <main className="p-4 flex-grow-1 w-100">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
