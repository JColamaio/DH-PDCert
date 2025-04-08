package com.reservenow.repository;

import com.reservenow.model.Habitacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitacionRepository extends JpaRepository<Habitacion, Long> {
    boolean existsByNombre(String nombre);
}
