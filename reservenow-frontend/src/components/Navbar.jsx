import { NavLink } from 'react-router-dom'

function Navbar() {
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

          <li className="nav-item">
  <NavLink className="nav-link" to="/administracion">Administración</NavLink>
</li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
