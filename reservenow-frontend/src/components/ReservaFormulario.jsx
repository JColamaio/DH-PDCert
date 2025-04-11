import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DateRange } from 'react-date-range'
import { addDays, format } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { toast } from 'react-toastify'

function ReservaFormulario() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [habitacion, setHabitacion] = useState(null)
  const [fechasOcupadas, setFechasOcupadas] = useState([])
  const [error, setError] = useState(null)
  const [confirmada, setConfirmada] = useState(false)

  const [rango, setRango] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection'
    }
  ])

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    // Obtener info de la habitación
    fetch(`http://localhost:8080/api/habitaciones/${id}`)
      .then(res => res.json())
      .then(data => setHabitacion(data))
      .catch(() => setError("Error al obtener los datos de la habitación"))

    // Obtener fechas ocupadas
    fetch(`http://localhost:8080/api/reservas/ocupadas/${id}`)
      .then(res => res.json())
      .then(data => setFechasOcupadas(data.map(f => new Date(f))))
      .catch(() => setError("Error al obtener disponibilidad"))
  }, [id])

  const estaEnOcupadas = (date) => {
    return fechasOcupadas.some(f => f.toDateString() === date.toDateString())
  }

  const handleConfirmar = async () => {
    if (!user) {
      toast.error("Debes estar logueado para reservar.")
      navigate('/login?redirect=reservar/' + id)
      return
    }

    const fechasInvalidas = []
    let actual = new Date(rango[0].startDate)
    while (actual < rango[0].endDate) {
      if (estaEnOcupadas(actual)) fechasInvalidas.push(actual)
      actual.setDate(actual.getDate() + 1)
    }

    if (fechasInvalidas.length > 0) {
      toast.error("El rango seleccionado incluye fechas ocupadas.")
      return
    }

    const payload = {
      habitacionId: parseInt(id),
      userId: user.id,
      fechaInicio: rango[0].startDate.toISOString().split("T")[0],
      fechaFin: rango[0].endDate.toISOString().split("T")[0]
    }

    try {
      const res = await fetch("http://localhost:8080/api/reservas", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error(await res.text())
      setConfirmada(true)
      toast.success("Reserva confirmada con éxito 🎉")
    } catch (err) {
      toast.error("Error al crear reserva: " + err.message)
    }
  }

  if (error) {
    return <div className="container mt-4 alert alert-danger">{error}</div>
  }

  if (!habitacion) {
    return <div className="container mt-4">Cargando información...</div>
  }

  if (confirmada) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-success">✅ Reserva confirmada</h2>
        <p>Tu reserva fue creada con éxito.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <h2>🛏️ Reservar habitación</h2>

      {/* Info de la habitación */}
      <div className="card my-4 shadow-sm">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={habitacion.imagenes[0]?.url} className="img-fluid rounded-start" alt={habitacion.nombre} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h4 className="card-title">{habitacion.nombre}</h4>
              <p className="card-text text-muted">{habitacion.descripcion}</p>
              <p className="card-text"><strong>Precio:</strong> ${habitacion.precioPorNoche} por noche</p>
              <p><strong>Categoría:</strong> {habitacion.categoria?.nombre}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info del usuario */}
      {user && (
        <div className="mb-4">
          <h5>👤 Datos del usuario</h5>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      {/* Selección de fechas */}
      <div className="mb-4">
        <h5>📅 Selecciona el rango de fechas</h5>
        <DateRange
          editableDateInputs={true}
          onChange={item => setRango([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={rango}
          minDate={new Date()}
          disabledDates={fechasOcupadas}
        />
        <p className="mt-2">
          <strong>Desde:</strong> {format(rango[0].startDate, 'yyyy-MM-dd')} &nbsp; | &nbsp;
          <strong>Hasta:</strong> {format(rango[0].endDate, 'yyyy-MM-dd')}
        </p>
      </div>

      <button className="btn btn-success btn-lg" onClick={handleConfirmar}>
        Confirmar reserva
      </button>
    </div>
  )
}

export default ReservaFormulario
