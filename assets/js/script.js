$(document).ready(function() {
  let lista = $('#movieList');
  let btnSubmit = $('#submit');
  let btnRandom = $('#random');
  let details = $('#detalles');
  let details2 = $('#detalles2');
  let listaPelicula = []; // Variable global para almacenar la lista de películas

  const movieObtain = async () => {
    try {
      const response = await fetch('https://www.codigo-alfa.cl/aglo/tester/listasPeliculas');
      const peliculasList = await response.json();
      listaPelicula = peliculasList.peliculas; // Actualiza la variable global con la lista de películas

      lista.empty(); // Asegura que el <select> está vacío antes de agregar nuevas opciones

      listaPelicula.forEach(pelicula => {
        const opcion = $('<option></option>').attr('value', pelicula.title).text(pelicula.title);
        lista.append(opcion);
      });
    } catch (error) {
      console.error('Hubo un problema con la solicitud Fetch:', error);
    }
  };

  const mostrarDetalles = () => {
    const tituloSeleccionado = lista.val();
    const peliculaSeleccionada = listaPelicula.find(pelicula => pelicula.title === tituloSeleccionado);

    if (peliculaSeleccionada) {
      details.html(`
        <h2>${peliculaSeleccionada.title}</h2>
        <p>Género: ${peliculaSeleccionada.genre}</p>
        <p>Año: ${peliculaSeleccionada.year}</p>
      `);
    } else {
      details.html('<p>No se encontraron detalles para esta película.</p>');
    }
  };

  const mostrarPeliculaRandom = () => {
    const randomIndex = Math.floor(Math.random() * listaPelicula.length);
    const peliculaRandom = listaPelicula[randomIndex];

    if (peliculaRandom) {
      details2.html(`
        <h2>${peliculaRandom.title}</h2>
        <p>Género: ${peliculaRandom.genre}</p>
        <p>Año: ${peliculaRandom.year}</p>
      `);
    } else {
      details.html('<p>No se encontraron detalles para esta película aleatoria.</p>');
    }
  };

  btnSubmit.on('click', mostrarDetalles);
  btnRandom.on('click', mostrarPeliculaRandom);

  // Manejo básico de errores en la solicitud fetch
  movieObtain();

});
