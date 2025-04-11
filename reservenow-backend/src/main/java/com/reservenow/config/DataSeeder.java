package com.reservenow.config;

import com.reservenow.model.*;
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
                    List.of("https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.311.jpeg"),
                    List.of(wifi(), tv())),

                crearHabitacion("Doble Standard", "Para 2 personas, buena vista", 75.0, true, normal,
                    List.of("https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.281.jpeg"),
                    List.of(wifi(), tv(), aire())),

                crearHabitacion("Triple Premium", "Espaciosa y equipada para 3 personas", 120.0, true, premium,
                    List.of("https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.28.jpeg"),
                    List.of(wifi(), tv(), aire(), minibar())),

                crearHabitacion("Cuádruple Familiar", "Perfecta para familias", 150.0, true, premium,
                    List.of("https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.283.jpeg"),
                    List.of(wifi(), tv(), aire(), minibar(), vista())),

                crearHabitacion("Suite Ejecutiva", "Ideal para negocios", 200.0, true, premium,
                    List.of("https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.27.jpeg"),
                    List.of(wifi(), tv(), aire(), minibar(), jacuzzi(), vista())),

                crearHabitacion("Suite Presidencial", "Máximo lujo y confort", 350.0, true, premium,
                    List.of("https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.33.jpeg"),
                    List.of(wifi(), tv(), aire(), minibar(), jacuzzi(), vista()))
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

    private Habitacion crearHabitacion(String nombre, String descripcion, Double precio, Boolean disponible, Categoria categoria, List<String> urls, List<Caracteristica> caracteristicas) {
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

        caracteristicas.forEach(c -> c.setHabitacion(habitacion));

        habitacion.setImagenes(imagenes);
        habitacion.setCaracteristicas(caracteristicas);
        return habitacion;
    }

    // Métodos para crear nuevas instancias de características
    private Caracteristica wifi() {
        return Caracteristica.builder().nombre("Wi-Fi gratis").icono("wifi").build();
    }

    private Caracteristica tv() {
        return Caracteristica.builder().nombre("TV por cable").icono("tv").build();
    }

    private Caracteristica aire() {
        return Caracteristica.builder().nombre("Aire acondicionado").icono("snow").build();
    }

    private Caracteristica minibar() {
        return Caracteristica.builder().nombre("Minibar").icono("wine").build();
    }

    private Caracteristica jacuzzi() {
        return Caracteristica.builder().nombre("Jacuzzi").icono("droplet").build();
    }

    private Caracteristica vista() {
        return Caracteristica.builder().nombre("Vista panorámica").icono("mountain").build();
    }
}
