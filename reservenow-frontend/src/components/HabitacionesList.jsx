import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './HabitacionesList.css'

const HabitacionesList = () => {
  const [habitaciones, setHabitaciones] = useState([])
  const [error, setError] = useState(null)
  const [paginaActual, setPaginaActual] = useState(1)
  const habitacionesPorPagina = 10

  useEffect(() => {
    fetch("http://localhost:8080/api/habitaciones")
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener habitaciones")
        return res.json()
      })
      .then(data => setHabitaciones(data))
      .catch(err => setError(err.message))
  }, [])

  // Calcular el índice de inicio y final
  const inicio = (paginaActual - 1) * habitacionesPorPagina
  const fin = inicio + habitacionesPorPagina
  const habitacionesPaginadas = habitaciones.slice(inicio, fin)

  const totalPaginas = Math.ceil(habitaciones.length / habitacionesPorPagina)

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina)
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Listado de Habitaciones</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {habitacionesPaginadas.map((hab) => (
          <div className="col-md-4 mb-4" key={hab.id}>
            <div className="card h-100 shadow-sm">
              {hab.imagenes?.length > 0 && (
                <img
                  src={hab.imagenes[0]}
                  className="card-img-top"
                  alt={`Habitación ${hab.nombre}`}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{hab.nombre}</h5>
                <p className="card-text">{hab.descripcion}</p>
                <p className="card-text fw-bold mb-2">Precio por noche: ${hab.precioPorNoche}</p>
                <span className={`badge ${hab.disponible ? 'bg-success' : 'bg-secondary'} mb-3`}>
                  {hab.disponible ? 'Disponible' : 'No disponible'}
                </span>
                <Link to={`/habitaciones/${hab.id}`} className="btn btn-outline-primary mt-auto">Ver más</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            ← Anterior
          </button>
          <span className="align-self-center fw-semibold">Página {paginaActual} de {totalPaginas}</span>
          <button
            className="btn btn-outline-secondary ms-2"
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  )
}

export default HabitacionesList
