package com.reservenow.controller;

import com.reservenow.dto.LoginRequest;
import com.reservenow.dto.RegisterRequest;
import com.reservenow.model.Role;
import com.reservenow.model.User;
import com.reservenow.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    // Registro de usuario
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Ese email ya está registrado.");
        }

        User user = User.builder()
                .name(request.getName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(request.getPassword()) // ¡Ojo! En producción debe ir encriptada
                .role(Role.USER)
                .build();

        userRepository.save(user);
        return ResponseEntity.ok("Usuario registrado correctamente.");
    }

    // Listado de usuarios
    @GetMapping("/list")
    public List<User> listarUsuarios() {
        return userRepository.findAll();
    }

    // Login de usuario
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Email o contraseña incorrectos.");
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.status(401).body("Email o contraseña incorrectos.");
        }

        // Devuelvo info del usuario (sin password)
        Map<String, Object> datos = new HashMap<>();
        datos.put("id", user.getId());
        datos.put("name", user.getName());
        datos.put("email", user.getEmail());
        datos.put("role", user.getRole());

        return ResponseEntity.ok(datos);
    }
}
