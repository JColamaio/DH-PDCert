import { useState, useEffect } from 'react'

function CrearHabitacion() {
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [disponible, setDisponible] = useState('true')
  const [imagenes, setImagenes] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [validacion, setValidacion] = useState({})


  useEffect(() => {
    fetch("http://localhost:8080/api/categorias")
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error("Error cargando categorías", err))
  }, [])
  

  const validarFormulario = () => {
    const errores = {}
    if (!nombre.trim()) errores.nombre = true
    if (!descripcion.trim()) errores.descripcion = true
    if (!precio || isNaN(precio) || parseFloat(precio) <= 0) errores.precio = true
    if (!categoriaId) errores.categoriaId = true
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
      imagenes: imagenes.split(',').map(url => url.trim()),
      categoriaId: parseInt(categoriaId)
    }

    try {
      const res = await fetch('http://localhost:8080/api/habitaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaHabitacion)
      })

      if (res.ok) {
        alert('Habitación creada con éxito!')
        setNombre('')
        setDescripcion('')
        setPrecio('')
        setDisponible('true')
        setImagenes('')
        setCategoriaId('')
        setValidacion({})
      } else {
        const error = await res.text()
        alert('Error al crear habitación: ' + error)
      }
    } catch (err) {
      console.error(err)
      alert('Error de red')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h2>Crear Habitación</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className={`form-control ${validacion.nombre ? 'is-invalid' : ''}`} value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className={`form-control ${validacion.descripcion ? 'is-invalid' : ''}`} value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio por noche</label>
          <input type="number" className={`form-control ${validacion.precio ? 'is-invalid' : ''}`} value={precio} onChange={e => setPrecio(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Disponible</label>
          <select className="form-select" value={disponible} onChange={e => setDisponible(e.target.value)}>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Imágenes (URLs separadas por coma)</label>
          <input type="text" className="form-control" value={imagenes} onChange={e => setImagenes(e.target.value)} />
        </div>

        <div className="mb-3">
  <label className="form-label">Categoría</label>
  <select
    className="form-select"
    value={categoriaId}
    onChange={(e) => setCategoriaId(e.target.value)}
  >
    <option value="">Selecciona una categoría</option>
    {categorias.map(cat => (
      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
    ))}
  </select>
</div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Creando...
            </>
          ) : 'Crear'}
        </button>
      </form>
    </div>
  )
}

export default CrearHabitacion
