// src/components/HabitacionesList.jsx
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './HabitacionesList.css';
const HabitacionesList = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/habitaciones")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener habitaciones");
        }
        return res.json();
      })
      .then((data) => setHabitaciones(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Listado de Habitaciones</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {habitaciones.map((hab) => (
          <div className="col-md-4 mb-4" key={hab.id}>
            <div className="card h-100">
              {hab.imagenes?.length > 0 && (
                <img src={hab.imagenes[0]} className="card-img-top" alt="Habitación" style={{ height: '200px', objectFit: 'cover' }} />
              )}
              <div className="card-body">
                <h5 className="card-title">{hab.nombre}</h5>
                <p className="card-text">{hab.descripcion}</p>
                <p className="card-text fw-bold">Precio por noche: ${hab.precioPorNoche}</p>
                <span className={`badge ${hab.disponible ? 'bg-success' : 'bg-secondary'}`}>
                  {hab.disponible ? 'Disponible' : 'No disponible'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitacionesList;
