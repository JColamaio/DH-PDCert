package com.reservenow.repository;

import com.reservenow.model.Habitacion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HabitacionRepository extends JpaRepository<Habitacion, Long> {
    boolean existsByNombre(String nombre);
    List<Habitacion> findByIdNotIn(List<Long> ids);

}
