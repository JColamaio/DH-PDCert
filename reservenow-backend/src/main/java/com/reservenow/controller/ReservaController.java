package com.reservenow.controller;

import com.reservenow.dto.ReservaRequest;
import com.reservenow.model.Reserva;
import com.reservenow.services.ReservaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@RequiredArgsConstructor
public class ReservaController {

    private final ReservaService reservaService;

    @PostMapping
    public ResponseEntity<?> crearReserva(@Valid @RequestBody ReservaRequest request) {
        try {
            Reserva reserva = reservaService.crearReserva(request);
            return ResponseEntity.ok(reserva);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/ocupadas/{habitacionId}")
    public ResponseEntity<List<LocalDate>> fechasOcupadas(@PathVariable Long habitacionId) {
        return ResponseEntity.ok(reservaService.obtenerFechasOcupadas(habitacionId));
    }
    @GetMapping("/usuario/{userId}")
public ResponseEntity<List<Reserva>> reservasPorUsuario(@PathVariable Long userId) {
    return ResponseEntity.ok(reservaService.obtenerReservasPorUsuario(userId));
}

}
