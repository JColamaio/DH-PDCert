import { useEffect, useState } from 'react'

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8080/api/users/list")
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener usuarios")
        return res.json()
      })
      .then(data => setUsuarios(data))
      .catch(err => setError(err.message))
  }, [])

  return (
    <div className="mt-4">
      <h2 className="mb-4 fw-bold">👥 Usuarios Registrados</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><span className={`badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-secondary'}`}>{user.role}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListaUsuarios
