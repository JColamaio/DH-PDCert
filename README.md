ReserveNow 🏨

Plataforma de reservas de habitaciones de hotel desarrollada como proyecto académico siguiendo una planificación por sprints y metodologías ágiles.

Paleta de Colores

Primario (Navbar y botones): #1e2a38 (azul oscuro)

Texto principal: #333333

Fondo: #ffffff

Botones secundarios: #0d6efd y #0b5ed7

Tecnologías utilizadas

Backend (Spring Boot)

Java 17

Spring Boot 3

Spring Security

JPA / Hibernate

H2 (desarrollo) / Soporte para PostgreSQL

Lombok

Frontend (React)

React 18 + React Router

Bootstrap 5

Date-fns / react-date-range

Toastify para notificaciones

Arquitectura general

Separación en capas: Controller - Service - Repository - DTO

Seguridad básica con autenticación mediante login y manejo de roles

Almacenamiento en memoria de usuarios, habitaciones, reservas y categorías

Funcionalidades por Sprint

Sprint 1 - Alta prioridad

Registro de usuarios con validación

Login con persistencia en localStorage

Navbar dinámico según sesión (mostrar nombre, rol y logout)

CRUD de habitaciones con:

Nombre, descripción, precio, disponibilidad

Imágenes por habitación (1+)

Características e iconos

Visualización de habitaciones en tarjetas

Categorías (Normal / Premium)

Sprint 2 - Gestión de usuarios y filtros

Visualización de usuarios registrados (solo admin)

Vista de detalle de cada habitación

Filtro por categorías (recomendaciones)

Buscador de habitaciones por rango de fechas

Sugerencias interactivas y autocompletado

 Sprint 3 - Proceso de reserva

Mostrar disponibilidad con calendario (fechas ocupadas en rojo)

Página de reserva con calendario para seleccionar fechas

Validación para impedir reservar fechas ocupadas

Visualización de los datos del usuario que realiza la reserva

Confirmación de reserva exitosa o mensaje de error específico

 Sprint 4 - Historial y navegación

Historial de reservas por usuario autenticado

Visualización de reservas previas con:

Nombre del producto

Fecha de inicio y fin

Vista de confirmación post-reserva

Footer profesional con logo y branding

Navbar fijo al hacer scroll

 Estructura de carpetas (frontend)
src/
├── assets/             # Imágenes y recursos estáticos
├── components/         # Componentes reutilizables
├── pages/              # Páginas principales (Habitaciones, Login, Registro...)
├── App.jsx             # Rutas generales
├── index.js            # Entry point
└── App.css             # Estilos globales

 Tests

Pruebas unitarias del HabitacionService con JUnit y Mockito (Backend)

 Para correr el proyecto

Backend:
cd resourcenow-backend
./mvnw spring-boot:run
Frontend:
cd resourcenow-frontend
npm install
npm run dev

