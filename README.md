# AniTrack v2.0 — Resolución 🎌

---

## Qué hice

Actualicé la app agregando todas las features que pidió el cliente. Trabajé durante varias horas arreglando problemas y haciendo que todo funcione correctamente.

---

## Features que implementé

### 1️⃣ Eliminar animes específicos

Agregué un botón de eliminar en cada tarjeta. Para que funcione correctamente:

- Le di a cada anime un `id` único usando `Date.now()`
- Puse ese ID en un atributo de la tarjeta
- Hice una función `eliminarAnime()` que busca el anime por ID y lo quita del array
- Usé `findIndex()` para encontrarlo y `splice()` para sacarlo

Esto asegura que se elimine solo el anime que querés, sin afectar los demás.

### 2️⃣ Filtrar por género

Creé un selector con los diferentes géneros. La función de filtro:

- Obtiene el género que seleccionó el usuario
- Recorre el array y devuelve solo los que coinciden
- Si no hay género seleccionado, muestra todos

El array original siempre queda intacto. Solo cambia lo que se muestra en pantalla.

### 3️⃣ Contador de episodios totales

Agregué un contador que suma todos los episodios de la lista. Hice una función que:

- Recorre cada anime del array
- Suma todos los episodios
- Actualiza el número que ves en pantalla

Este contador se actualiza cada vez que agregás o eliminás un anime.

### 4️⃣ Mejoras visuales

La app ahora se ve mejor:

- Tema oscuro con colores morado y rosa
- Las tarjetas tienen animaciones suaves
- El layout se adapta bien en celular y en computadora
- Las estadísticas son más visibles
- Mejor tipografía y espacios

---

## Bonus que agregué

### 🔟 Límite de 10 animes

Puse una validación que no permite agregar más de 10 animes a la lista. Si intentás agregar un undécimo, te muestra un mensaje.

---

## Cómo está hecho el código

**HTML:**
- Estructura clara con inputs para todos los datos
- Selector para el género
- Contenedor donde se muestran las tarjetas

**CSS:**
- Estilos organizados por secciones
- Variables CSS para los colores (fácil de cambiar)
- Grid responsivo para las tarjetas

**JavaScript:**
- Funciones separadas para cada tarea:
  - `agregarAnime()` - añade un anime nuevo
  - `eliminarAnime(id)` - quita un anime específico
  - `filtrarYMostrar()` - filtra y muestra los animes
  - `calcularTotalEpisodios()` - suma todos los episodios
  - `crearTarjetaAnime()` - genera el HTML de una tarjeta

---

## Cómo usar la app

1. Abre `index.html` en el navegador
2. Rellena: Título, Episodios, Puntuación, Género
3. Clickea "Agregar Anime"
4. Usa el filtro para ver solo un género
5. Clickea el botón rojo para eliminar un anime

---

**Módulo:** 3 — Lección 1: Arrays  
**Tiempo de desarrollo:** ~5 horas