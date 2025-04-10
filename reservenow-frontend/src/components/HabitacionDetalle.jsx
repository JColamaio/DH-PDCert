import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import GaleriaImagenes from './GaleriaImagenes'

function DetalleHabitacion() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [habitacion, setHabitacion] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:8080/api/habitaciones`)
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener habitación")
        return res.json()
      })
      .then(data => {
        const encontrada = data.find(h => h.id === parseInt(id))
        if (encontrada) setHabitacion(encontrada)
        else setError("Habitación no encontrada")
      })
      .catch(err => setError(err.message))
  }, [id])

  if (error) {
    return <div className="container mt-4 alert alert-danger">{error}</div>
  }

  if (!habitacion) {
    return <div className="container mt-4">Cargando...</div>
  }

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="bg-dark text-white p-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="m-0">{habitacion.nombre}</h2>
          {habitacion.categoria?.nombre && (
            <span className="badge bg-info mt-2">
              {habitacion.categoria.nombre}
            </span>
          )}
        </div>
        <button className="btn btn-light" onClick={() => navigate(-1)}>← Volver</button>
      </div>

      {/* Body */}
      <div className="container mt-4">
        <p className="lead">{habitacion.descripcion}</p>

        {/* Galería de imágenes */}
        <GaleriaImagenes imagenes={habitacion.imagenes?.map(img => img.url)} />
      </div>
    </div>
  )
}

export default DetalleHabitacion
