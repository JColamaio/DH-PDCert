// src/main/java/com/reservenow/repository/CaracteristicaRepository.java
package com.reservenow.repository;

import com.reservenow.model.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Long> {
}
