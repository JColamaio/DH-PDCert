
package com.reservenow.controller;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;

import com.reservenow.services.HabitacionService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Optional;

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
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarHabitacion(@PathVariable Long id, @RequestBody HabitacionDTO dto) {
        if (!habitacionService.existePorId(id)) {
            return ResponseEntity.notFound().build();
        }
    
        Habitacion habitacion = habitacionService.obtenerPorId(id).get();
        Habitacion actualizada = habitacionService.actualizarDesdeDTO(habitacion, dto);
        return ResponseEntity.ok(actualizada);
    }

@DeleteMapping("/{id}")
public ResponseEntity<?> eliminarHabitacion(@PathVariable Long id) {
    if (!habitacionService.existePorId(id)) {
        return ResponseEntity.notFound().build();
    }

    habitacionService.eliminarPorId(id);
    return ResponseEntity.ok("Habitación eliminada correctamente.");
}
@GetMapping("/{id}")
public ResponseEntity<Habitacion> obtenerPorId(@PathVariable Long id) {
    return habitacionService.obtenerPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}
@GetMapping("/aleatorias")
public ResponseEntity<List<Habitacion>> listarAleatorias() {
    return ResponseEntity.ok(habitacionService.listarAleatorias(10));
}
@GetMapping("/buscar")
public ResponseEntity<List<Habitacion>> buscarDisponibles(
        @RequestParam("desde") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
        @RequestParam("hasta") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta) {

    List<Habitacion> disponibles = habitacionService.buscarDisponiblesEntre(desde, hasta);
    return ResponseEntity.ok(disponibles);
}
@GetMapping("/disponibles")
public ResponseEntity<List<Habitacion>> buscarDisponibles(
        @RequestParam String desde,
        @RequestParam String hasta
) {
    List<Habitacion> disponibles = habitacionService.buscarDisponibles(desde, hasta);
    return ResponseEntity.ok(disponibles);
}




}
