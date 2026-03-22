# AniTrack v2.0 — Mi Lista de Animes 🎌

> **M3L1 · Home Challenge · ~4-6 horas**

---

## El contexto

Han pasado tres días desde que entregaste el MVP de AniTrack. El cliente quedó muy contento con la primera versión — se ve profesional y sus usuarios ya la están usando. Pero llegó la lista de features que quería para la v2.0, y el Tech Lead te tocó la puerta de Slack:

> *"El cliente quiere más. Dice que necesita poder eliminar animes específicos, filtrar por género, ver cuántos episodios lleva en total. Básicamente, quiere que sea más útil. ¿Te animas a iterar?"*

No se trata de un proyecto nuevo. Es tu propio código, mejorado. Eso es lo que hacen los buenos desarrolladores — no tiran todo a la basura, simplemente evolucionan lo que ya funciona.

---

## ✨ Lo que implementé (v2.0)

### Eliminar animes específicos

El cliente necesitaba algo que la gente pedía constantemente: poder borrar un anime sin tener que eliminar toda la lista. Agregué un botón `✕` circular en la esquina superior derecha de cada tarjeta. Ahora cada anime tiene un ID único (usando `Date.now()` como timestamp) y una función `eliminarAnime()` que lo busca en el array usando `findIndex()` y lo saca con `splice()`. El resultado es inmediato — cuando presionas el botón, ese anime desaparece y la pantalla se actualiza sin recargar.

### Filtrar por género

La lista puede crecer rápidamente. Agregué un selector desplegable que permite ver solo los animes de un género específico. Seleccionas "Acción" y desaparecen los románticos. Seleccionas "Todos" y vuelven. Lo interesante es que el filtro trabaja junto con la búsqueda y el contador de episodios — no interfieren entre sí, se potencian.

### Contador de episodios totales

Junto al contador de títulos, ahora aparece el total de episodios que has visto. Se suma sobre TODOS los animes en la lista (no solo los filtrados), así que siempre sabes tu progreso total. Se actualiza automáticamente cada vez que agregas o eliminas algo.

### Mejoras visuales que importan

Cambié la paleta de colores a algo más moderno — violeta más sofisticado, cyan más vibrante, rojos más profundos. Las animaciones ahora usan `cubic-bezier` para sentirse más naturales. El fondo tiene un gradiente sutil que crea profundidad. Las tarjetas tienen efectos hover dramaticos con sombras de neón que aparecen al pasar el mouse. La navbar usa glass-morphism para verse más premium. Todo funciona igual de bien en móvil que en desktop gracias a media queries bien pensadas.

---

## 🔥 Los bonus que no podía ignorar

**Límite de 10 animes:** No quería que alguien agregara 50 animes por accidente. La validación del formulario revisa que no haya más de 10 antes de permitir agregar uno nuevo. Si lo intentas, te muestra un mensaje amable pero firme.

**Buscador por título:** Agregué un input que filtra la lista en tiempo real mientras escribes. Solo ves los animes cuyo título contiene lo que ingresaste. Funciona junto con el filtro de género, así que puedes buscar "Attack" en la categoría de "Acción" y obtener exactamente lo que quieres.

**Ordenar por puntuación:** Un botón `⭐ Ordenar` que reorganiza los animes de mayor a menor rating usando un simple algoritmo burbuja. Útil cuando quieres ver cuáles te gustaron más.

---

## 🛠️ Cómo quedó el código

En `script.js` agregué lo que realmente importa. Cada anime ahora recibe un ID basado en su timestamp de creación. Hay una función `eliminarAnime(idAnime)` que busca ese anime por su ID y lo saca del array. Mantuve una variable `filtroGeneroActual` que se actualiza cuando cambias el dropdown y `terminoBusqueda` que se sincroniza con cada letra que escribes.

La función `renderizarLista()` es el corazón de todo. Primero filtra los animes según el género Y el término de búsqueda simultáneamente usando `filter()`. Luego recorre cada uno con `forEach()` para crear las tarjetas. Aquí es donde agregué los event listeners dinámicos a los botones de eliminar — tienes que hacerlo DESPUÉS de renderizar porque antes no existen en el DOM. Al final calcula los totales de episodios y promedios basados en TODAS las animes, no solo las filtradas, porque el cliente quiere saber su verdadero progreso.

En el `index.html` agregué el selector de género con todas las opciones, el input de búsqueda con un emoji de lupa, el contador de episodios, y el botón de ordenar. Cada tarjeta ahora tiene ese botón de eliminar flotante.

El `style.css` creció con los estilos de todos estos nuevos elementos. Pero lo importante no fue agregar líneas — fue mantener la coherencia visual. Los colores nuevos vienen de variables CSS que se reutilizan en todos lados. Las animaciones usan las mismas curvas de bezier. Los espacios siguen la misma proporción. Se ve como una sola app, no como un frankenstein de cambios.

---

## 📚 Qué aprendí en el proceso

Implementar esto me enseñó que los IDs únicos no son un lujo — son esenciales cuando necesitas manipular elementos específicos de un array. Aprendí que `filter()` es mucho más poderosa que hacer `forEach` con un `if` adentro porque devuelve un nuevo array sin mutaciones inesperadas. Descubrí que las animaciones pequeñas (transiciones de 300ms, transforms sutiles) mejoran MUCHO la percepción de calidad de una app, más de lo que esperaba.

También noté que validar en el formulario antes de agregar datos es crucial — no solo evita bugs, sino que crea una mejor experiencia. El usuario sabe de inmediato por qué no puede hacer algo, en lugar de que falle silenciosamente.

Un detalle importante: cuando agregues event listeners dinámicamente (como los botones de eliminar en cada tarjeta), tienes que hacerlo DESPUÉS de renderizar el HTML. Si intentas hacerlo antes, los elementos no existen y el listener nunca se conecta. Es una fuente común de bugs que es fácil pasar por alto.

---

## 🎮 Cómo funciona

La app sigue el mismo flujo que antes, pero potenciada. Llenas el formulario a la izquierda (título, género, episodios, puntuación) y presionas "+ Agregar a mi lista". Los datos se validan, se agrega un anime nuevo al array, se renderiza todo. 

Del lado derecho tienes la lista. Si quieres ver solo ciertos géneros, usas el dropdown. Si buscas un anime específico por nombre, escribes en el input de búsqueda. Los dos filtros trabajan juntos — si tienes "Acción" seleccionado y escribes "Attack", solo ves animes de acción cuyo título contenga esa palabra.

Cuando quieres borrar un anime, presionas el pequeño botón `✕` en la esquina de su tarjeta. Si te arrepientes y quieres borrar el último que agregaste, hay un botón "− Eliminar último" en la barra de herramientas. 

Si alguna vez quieres ver tus animes ordenados por cómo te gustaron (mayor puntuación primero), presiona "⭐ Ordenar" y listo.

---

## 🚀 Stack técnico

Vanilla JavaScript — sin frameworks, sin librerías externas. Solo HTML5 semántico, CSS3 moderno (Grid, Flexbox, Gradientes, Animaciones) y JavaScript puro (ES5/ES6). 

Las técnicas que usé: `push()` y `pop()` para manipular arrays, `splice()` para eliminaciones específicas, `findIndex()` para búsquedas, `filter()` para crear subconjuntos, `forEach()` para iteraciones, manipulación directa del DOM con `getElementById()` y `classList`, y event listeners que se agregan dinámicamente. Nada sofisticado — todo lo que ya conocía, aplicado bien.

---

## 🎯 Checklist (todo listo)

Cada uno de los cuatro features obligatorios está implementado y funciona. El array es siempre la fuente de verdad — la pantalla refleja exactamente lo que hay en memoria, en todo momento. No hay errores en consola. El código está en funciones bien organizadas con comentarios que explican las partes nuevas. El diseño mejora notablemente respecto a v1.0 — los colores son más modernos, la UI es más pulida. La app funciona en móvil y en desktop. Y agregué los tres bonus: límite de animes, búsqueda por título y ordenamiento por puntuación.

---

**Entrega:** v2.0 · 2026
**Módulo:** 3 — Lección 1: Arrays
**Dificultad:** ⭐⭐⭐ Intermedio
**Tiempo invertido:** ~5 horas
