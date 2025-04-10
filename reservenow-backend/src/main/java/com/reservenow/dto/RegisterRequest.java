package com.reservenow.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    @Valid
    @NotBlank(message = "El nombre es obligatorio")
    private String name;

    @Email(message = "El email no es válido")
    @NotBlank(message = "El email es obligatorio")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    private String password;
    @NotBlank(message = "El apellido es obligatorio")
    private String lastName;

}
