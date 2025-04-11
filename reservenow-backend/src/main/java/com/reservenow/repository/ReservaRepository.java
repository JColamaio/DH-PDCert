// src/main/java/com/reservenow/repository/ReservaRepository.java
package com.reservenow.repository;

import com.reservenow.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    @Query("SELECT r.habitacion.id FROM Reserva r WHERE " +
           "(r.fechaInicio <= :fechaFin AND r.fechaFin >= :fechaInicio)")
    List<Long> findHabitacionIdsOcupadasEntre(LocalDate fechaInicio, LocalDate fechaFin);

    @Query("SELECT r FROM Reserva r WHERE r.habitacion.id = :habitacionId")
    List<Reserva> findByHabitacionId(Long habitacionId);
    List<Reserva> findByUsuarioIdOrderByFechaInicioDesc(Long usuarioId);

}
