import { useState, useRef, useEffect } from 'react'

function CrearHabitacion() {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [disponible, setDisponible] = useState('true')
  const [imagenes, setImagenes] = useState('')
  const [loading, setLoading] = useState(false)
  const [validacion, setValidacion] = useState({})

  const modalRef = useRef(null)
  const bsModal = useRef(null)

  useEffect(() => {
    if (modalRef.current && window.bootstrap) {
      bsModal.current = new window.bootstrap.Modal(modalRef.current)
    }
  }, [])

  const validarFormulario = () => {
    const errores = {}
    if (!nombre.trim()) errores.nombre = true
    if (!descripcion.trim()) errores.descripcion = true
    if (!precio || isNaN(precio) || parseFloat(precio) <= 0) errores.precio = true
    setValidacion(errores)
    return Object.keys(errores).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return
    setLoading(true)

    const nuevaHabitacion = {
      nombre,
      descripcion,
      precioPorNoche: parseFloat(precio),
      disponible: disponible === 'true',
      imagenes: imagenes.split(',').map(url => url.trim())
    }

    try {
      const response = await fetch('http://localhost:8080/api/habitaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaHabitacion)
      })

      if (response.ok) {
        bsModal.current.show()
        setNombre('')
        setDescripcion('')
        setPrecio('')
        setDisponible('true')
        setImagenes('')
        setValidacion({})
      } else {
        const error = await response.text()
        alert("Error al crear habitación: " + error)
      }
    } catch (err) {
      console.error(err)
      alert("Error de red")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2 className="mb-4">🛏️ Crear Habitación</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className={`form-control ${validacion.nombre ? 'is-invalid' : ''}`}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className={`form-control ${validacion.descripcion ? 'is-invalid' : ''}`}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio por Noche</label>
          <input
            type="number"
            min="1"
            step="any"
            className={`form-control ${validacion.precio ? 'is-invalid' : ''}`}
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Disponible</label>
          <select
            className="form-select"
            value={disponible}
            onChange={(e) => setDisponible(e.target.value)}
          >
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Imágenes (URLs separadas por coma)</label>
          <input
            type="text"
            className="form-control"
            value={imagenes}
            onChange={(e) => setImagenes(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Creando...
            </>
          ) : (
            'Crear'
          )}
        </button>
      </form>

      {/* Modal de éxito */}
      <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">✅ Éxito</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              La habitación fue creada correctamente.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrearHabitacion
