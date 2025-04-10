import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <NavLink className="navbar-brand" to="/">ReserveNow</NavLink>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Habitaciones</NavLink>
          </li>
          {user ? (
  <>
    <li className="nav-item">
      <span className="nav-link disabled">👤 {user.name}</span>
    </li>
    <li className="nav-item">
      <button className="btn btn-sm btn-outline-light ms-2" onClick={() => {
        localStorage.removeItem('user')
        window.location.href = '/'
      }}>
        Logout
      </button>
    </li>
  </>
) : (
  <>
    <li className="nav-item">
      <NavLink className="nav-link" to="/register">Registro</NavLink>
    </li>
  </>
)}
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li>
          {user?.role === 'ADMIN' && (
  <li className="nav-item">
    <NavLink className="nav-link" to="/administracion">Administración</NavLink>
  </li>
)}

        </ul>
      </div>
    </nav>
  )
}

export default Navbar
