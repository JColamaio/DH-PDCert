import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Administracion.css'

function Administracion() {
  const [esMobile, setEsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setEsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (esMobile) {
    return (
      <div className="container mt-5 text-center">
        <h3>📵 Acceso no disponible en dispositivos móviles</h3>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Panel de Administración</h2>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h5 className="card-title">Agregar Producto</h5>
            <p className="card-text">Registrar una nueva habitación en el sistema.</p>
            <Link to="/crear-habitacion" className="btn btn-primary">Ir a Crear</Link>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h5 className="card-title">Lista de Productos</h5>
            <p className="card-text">Ver todas las habitaciones registradas.</p>
            <Link to="/" className="btn btn-outline-primary">Ver Lista</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Administracion
