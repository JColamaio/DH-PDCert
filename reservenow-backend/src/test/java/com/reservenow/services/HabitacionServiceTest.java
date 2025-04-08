package com.reservenow.services;

import com.reservenow.dto.HabitacionDTO;
import com.reservenow.model.Habitacion;
import com.reservenow.repository.HabitacionRepository;
import org.junit.jupiter.api.Test;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class HabitacionServiceTest {

    private final HabitacionRepository habitacionRepository = mock(HabitacionRepository.class);
    private final HabitacionService habitacionService = new HabitacionService(habitacionRepository);

    @Test
    public void testExistePorNombre() {
        when(habitacionRepository.existsByNombre("Suite")).thenReturn(true);

        boolean existe = habitacionService.existePorNombre("Suite");

        assertTrue(existe);
        verify(habitacionRepository, times(1)).existsByNombre("Suite");
    }

    @Test
    public void testCrearDesdeDTO() {
        HabitacionDTO dto = new HabitacionDTO();
        dto.setNombre("Deluxe");
        dto.setDescripcion("Habitación grande con jacuzzi");
        dto.setPrecioPorNoche(150.0);
        dto.setDisponible(true);
        dto.setImagenes(Collections.singletonList("https://example.com/img.jpg"));

        when(habitacionRepository.save(any(Habitacion.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Habitacion habitacion = habitacionService.crearDesdeDTO(dto);

        assertNotNull(habitacion);
        assertEquals("Deluxe", habitacion.getNombre());
        assertEquals(1, habitacion.getImagenes().size());
        verify(habitacionRepository, times(1)).save(any(Habitacion.class));
    }
}
