# 🤖 PIPELINE DE AGENTES: HISTORIAS INTERACTIVAS POR CUALIDADES NARRATIVAS

Este documento define el algoritmo de ejecución estricto que cada agente de Inteligencia Artificial debe seguir para co-crear, estructurar, escribir y validar las páginas de la historia. El sistema se basa en un modelo de **libro interactivo con páginas y spreads (doble página)**, utilizando **rasgos de personaje, lógica de deducción y evolución del estado psicológico**.

---

## 🗺️ PASO 1: Sincronización del Contexto Global (LoreMaster)
*Cada vez que se inicie la creación o edición de una página, el agente asumirá el rol de LoreMaster y ejecutará los siguientes pasos en orden:*

1. **Leer `/world/1938-era.md`**: Asimilar el entorno de 1938, la tecnología disponible y las limitaciones de la época.
2. **Leer `/world/factions/` y `/world/creatures/`**: Cargar la información de las facciones y criaturas relevantes para la historia (ej: `dagon-cult.md`, `the-deep-ones.md`).
3. **Leer `/stories/[story-name]/context/[story-name]-background.md`**: Extraer el prompt inicial, el enfoque del protagonista y los objetivos globales del relato.
4. **Leer `/stories/[story-name]/context/timeline.md`**: Cargar la cronología del evento activo y la fase horaria vigente (Fases 1 a 4).
5. **Escanear `/characters/[character].json`**: Analizar el archivo de datos del personaje (ubicado en la raíz del proyecto, compartido entre historias). Registrar sus `attributes` (rasgos con valores), sus `skills` (habilidades) y sus `items` (objetos en inventario).
6. **Escanear `/stories/[story-name]/generated/`**: Registrar el catálogo de spreads existentes (los ids del array `spreads` y `spreadIds` del JSON generado). Anotar cuáles son spreads de decisión y cuáles son spreads de derrota (gameover). Este catálogo se usará en el PASO 2 para evitar duplicar spreads o enlazar a spreads inexistentes.
7. **Escanear el catálogo de imágenes**: Leer `/stories/[story-name]/context/image-names.md` y registrar las imágenes disponibles de la historia (su sentido y su lugar). Detalle en `docs/images.md`.
8. **Validar Coherencia Narrativa**: Asegurar que ningún elemento introducido rompa la tecnología de la época, las reglas de las facciones/criaturas definidas en `world/` o el tono establecido.

---

## 📐 PASO 2: Diseño Arquitectural de la Página (PagePlotter)
*Con el contexto fijado, el agente asumirá el rol de PagePlotter para calcular el esqueleto de la página y sus elecciones:*

1. **Alinear el Peligro con la Fase Horaria**: Diseñar los obstáculos de la página en base a la Fase de la Noche activa en la cronología de la historia.
2. **Cruzar Obstáculos con Atributos (`attributes`)**: 
   * Si el personaje posee un atributo con valor alto para la situación (ej: *"Atlética y ágil" con value: 4*), habilitar una opción de resolución física que tenga éxito natural.
   * Si el personaje no posee un atributo adecuado para la situación, la opción correspondiente debe implicar un riesgo narrativo evidente.
3. **Estructurar las Opciones**: Generar un mínimo de 2 y un máximo de 4 elecciones. Al menos una debe apelar a la profesión/deducción del personaje (ej: *"Tomar fotografía"*, *"Investigar la estática de la radio"*) y otra a la autopreservación.
4. **Vincular con Página Siguiente**: Cada opción debe apuntar a una `optionLink` que corresponda al ID de la página destino dentro del spread o en el spread siguiente.
5. **Vinculación de Imagen (Opcional)**: Revisar el catálogo de imágenes del PASO 1 (`[story-name]/context/image-names.md`). Si alguna imagen del catálogo encaja naturalmente con la escena o momento de la página, asignarla al campo `illustration` (imagen simple de página) o a `mapData.backgroundImage` (imagen de mapa con posiciones). Si ninguna encaja bien, omitir ambos campos — no forzar una imagen que no represente fielmente la narrativa.

---

## ✍️ PASO 3: Redacción Literaria e Inmersión (ScribeAgent)
*El agente asumirá el rol de ScribeAgent para transformar el esqueleto técnico en prosa literaria de terror psicológico:*

1. **Perspectiva Narrativa**: Escribir estrictamente en segunda persona del singular ("Tú") para forzar la inmersión del lector.
2. **Filtro Atmosférico Lovecraftiano**: Describir los entornos utilizando estímulos sensoriales de la época (el olor fétido a fango abisal, el parpadeo titilante de las farolas de gas, el crujido de la madera podrida y el frío salitre).
3. **Adaptar al Tono de la Historia**: Mantener coherencia con el estado narrativo establecido en la sinopsis y el contexto de la historia.
4. **Redactar Elecciones Detalladas y Justificadas**: El texto de cada opción de la `rightPage` debe explicar **qué hace el personaje y con qué intención**, para que el lector entienda bien no solo la acción sino el dilema detrás de ella (ej: *"Aprovechas tu agilidad para trepar por el tragaluz oxidado: es la salida más alta y la criatura aún no te ha visto"*).
5. **Convención de Nombres de Imagen**: Si se asigna una imagen, asegurar que el nombre del archivo sea descriptivo, en minúsculas y con guiones bajos entre palabras (ej: `callejon-oscuro-niebla.jpg`, `elena-camara-fuelle.jpg`). El nombre debe reflejar fielmente el contenido visual de la página. **El nombre de la imagen describe la situación concreta de la escena y debe tenerse muy en cuenta al redactar el `text` descriptivo**: cada elemento nombrado en el archivo (lugar, criatura, objeto, estado atmosférico) debe estar presente o resonar en la narrativa de la página.
6. **Regla de Longitud Narrativa por Página**: La narrativa vive **siempre en la `leftPage`** según su contenido visual:
   * **leftPage con imagen** (declara `mapData.backgroundImage` **o** `illustration`): texto breve y visual, hasta **50 palabras** en su `text`, sin forzar la extensión.
   * **leftPage sin imagen**: **3–4 párrafos breves**, cada uno de máximo **50 palabras**.
   * La `rightPage` no lleva narrativa: su `text` queda vacío (`""`) y contiene únicamente `pageOptions`.

---

## 🛡️ PASO 4: Control de Calidad y Enlaces (PageAuditor)
*Antes de dar la página por finalizada, el agente ejecutará el test de cierre técnico:*

1. **Integridad de Rutas**: Verificar que todas las `optionLink` declaradas apunten a un ID de página existente o planificado dentro de la estructura de spreads.
2. **Evitar Deadlocks**: Validar que la página no sea un callejón sin salida narrativo, a menos que sea un final de historia explícito (Fin o Muerte).
3. **Validación de Imagen**: Si la página declara un campo `mapData` **o** `illustration`, verificar que el nombre de la imagen está listado en `/stories/[story-name]/context/image-names.md`. Si no se cumple, eliminar el campo correspondiente de la página (no dejar referencias rotas).
4. **Validación de Longitud Narrativa por Página**: Contar las palabras del `text` de la `leftPage` según su contenido visual:
   * `leftPage` con imagen (`mapData.backgroundImage` **o** `illustration`): hasta **50 palabras** en total, sin forzar la extensión.
   * `leftPage` sin imagen: **3–4 párrafos breves**, cada uno de máximo **50 palabras**.
   * `rightPage.text`: debe estar vacío (`""`) — solo contiene `pageOptions`.
   Si no se cumple (incluida una `rightPage` con narrativa), devolver la página al ScribeAgent para redacción.
5. **Firma de Verificación**: Añadir la propiedad `"status": "verified"` en los metadatos de la página una vez comprobado que se han seguido correctamente los Pasos 1 a 3.

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

---

## 📖 Estructura de Datos

### Unidad Básica: StorySpread
Cada spread contiene **2 páginas** con roles diferentes:

| Página | Rol | Contenido | Opciones |
|--------|-----|-----------|----------|
| **leftPage** | Visual + Narrativa | Imagen (`illustration`/`mapData`, si aplica) + texto de la escena | **NUNCA** |
| **rightPage** | Decisiones | Solo elecciones (`pageOptions`); `text` vacío (`""`) | SÍ |

### StoryPage (Página Individual)
```json
{
  "id": "string",
  "pageNumber": 1,
  "title": "string (opcional)",
  "text": "string (narrativa principal - en leftPage; rightPage siempre vacío)",
  "illustration": "string (opcional - imagen simple de página)",
  "mapData": {
    "backgroundImage": "string",
    "userPosition": { "col": 0, "row": 0 },
    "targetPosition": { "col": 1, "row": 0 }
  },
  "pageOptions": [
    {
      "optionText": "string",
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
  "rightPage": "StoryPage (solo elecciones - text vacío)"
}
```

### Reglas de Contenido
* **leftPage.pageOptions**: Siempre `[]` (vacío)
* **leftPage.text**: La narrativa vive en la leftPage. Con imagen (`mapData.backgroundImage` **o** `illustration`): hasta **50 palabras** en total, sin forzar la extensión. Sin imagen: **3–4 párrafos breves**, cada uno de máximo **50 palabras**
* **leftPage.mapData**: Imagen de fondo, posición del jugador, posición objetivo
* **leftPage.illustration**: Imagen simple de página (sin posiciones de mapa), opcional
* **rightPage.text**: Siempre `""` (vacío) — la rightPage contiene SOLO las elecciones
* **rightPage.pageOptions**: 2-4 opciones con `optionLink` a siguiente spread o gameover. Cada opción debe ser **detallada y justificada**: expresa qué hace el personaje y con qué intención
* **Path selector (página de decisiones)**: Página cuyo `pageOptions` no está vacío; el jugador elige el camino a seguir. Su `text` queda vacío (`""`)

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
        "illustration": "cocina-pension-puerta-trasera.jpg",
        "pageOptions": []
      },
      "rightPage": {
        "id": "page-2",
        "pageNumber": 1,
        "text": "",
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
