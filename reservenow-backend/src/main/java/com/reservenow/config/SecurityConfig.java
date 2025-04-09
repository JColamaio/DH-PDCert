package com.reservenow.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // solo para pruebas, cuidado en producción
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/users/**").permitAll()
                .requestMatchers("/api/habitaciones/**").permitAll() // <- permitir sin login
                .anyRequest().authenticated()
            )
            .httpBasic(); // o .formLogin() si tenés un login web

        return http.build();
    }
}

