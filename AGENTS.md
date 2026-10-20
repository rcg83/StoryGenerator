# 🤖 PIPELINE DE AGENTES: HISTORIAS INTERACTIVAS POR CUALIDADES NARRATIVAS

Este documento define el algoritmo de ejecución estricto que cada agente de Inteligencia Artificial debe seguir para co-crear, estructurar, escribir y validar las páginas de la historia. El sistema se basa en un modelo de **libro interactivo con páginas y spreads (doble página)**, utilizando **rasgos de personaje, lógica de deducción y evolución del estado psicológico**.

---

## 🗺️ PASO 1: Sincronización del Contexto Global (LoreMaster)
*Cada vez que se inicie la creación o edición de una página, el agente asumirá el rol de LoreMaster y ejecutará los siguientes pasos en orden:*

1. **Leer `/world/1938-era.md`**: Asimilar el entorno de 1938, la tecnología disponible y las limitaciones de la época.
2. **Leer `/world/factions/` y `/world/creatures/`**: Cargar la información de las facciones y criaturas relevantes para la historia (ej: `dagon-cult.md`, `the-deep-ones.md`).
3. **Leer `/world/scenarios/`**: Cargar el/los escenario(s) que la historia declare en `[story-name]-background.md`: el documento `world/scenarios/<scenario-id>.md` (ej: `gilman-house.md`) y su modelo máquina-legible `world/scenarios/<scenario-id>.json` (ej: `gilman-house.json`), que define las **zonas con IDs canónicos** y la **lista de conexiones adyacentes** (cada arista con su `via`, `direction` y `constraints`). Registrar ese grafo de zonas/adyacencia: es la verdad física del espacio (plantas, zonas, elementos y conexiones). Toda página debe ser coherente con esa geografía y **solo puede enlazar a zonas que sean adyacentes** según el grafo.
4. **Leer `/stories/[story-name]/context/[story-name]-background.md`**: Extraer el prompt inicial, el enfoque del protagonista, los objetivos globales del relato y los escenarios declarados.
5. **Leer `/stories/[story-name]/context/timeline.md`**: Cargar la cronología del evento activo y la fase horaria vigente (Fases 1 a 4).
6. **Escanear `/characters/[character].json`**: Analizar el archivo de datos del personaje (ubicado en la raíz del proyecto, compartido entre historias). Registrar sus `attributes` (rasgos con valores), sus `skills` (habilidades) y sus `items` (objetos en inventario).
7. **Escanear `/stories/[story-name]/generated/`**: Registrar los **capítulos** existentes: cada archivo `[story-name]-chapter-NN.json` es un capítulo autocontenido (dominio `Chapter`). Anotar, por capítulo, los ids de sus arrays `spreads` y `spreadIds`, cuáles son spreads de decisión, cuáles son de derrota (gameover) y cuál es su spread de cierre (`end-*`). Este catálogo se usará en el PASO 2 para evitar duplicar spreads, no enlazar a spreads inexistentes, respetar los límites de 6-8 spreads por capítulo y mantener los `optionLink` dentro del capítulo activo.
8. **Escanear el catálogo de imágenes**: Leer `/stories/[story-name]/context/image-names.md` y registrar las imágenes disponibles de la historia (su sentido y su lugar). Detalle en `docs/images.md`.
9. **Validar Coherencia Narrativa**: Asegurar que ningún elemento introducido rompa la tecnología de la época, las reglas de las facciones/criaturas definidas en `world/`, la geografía de los escenarios definidos en `world/scenarios/` o el tono establecido.

---

## 📐 PASO 2: Diseño Arquitectural de la Página (PagePlotter)
*Con el contexto fijado, el agente asumirá el rol de PagePlotter para calcular el esqueleto de la página y sus elecciones:*

1. **Alinear el Peligro con la Fase Horaria**: Diseñar los obstáculos de la página en base a la Fase de la Noche activa en la cronología de la historia.
2. **Cruzar Obstáculos con Atributos (`attributes`)**: 
   * Si el personaje posee un atributo con valor alto para la situación (ej: *"Atlética y ágil" con value: 4*), habilitar una opción de resolución física que tenga éxito natural.
   * Si el personaje no posee un atributo adecuado para la situación, la opción correspondiente debe implicar un riesgo narrativo evidente.
3. **Estructurar las Opciones**: Generar un mínimo de 2 y un máximo de 4 elecciones. Al menos una debe apelar a la profesión/deducción del personaje (ej: *"Tomar fotografía"*, *"Investigar la estática de la radio"*) y otra a la autopreservación.
4. **Vincular con Página Siguiente (intra-capítulo)**: Cada opción debe apuntar a una `optionLink` que corresponda al ID de la página destino dentro del spread o en el spread siguiente. Todos los `optionLink` deben permanecer **dentro del mismo capítulo**: el capítulo es una unidad autocontenida que se cierra con su spread `end-*` (el front usa ese cierre para desbloquear el capítulo siguiente). Nunca se enlaza a un spread de otro capítulo.
5. **Anclaje y Adyacencia Física (zonas)**: Anclar cada spread a una **zona** concreta usando su **ID canónico** del `.json` del PASO 1 (ej: `p4-pasillo`) y hacer que cada `optionLink` caiga en una **zona adyacente** según la lista de conexiones de ese `.json` (misma planta por puerta o cornisa, o planta contigua por escalera/montacargas), respetando los `constraints` de cada arista (p. ej. barrotes, montacargas por tramos). Se descarta toda transición que no sea una arista del grafo o que sea físicamente imposible.
6. **Vinculación de Imagen (Opcional)**: Revisar el catálogo de imágenes del PASO 1 (`[story-name]/context/image-names.md`). Si alguna imagen del catálogo encaja naturalmente con la escena o momento de la página, asignarla al campo `illustration` como objeto con `name`, `description` y `size` (opcional; default `large` en `leftPage`, `small` en `rightPage`). Si ninguna encaja bien, omitir el campo — no forzar una imagen que no represente fielmente la narrativa.
   * **Excepción obligatoria (gameover y finales)**:
    * **`gameover-*` (muerte):** la ilustración va **siempre en la `leftPage`** con `size: "full"` (página entera de imagen, 4 zonas). La `leftPage` no lleva texto narrativo (su `text` debe quedar vacío) y nunca opciones. La `rightPage` lleva el texto explicativo de la causa del game over (1 párrafo) junto con la opción "Reiniciar".
    * **`end-*` (finales):** se mantiene la regla actual: la imagen va **siempre en la `rightPage`** con `size: "full"` (página entera de imagen, 4 zonas), y la `leftPage` queda **solo con texto**, nunca con `illustration`.

---

## ✍️ PASO 3: Redacción Literaria e Inmersión (ScribeAgent)
*El agente asumirá el rol de ScribeAgent para transformar el esqueleto técnico en prosa literaria de terror psicológico:*

1. **Perspectiva Narrativa**: Escribir estrictamente en segunda persona del singular ("Tú") para forzar la inmersión del lector.
2. **Anclaje Físico-Espacial**: Anclar cada página al escenario del PASO 1 usando el **ID canónico de zona** del `.json`: el personaje sabe dónde está (planta + zona), de dónde llegó y qué conexión queda delante. Las transiciones son continuas (la salida de un spread enlaza de forma natural con la llegada del siguiente) y los elementos nombrados existen en la zona del escenario (nunca se inventan fuera de ella).
3. **Filtro Atmosférico Lovecraftiano**: Describir los entornos utilizando estímulos sensoriales de la época (el olor fétido a fango abisal, el parpadeo titilante de las farolas de gas, el crujido de la madera podrida y el frío salitre).
4. **Adaptar al Tono de la Historia**: Mantener coherencia con el estado narrativo establecido en la sinopsis y el contexto de la historia.
5. **Redactar Elecciones Detalladas y Justificadas**: El texto de cada opción de la `rightPage` debe explicar **qué hace el personaje y con qué intención**, para que el lector entienda bien no solo la acción sino el dilema detrás de ella (ej: *"Aprovechas tu agilidad para trepar por el tragaluz oxidado: es la salida más alta y la criatura aún no te ha visto"*).
6. **Convención de Nombres de Imagen**: Si se asigna una imagen, asegurar que el nombre del archivo (`illustration.name`) sea descriptivo, en minúsculas y con guiones bajos entre palabras (ej: `callejon-oscuro-niebla.jpg`, `elena-camara-fuelle.jpg`). El nombre debe reflejar fielmente el contenido visual de la página. **El nombre de la imagen describe la situación concreta de la escena y debe tenerse muy en cuenta al redactar el `text` descriptivo y la `illustration.description`**: cada elemento nombrado en el archivo (lugar, criatura, objeto, estado atmosférico) debe estar presente o resonar en la narrativa de la página.
7. **Descripción de Imagen (`illustration.description`)**: Redactar **un único párrafo de máximo 48 palabras, todo junto** (sin saltos de línea), en **tercera persona y tiempo presente**: una descripción pura, precisa, detallada y breve de lo que la imagen muestra (encuadre, luz, atmósfera, figuras, objetos y estado de las cosas), pensada para que alguien que no ve la imagen pueda visualizarla lo mejor posible. **Prohibido** redactarla como narrativa en segunda persona, como acción del jugador o como consejo / lista de pistas. **Ley de pistas:** las pistas de decisión pueden venir del `text` de las páginas o de la propia imagen; cuando vengan de la imagen, los elementos clave se describen fielmente para que el lector los **deduzca** de la descripción — nunca se entregan explícitamente como pista. Sirve de contenido alternativo por accesibilidad o cuando la imagen no está disponible: el front muestra la imagen o la descripción.
8. **Regla de Longitud Narrativa por Página (Regla de las 4 Zonas)**: Cada página se estructura en **4 zonas**. Todo componente ocupa un número fijo de zonas:
    * **1 zona** = 1 párrafo de narrativa (máx. **32 palabras**) o 1 opción (`pageOption`, máx. **24 palabras**).
   * **Imagen** = según su `size`: `small` (1 zona), `medium` (2 zonas), `large` (3 zonas, default en `leftPage`), `full` (4 zonas, página entera de imagen, sin texto).
    * **`illustration.description`** = máx. 48 palabras, un único párrafo en tercera persona que describe la imagen (campo de accesibilidad, no ocupa zona; los elementos clave se describen para **deducir** la decisión, no se dan como pistas).
   * **leftPage (narrativa, NUNCA opciones)**:
      - Sin imagen → **4 párrafos** de máx. 32 palabras.
     - Con imagen `small` → 3 párrafos · `medium` → 2 párrafos · `large` → 1 párrafo · `full` → 0 párrafos.
    * **rightPage (path selector de decisiones)**: cada opción ocupa 1 zona; el resto se rellena con párrafos de contexto (máx. 32 palabras):
     - 2 opciones → 2 párrafos + 2 opciones · 3 opciones → 1 párrafo + 3 opciones · 4 opciones → 0 párrafos + 4 opciones.
     - Opcionalmente puede incluir 1 imagen `small` (1 zona) en lugar de uno de esos párrafos.
    * **Gameover y finales (exentos de la regla de opciones)**:
      * **`gameover-*` (muerte):** la `leftPage` lleva la ilustración `size: "full"` (página entera de imagen, 4 zonas), `text` vacío, `pageOptions: []`, `title` = título del relato. La `rightPage` **no** lleva `illustration`, tiene `title` = título del capítulo, `text` con **exactamente 1 párrafo** de **máx. 32 palabras** explicando **breve y directamente la causa** por la que se ha llegado al game over, y añade **únicamente** la opción `"Reiniciar"` con `optionLink` al `startPageId` del capítulo (control de UI, no computa como zona).
      * **`end-*` (finales):** la `leftPage` es **solo texto** (nunca `illustration`, nunca opciones) con **exactamente 4 párrafos** de máx. 32 palabras (la fuga/desenlace, anclada a planta + zona + de dónde llega + qué conexión tenía delante). La `rightPage` lleva la imagen `full` (4 zonas, página entera) y `text` vacío, con `title` = título del capítulo, **sin opciones** (el front gestiona el reinicio del capítulo).
      * Fallback: si el catálogo no tiene imagen para ese `gameover-*`, se omite `illustration` de la `leftPage` y se adapta la estructura lo menos posible, pero **se prefiere siempre** aplicar la nueva estructura con imagen en `leftPage` cuando exista en el catálogo. Si no hay imagen para un `end-*`, se omite `illustration` y la `rightPage` queda con `text` vacío + `title`.
   * La `rightPage` **no** está limitada a `text` vacío: su `text` contiene los párrafos de contexto que completan las 4 zonas (salvo en gameover/finales, donde la imagen `full` ocupa la página entera).

---

## 🛡️ PASO 4: Control de Calidad y Enlaces (PageAuditor)
*Antes de dar la página por finalizada, el agente ejecutará el test de cierre técnico:*

1. **Integridad de Rutas**: Verificar que todas las `optionLink` declaradas apunten a un ID de página existente o planificado dentro de la estructura de spreads **del mismo capítulo**.
2. **Validación de Capítulo (6-8 spreads)**: Verificar que el capítulo tenga **entre 6 y 8 spreads en total** (spreads de decisión + gameovers + finales, contando todos), que contiene **exactamente un spread `end-*`** de cierre y que ningún `optionLink` sale del archivo. Si el capítulo se pasa de 8, dividirlo en dos; si queda por debajo de 6, completar decisiones. Fuera de rango, devolverlo al PagePlotter.
3. **Evitar Deadlocks**: Validar que la página no sea un callejón sin salida narrativo, a menos que sea un `gameover-*` (muerte) o el `end-*` de cierre del capítulo.
4. **Plausibilidad Espacial (grafo de zonas)**: Verificar que toda zona usada exista en `world/scenarios/<scenario-id>.json` y que cada `optionLink` corresponda a una **arista** de ese grafo (zonas adyacentes), respetando sus `constraints`. Si la zona no existe o la transición no es una arista (o es físicamente imposible), devolver la página al PagePlotter / ScribeAgent.
5. **Validación de Imagen**: Si la página declara `illustration`, verificar que `illustration.name` está listado en `/stories/[story-name]/context/image-names.md`, que `illustration.description` existe, está redactada en **tercera persona** (no como narrativa ni como consejo) y no excede las **60-70 palabras**, y que `illustration.size` es uno de `small`, `medium`, `large` o `full`. Si no se cumple, eliminar el campo `illustration` de la página (no dejar referencias rotas).
 6. **Validación de Longitud Narrativa por Página (Regla de las 4 Zonas)**: Verificar que cada página suma exactamente **4 zonas** con los límites de palabras (párrafo máx. 32; opción máx. 24; `illustration.description` un único párrafo máx. 48 palabras en tercera persona):
   * `leftPage`: sin imagen → **4 párrafos**; con imagen según `size` — `small` → 3, `medium` → 2, `large` → 1, `full` → 0 párrafos.
   * `rightPage`: número de párrafos de contexto = 4 − número de opciones (2 opciones → 2 párrafos; 3 → 1; 4 → 0), opcionalmente sustituyendo un párrafo por 1 imagen `small`.
   * **Gameovers y finales**: `leftPage` sin `illustration` y con **4 párrafos**; `rightPage` con `illustration.size: "full"`, `text` vacío y `title` = título del capítulo. En `gameover-*`, una sola opción "Reiniciar" → `startPageId`; en `end-*`, ninguna opción. Si el catálogo no ofrece imagen para ese spread, se omite `illustration` y la `rightPage` conserva `text` vacío + `title` (+ "Reiniciar" en los gameovers). **Nueva estructura (obligatoria cuando haya imagen):** para `gameover-*`, `leftPage` lleva `illustration.size: "full"`, `text` vacío; `rightPage` lleva **exactamente 1 párrafo** explicando la causa y **únicamente** la opción `"Reiniciar"`. Para `end-*`, se mantiene la estructura inversa (`leftPage` solo texto con 4 párrafos, `rightPage` con `illustration.size: "full"`, `text` vacío, sin opciones).
   * Si no se cumple, devolver la página al ScribeAgent para redacción.
7. **Firma de Verificación**: Añadir la propiedad `"status": "verified"` en los metadatos de la página una vez comprobado que se han seguido correctamente los Pasos 1 a 3.

---

## 🎮 Capítulo Estándar

### Unidad de Progresión: Capítulo
Cada historia se divide en **capítulos** (dominio `Chapter`). Un capítulo = **un archivo JSON autocontenido** en `stories/[story-name]/generated/[story-name]-chapter-NN.json` y contiene **exactamente entre 6 y 8 spreads en total** — ni más ni menos — contando spreads de decisión, gameovers y finales.

### Distribución de Spreads por Capítulo (6-8 totales)

| Total | Spreads de decisión | Gameovers | Final (`end-*`) |
|-------|--------------------|-----------|------------------|
| 6 | 4 | 1 | 1 |
| 7 | 4-5 | 1-2 | 1 |
| 8 | 5-6 | 1-2 | 1 |

### Estructura de Decisiones por Capítulo
* **2 a 4 decisiones** por capítulo, con **1-2 decisiones críticas** (vida o muerte) distribuidas uniformemente y el resto normales
* **Peligro constante** en toda la narrativa
* **Cierre obligatorio:** exactamente **1 spread `end-*`** — el hito de convergencia que el front usa para desbloquear el capítulo siguiente
* **Capítulo 1 (regla especial):** en el **primer capítulo** de la historia, **todo spread de decisión** debe incluir al menos **una opción letal** que enlace a un `gameover-*` del propio capítulo: el peligro está presente desde el primer spread. Los spreads `gameover-*` pueden reutilizarse entre distintos spreads de decisión dentro del mismo capítulo **cuando el espacio, la amenaza y el desenlace narrativo son idénticos**. Se crearán gameovers dedicados únicamente cuando la muerte ocurra en un espacio distinto o con una amenaza/causa distinta, justificando un desenlace narrativo diferente. Los gameovers pueden ser compartidos entre spreads del capítulo cuando la justificación narrativa es coherente.

### Distribución de Spreads por Decisión

| Tipo de Decisión | Spreads | Contenido |
|------------------|---------|-----------|
| **Crítica** | 3 | 1 correcta, 1 arriesgada, 1 GAME OVER |
| **Normal** | 2 | 1 correcta, 1 alternativa |

### Reglas de Diseño
* **Primer spread del capítulo (obligatorio):** el spread de arranque (`startPageId`) de cada capítulo tiene **exactamente 2 opciones**, y **una de ellas es letal** (enlaza a un `gameover-*` del propio capítulo). El peligro debe estar presente desde la primera elección.
* **Elección correcta:** Deducible leyendo el perfil del personaje (attributes, skills, items)
* **Elección letal:** Obvia si prestas atención al contexto narrativo
* **Consecuencia:** Game Over directo (muerte o captura), reiniciando el capítulo desde su `startPageId`
* **Límite estricto:** un capítulo nunca baja de 6 ni sube de 8 spreads; si el contenido no cabe, se abre un capítulo siguiente (`-chapter-NN+1`)
* **Flexibilidad:** Si la historia pide más tensión, se pueden añadir más decisiones críticas (sin romper el rango 6-8)

---

## 📁 Documentación de Referencia (Índice)

* `docs/images.md` — Convención del catálogo de imágenes: `stories/[story-name]/context/image-names.md`.
* `docs/story-guide.md` — Estructura genérica del libro interactivo: spreads, decisiones, enlaces entre spreads y reglas de diseño.
* `world/scenarios/` — Escenarios físicos compartidos (edificios y espacios): cada historia declara los que usa en su `[story-name]-background.md`. Cada escenario tiene su `.md` (prosa) y su `.json` (**zonas con IDs canónicos + lista de conexiones adyacentes**), que es la fuente del grafo de adyacencia usado al crear y validar los spreads.

---

## 📖 Estructura de Datos

### Unidad de Progresión: Chapter (Capítulo)
Un capítulo es una unidad autocontenida de 6-8 spreads. Cada capítulo es un archivo JSON en `stories/[story-name]/generated/[story-name]-chapter-NN.json`:

```json
{
  "storyId": "your-story-id",
  "chapterNumber": 1,
  "id": "your-story-id-chapter-01",
  "titleEn": "Story Title",
  "titleEs": "Título del Relato",
  "startPageId": "spread-001",
  "cover": {
    "subtitle": "Capítulo 1 • Fase • Hora",
    "coverImage": "/images/cover-your-story.png"
  },
  "spreads": [ "6 a 8 StorySpread" ],
  "spreadIds": [ "ids de los spreads del capítulo" ]
}
```

* **Reglas del dominio `Chapter`:** `id` = `<storyId>-chapter-NN`; `spreads` contiene **6-8 elementos exactamente** (decisión + gameovers + 1 `end-*`); `startPageId` apunta a su primer spread de decisión; ningún `optionLink` sale del capítulo; todas sus `leftPage` llevan `title` = título del relato y todas sus `rightPage` (decisión, gameovers y finales) llevan `title` = título del capítulo. El `titleEn`/`titleEs` de nivel superior es el **título del relato (magazine)**.
* **Dominio `Story`:** la historia agrega sus capítulos en orden (`chapters: Chapter[]`, ver `schemas/Chapter.ts` y `schemas/Story.ts`); el archivo por capítulo es la unidad de generación y de reproducción.

### Unidad Básica: StorySpread
Cada spread contiene **2 páginas** con roles diferentes:

| Página | Rol | Contenido | Opciones |
|--------|-----|-----------|----------|
| **leftPage** | Visual + Narrativa | Imagen (`illustration`, si aplica) + `illustration.description` + texto de la escena | **NUNCA** |
| **rightPage** | Decisiones | Elecciones (`pageOptions`) + párrafos de contexto que completan las 4 zonas | SÍ |

### StoryPage (Página Individual)
```json
{
  "id": "string",
  "pageNumber": 1,
  "title": "string (en leftPage: el título del relato; en rightPage: el título del capítulo, idéntico en todos los spreads del capítulo)",
  "text": "string (narrativa en párrafos; en rightPage, párrafos de contexto de la regla de 4 zonas; en gameover-* rightPage con 1 párrafo explicativo; vacío en end-*)",
  "illustration": {
    "name": "imagen-de-pagina.jpg (opcional)",
    "size": "small | medium | large | full (opcional; default large en leftPage, small en rightPage; full obligatorio en gameover-* leftPage y en end-* rightPage)",
     "description": "Un único párrafo de máximo 48 palabras, tercera persona, descripción pura de la imagen"
  },
  "pageOptions": [
    {
      "optionText": "string (máx. 24 palabras)",
      "optionLink": "string"
    }
  ]
}
```

### StorySpread (Doble Página)
```json
{
  "id": "string",
  "leftPage": "StoryPage (narrativa - NUNCA opciones; en gameover-* lleva illustration size:full con text vacío; en end-* nunca illustration)",
  "rightPage": "StoryPage (decisiones: opciones + párrafos de contexto; en gameover-* texto 1 párrafo + Reiniciar; en end-* imagen full sin opciones)"
}
```

### Reglas de Contenido (Regla de las 4 Zonas)
* **Cada StoryPage suma exactamente 4 zonas.** 1 zona = 1 párrafo (máx. 32 palabras) o 1 opción (máx. 24 palabras) o 1 imagen `small`. Una imagen `medium`/`large`/`full` ocupa 2/3/4 zonas.
* **leftPage.pageOptions**: Siempre `[]` (vacío)
* **leftPage.text**: La narrativa vive en la leftPage. Sin imagen: **4 párrafos** de máx. 32 palabras. Con imagen según `size`: `small` → 3 párrafos, `medium` → 2, `large` → 1, `full` → 0
* **leftPage.illustration**: Objeto `{ "name", "description", "size" }`. `name`: archivo listado en `image-names.md`. `description`: **un único párrafo de máximo 48 palabras en tercera persona** que describe la imagen con pureza y precisión — sirve para visualizarla a quien no la ve; sus elementos clave permiten **deducir** la decisión, nunca se dan como pistas explícitas (contenido alternativo por accesibilidad / imagen ausente). `size`: opcional, default `large` en leftPage y `small` en rightPage. **Excepción:** en `gameover-*` la imagen va **siempre en la `leftPage`** con `size: "full"`. En `end-*` la imagen **nunca** va en la `leftPage`.
* **rightPage.text**: Párrafos de contexto que completan las 4 zonas: 2 opciones → 2 párrafos; 3 opciones → 1 párrafo; 4 opciones → `""`. Opcionalmente un párrafo puede sustituirse por 1 imagen `small`
* **rightPage.pageOptions**: 2-4 opciones con `optionLink` a siguiente spread o gameover. Cada opción debe ser **detallada y justificada** (máx. **24 palabras**): expresa qué hace el personaje y con qué intención
* **Path selector (página de decisiones)**: Página cuyo `pageOptions` no está vacío; el jugador elige el camino a seguir
* **Gameovers y finales (exentos de la regla de opciones)**:
  * **`gameover-*`:** `leftPage` con `illustration.size: "full"`, `text` vacío, `pageOptions: []`, `title` = título del relato. `rightPage` sin `illustration`, con `text` formado por **únicamente 1 párrafo breve** explicando la causa directa del game over (máx. 32 palabras), y **exactamente 1 opción "Reiniciar"** (`optionLink` a `startPageId`), con `title` = título del capítulo (control de UI, no computa como zona).
  * **`end-*`:** `leftPage` solo texto con **4 párrafos**; `rightPage` con `illustration.size: "full"`, `text` vacío y `title` = título del capítulo, sin opciones. Si el catálogo no ofrece imagen para `end-*`, se omite `illustration` y la `rightPage` queda con `text` vacío + `title`. Si no existe imagen para un `gameover-*`, se prefiere siempre aplicar la nueva estructura; en caso de no poder, se omite `illustration` y se adapta la estructura acorde a lo requerido.
* **Títulos de página**: `leftPage.title` = **título del relato** (idéntico en todo el capítulo); `rightPage.title` = **título del capítulo** — idéntico en todos los spreads del capítulo (decisión, gameovers y finales). Prohibido escribir títulos propios por spread.

### CharacterData (Datos del Personaje)
```json
{
  "name": "string",
  "profession": "string",
  "photoUrl": "string",
  "attributes": [
    { "label": "string", "value": 1 }
  ],
  "skills": ["string"],
  "items": ["string"]
}
```


### Plantilla de Capítulo (Archivo JSON)

```json
{
  "storyId": "your-story-id",
  "chapterNumber": 1,
  "id": "your-story-id-chapter-01",
  "titleEn": "Your Chapter Title",
  "titleEs": "Título de su Capítulo",
  "startPageId": "spread1",
  "cover": {
    "subtitle": "Capítulo 1 • Subtítulo • Fecha",
    "coverImage": "/images/cover-your-story.png"
  },
  "spreads": [
    {
      "id": "spread1",
      "leftPage": {
        "id": "page-1",
        "pageNumber": 0,
        "text": "Narrative text for the left page.\n\nParagraph two.",
        "illustration": {
          "name": "cocina-pension-puerta-trasera.jpg",
          "size": "large",
           "description": "Un único párrafo de máximo 48 palabras, tercera persona, descripción pura de la imagen."
        },
        "pageOptions": []
      },
      "rightPage": {
        "id": "page-2",
        "pageNumber": 1,
        "title": "Título del Capítulo",
        "text": "Paragraph of context one.\n\nParagraph of context two.",
        "pageOptions": [
          {
            "optionText": "Choice A with intention",
            "optionLink": "spread2"
          },
          {
            "optionText": "Choice B with intention",
            "optionLink": "spread3"
          }
        ]
      }
    }
  ],
  "spreadIds": ["spread1", "spread2", "spread3"]
}
```

* El ejemplo muestra 1 spread por brevedad: en un capítulo real el array `spreads` debe contener **entre 6 y 8 spreads** (decisión + gameovers + 1 `end-*`), y `spreadIds` debe reflejarlos todos.

### Regla de codificación para archivos JSON generados
Al escribir cualquier archivo `.json` en `stories/*/generated/` (capítulos, spreads, etc.), **usar siempre UTF-8 sin BOM**.
* **No usar** `Out-File -Encoding utf8` en Windows PowerShell 5.1 (añade BOM).
* **Preferir** `[System.IO.File]::WriteAllText($path, $json, [System.Text.UTF8Encoding]::new($false))` desde PowerShell.
* **Recomendado**: generar con Node.js y `fs.writeFileSync(path, JSON.stringify(obj, null, 2) + "\n", "utf8")` (nunca añade BOM).
* **Validar** tras escribir: `node -e "require('fs'); JSON.parse(require('fs').readFileSync('ruta','utf8')); console.log('ok')"` para detectar errores/BOM antes de copiar.
