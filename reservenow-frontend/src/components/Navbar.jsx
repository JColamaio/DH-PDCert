import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Logo + Lema */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/869/869636.png"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top me-2"
          />
          <span>ReserveNow · ¡Tu lugar, tu momento!</span>
        </Link>

        {/* Botones */}
        <div className="ms-auto">
          <button className="btn btn-outline-light me-2" disabled>
            Crear cuenta
          </button>
          <button className="btn btn-outline-light" disabled>
            Iniciar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
