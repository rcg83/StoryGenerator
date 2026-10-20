# 🏨 Contexto de la Historia: The Reporter Trapped in Horror

## 🏢 Escenario

* **Escenario(s):** `gilman-house` → [`world/scenarios/gilman-house.md`](../../../world/scenarios/gilman-house.md) (prosa) y [`world/scenarios/gilman-house.json`](../../../world/scenarios/gilman-house.json) (zonas con `id` canónico + conexiones adyacentes). El plano físico del edificio (plantas, zonas, conexiones y elementos) es la verdad espacial de esta historia: toda página se ancla a una zona del `.json` y **solo enlaza a zonas adyacentes** según su grafo. De momento el `.json` cubre solo P4 (ático).

## ✅ Requisitos Fijos del Capítulo 1 (obligatorios en futuras regeneraciones)

> Esta sección es ley. Ningún agente puede romper estas reglas al generar o editar el Capítulo 1.

> **Estado del contenido:** el archivo actual `generated/reporter-horror-1.json` es **legado** (estructura por actos) y queda **pendiente de dividir en capítulos** de 6-8 spreads. Toda regeneración o edición nueva se hace con el modelo de capítulos: `generated/reporter-horror-chapter-NN.json`.

1. **Un solo edificio:** El Capítulo 1 transcurre **íntegro dentro de un único edificio**: un **hotel de 5 plantas** inspirado en la ficticia **Gilman House** (*The Shadow Over Innsmouth*). Ambiente: decrépito, junto al mar, olor a salitre, madera podrida, baldosas rotas y luces de gas. En el vestíbulo cuelga el letrero **"Gilman House"** (nombre pre-timeline, no es terminología del culto).
2. **Planta de inicio:** Elena empieza en su habitación del **ático (planta 4, la más alta)**. El Capítulo 1 **no** puede empezar en otra planta.
3. **Objetivo del Capítulo 1:** Solo **escapar del edificio** y llegar a la calle. Cierre del capítulo: **Salida a la Calle (planta 0)**. No se sale ni se abandona el edificio antes del final.
4. **Barrotes en las ventanas:** Las plantas **0, 1 y 2** tienen las ventanas con **barrotes**: no hay escapatoria posible por ventana en las plantas bajas. Solo desde las plantas **3 y 4** (sin barrotes) son posibles las maniobras de cornisa / fachada / ventana.
5. **Primera decisión obligatoria:** La primera elección del Capítulo 1 debe ser **salir por la cornisa a la habitación contigua**. Está prohibido saltar a otro techo ni a un edificio vecino en la decisión inicial.
6. **Terminología:** Los personajes **no conocen** términos lovecraftianos en su propio mundo. Prohibido en el texto jugable: "Profundo", "Culto de Dagón", "fango abisal". Usar "la criatura", "eso", "el monstruo". El lore sí puede usar esa terminología en documentos de autor.
7. **Estructura por capítulos:** la historia se genera en **capítulos** (`reporter-horror-chapter-NN.json`), cada uno con **exactamente 6-8 spreads** (spreads de decisión + gameovers + finales, contando todos) y **exactamente 1 spread `end-*`** de cierre. El reparto de la bajada 4 → 0 se distribuye entre capítulos, con 1-2 decisiones críticas (con gameover) por capítulo y el resto normales. Ningún `optionLink` sale del capítulo.
8. **Ilustraciones con descripción:** Toda página con `illustration` la declara como objeto `{ name, description, size }`. `name` debe estar listado en `image-names.md`. `description` es **un único párrafo de máximo 48 palabras, todo junto** (sin saltos de línea), en **tercera persona y tiempo presente**: descripción pura, precisa y breve de lo que la imagen muestra, pensada para que alguien que no la ve pueda visualizarla. **Prohibido** redactarla como narrativa en segunda persona o como consejo / lista de pistas; las pistas de decisión pueden venir del `text` o de la imagen, y cuando vienen de la imagen sus elementos se describen fielmente para **deducirse**, nunca se entregan como pista explícita. Sirve de contenido alternativo por accesibilidad o cuando la imagen no está disponible (el front muestra la imagen o la descripción). Prohibido `mapData`: ese campo ya no existe en el modelo.
9. **Gameovers y finales en página completa de imagen:** Los spreads `gameover-001` a `gameover-003` y los finales `end-001` / `end-002` siguen el layout canónico: la **imagen va en la `rightPage` con `size: "full"`** (página entera) y la `leftPage` queda **solo con texto**, exactamente **4 párrafos** de máx. 32 palabras cada uno, anclados al espacio de la muerte o de la fuga. La `rightPage` lleva `text` `""` y **`title` = título del capítulo** (igual que el resto de spreads); en los gameover, una **única** opción "Reiniciar" hacia el `startPageId` del capítulo; en los finales, ninguna opción (el front reinicia el capítulo). Está prohibido dejar `illustration` en la `leftPage` de un gameover o de un final.
10. **Imágenes de gameover fijadas:** La imagen de cada muerte está **asignada por `id`** y no se sustituye por otra del catálogo: `gameover-001` → `reporter-trapped-under-bed-cenital-view.png`; `gameover-002` → `Elena-grabbed-by-deepone-from-behind.png` (Elena aferrada por detrás en el descansillo de P3, coherente con la decisión de cruzar corriendo); `gameover-003` → `gameover-puerta-captura.jpg`. Todas en `rightPage` con `size: "full"`. Para cambiar una de estas tres hay que actualizar **a la vez** este requisito y la entrada correspondiente de `image-names.md`; una imagen marcada allí como "No usada en esta versión" no puede reasignarse a ningún spread. El `name` se copia literalmente del archivo físico del front, erratas incluidas (`behing`).
11. **Game over en todos los spreads del Capítulo 1:** cada spread de decisión del Capítulo 1 debe incluir al menos **una opción letal** que enlace a un `gameover-*` del propio capítulo. El peligro está presente desde el primer spread hasta el cierre.

---

## Sinopsis

El jugador toma el rol de **Elena Bancroft** (detallada en `characters/elena-bancroft.json`), periodista del *Boston Globe* que sigue la pista de cargamentos ilegales de oro y extrañas desapariciones. Eso la ha llevado a un pueblo costero donde las criaturas del mar han tomado la noche. En este **Capítulo 1**, el único objetivo es sobrevivir: escapar del hotel (la Gilman House) bajando desde el ático hasta la calle, con la cámara y la cordura intactas.

## El Conflicto Específico de esta Historia

Elena es una periodista de investigación que ha llegado siguiendo pistas concretas: monedas de oro con grabados extraños circulando en los bares, brújulas de los barcos enloquecidas y radios que repiten el mismo cántico. Lo que descubre en la habitación del ático supera cualquier historia que pudiera imaginar.

## 🕒 Punto de Arranque de la Historia (Hito de Inicio)

* **Spread Inicial:** `spread-001` (en `generated/reporter-horror-chapter-01.json`; hoy vive en el legado `generated/reporter-horror-1.json`)
* **Fase Horaria:** Fase 3 (La Cacería: 02:30 AM). Las criaturas ya asaltan el edificio.
* **Situación Crítica:** Elena está en su habitación del **ático (planta 4)** del hotel. Las luces se han apagado. Los pasos pesados y húmedos de una criatura han subido la escalera y la puerta de la habitación está cediendo. La única salida no explorada es la **ventana a la cornisa** que bordea la fachada.

## 🎯 Cierre del Capítulo 1: Salida a la Calle (Planta Baja)

* **Ubicación:** Vestíbulo de la planta 0 / puerta a la calle
* **Spreads:** spreads de decisión del capítulo con ramificación letal
* **Convergencia:** Todas las rutas correctas convergen en el vestíbulo y cierran con el spread `end-*` del capítulo
* **Narrativa:** Elena baja del ático esquivando a las criaturas que patrullan el hotel. Cada decisión incorrecta lleva a muerte directa (Game Over) y reinicia el capítulo.

## 📊 Decisiones Letales (Spreads del Capítulo 1)

### Mapa de Decisiones (bajada de la planta 4 a la 0)

| Dec | Tipo | Planta | Escenario | Correcta (deducible) | Arriesgada | Game Over |
|-----|------|--------|-----------|----------------------|------------|-----------|
| 1 | Crítica | P4 Ático | Puerta derrumbada | Salir por la **cornisa** a la habitación contigua (atlética) | Flash de cámara + huir por el pasillo | Esconderse bajo la cama (captura) |
| 2 | Normal | P4→P3 | Alcoba contigua (ventana sin barrotes) | Bajar por la escalera (oído) | Registrar la alcoba (revólver vacío) | — |
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
3. En el **Capítulo 1** (hotel), la pista visible más importante es la **radio de onda corta de la sala común (planta 2)**: entre su estática se repite un cántico gutural y unas **coordenadas** que Elena anota en su libreta. Es la semilla de los futuros capítulos.

---

> Estructura genérica del libro interactivo (spreads, decisiones y enlaces): [`docs/story-guide.md`](../../../docs/story-guide.md)