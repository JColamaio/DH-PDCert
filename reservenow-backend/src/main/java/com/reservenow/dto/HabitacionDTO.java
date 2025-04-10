package com.reservenow.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HabitacionDTO {
    private String nombre;
    private String descripcion;
    private Double precioPorNoche;
    private Boolean disponible;
    private List<String> imagenes;
    private Long categoriaId; // Nuevo campo
}

