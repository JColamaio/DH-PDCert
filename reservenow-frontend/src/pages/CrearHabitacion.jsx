function CrearHabitacion() {
    return (
      <div>
        <h2>Crear Habitación</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea className="form-control" rows="3"></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Precio por noche</label>
            <input type="number" className="form-control" />
          </div>
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" />
            <label className="form-check-label">
              Disponible
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">URL de imagen</label>
            <input type="text" className="form-control" />
          </div>
          <button type="submit" className="btn btn-success">Crear</button>
        </form>
      </div>
    )
  }
  
  export default CrearHabitacion
  