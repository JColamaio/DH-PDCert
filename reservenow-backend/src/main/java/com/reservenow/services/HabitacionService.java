package com.reservenow.services;

import com.reservenow.dto.HabitacionDTO;
import com.reservenow.model.Habitacion;
import com.reservenow.model.Imagen;
import com.reservenow.repository.HabitacionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Collections;

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
    public Optional<Habitacion> obtenerPorId(Long id) {
        return habitacionRepository.findById(id);
    }
    
    public Habitacion actualizarDesdeDTO(Habitacion habitacion, HabitacionDTO dto) {
        habitacion.setNombre(dto.getNombre());
        habitacion.setDescripcion(dto.getDescripcion());
        habitacion.setPrecioPorNoche(dto.getPrecioPorNoche());
        habitacion.setDisponible(dto.getDisponible());
        return habitacionRepository.save(habitacion);
    }
    public boolean existePorId(Long id) {
        return habitacionRepository.existsById(id);
    }
    
    public void eliminarPorId(Long id) {
        habitacionRepository.deleteById(id);
    }

    public List<Habitacion> listarAleatorias(int cantidad) {
        List<Habitacion> todas = habitacionRepository.findAll();
        Collections.shuffle(todas);
        return todas.stream().limit(cantidad).toList();
    }
    
    
}
