import { useState } from 'react'

function RegistroUsuario() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [mensaje, setMensaje] = useState(null)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (response.ok) {
        setMensaje('✅ Usuario registrado con éxito')
        setForm({ name: '', email: '', password: '' })
      } else {
        const errorText = await response.text()
        setMensaje(`❌ Error: ${errorText}`)
      }
    } catch (error) {
      setMensaje('❌ Error de red o servidor')
    }
  }

  return (
    <div>
      <h2>Registro de Usuario</h2>
      {mensaje && <div className="alert alert-info">{mensaje}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  )
}

export default RegistroUsuario
