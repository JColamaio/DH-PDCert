// src/components/EditarHabitacion.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function EditarHabitacion() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [habitacion, setHabitacion] = useState(null)
  const [categorias, setCategorias] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    // Traer habitación actual
    fetch(`http://localhost:8080/api/habitaciones/${id}`)
      .then(res => res.json())
      .then(data => setHabitacion(data))
      .catch(() => setError("Error al cargar la habitación."))

    // Traer categorías disponibles
    fetch(`http://localhost:8080/api/categorias`)
      .then(res => res.json())
      .then(setCategorias)
      .catch(() => setError("Error al cargar categorías."))
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setHabitacion({ ...habitacion, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dto = {
      nombre: habitacion.nombre,
      descripcion: habitacion.descripcion,
      precioPorNoche: parseFloat(habitacion.precioPorNoche),
      disponible: habitacion.disponible,
      imagenes: habitacion.imagenes.map(img => img.url),
      categoriaId: habitacion.categoria.id
    }

    try {
      const res = await fetch(`http://localhost:8080/api/habitaciones/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto)
      })

      if (!res.ok) throw new Error("Error al guardar cambios")
      toast.success("Habitación actualizada correctamente ✨")
      navigate("/administracion/lista-habitaciones")
    } catch (err) {
      setError("Error al guardar")
    }
  }

  if (error) return <div className="alert alert-danger mt-4">{error}</div>
  if (!habitacion) return <div className="mt-4">Cargando...</div>

  return (
    <div className="container mt-4">
      <h2 className="mb-4">✏️ Editar Habitación</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input name="nombre" value={habitacion.nombre} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label>Descripción</label>
          <textarea name="descripcion" value={habitacion.descripcion} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label>Precio por noche</label>
          <input type="number" name="precioPorNoche" value={habitacion.precioPorNoche} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label>Categoría</label>
          <select name="categoria" value={habitacion.categoria.id} onChange={(e) => setHabitacion({ ...habitacion, categoria: { id: parseInt(e.target.value) } })} className="form-select">
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="disponible" checked={habitacion.disponible} onChange={e => setHabitacion({ ...habitacion, disponible: e.target.checked })} />
          <label className="form-check-label" htmlFor="disponible">Disponible</label>
        </div>

        <button type="submit" className="btn btn-success">Guardar cambios</button>
      </form>
    </div>
  )
}

export default EditarHabitacion
