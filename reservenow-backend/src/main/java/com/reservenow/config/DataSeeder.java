package com.reservenow.config;

import com.reservenow.model.Habitacion;
import com.reservenow.model.Imagen;
import com.reservenow.repository.HabitacionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final HabitacionRepository habitacionRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (habitacionRepository.count() > 0) return;

        List<Habitacion> habitaciones = List.of(
            crearHabitacion("Habitación Simple", "Habitación para 1 persona con vista panorámica al parque.", 45.0, true,
                List.of(
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.311.jpeg",
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.302.jpeg",
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.322.jpeg"
                )),
            crearHabitacion("Habitación Doble", "Habitación para 2 personas con todas las comodidades.", 75.0, true,
                List.of(
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.281.jpeg",
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.283.jpeg",
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.311.jpeg"
                )),
            crearHabitacion("Habitación Doble Matrimonial", "Habitación matrimonial con ambiente acogedor.", 85.0, true,
                List.of(
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.27.jpeg",
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.28.jpeg",
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.33.jpeg"
                )),
            crearHabitacion("Habitación Triple", "Habitación espaciosa para 3 personas.", 120.0, true,
                List.of(
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.322.jpeg",
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.311.jpeg",
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.302.jpeg"
                )),
            crearHabitacion("Habitación Cuádruple", "Ideal para familias, con espacio para 4 personas.", 140.0, true,
                List.of(
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.281.jpeg",
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.283.jpeg",
                    "https://hotelverdesole.com.ar/wp-content/uploads/2019/11/WhatsApp-Image-2019-11-08-at-15.38.27.jpeg"
                ))
        );

        habitacionRepository.saveAll(habitaciones);
    }

    private Habitacion crearHabitacion(String nombre, String descripcion, Double precio, Boolean disponible, List<String> urls) {
        Habitacion habitacion = Habitacion.builder()
            .nombre(nombre)
            .descripcion(descripcion)
            .precioPorNoche(precio)
            .disponible(disponible)
            .build();

        List<Imagen> imagenes = urls.stream()
            .map(url -> Imagen.builder().url(url).habitacion(habitacion).build())
            .toList();

        habitacion.setImagenes(imagenes);
        return habitacion;
    }
}
