package com.reservenow.services;

import com.reservenow.dto.ReservaRequest;
import com.reservenow.model.Habitacion;
import com.reservenow.model.Reserva;
import com.reservenow.model.User;
import com.reservenow.repository.HabitacionRepository;
import com.reservenow.repository.ReservaRepository;
import com.reservenow.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final HabitacionRepository habitacionRepository;
    private final UserRepository userRepository;

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

    public Reserva crearReserva(ReservaRequest request) {
        Habitacion habitacion = habitacionRepository.findById(request.getHabitacionId())
                .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));

        User usuario = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<Long> ocupadas = reservaRepository.findHabitacionIdsOcupadasEntre(
                request.getFechaInicio(), request.getFechaFin().minusDays(1)
        );

        if (ocupadas.contains(habitacion.getId())) {
            throw new RuntimeException("La habitación no está disponible en esas fechas");
        }

        Reserva reserva = Reserva.builder()
                .fechaInicio(request.getFechaInicio())
                .fechaFin(request.getFechaFin())
                .habitacion(habitacion)
                .usuario(usuario)
                .build();

        return reservaRepository.save(reserva);
    }
    public List<Reserva> obtenerReservasPorUsuario(Long userId) {
        return reservaRepository.findByUsuarioIdOrderByFechaInicioDesc(userId);
    }
    
}
