# 🏨 Contexto de la Historia: The Reporter Trapped in Horror

## 🏢 Escenario

* **Escenario(s):** `gilman-house` → [`world/scenarios/gilman-house.md`](../../../world/scenarios/gilman-house.md). El plano físico del edificio (plantas, zonas, conexiones y elementos) es la verdad espacial de esta historia: toda página debe ser coherente con él.

## ✅ Requisitos Fijos del Act I (obligatorios en futuras regeneraciones)

> Esta sección es ley. Ningún agente puede romper estas reglas al generar o editar el Act I.

1. **Un solo edificio:** El Act I transcurre **íntegro dentro de un único edificio**: un **hotel de 5 plantas** inspirado en la ficticia **Gilman House** (*The Shadow Over Innsmouth*). Ambiente: decrépito, junto al mar, olor a salitre, madera podrida, baldosas rotas y luces de gas. En el vestíbulo cuelga el letrero **"Gilman House"** (nombre pre-timeline, no es terminología del culto).
2. **Planta de inicio:** Elena empieza en su habitación del **ático (planta 4, la más alta)**. El Act I **no** puede empezar en otra planta.
3. **Objetivo del Act I:** Solo **escapar del edificio** y llegar a la calle. Savepoint: **Salida a la Calle (planta 0)**. No se sale ni se abandona el edificio antes del final.
4. **Barrotes en las ventanas:** Las plantas **0, 1 y 2** tienen las ventanas con **barrotes**: no hay escapatoria posible por ventana en las plantas bajas. Solo desde las plantas **3 y 4** (sin barrotes) son posibles las maniobras de cornisa / fachada / ventana.
5. **Primera decisión obligatoria:** La primera elección del Act I debe ser **salir por la cornisa a la habitación contigua**. Está prohibido saltar a otro techo ni a un edificio vecino en la decisión inicial.
6. **Terminología:** Los personajes **no conocen** términos lovecraftianos en su propio mundo. Prohibido en el texto jugable: "Profundo", "Culto de Dagón", "fango abisal". Usar "la criatura", "eso", "el monstruo". El lore sí puede usar esa terminología en documentos de autor.
7. **Estructura:** 10 decisiones (3 **críticas** con Game Over, 7 **normales**) repartidas en la bajada por las plantas 4 → 0. Total ~23 spreads del tramo + 2 finales de éxito (end-001 La Calle, end-002 El Callejón).
8. **Ilustraciones con descripción:** Toda página con `illustration` la declara como objeto `{ name, description, size }`. `name` debe estar listado en `image-names.md`. `description` es **un único párrafo de máximo 100 palabras, todo junto** (sin saltos de línea), en segunda persona, que describe qué muestra la imagen **e incluye pistas y detalles para tomar decisiones correctas**; sirve de contenido alternativo por accesibilidad o cuando la imagen no está disponible (el front muestra la imagen o la descripción). Prohibido `mapData`: ese campo ya no existe en el modelo.
9. **Gameovers y finales en página completa de imagen:** Los spreads `gameover-001` a `gameover-003` y los finales `end-001` / `end-002` siguen el layout canónico: la **imagen va en la `rightPage` con `size: "full"`** (página entera) y la `leftPage` queda **solo con texto**, exactamente **4 párrafos** de máx. 40 palabras cada uno, anclados al espacio de la muerte o de la fuga. La `rightPage` lleva `text` `""` y su `title`; en los gameover, una **única** opción "Reiniciar" hacia `spread-001`; en los finales, ninguna opción (el front reinicia el capítulo). Está prohibido dejar `illustration` en la `leftPage` de un gameover o de un final.

---

## Sinopsis

El jugador toma el rol de **Elena Bancroft** (detallada en `characters/elena-bancroft.json`), periodista del *Boston Globe* que sigue la pista de cargamentos ilegales de oro y extrañas desapariciones. Eso la ha llevado a un pueblo costero donde las criaturas del mar han tomado la noche. En este **Act I**, el único objetivo es sobrevivir: escapar del hotel (la Gilman House) bajando desde el ático hasta la calle, con la cámara y la cordura intactas.

## El Conflicto Específico de esta Historia

Elena es una periodista de investigación que ha llegado siguiendo pistas concretas: monedas de oro con grabados extraños circulando en los bares, brújulas de los barcos enloquecidas y radios que repiten el mismo cántico. Lo que descubre en la habitación del ático supera cualquier historia que pudiera imaginar.

## 🕒 Punto de Arranque de la Historia (Hito de Inicio)

* **Spread Inicial:** `spread-001` (en `generated/reporter-horror-act1.json`)
* **Fase Horaria:** Fase 3 (La Cacería: 02:30 AM). Las criaturas ya asaltan el edificio.
* **Situación Crítica:** Elena está en su habitación del **ático (planta 4)** del hotel. Las luces se han apagado. Los pasos pesados y húmedos de una criatura han subido la escalera y la puerta de la habitación está cediendo. La única salida no explorada es la **ventana a la cornisa** que bordea la fachada.

## 🎯 Savepoint 1: Salida a la Calle (Planta Baja)

* **Ubicación:** Vestíbulo de la planta 0 / puerta a la calle
* **Páginas:** tramo de spreads de decisión con ramificación letal
* **Convergencia:** Todas las rutas correctas convergen en el vestíbulo
* **Narrativa:** Elena baja del ático esquivando a las criaturas que patrullan el hotel. Cada decisión incorrecta lleva a muerte directa (Game Over).

## 📊 Decisiones Letales (Spreads del Act I)

### Mapa de Decisiones (bajada de la planta 4 a la 0)

| Dec | Tipo | Planta | Escenario | Correcta (deducible) | Arriesgada | Game Over |
|-----|------|--------|-----------|----------------------|------------|-----------|
| 1 | Crítica | P4 Ático | Puerta derrumbada | Salir por la **cornisa** a la habitación contigua (atlética) | Flash de cámara + huir por el pasillo | Esconderse bajo la cama (captura) |
| 2 | Normal | P4→P3 | Alcoba contigua (ventana sin barrotes) | Bajar por la escalera de servicio (oído) | Registrar la alcoba (revólver vacío) | — |
| 3 | Crítica | P3 | Descansillo de arriba | Cruzar por el hueco del montacargas (atlética) | Esperar tras los arcones | Cruzar corriendo (captura) |
| 4 | Normal | P2 (barrotes) | Sala común del hotel | Escuchar la radio de onda corta (deducción → coordenadas) | Destruir la radio | — |
| 5 | Normal | P2 (barrotes) | Pasillo de servicio | Distraer con humo/fósforos (deducción) | Pasar en silencio | — |
| 6 | Crítica | P1 | Cocina/comedor del hotel | Buscar la llave de la puerta de servicio (deducción) | Forzar con la palanca (ruido) | Abrir a lo bruto (emboscada) |
| 7 | Normal | P1 | Almacén/trastero | Explorar (periodista/deducción) | Bajar directo | — |
| 8 | Normal | P1→P0 | Caja de la escalera | Comprobar antes de bajar (oído) | Bajar directo | — |
| 9 | Normal | P0 Vestíbulo | Recepción; ventanales con barrotes | Cruzar en el compás de las criaturas (oído) | Avanzar por el mostrador | — |
| 10 | Normal | P0 Salida | Puerta de calle | Puerta principal → **end-001** | Salida de servicio → **end-002** | — |

## Notas de Narrativa para el Desarrollador

### Pistas Históricas Ambientales (Foreshadowing):
1. Monedas de oro con grabados de monstruos marinos circulando en los bares locales en lugar de los dólares legítimos de la época.
2. Titulares de periódicos locales que hablan de "extrañas perturbaciones en las brújulas" de los barcos comerciales de 1938.
3. En el **Act I** (hotel), la pista visible más importante es la **radio de onda corta de la sala común (planta 2)**: entre su estática se repite un cántico gutural y unas **coordenadas** que Elena anota en su libreta. Es la semilla de los futuros acts.

---

> Estructura genérica del libro interactivo (spreads, decisiones y enlaces): [`docs/story-guide.md`](../../../docs/story-guide.md)