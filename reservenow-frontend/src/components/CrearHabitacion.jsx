const handleSubmit = async (e) => {
    e.preventDefault();
  
    const nuevaHabitacion = {
      nombre,
      descripcion,
      precioPorNoche: parseFloat(precio),
      disponible: disponible === 'true',
      imagenes: imagenes.split(',').map(url => url.trim())
    }
  
    try {
      const response = await fetch('http://localhost:8080/api/habitaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaHabitacion)
      })
  
      if (response.ok) {
        alert("Habitación creada correctamente");
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setDisponible('true');
        setImagenes('');
      } else {
        const error = await response.text();
        alert("Error al crear: " + error);
      }
    } catch (err) {
      console.error(err);
      alert("Error de red");
    }
  }
  