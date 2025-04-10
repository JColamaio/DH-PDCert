# 🏨 ReserveNow - Documentación Sprint 1

---

## 🌟 Definición del Proyecto

**Nombre:** ReserveNow  
**Descripción:** Sistema de reservas de habitaciones para un hotel único.

---

## 📅 Objetivo Sprint 1

Desarrollar el backend funcional con operaciones CRUD para habitaciones, registro de usuarios, pruebas unitarias y documentación básica del sistema.

---

## 📄 Funcionalidades implementadas

- ✅ Registro de usuarios mediante `POST /api/users/register`
- ✅ Creación de habitaciones mediante `POST /api/habitaciones`
- ✅ Listado de habitaciones mediante `GET /api/habitaciones`

---

## 🚀 Tecnologías utilizadas

- Java 17
- Spring Boot 3.2.5
- Spring Data JPA
- Spring Security (mínimo)
- H2 Database
- Jakarta Validation
- JUnit 5 (Pruebas unitarias)
- Lombok
- Maven

---

## 📃 Casos de prueba documentados

| #  | Método | Endpoint                  | Entrada                                              | Resultado Esperado                                |
|----|--------|---------------------------|------------------------------------------------------|---------------------------------------------------|
| 1  | POST   | `/api/users/register`     | `{ name, email, password }`                          | ✅ Usuario registrado correctamente               |
| 2  | POST   | `/api/users/register`     | `{ email duplicado }`                                | ❌ Error: email ya registrado                     |
| 3  | POST   | `/api/habitaciones`       | DTO con nombre, descripcion, precio, disponible, imágenes | ✅ Habitación creada correctamente         |
| 4  | POST   | `/api/habitaciones`       | nombre ya existente                                   | ❌ Error: ya existe habitación con ese nombre     |
| 5  | GET    | `/api/habitaciones`       | -                                                    | ✅ Lista de habitaciones existentes (JSON)        |

---

## ✅ Tests automatizados con JUnit

Se realizaron pruebas unitarias en `HabitacionServiceTest`:

- 🔧 Creación de habitación desde DTO
- 🔍 Verificación de existencia por nombre

### 📦 Cómo correr los tests

```bash
mvn test

🔐 Seguridad (Sprint 1)
Todos los endpoints están actualmente sin requerir autenticación.

Spring Security está presente, pero configurado para permitir acceso libre.

En Sprint 2 se avanzará con roles y protección real de endpoints.

📊 Base de datos
Se utiliza H2 en memoria

Los datos se reinician con cada ejecución

Consola H2 disponible en: http://localhost:8080/h2-console

JDBC URL: jdbc:h2:mem:testdb

User: sa

Password: (vacío)

🎨 Identidad Visual y Paleta de Colores
Paleta de colores base:

Azul primario: #0d6efd

Azul oscuro: #1e2a38

Gris claro: #f8f9fa

Blanco: #ffffff

Gris texto: #333333

Tipografía: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif

Logo de marca: ReserveNow (texto con estilo) — se reemplazará en Sprint 2 por diseño gráfico definitivo.

✅ Estado al cierre del Sprint 1
Requisito	Estado
Backend funcional	✅
CRUD habitaciones listo	✅
Registro de usuarios	✅
Tests con JUnit corriendo correctamente	✅
Documentación de funcionalidades y pruebas	✅
Listo para iniciar el Sprint 2 con React	🚀