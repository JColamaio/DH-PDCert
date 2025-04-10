package com.reservenow.config;

import com.reservenow.model.Categoria;
import com.reservenow.model.Habitacion;
import com.reservenow.model.Imagen;
import com.reservenow.model.Role;
import com.reservenow.model.User;
import com.reservenow.repository.CategoriaRepository;
import com.reservenow.repository.HabitacionRepository;
import com.reservenow.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final HabitacionRepository habitacionRepository;
    private final CategoriaRepository categoriaRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (habitacionRepository.count() == 0) {
            Categoria normal = categoriaRepository.save(new Categoria(null, "Normal", "Habitaciones estándar"));
            Categoria premium = categoriaRepository.save(new Categoria(null, "Premium", "Habitaciones premium"));

            List<Habitacion> habitaciones = List.of(
                crearHabitacion("Simple Base", "Habitación para 1 persona", 45.0, true, normal,
                    List.of("https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.311.jpeg")),
                crearHabitacion("Suite Ejecutiva", "Ideal para negocios", 200.0, true, premium,
                    List.of("https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.27.jpeg"))
            );

            habitacionRepository.saveAll(habitaciones);
        }

        if (userRepository.count() == 0) {
            List<User> usuarios = List.of(
                User.builder().name("Admin").email("admin@reservenow.com").password("admin123").role(Role.ADMIN).build(),
                User.builder().name("Carlos").email("carlos@gmail.com").password("123456").role(Role.USER).build(),
                User.builder().name("Lucía").email("lucia@gmail.com").password("123456").role(Role.USER).build()
            );

            userRepository.saveAll(usuarios);
        }
    }

    private Habitacion crearHabitacion(String nombre, String descripcion, Double precio, Boolean disponible, Categoria categoria, List<String> urls) {
        Habitacion habitacion = Habitacion.builder()
            .nombre(nombre)
            .descripcion(descripcion)
            .precioPorNoche(precio)
            .disponible(disponible)
            .categoria(categoria)
            .build();

        List<Imagen> imagenes = urls.stream()
            .map(url -> Imagen.builder().url(url).habitacion(habitacion).build())
            .toList();

        habitacion.setImagenes(imagenes);
        return habitacion;
    }
}
