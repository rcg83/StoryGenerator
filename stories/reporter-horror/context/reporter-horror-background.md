# 🏨 Contexto de la Historia: The Reporter Trapped in Horror

## 🏢 Escenario

* **Escenario(s):** `gilman-house` → [`world/scenarios/gilman-house.md`](../../../world/scenarios/gilman-house.md) (prosa) y [`world/scenarios/gilman-house.json`](../../../world/scenarios/gilman-house.json) (zonas con `id` canónico + conexiones adyacentes). El plano físico del edificio (plantas, zonas, conexiones y elementos) es la verdad espacial de esta historia: toda página se ancla a una zona del `.json` y **solo enlaza a zonas adyacentes** según su grafo. De momento el `.json` cubre solo P4 (ático).

## ✅ Requisitos Fijos del Capítulo 1 (obligatorios en futuras regeneraciones)

> Esta sección es ley. Ningún agente puede romper estas reglas al generar o editar el Capítulo 1.

> **Estado del contenido:** `generated/reporter-horror-chapter-01.json` es el **Capítulo 1 vigente** (modelo de capítulos, 6-8 spreads). El archivo `generated/reporter-horror-1.json` es **legado** (estructura por actos, repartido ya en capítulos) y **no se restaura**. Toda regeneración o edición nueva se hace con el modelo de capítulos: `generated/reporter-horror-chapter-NN.json`.

> **Frontera de capítulo (P3):** El `.json` del escenario `world/scenarios/gilman-house.json` modela hoy solo las plantas **P4, P3 y P0**. Como AGENTS.md prohíbe anclar spreads a zonas inexistentes, el **Capítulo 1 cierra en P3** (convergencia en el pasillo de habitaciones) y la bajada P3→P0 se reparte en capítulos posteriores una vez modeladas las plantas P2/P1.

1. **Un solo edificio:** El Capítulo 1 transcurre **íntegro dentro de un único edificio**: un **hotel de 5 plantas** inspirado en la ficticia **Gilman House** (*The Shadow Over Innsmouth*). Ambiente: decrépito, junto al mar, olor a salitre, madera podrida, baldosas rotas y luces de gas. En el vestíbulo cuelga el letrero **"Gilman House"** (nombre pre-timeline, no es terminología del culto).
2. **Planta de inicio:** Elena empieza en su habitación del **ático (planta 4, la más alta)**. El Capítulo 1 **no** puede empezar en otra planta.
3. **Objetivo del Capítulo 1:** Solo **escapar del edificio**. El cierre global de la historia es la **Salida a la Calle (planta 0)**, pero se alcanza en capítulos posteriores: el **Capítulo 1 cierra en P3** (pasillo de habitaciones) por la frontera de zonas descrita arriba. No se sale ni se abandona el edificio antes del final de la historia.
4. **Barrotes en las ventanas:** Las plantas **0, 1 y 2** tienen las ventanas con **barrotes**: no hay escapatoria posible por ventana en las plantas bajas. Solo desde las plantas **3 y 4** (sin barrotes) son posibles las maniobras de cornisa / fachada / ventana.
5. **Primera decisión obligatoria:** La primera elección del Capítulo 1 debe ser **salir por la cornisa a la habitación contigua**. Está prohibido saltar a otro techo ni a un edificio vecino en la decisión inicial.
6. **Terminología:** Los personajes **no conocen** términos lovecraftianos en su propio mundo. Prohibido en el texto jugable: "Profundo", "Culto de Dagón", "fango abisal". Usar "la criatura", "eso", "el monstruo". El lore sí puede usar esa terminología en documentos de autor.
7. **Estructura por capítulos:** la historia se genera en **capítulos** (`reporter-horror-chapter-NN.json`), cada uno con **exactamente 6-8 spreads** (spreads de decisión + gameovers + finales, contando todos) y **exactamente 1 spread `end-*`** de cierre. El reparto de la bajada 4 → 0 se distribuye entre capítulos, con 1-2 decisiones críticas (con gameover) por capítulo y el resto normales. Ningún `optionLink` sale del capítulo.
8. **Ilustraciones con descripción:** Toda página con `illustration` la declara como objeto `{ name, description, size }`. `name` debe estar listado en `image-names.md`. `description` es **un único párrafo de máximo 48 palabras, todo junto** (sin saltos de línea), en **tercera persona y tiempo presente**: descripción pura, precisa y breve de lo que la imagen muestra, pensada para que alguien que no la ve pueda visualizarla. **Prohibido** redactarla como narrativa en segunda persona o como consejo / lista de pistas; las pistas de decisión pueden venir del `text` o de la imagen, y cuando vienen de la imagen sus elementos se describen fielmente para **deducirse**, nunca se entregan como pista explícita. Sirve de contenido alternativo por accesibilidad o cuando la imagen no está disponible (el front muestra la imagen o la descripción). Prohibido `mapData`: ese campo ya no existe en el modelo.
9. **Gameovers y finales en página completa de imagen:** Los finales `end-*` siguen el layout canónico: la **imagen va en la `rightPage` con `size: "full"`** (página entera) y la `leftPage` queda **solo con texto**, exactamente **4 párrafos** de máx. 32 palabras cada uno, anclados al espacio de la fuga. La `rightPage` del final lleva `text` `""` y **`title` = título del capítulo**, **sin opciones** (el front reinicia el capítulo). Los `gameover-*` invierten el layout: la **imagen va siempre en la `leftPage` con `size: "full"`** (página entera), la `leftPage` queda con `text` `""`, y la `rightPage` (sin `illustration`, `title` = título del capítulo) lleva **exactamente 1 párrafo** de máx. 32 palabras explicando la causa directa de la muerte + la **única** opción "Reiniciar" hacia el `startPageId` del capítulo. Si un `gameover-*` no tiene imagen en el catálogo, se omite `illustration` y la `leftPage` pasa a **solo texto** con **exactamente 4 párrafos** de máx. 32 palabras que describen la muerte, igual que cualquier otra `leftPage` sin imagen, con "Reiniciar" en la `rightPage`. Prohibido dejar `illustration` en la `leftPage` de un final o en la `rightPage` de un gameover.
10. **Imágenes de gameover fijadas:** La imagen de cada muerte, cuando existe, está **asignada por `id`** y no se sustituye por otra del catálogo. En el **Capítulo 1** (bajada P4→P3): `gameover-001` → `reporter-trapped-under-bed-cenital-view.png` (bajo la cama); `gameover-002` → `gameover-corredor-atico.jpg` (captura en el corredor del ático, coherente con quedarse inmóvil en la alcoba o el pasillo de P4); `gameover-003` → `Elena-grabbed-by-deepone-from-behind.png` (Elena aferrada por detrás junto al pozo del montacargas en el rellano de P3, coherente con asomarse al pozo). Todos los `gameover-*` del Capítulo 1 tienen ilustración `full` en la `leftPage`. Para cambiar una asignación hay que actualizar **a la vez** este requisito y la entrada correspondiente de `image-names.md`; una imagen marcada allí como "No usada en esta versión" no puede reasignarse a ningún spread. El `name` se copia literalmente del archivo físico del front, erratas incluidas (`behing`).
11. **Game over en todos los spreads del Capítulo 1:** cada spread de decisión del Capítulo 1 debe incluir al menos **una opción letal** que enlace a un `gameover-*` del propio capítulo. El peligro está presente desde el primer spread hasta el cierre.

---

## Sinopsis

El jugador toma el rol de **Elena Bancroft** (detallada en `characters/elena-bancroft.json`), periodista del *Boston Globe* que sigue la pista de cargamentos ilegales de oro y extrañas desapariciones. Eso la ha llevado a un pueblo costero donde las criaturas del mar han tomado la noche. En este **Capítulo 1**, el único objetivo es sobrevivir: escapar del hotel (la Gilman House) bajando desde el ático hasta la calle, con la cámara y la cordura intactas.

## El Conflicto Específico de esta Historia

Elena es una periodista de investigación que ha llegado siguiendo pistas concretas: monedas de oro con grabados extraños circulando en los bares, brújulas de los barcos enloquecidas y radios que repiten el mismo cántico. Lo que descubre en la habitación del ático supera cualquier historia que pudiera imaginar.

## 🕒 Punto de Arranque de la Historia (Hito de Inicio)

* **Spread Inicial:** `spread-001` (en `generated/reporter-horror-chapter-01.json`)
* **Fase Horaria:** Fase 3 (La Cacería: 02:30 AM). Las criaturas ya asaltan el edificio.
* **Situación Crítica:** Elena está en su habitación del **ático (planta 4)** del hotel. Las luces se han apagado. Los pasos pesados y húmedos de una criatura han subido la escalera y la puerta de la habitación está cediendo. La única salida no explorada es la **ventana a la cornisa** que bordea la fachada.

## 🎯 Cierre del Capítulo 1: Pasillo de Habitaciones (Planta 3)

* **Ubicación:** Pasillo de habitaciones de la planta 3 (`p3-pasillo-habitaciones`), tras cruzar el rellano y el pozo del montacargas
* **Spread de cierre:** `end-001` (imagen `full` en la `rightPage`, sin opciones)
* **Convergencia:** Todas las rutas correctas del capítulo convergen en el rellano de P3 y cierran con `end-001`
* **Narrativa:** Elena baja del ático esquivando a las criaturas que asaltan el hotel. Cada decisión incorrecta lleva a muerte directa (Game Over) y reinicia el capítulo. La bajada P3→P0 continúa en el Capítulo 2.

## 📊 Decisiones Letales (Spreads del Capítulo 1)

### Capítulo 1 vigente (bajada de P4 a P3, 4 decisiones + 3 gameovers + 1 final)

| Dec | Spread | Tipo | Zona (planta) | Opción correcta (deducible) | Alternativa | Game Over |
|-----|--------|------|---------------|------------------------------|-------------|-----------|
| 1 | `spread-001` | Crítica | `p4-habitacion-elena` (P4) | Salir por la **cornisa** a la alcoba contigua (atlética) | — | Esconderse bajo la cama → `gameover-001` |
| 2 | `spread-002` | Normal | `p4-alcoba-contigua` (P4) | Cruzar la puerta al pasillo del ático | Registrar la alcoba y salir | Quedarse tras la puerta → `gameover-002` |
| 3 | `spread-003` | Normal | `p4-pasillo` (P4) | Bajar por la escalera midiendo el ruido (oído) | Volver a la alcoba por otra ruta | Quedarse inmóvil → `gameover-002` |
| 4 | `spread-004` | Crítica | `p3-descansillo` (P3) | Cruzar el rellano hacia la escalera principal / ocultarse entre los arcones | — | Asomarse al pozo del montacargas → `gameover-003` |

### Mapa de decisiones para capítulos posteriores (bajada P3→P0)

| Dec | Tipo | Planta | Escenario | Correcta (deducible) | Arriesgada | Game Over |
|-----|------|--------|-----------|----------------------|------------|-----------|
| 5 | Normal | P2 (barrotes) | Sala común del hotel | Escuchar la radio de onda corta (deducción → coordenadas) | Destruir la radio | — |
| 6 | Normal | P2 (barrotes) | Pasillo de servicio | Distraer con humo/fósforos (deducción) | Pasar en silencio | — |
| 7 | Crítica | P1 | Cocina/comedor del hotel | Buscar la llave de la puerta de servicio (deducción) | Forzar con la palanca (ruido) | Abrir a lo bruto (emboscada) |
| 8 | Normal | P1 | Almacén/trastero | Explorar (periodista/deducción) | Bajar directo | — |
| 9 | Normal | P1→P0 | Caja de la escalera | Comprobar antes de bajar (oído) | Bajar directo | — |
| 10 | Normal | P0 Vestíbulo | Recepción; ventanales con barrotes | Cruzar en el compás de las criaturas (oído) | Avanzar por el mostrador | Delatarse con el flash de la cámara |
| 11 | Normal | P0 Salida | Puerta de calle | Salida del edificio | — | — |

## Notas de Narrativa para el Desarrollador

### Pistas Históricas Ambientales (Foreshadowing):
1. Monedas de oro con grabados de monstruos marinos circulando en los bares locales en lugar de los dólares legítimos de la época.
2. Titulares de periódicos locales que hablan de "extrañas perturbaciones en las brújulas" de los barcos comerciales de 1938.
3. En el **Capítulo 1** (hotel), la pista visible más importante es la **radio de onda corta de la sala común (planta 2)**: entre su estática se repite un cántico gutural y unas **coordenadas** que Elena anota en su libreta. Es la semilla de los futuros capítulos.

---

> Estructura genérica del libro interactivo (spreads, decisiones y enlaces): [`docs/story-guide.md`](../../../docs/story-guide.md)