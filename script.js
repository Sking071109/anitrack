// Array que almacena todos los animes agregados
let listaAnimes = [];

// Elementos del DOM
const formularioInputs = {
    titulo: document.getElementById('tituloInput'),
    episodios: document.getElementById('episodiosInput'),
    puntuacion: document.getElementById('puntuacionInput'),
    genero: document.getElementById('generoInput')
};

const buttons = {
    agregar: document.getElementById('btnAgregar')
};

const displayElements = {
    lista: document.getElementById('listaAnimes'),
    totalAnimes: document.getElementById('totalAnimes'),
    totalEpisodios: document.getElementById('totalEpisodios'),
    filtro: document.getElementById('filtroGenero')
};

// Listeners de eventos
buttons.agregar.addEventListener('click', agregarAnime);
displayElements.filtro.addEventListener('change', filtrarYMostrar);

// Permitir Enter para agregar anime
formularioInputs.titulo.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarAnime();
    }
});

/**
 * Agrega un nuevo anime al array si todos los campos están llenos
 * y realiza validaciones básicas
 */
function agregarAnime() {
    // Obtenemos los valores de los inputs
    const titulo = formularioInputs.titulo.value.trim();
    const episodios = parseInt(formularioInputs.episodios.value);
    const puntuacion = parseInt(formularioInputs.puntuacion.value);
    const genero = formularioInputs.genero.value;

    // Validar que todos los campos estén completos
    if (!titulo || !episodios || !puntuacion || !genero) {
        alert('Por favor, rellena todos los campos');
        return;
    }

    // Validar que los números sean positivos
    if (episodios < 0 || puntuacion < 1 || puntuacion > 10) {
        alert('Los episodios deben ser positivos y la puntuación entre 1 y 10');
        return;
    }

    // Verificar límite de animes (bonus)
    if (listaAnimes.length >= 10) {
        alert('¡Has alcanzado el máximo de 10 animes en tu lista!');
        return;
    }

    // Crear objeto anime con los datos
    const nuevoAnime = {
        id: Date.now(), // ID único basado en timestamp
        titulo: titulo,
        episodios: episodios,
        puntuacion: puntuacion,
        genero: genero
    };

    // Agregar el anime al array
    listaAnimes.push(nuevoAnime);

    // Limpiar los inputs
    limpiarFormulario();

    // Actualizar la pantalla
    filtrarYMostrar();
}

/**
 * Limpia todos los campos del formulario
 */
function limpiarFormulario() {
    formularioInputs.titulo.value = '';
    formularioInputs.episodios.value = '';
    formularioInputs.puntuacion.value = '';
    formularioInputs.genero.value = '';
    formularioInputs.titulo.focus();
}

/**
 * Elimina un anime específico del array por su ID
 */
function eliminarAnime(id) {
    // Buscar el índice del anime con ese ID
    const indiceAnime = listaAnimes.findIndex(anime => anime.id === id);

    if (indiceAnime !== -1) {
        // Remover el anime del array
        listaAnimes.splice(indiceAnime, 1);
        // Actualizar la pantalla
        filtrarYMostrar();
    }
}

/**
 * Calcula el total de episodios de todos los animes
 */
function calcularTotalEpisodios() {
    let total = 0;
    for (let i = 0; i < listaAnimes.length; i++) {
        total += listaAnimes[i].episodios;
    }
    return total;
}

/**
 * Filtra los animes según el género seleccionado
 */
function obtenerAnimeFiltrados() {
    const generoSeleccionado = displayElements.filtro.value;

    // Si no hay género seleccionado, devolver todos
    if (generoSeleccionado === '') {
        return listaAnimes;
    }

    // Filtrar solo los animes del género seleccionado
    const animeFiltrados = [];
    for (let i = 0; i < listaAnimes.length; i++) {
        if (listaAnimes[i].genero === generoSeleccionado) {
            animeFiltrados.push(listaAnimes[i]);
        }
    }

    return animeFiltrados;
}

/**
 * Filtra y renderiza la lista de animes en la pantalla
 */
function filtrarYMostrar() {
    const animeFiltrados = obtenerAnimeFiltrados();
    
    // Actualizar estadísticas
    actualizarEstadisticas();

    // Si no hay animes, mostrar mensaje vacío
    if (listaAnimes.length === 0) {
        displayElements.lista.innerHTML = '<p class="empty-state">Aún no has agregado ningún anime</p>';
        return;
    }

    // Si hay animes pero no coinciden con el filtro
    if (animeFiltrados.length === 0) {
        displayElements.lista.innerHTML = '<p class="empty-state">No hay animes en ese género</p>';
        return;
    }

    // Construir el HTML para cada anime filtrado
    let html = '';
    for (let i = 0; i < animeFiltrados.length; i++) {
        const anime = animeFiltrados[i];
        html += crearTarjetaAnime(anime);
    }

    displayElements.lista.innerHTML = html;

    // Agregar listeners a los botones de eliminar
    agregarListenersEliminar();
}

/**
 * Crea el HTML de una tarjeta de anime
 */
function crearTarjetaAnime(anime) {
    return `
        <div class="anime-card">
            <div class="anime-header">
                <div class="anime-title">${anime.titulo}</div>
                <span class="anime-genre">${anime.genero}</span>
            </div>
            <div class="anime-info">
                <div class="info-item">
                    <div class="info-label">Episodios</div>
                    <div class="info-value">${anime.episodios}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Puntuación</div>
                    <div class="info-value">${anime.puntuacion}/10</div>
                </div>
            </div>
            <button class="btn-eliminar" data-id="${anime.id}">🗑️ Eliminar</button>
        </div>
    `;
}

/**
 * Agrega event listeners a todos los botones de eliminar
 */
function agregarListenersEliminar() {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    
    for (let i = 0; i < botonesEliminar.length; i++) {
        botonesEliminar[i].addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            eliminarAnime(id);
        });
    }
}

/**
 * Actualiza los contadores de totales en la pantalla
 */
function actualizarEstadisticas() {
    // Contar el total de animes en el array principal
    displayElements.totalAnimes.textContent = listaAnimes.length;

    // Calcular y mostrar el total de episodios
    const totalEpisodios = calcularTotalEpisodios();
    displayElements.totalEpisodios.textContent = totalEpisodios;
}

// Inicializar la pantalla
actualizarEstadisticas();
