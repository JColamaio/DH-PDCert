package com.reservenow.model;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Imagen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La URL de la imagen es obligatoria.")
    private String url;

    @ManyToOne
@JoinColumn(name = "habitacion_id")
@JsonBackReference
private Habitacion habitacion;

}
