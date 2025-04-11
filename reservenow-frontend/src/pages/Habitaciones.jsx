import HabitacionesList from "../components/HabitacionesList";
import Buscador from "../components/Buscador";

function Habitaciones() {
  return (
    <div className="container mt-4">
      {/* Bloque de búsqueda con doble calendario */}
      <Buscador />

      <hr className="my-4" />

      {/* Título y listado de habitaciones */}
      <h2 className="mb-4">🛏 Habitaciones disponibles</h2>
      <HabitacionesList />
    </div>
  );
}

export default Habitaciones;
