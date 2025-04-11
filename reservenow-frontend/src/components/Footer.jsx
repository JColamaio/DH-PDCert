import './Footer.css';

function Footer() {
  return (
    <footer className="footer bg-dark text-white mt-5 py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src="/public/ReserveNowLOGO.png" alt="Logo" style={{ width: '100px', marginRight: '10px' }} />
          <span className="small mb-0">
            &copy; {new Date().getFullYear()} <strong>ReserveNow</strong>. Todos los derechos reservados.
          </span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
