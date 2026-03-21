// ══════════════════════════════════════════════════════════════
//  ANITRACK — Mi Lista de Animes
//  M3L1 · JavaScript Bootcamp 2026
//
//  INSTRUCCIONES:
//  → Este es el único archivo que debes editar.
//  → El HTML y CSS ya están listos. Tu trabajo es JavaScript.
//  → No borres nada de lo que ya existe.
// ══════════════════════════════════════════════════════════════


// ────────────────────────────────────────────────────────────
//  SECCIÓN 1 — FUNCIONES DE APOYO (ya implementadas ✅)
//  Lee crearTarjeta() antes de empezar — te dice exactamente
//  qué propiedades debe tener cada objeto anime.
// ────────────────────────────────────────────────────────────

function mostrarError(mensaje) {
    let el = document.getElementById("mensajeForm");
    el.textContent = mensaje;
    el.className = "mensaje error";
}

function mostrarExito(mensaje) {
    let el = document.getElementById("mensajeForm");
    el.textContent = mensaje;
    el.className = "mensaje exito";
}

function crearTarjeta(anime) {
    let imagenNombre = anime.genero.toLowerCase().replace("ó", "o").replace("í", "i").replace(/ /g, "-") + ".webp";
    return `
        <div class="anime-card" data-anime-id="${anime.id}">
            <button class="btn-card-delete" type="button" data-anime-id="${anime.id}" title="Eliminar anime">✕</button>
            <img src="static/images/${imagenNombre}" alt="${anime.genero}" class="card-img" />
            <div class="card-overlay"></div>
            <span class="card-badge">${anime.genero}</span>
            <div class="card-body">
                <div class="card-info">
                    <p class="card-titulo">${anime.titulo}</p>
                    <p class="card-meta">${anime.episodios} eps vistos</p>
                </div>
                <div class="card-score">
                    ${anime.puntuacion} <span>/ 10</span>
                </div>
            </div>
        </div>
    `;
}

// El formulario ya está conectado y validado ✅
// Lee este código para entender el flujo — tu trabajo empieza abajo
document.getElementById("formAnime").addEventListener("submit", function (evento) {
    evento.preventDefault();

    let titulo = document.getElementById("titulo").value.trim();
    let genero = document.getElementById("genero").value;
    let episodios = Number(document.getElementById("episodios").value);
    let puntuacion = Number(document.getElementById("puntuacion").value);

    if (titulo === "") { mostrarError("El título no puede estar vacío."); return; }
    if (genero === "") { mostrarError("Debes seleccionar un género."); return; }
    if (episodios <= 0) { mostrarError("Los episodios deben ser un número mayor a 0."); return; }
    if (puntuacion < 1 || puntuacion > 10) { mostrarError("La puntuación debe estar entre 1 y 10."); return; }
    // BONUS 1: Límite de 10 animes
    if (listaAnimes.length >= 10) { mostrarError("⚠️ Límite alcanzado: no puedes agregar más de 10 animes."); return; }

    let nuevoAnime = {
        id: Date.now(), // ID único basado en timestamp
        titulo: titulo,
        genero: genero,
        episodios: episodios,
        puntuacion: puntuacion
    };

    // TODO 2 — Agrega nuevoAnime al array listaAnimes con push()
    //   ✅ Así se hace: listaAnimes.push(nuevoAnime)
    listaAnimes.push(nuevoAnime);




    mostrarExito("✅ " + titulo + " agregado a tu lista.");
    renderizarLista();
    evento.target.reset();
});


// ────────────────────────────────────────────────────────────
//  SECCIÓN 2 — TU TICKET 🎫
//
//  Aquí está todo lo nuevo de hoy: el array y sus métodos.
//  Lee cada TODO con calma antes de escribir.
// ────────────────────────────────────────────────────────────

// TODO 1 — Declara el array donde vivirán los animes.
//   Un array vacío se declara así: let listaAnimes = [];
//   Sin esto nada funciona — es lo primero que debes escribir.

let listaAnimes = [];

// Variable para almacenar el filtro actual
let filtroGeneroActual = "Todos";

// Variable para almacenar el término de búsqueda
let terminoBusqueda = "";


// TODO 3 — Completa renderizarLista() para que pinte las tarjetas.
//   La función ya existe pero le falta el forEach.
//   forEach recorre cada elemento del array y ejecuta una función por cada uno.
//   ✅ El patrón es este:
//
//   listaAnimes.forEach(function(anime) {
//       contenedor.innerHTML += crearTarjeta(anime);
//   });


function renderizarLista() {
    let contenedor = document.getElementById("listaAnimes");

    if (listaAnimes.length > 0) {
        document.getElementById("estadoVacio").style.display = "none";
    }

    contenedor.innerHTML = "";

    // Filtrar animes según el género seleccionado Y el término de búsqueda
    let animesFiltrados = listaAnimes.filter(function(anime) {
        let cumpleGenero = filtroGeneroActual === "Todos" || anime.genero === filtroGeneroActual;
        let cumpleBusqueda = anime.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase());
        return cumpleGenero && cumpleBusqueda;
    });

    // Recorrer animes filtrados y crear tarjetas
    let acumulador = 0;
    let totalEpisodios = 0;

    animesFiltrados.forEach(function(anime) {
        contenedor.innerHTML += crearTarjeta(anime);
        acumulador += anime.puntuacion;
        totalEpisodios += anime.episodios;
    });

    // Agregar event listeners a los botones de eliminar
    let botonesEliminar = document.querySelectorAll(".btn-card-delete");
    botonesEliminar.forEach(function(boton) {
        boton.addEventListener("click", function(evento) {
            evento.preventDefault();
            let idAnime = Number(this.getAttribute("data-anime-id"));
            eliminarAnime(idAnime);
        });
    });

    // Actualizar estadísticas (siempre basadas en la lista original)
    document.getElementById("statTotal").textContent = listaAnimes.length + " títulos";
    
    // Calcular total de episodios de TODOS los animes, no solo de los filtrados
    let totalEpisodiosTodos = 0;
    listaAnimes.forEach(function(anime) {
        totalEpisodiosTodos += anime.episodios;
    });
    document.getElementById("statEpisodios").textContent = totalEpisodiosTodos + " episodios";
    
    if (listaAnimes.length > 0) {
        let acumuladorTodos = 0;
        listaAnimes.forEach(function(anime) {
            acumuladorTodos += anime.puntuacion;
        });
        document.getElementById("statPromedio").textContent = "⭐ " + (acumuladorTodos / listaAnimes.length).toFixed(1) + " promedio";
        document.getElementById("statPromedio").style.display = "block";
        document.getElementById("statEpisodios").style.display = "block";
    } else {
        document.getElementById("statPromedio").style.display = "none";
        document.getElementById("statEpisodios").style.display = "none";
    }

    // Si no hay animes después del filtro, mostrar mensaje
    if (animesFiltrados.length === 0 && listaAnimes.length > 0) {
        contenedor.innerHTML = '<p class="no-results">No hay animes que coincidan con tu búsqueda.</p>';
    } else if (listaAnimes.length === 0) {
        document.getElementById("estadoVacio").style.display = "block";
    }
}


// TODO 4 — Implementa el botón de eliminar.
//   El botón con id "btnEliminar" ya está en el HTML.
//   Cuando el usuario lo presione debe:
//   · Eliminar el último anime de listaAnimes con pop()
//   · Llamar a renderizarLista() para actualizar la pantalla
//   · Si el array queda vacío, volver a mostrar el estado vacío
//
//   ✅ Así se conecta un botón:
//   document.getElementById("btnEliminar").addEventListener("click", function() {
//       // tu código aquí
//   });

// FEATURE 1: Función para eliminar un anime específico por su ID
function eliminarAnime(idAnime) {
    // Encontrar el índice del anime a eliminar
    let indice = listaAnimes.findIndex(function(anime) {
        return anime.id === idAnime;
    });

    // Si se encuentra el anime, eliminarlo
    if (indice !== -1) {
        listaAnimes.splice(indice, 1);
        renderizarLista();

        // Mostrar estado vacío si la lista está vacía
        if (listaAnimes.length === 0) {
            document.getElementById("estadoVacio").style.display = "block";
        }
    }
}

document.getElementById("btnEliminar").addEventListener("click", function() {
    if (listaAnimes.length > 0) {
        listaAnimes.pop();
        renderizarLista();
        if (listaAnimes.length === 0) {
            document.getElementById("estadoVacio").style.display = "block";
        }
    }
});



// ════════════════════════════════════════════════════════════
//  🔥 EXTRA BONUS: PROMEDIO DE PUNTUACIÓN
// ════════════════════════════════════════════════════════════
//
//  Al final de renderizarLista() calcula el promedio de
//  puntuación usando forEach con un acumulador.
//
//  Pasos:
//  1. Declara un acumulador en 0 antes del forEach
//  2. Dentro del forEach: acumulador += anime.puntuacion
//  3. Divide entre listaAnimes.length al terminar
//  4. Muestra el resultado en id "statPromedio"
//     y quítale el display:none para que aparezca
//
//  Resultado esperado: "⭐ 8 promedio"
//
//  ⚠️ El programa funciona perfectamente sin este bonus.

// FEATURE 2: Event listener para el filtro de género
document.getElementById("filtroGenero").addEventListener("change", function() {
    filtroGeneroActual = this.value;
    renderizarLista();
});

// BONUS 2: Event listener para la búsqueda por título
document.getElementById("searchAnime").addEventListener("input", function() {
    terminoBusqueda = this.value;
    renderizarLista();
});

// ════════════════════════════════════════════════════════════
//  🔥 BONUS FEATURES
// ════════════════════════════════════════════════════════════

// BONUS 1: Límite de 10 animes ✅ (ya implementado en la validación del formulario)

// BONUS 2: Buscador por título ✅ (ya implementado arriba)

// BONUS 3: Ordenar por puntuación
document.getElementById("sortByScore").addEventListener("click", function() {
    // Ordenar el array de mayor a menor puntuación usando un algoritmo simple
    for (let i = 0; i < listaAnimes.length; i++) {
        for (let j = i + 1; j < listaAnimes.length; j++) {
            if (listaAnimes[j].puntuacion > listaAnimes[i].puntuacion) {
                // Intercambiar elementos
                let temporal = listaAnimes[i];
                listaAnimes[i] = listaAnimes[j];
                listaAnimes[j] = temporal;
            }
        }
    }
    renderizarLista();
    mostrarExito("✅ Lista ordenada por puntuación");
});