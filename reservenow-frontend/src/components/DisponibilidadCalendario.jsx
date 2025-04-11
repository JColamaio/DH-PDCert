import { useEffect, useState } from 'react';
import { addDays, format, isBefore, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

function DisponibilidadCalendario({ habitacionId }) {
  const [fechasOcupadas, setFechasOcupadas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/reservas/ocupadas/${habitacionId}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener disponibilidad');
        return res.json();
      })
      .then(data => setFechasOcupadas(data.map(f => new Date(f))))
      .catch(err => setError(err.message));
  }, [habitacionId]);

  const renderCalendario = () => {
    const hoy = new Date();
    const dias = Array.from({ length: 30 }, (_, i) => addDays(hoy, i));

    return (
      <div className="row g-2 mt-3">
        {dias.map(dia => {
          const ocupado = fechasOcupadas.some(f => isSameDay(f, dia));
          const clase = isBefore(dia, hoy)
            ? 'bg-secondary text-white opacity-50'
            : ocupado
            ? 'bg-danger text-white'
            : 'bg-success text-white';

          return (
            <div key={dia.toISOString()} className="col-4 col-sm-2 text-center">
              <div className={`p-2 border rounded ${clase}`}>
                {format(dia, 'dd MMM', { locale: es })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mt-5">
      <h4 className="fw-bold">Disponibilidad</h4>
      <p className="text-muted">Verifica los días ocupados y disponibles en el calendario.</p>
      {error ? (
        <div className="alert alert-danger">
          {error} <br />
          <small>Intenta nuevamente más tarde.</small>
        </div>
      ) : (
        renderCalendario()
      )}
    </div>
  );
}

export default DisponibilidadCalendario;
