
package com.reservenow.controller;

import org.springframework.http.ResponseEntity;
import java.util.List;

import com.reservenow.services.HabitacionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import com.reservenow.dto.HabitacionDTO;
import com.reservenow.model.Habitacion;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/habitaciones")
public class HabitacionController {

    private final HabitacionService habitacionService;

    @PostMapping
    public ResponseEntity<?> crearHabitacion(@Valid @RequestBody HabitacionDTO dto) {
        if (habitacionService.existePorNombre(dto.getNombre())) {
            return ResponseEntity.badRequest().body("Ya existe una habitación con ese nombre.");
        }

        Habitacion habitacion = habitacionService.crearDesdeDTO(dto);
        return ResponseEntity.ok(habitacion);
    }

    @GetMapping
    public ResponseEntity<List<Habitacion>> listarTodas() {
        return ResponseEntity.ok(habitacionService.listarTodas());
    }
}
