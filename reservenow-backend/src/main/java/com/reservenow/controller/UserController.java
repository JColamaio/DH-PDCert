package com.reservenow.controller;

import com.reservenow.dto.RegisterRequest;
import com.reservenow.model.Role;
import com.reservenow.model.User;
import com.reservenow.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Ese email ya está registrado.");
        }

        User user = User.builder()
        .name(request.getName())
        .lastName(request.getLastName())
        .email(request.getEmail())
        .password(request.getPassword()) 
        .role(Role.USER)
        .build();
    

        userRepository.save(user);
        return ResponseEntity.ok("Usuario registrado correctamente.");
    }
    @GetMapping("/list")
public List<User> listarUsuarios() {
    return userRepository.findAll();
}
}
