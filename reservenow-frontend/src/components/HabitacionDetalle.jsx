import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import GaleriaImagenes from '../components/GaleriaImagenes'

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
        <h2 className="m-0">{habitacion.nombre}</h2>
        <button className="btn btn-light" onClick={() => navigate(-1)}>← Volver</button>
      </div>

      {/* Body */}
      <div className="container mt-4">
        <p className="lead">{habitacion.descripcion}</p>
        <GaleriaImagenes imagenes={habitacion.imagenes} />

        {/* Galería de imágenes */}
        <div className="row">
          {habitacion.imagenes?.map((url, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <img src={url} alt={`Imagen ${index + 1}`} className="img-fluid rounded shadow-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetalleHabitacion
