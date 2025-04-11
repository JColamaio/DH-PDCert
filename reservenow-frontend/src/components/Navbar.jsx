import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand" to="/">ReserveNow</NavLink>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Habitaciones</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">Registro</NavLink>
          </li>

          {!user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
          )}

          {user && (
            <>
              {user.role === 'ADMIN' && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/administracion">Administración</NavLink>
                </li>
              )}

              <li className="nav-item d-flex align-items-center text-white mx-2">
                👤 {user.name} ({user.role})
              </li>
              <li className="nav-item">
                <button className="btn btn-sm btn-outline-light ms-2" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
