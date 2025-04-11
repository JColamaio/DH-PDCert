// src/main/java/com/reservenow/services/ReservaService.java
package com.reservenow.services;

import com.reservenow.model.Reserva;
import com.reservenow.repository.ReservaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservaService {

    private final ReservaRepository reservaRepository;

    public List<Long> obtenerIdsHabitacionesOcupadas(LocalDate desde, LocalDate hasta) {
        return reservaRepository.findHabitacionIdsOcupadasEntre(desde, hasta);
    }

    public List<LocalDate> obtenerFechasOcupadas(Long habitacionId) {
        List<Reserva> reservas = reservaRepository.findByHabitacionId(habitacionId);
        List<LocalDate> fechasOcupadas = new ArrayList<>();

        for (Reserva reserva : reservas) {
            LocalDate actual = reserva.getFechaInicio();
            while (!actual.isAfter(reserva.getFechaFin().minusDays(1))) {
                fechasOcupadas.add(actual);
                actual = actual.plusDays(1);
            }
        }

        return fechasOcupadas;
    }
}
