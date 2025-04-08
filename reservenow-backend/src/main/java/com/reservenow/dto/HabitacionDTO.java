package com.reservenow.dto;

import lombok.Data;

import java.util.List;

@Data
public class HabitacionDTO {
    private String nombre;
    private String descripcion;
    private Double precioPorNoche;
    private Boolean disponible;
    private List<String> imagenes; // Lista de URLs
}
