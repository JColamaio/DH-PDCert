import { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa' // ícono
import { Link } from 'react-router-dom'

function ListaHabitaciones() {
  const [habitaciones, setHabitaciones] = useState([])
  const [error, setError] = useState(null)

  const fetchHabitaciones = () => {
    fetch('http://localhost:8080/api/habitaciones')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener habitaciones')
        return res.json()
      })
      .then(data => setHabitaciones(data))
      .catch(err => setError(err.message))
  }

  useEffect(() => {
    fetchHabitaciones()
  }, [])

  const eliminarHabitacion = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar esta habitación?')
    if (!confirmar) return

    try {
      const res = await fetch(`http://localhost:8080/api/habitaciones/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        fetchHabitaciones()
      } else {
        alert('Error al eliminar habitación')
      }
    } catch (err) {
      alert('Error de red')
      console.error(err)
    }
  }

  return (
    <div className="mt-4">
      <h2 className="mb-4 fw-bold">🛏 Lista de Habitaciones</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-hover align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Nombre</th>
              <th scope="col" className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map(h => (
              <tr key={h.id}>
                <td>{h.id}</td>
                <td className="fw-medium">{h.nombre}</td>
                <td className="text-center">
                <Link
    to={`/administracion/editar-habitacion/${h.id}`}
    className="btn btn-sm btn-outline-primary"
    title="Editar habitación"
  >
    Editar
  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Eliminar habitación"
                    onClick={() => eliminarHabitacion(h.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListaHabitaciones
