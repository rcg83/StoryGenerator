# 🤖 PIPELINE DE AGENTES: HISTORIAS INTERACTIVAS POR CUALIDADES NARRATIVAS

Este documento define el algoritmo de ejecución estricto que cada agente de Inteligencia Artificial debe seguir para co-crear, estructurar, escribir y validar las páginas de la historia. El sistema se basa en un modelo de **libro interactivo con páginas y spreads (doble página)**, utilizando **rasgos de personaje, lógica de deducción y evolución del estado psicológico**.

---

## 🗺️ PASO 1: Sincronización del Contexto Global (LoreMaster)
*Cada vez que se inicie la creación o edición de una página, el agente asumirá el rol de LoreMaster y ejecutará los siguientes pasos en orden:*

1. **Leer `/world/1938-era.md`**: Asimilar el entorno de 1938, la tecnología disponible y las limitaciones de la época.
2. **Leer `/world/factions/` y `/world/creatures/`**: Cargar la información de las facciones y criaturas relevantes para la historia (ej: `dagon-cult.md`, `the-deep-ones.md`).
3. **Leer `/world/scenarios/`**: Cargar el/los escenario(s) que la historia declare en `[story-name]-background.md`, en `world/scenarios/<scenario-id>.md` (ej: `gilman-house.md`). Es la verdad física del espacio: plantas, zonas, elementos y conexiones. Toda página debe ser coherente con esa geografía.
4. **Leer `/stories/[story-name]/context/[story-name]-background.md`**: Extraer el prompt inicial, el enfoque del protagonista, los objetivos globales del relato y los escenarios declarados.
5. **Leer `/stories/[story-name]/context/timeline.md`**: Cargar la cronología del evento activo y la fase horaria vigente (Fases 1 a 4).
6. **Escanear `/characters/[character].json`**: Analizar el archivo de datos del personaje (ubicado en la raíz del proyecto, compartido entre historias). Registrar sus `attributes` (rasgos con valores), sus `skills` (habilidades) y sus `items` (objetos en inventario).
7. **Escanear `/stories/[story-name]/generated/`**: Registrar el catálogo de spreads existentes (los ids del array `spreads` y `spreadIds` del JSON generado). Anotar cuáles son spreads de decisión y cuáles son spreads de derrota (gameover). Este catálogo se usará en el PASO 2 para evitar duplicar spreads o enlazar a spreads inexistentes.
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
4. **Vincular con Página Siguiente**: Cada opción debe apuntar a una `optionLink` que corresponda al ID de la página destino dentro del spread o en el spread siguiente.
5. **Adyacencia Física**: Cada `optionLink` debe conectar dos espacios adyacentes según el escenario del PASO 1 (misma planta por puerta o cornisa, o planta contigua por escalera/montacargas). Se descarta toda transición físicamente imposible.
6. **Vinculación de Imagen (Opcional)**: Revisar el catálogo de imágenes del PASO 1 (`[story-name]/context/image-names.md`). Si alguna imagen del catálogo encaja naturalmente con la escena o momento de la página, asignarla al campo `illustration` como objeto con `name`, `description` y `size` (opcional; default `large` en `leftPage`, `small` en `rightPage`). Si ninguna encaja bien, omitir el campo — no forzar una imagen que no represente fielmente la narrativa.

---

## ✍️ PASO 3: Redacción Literaria e Inmersión (ScribeAgent)
*El agente asumirá el rol de ScribeAgent para transformar el esqueleto técnico en prosa literaria de terror psicológico:*

1. **Perspectiva Narrativa**: Escribir estrictamente en segunda persona del singular ("Tú") para forzar la inmersión del lector.
2. **Anclaje Físico-Espacial**: Anclar cada página al escenario del PASO 1: el personaje sabe dónde está (planta + zona), de dónde llegó y qué conexión queda delante. Las transiciones son continuas (la salida de un spread enlaza de forma natural con la llegada del siguiente) y los elementos nombrados existen en el plano del escenario.
3. **Filtro Atmosférico Lovecraftiano**: Describir los entornos utilizando estímulos sensoriales de la época (el olor fétido a fango abisal, el parpadeo titilante de las farolas de gas, el crujido de la madera podrida y el frío salitre).
4. **Adaptar al Tono de la Historia**: Mantener coherencia con el estado narrativo establecido en la sinopsis y el contexto de la historia.
5. **Redactar Elecciones Detalladas y Justificadas**: El texto de cada opción de la `rightPage` debe explicar **qué hace el personaje y con qué intención**, para que el lector entienda bien no solo la acción sino el dilema detrás de ella (ej: *"Aprovechas tu agilidad para trepar por el tragaluz oxidado: es la salida más alta y la criatura aún no te ha visto"*).
6. **Convención de Nombres de Imagen**: Si se asigna una imagen, asegurar que el nombre del archivo (`illustration.name`) sea descriptivo, en minúsculas y con guiones bajos entre palabras (ej: `callejon-oscuro-niebla.jpg`, `elena-camara-fuelle.jpg`). El nombre debe reflejar fielmente el contenido visual de la página. **El nombre de la imagen describe la situación concreta de la escena y debe tenerse muy en cuenta al redactar el `text` descriptivo y la `illustration.description`**: cada elemento nombrado en el archivo (lugar, criatura, objeto, estado atmosférico) debe estar presente o resonar en la narrativa de la página.
7. **Descripción de Imagen (`illustration.description`)**: Redactar **un único párrafo de máximo 100 palabras, todo junto** (sin saltos de línea), en segunda persona, describiendo qué muestra la imagen (lugar, criatura, objeto, estado atmosférico) **e incluyendo pistas y detalles relevantes para que el lector pueda tomar decisiones correctas**. Sirve de contenido alternativo por accesibilidad o cuando la imagen no está disponible: el front muestra la imagen o la descripción.
8. **Regla de Longitud Narrativa por Página (Regla de las 4 Zonas)**: Cada página se estructura en **4 zonas**. Todo componente ocupa un número fijo de zonas:
   * **1 zona** = 1 párrafo de narrativa (máx. **40 palabras**) o 1 opción (`pageOption`, máx. **30 palabras**).
   * **Imagen** = según su `size`: `small` (1 zona), `medium` (2 zonas), `large` (3 zonas, default en `leftPage`), `full` (4 zonas, página entera de imagen, sin texto).
   * **`illustration.description`** = máx. 100 palabras, un único párrafo con pistas para la decisión (campo de accesibilidad, no ocupa zona).
   * **leftPage (narrativa, NUNCA opciones)**:
     - Sin imagen → **4 párrafos** de máx. 40 palabras.
     - Con imagen `small` → 3 párrafos · `medium` → 2 párrafos · `large` → 1 párrafo · `full` → 0 párrafos.
   * **rightPage (path selector de decisiones)**: cada opción ocupa 1 zona; el resto se rellena con párrafos de contexto (máx. 40 palabras):
     - 2 opciones → 2 párrafos + 2 opciones · 3 opciones → 1 párrafo + 3 opciones · 4 opciones → 0 párrafos + 4 opciones.
     - Opcionalmente puede incluir 1 imagen `small` (1 zona) en lugar de uno de esos párrafos.
   * **Gameover y finales (exentos de la regla de opciones)**: con imagen → 1 párrafo de máx. 40 palabras; sin imagen → hasta 4 párrafos. La opción "Reiniciar" es control de UI, no computa como zona.
   * La `rightPage` **no** está limitada a `text` vacío: su `text` contiene los párrafos de contexto que completan las 4 zonas.

---

## 🛡️ PASO 4: Control de Calidad y Enlaces (PageAuditor)
*Antes de dar la página por finalizada, el agente ejecutará el test de cierre técnico:*

1. **Integridad de Rutas**: Verificar que todas las `optionLink` declaradas apunten a un ID de página existente o planificado dentro de la estructura de spreads.
2. **Evitar Deadlocks**: Validar que la página no sea un callejón sin salida narrativo, a menos que sea un final de historia explícito (Fin o Muerte).
3. **Plausibilidad Espacial**: Verificar que cada `optionLink` conecte espacios adyacentes según la red de conexiones del escenario cargado en el PASO 1 (`world/scenarios/`). Si la transición es físicamente imposible, devolver la página al ScribeAgent.
4. **Validación de Imagen**: Si la página declara `illustration`, verificar que `illustration.name` está listado en `/stories/[story-name]/context/image-names.md`, que `illustration.description` existe y que `illustration.size` es uno de `small`, `medium`, `large` o `full`. Si no se cumple, eliminar el campo `illustration` de la página (no dejar referencias rotas).
5. **Validación de Longitud Narrativa por Página (Regla de las 4 Zonas)**: Verificar que cada página suma exactamente **4 zonas** con los límites de palabras (párrafo máx. 40; opción máx. 30; `illustration.description` un único párrafo máx. 100 palabras):
   * `leftPage`: sin imagen → **4 párrafos**; con imagen según `size` — `small` → 3, `medium` → 2, `large` → 1, `full` → 0 párrafos.
   * `rightPage`: número de párrafos de contexto = 4 − número de opciones (2 opciones → 2 párrafos; 3 → 1; 4 → 0), opcionalmente sustituyendo un párrafo por 1 imagen `small`.
   * Si no se cumple, devolver la página al ScribeAgent para redacción.
6. **Firma de Verificación**: Añadir la propiedad `"status": "verified"` en los metadatos de la página una vez comprobado que se han seguido correctamente los Pasos 1 a 3.

---

## 🎮 Tramo Jugable Estándar

### Estructura de Decisiones
Cada tramo jugable sigue esta estructura:

* **10 decisiones** para alcanzar un savepoint
* **3 decisiones críticas** (vida o muerte) distribuidas uniformemente
* **7 decisiones normales** (correcta/alternativa, sin Game Over)
* **Peligro constante** en toda la narrativa

### Distribución de Spreads por Decisión

| Tipo de Decisión | Spreads | Contenido |
|------------------|---------|-----------|
| **Crítica** | 3 | 1 correcta, 1 arriesgada, 1 GAME OVER |
| **Normal** | 2 | 1 correcta, 1 alternativa |

### Spreads Totales por Tramo
* 3 decisiones críticas × 3 spreads = 9
* 7 decisiones normales × 2 spreads = 14
* **Total: ~23 spreads por tramo**

### Reglas de Diseño
* **Elección correcta:** Deducible leyendo el perfil del personaje (attributes, skills, items)
* **Elección letal:** Obvia si prestas atención al contexto narrativo
* **Consecuencia:** Game Over directo (muerte o captura)
* **Flexibilidad:** Si la historia pide más tensión, se pueden añadir más decisiones críticas

---

## 📁 Documentación de Referencia (Índice)

* `docs/images.md` — Convención del catálogo de imágenes: `stories/[story-name]/context/image-names.md`.
* `docs/story-guide.md` — Estructura genérica del libro interactivo: spreads, decisiones, enlaces entre spreads y reglas de diseño.
* `world/scenarios/` — Escenarios físicos compartidos (edificios y espacios): cada historia declara los que usa en su `[story-name]-background.md`.

---

## 📖 Estructura de Datos

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
  "title": "string (opcional)",
  "text": "string (narrativa en párrafos; en rightPage, párrafos de contexto de la regla de 4 zonas)",
  "illustration": {
    "name": "imagen-de-pagina.jpg (opcional)",
    "size": "small | medium | large | full (opcional; default large en leftPage, small en rightPage)",
    "description": "Un único párrafo de máximo 100 palabras con pistas para la decisión"
  },
  "pageOptions": [
    {
      "optionText": "string (máx. 30 palabras)",
      "optionLink": "string"
    }
  ]
}
```

### StorySpread (Doble Página)
```json
{
  "id": "string",
  "leftPage": "StoryPage (visual + narrativa - NUNCA opciones)",
  "rightPage": "StoryPage (decisiones: opciones + párrafos de contexto que completan las 4 zonas)"
}
```

### Reglas de Contenido (Regla de las 4 Zonas)
* **Cada StoryPage suma exactamente 4 zonas.** 1 zona = 1 párrafo (máx. 40 palabras) o 1 opción (máx. 30 palabras) o 1 imagen `small`. Una imagen `medium`/`large`/`full` ocupa 2/3/4 zonas.
* **leftPage.pageOptions**: Siempre `[]` (vacío)
* **leftPage.text**: La narrativa vive en la leftPage. Sin imagen: **4 párrafos** de máx. 40 palabras. Con imagen según `size`: `small` → 3 párrafos, `medium` → 2, `large` → 1, `full` → 0
* **leftPage.illustration**: Objeto `{ "name", "description", "size" }`. `name`: archivo listado en `image-names.md`. `description`: **un único párrafo de máximo 100 palabras** que describe la imagen e incluye pistas para la decisión (contenido alternativo por accesibilidad / imagen ausente). `size`: opcional, default `large` en leftPage y `small` en rightPage
* **rightPage.text**: Párrafos de contexto que completan las 4 zonas: 2 opciones → 2 párrafos; 3 opciones → 1 párrafo; 4 opciones → `""`. Opcionalmente un párrafo puede sustituirse por 1 imagen `small`
* **rightPage.pageOptions**: 2-4 opciones con `optionLink` a siguiente spread o gameover. Cada opción debe ser **detallada y justificada** (máx. **30 palabras**): expresa qué hace el personaje y con qué intención
* **Path selector (página de decisiones)**: Página cuyo `pageOptions` no está vacío; el jugador elige el camino a seguir
* **Gameovers y finales (exentos)**: con imagen → 1 párrafo de máx. 40 palabras; sin imagen → hasta 4 párrafos. La opción "Reiniciar" es control de UI, no computa como zona

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


{
  "id": "your-story-id",
  "title": "Your Story Title",
  "startPageId": "spread1",
  "cover": {
    "title": "COVER HEADLINE",
    "subtitle": "Subtitle • Date",
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
          "description": "Un único párrafo de máximo 100 palabras con pistas para la decisión."
        },
        "pageOptions": []
      },
      "rightPage": {
        "id": "page-2",
        "pageNumber": 1,
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
  ]
}
