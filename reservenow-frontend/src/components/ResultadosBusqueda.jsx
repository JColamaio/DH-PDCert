import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ResultadosBusqueda() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const desde = params.get('desde');
  const hasta = params.get('hasta');

  const [habitaciones, setHabitaciones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (desde && hasta) {
      fetch(`http://localhost:8080/api/habitaciones/disponibles?desde=${desde}&hasta=${hasta}`)
        .then(res => {
          if (!res.ok) throw new Error("Error al obtener habitaciones disponibles");
          return res.json();
        })
        .then(data => setHabitaciones(data))
        .catch(err => setError(err.message));
    }
  }, [desde, hasta]);

  return (
    <div className="container mt-4">
      <h2>🔍 Resultados de búsqueda</h2>
      <p>Desde: <strong>{desde}</strong></p>
      <p>Hasta: <strong>{hasta}</strong></p>

      {error && <div className="alert alert-danger">{error}</div>}

      {habitaciones.length === 0 && !error ? (
        <p className="text-muted">No se encontraron habitaciones disponibles.</p>
      ) : (
        <div className="row">
          {habitaciones.map(h => (
            <div className="col-md-4 mb-3" key={h.id}>
              <div className="card shadow-sm">
                <img src={h.imagenes[0]?.url} className="card-img-top" alt={h.nombre} />
                <div className="card-body">
                  <h5 className="card-title">{h.nombre}</h5>
                  <p className="card-text text-muted">{h.descripcion}</p>
                  <p><strong>${h.precioPorNoche}</strong> por noche</p>
                  <a href={`/habitaciones/${h.id}`} className="btn btn-outline-primary">Ver más</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResultadosBusqueda;
