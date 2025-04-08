package com.reservenow.service;

import com.reservenow.dto.HabitacionDTO;
import com.reservenow.model.Habitacion;
import com.reservenow.model.Imagen;
import com.reservenow.repository.HabitacionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HabitacionService {

    private final HabitacionRepository habitacionRepository;

    public boolean existePorNombre(String nombre) {
        return habitacionRepository.existsByNombre(nombre);
    }

    public Habitacion crearDesdeDTO(HabitacionDTO dto) {
        Habitacion habitacion = Habitacion.builder()
                .nombre(dto.getNombre())
                .descripcion(dto.getDescripcion())
                .precioPorNoche(dto.getPrecioPorNoche())
                .disponible(dto.getDisponible())
                .build();

        List<Imagen> imagenes = dto.getImagenes().stream()
                .map(url -> Imagen.builder()
                        .url(url)
                        .habitacion(habitacion)
                        .build())
                .toList();

        habitacion.setImagenes(imagenes);

        return habitacionRepository.save(habitacion);
    }

    public List<Habitacion> listarTodas() {
        return habitacionRepository.findAll();
    }
}
