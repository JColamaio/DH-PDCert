import { useEffect, useState } from 'react';

function HistorialReservas() {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    fetch(`http://localhost:8080/api/reservas/usuario/${user.id}`)
      .then(res => {
        if (!res.ok) throw new Error("No se pudo obtener el historial");
        return res.json();
      })
      .then(data => setReservas(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className="container mt-4">
      <h2>📜 Historial de Reservas</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      {reservas.length === 0 && !error ? (
        <p className="text-muted">Aún no tienes reservas registradas.</p>
      ) : (
        <div className="row">
          {reservas.map((reserva, idx) => (
            <div key={idx} className="col-md-6 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{reserva.habitacion?.nombre}</h5>
                  <p className="card-text">{reserva.habitacion?.descripcion}</p>
                  <p><strong>Desde:</strong> {reserva.fechaInicio}</p>
                  <p><strong>Hasta:</strong> {reserva.fechaFin}</p>
                  <p className="text-muted">Reserva #{reserva.id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistorialReservas;
