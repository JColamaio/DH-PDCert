package com.reservenow.services;

import com.reservenow.dto.HabitacionDTO;
import com.reservenow.model.Categoria;
import com.reservenow.model.Habitacion;
import com.reservenow.model.Imagen;
import com.reservenow.repository.CategoriaRepository;
import com.reservenow.repository.HabitacionRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class HabitacionService {

    private final HabitacionRepository habitacionRepository;
    private final CategoriaRepository categoriaRepository;
    private final ReservaService reservaService;

    public boolean existePorNombre(String nombre) {
        return habitacionRepository.existsByNombre(nombre);
    }
    
    
    public List<Habitacion> buscarDisponiblesEntre(LocalDate desde, LocalDate hasta) {
        List<Long> ocupadas = reservaService.obtenerIdsHabitacionesOcupadas(desde, hasta);
        if (ocupadas.isEmpty()) {
            return habitacionRepository.findAll(); // Ninguna ocupada
        }
        return habitacionRepository.findByIdNotIn(ocupadas);
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
        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
        .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

habitacion.setCategoria(categoria);

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

        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
            .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        habitacion.setCategoria(categoria);
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
    public List<Habitacion> buscarDisponibles(String desdeStr, String hastaStr) {
    try {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate desde = LocalDate.parse(desdeStr, formatter);
        LocalDate hasta = LocalDate.parse(hastaStr, formatter);

        // Aquí deberíamos tener lógica con reservas reales
        // De momento, devolvemos todas disponibles como placeholder
        return habitacionRepository.findAll().stream()
                .filter(Habitacion::getDisponible) // filtramos solo disponibles
                .toList();

    } catch (DateTimeParseException e) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Formato de fecha inválido");
    }
}

    
    
}
