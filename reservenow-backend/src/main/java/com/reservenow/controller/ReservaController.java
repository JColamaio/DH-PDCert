// src/main/java/com/reservenow/controller/ReservaController.java
package com.reservenow.controller;

import com.reservenow.services.ReservaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@RequiredArgsConstructor
public class ReservaController {

    private final ReservaService reservaService;

    @GetMapping("/ocupadas/{habitacionId}")
    public ResponseEntity<List<LocalDate>> obtenerFechasOcupadas(@PathVariable Long habitacionId) {
        List<LocalDate> fechas = reservaService.obtenerFechasOcupadas(habitacionId);
        return ResponseEntity.ok(fechas);
    }
}
