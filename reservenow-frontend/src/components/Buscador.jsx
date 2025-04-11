import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'

function Buscador() {
  const [fechaDesde, setFechaDesde] = useState(null)
  const [fechaHasta, setFechaHasta] = useState(null)
  const navigate = useNavigate()

  const handleBuscar = () => {
    if (!fechaDesde || !fechaHasta) {
      alert("Seleccioná ambas fechas")
      return
    }

    // Redirige con query params para buscarlas
    const desdeStr = fechaDesde.toISOString().split('T')[0]
    const hastaStr = fechaHasta.toISOString().split('T')[0]
    navigate(`/buscar?desde=${desdeStr}&hasta=${hastaStr}`)
  }

  return (
    <div className="bg-light p-4 rounded shadow-sm mt-4">
      <h3 className="mb-3 fw-bold">🔎 Buscar habitaciones</h3>
      <p>Seleccioná un rango de fechas para ver qué habitaciones están disponibles.</p>

      <div className="row align-items-end">
        <div className="col-md-4 mb-3">
          <label className="form-label">Desde</label>
          <DatePicker
            selected={fechaDesde}
            onChange={(date) => setFechaDesde(date)}
            selectsStart
            startDate={fechaDesde}
            endDate={fechaHasta}
            className="form-control"
            dateFormat="yyyy-MM-dd"
            placeholderText="Elegí la fecha"
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Hasta</label>
          <DatePicker
            selected={fechaHasta}
            onChange={(date) => setFechaHasta(date)}
            selectsEnd
            startDate={fechaDesde}
            endDate={fechaHasta}
            minDate={fechaDesde}
            className="form-control"
            dateFormat="yyyy-MM-dd"
            placeholderText="Elegí la fecha"
          />
        </div>
        <div className="col-md-4 mb-3">
          <button className="btn btn-primary w-100" onClick={handleBuscar}>
            Buscar habitaciones
          </button>
        </div>
      </div>
    </div>
  )
}

export default Buscador
