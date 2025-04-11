import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const mensajeLogin = location.state?.mensaje || null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(errText)
      }

      const user = await res.json()
      localStorage.setItem('user', JSON.stringify(user))
      toast.success(`¡Bienvenido ${user.name}!`, {
        icon: '👋',
        position: 'top-center',
      })

      if (user.role === 'ADMIN') {
        navigate('/administracion')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError(err.message)
      toast.error('Email o contraseña incorrectos 😓', {
        icon: '❌',
        position: "top-center"
      })
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Iniciar sesión</h2>

      {mensajeLogin && <div className="alert alert-warning">{mensajeLogin}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  )
}

export default Login
