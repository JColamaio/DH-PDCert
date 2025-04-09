import './Footer.css';

function Footer() {
    return (
      <footer className="footer bg-dark text-white mt-5 py-3">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src="/logo192.png" alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
            <span>&copy; {new Date().getFullYear()} ReserveNow. Todos los derechos reservados.</span>
          </div>
          <div className="text-end mt-2 mt-md-0">
            <small>Hecho con 💙 por el Crackensaurio Team</small>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer
  