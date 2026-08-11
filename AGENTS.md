# 🤖 PIPELINE DE AGENTES: HISTORIAS INTERACTIVAS POR CUALIDADES NARRATIVAS

Este documento define el algoritmo de ejecución estricto que cada agente de Inteligencia Artificial debe seguir para co-crear, estructurar, escribir y validar las páginas de la historia. El sistema se basa en un modelo de **libro interactivo con páginas y spreads (doble página)**, utilizando **rasgos de personaje, lógica de deducción y evolución del estado psicológico**.

---

## 🗺️ PASO 1: Sincronización del Contexto Global (LoreMaster)
*Cada vez que se inicie la creación o edición de una página, el agente asumirá el rol de LoreMaster y ejecutará los siguientes pasos en orden:*

1. **Leer `/world/1938-era.md`**: Asimilar el entorno de 1938, la tecnología disponible y las limitaciones de la época.
2. **Leer `/world/factions/` y `/world/creatures/`**: Cargar la información de las facciones y criaturas relevantes para la historia (ej: `dagon-cult.md`, `the-deep-ones.md`).
3. **Leer `/stories/[story-name]/README.md`**: Extraer el prompt inicial, el enfoque del protagonista y los objetivos globales del relato.
4. **Leer `/stories/[story-name]/timeline.md`**: Cargar la cronología del evento activo y la fase horaria vigente (Fases 1 a 4).
5. **Escanear `/characters/[character].json`**: Analizar el archivo de datos del personaje (ubicado en la raíz del proyecto, compartido entre historias). Registrar sus `attributes` (rasgos con valores), sus `skills` (habilidades) y sus `items` (objetos en inventario).
6. **Escanear `/stories/[story-name]/spreads/`**: Registrar el catálogo de spreads existentes (nombres de archivo). Anotar cuáles son spreads de decisión y cuáles son spreads de derrota (gameover). Este catálogo se usará en el PASO 2 para evitar duplicar spreads o enlazar a spreads inexistentes.
7. **Escanear el catálogo de imágenes**: Leer `/stories/[story-name]/images/[story-name]-image-names.txt` y registrar las imágenes disponibles de la historia. Detalle en `docs/images.md`.
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
5. **Vinculación de Imagen (Opcional)**: Revisar el catálogo de imágenes del PASO 1 (txt `[story-name]-image-names.txt`). Si alguna imagen existente encaja naturalmente con la escena o momento de la página, asignarla al campo `mapData.backgroundImage`. Si ninguna encaja bien, omitir el campo `mapData` — no forzar una imagen que no represente fielmente la narrativa.

---

## ✍️ PASO 3: Redacción Literaria e Inmersión (ScribeAgent)
*El agente asumirá el rol de ScribeAgent para transformar el esqueleto técnico en prosa literaria de terror psicológico:*

1. **Perspectiva Narrativa**: Escribir estrictamente en segunda persona del singular ("Tú") para forzar la inmersión del lector.
2. **Filtro Atmosférico Lovecraftiano**: Describir los entornos utilizando estímulos sensoriales de la época (el olor fétido a fango abisal, el parpadeo titilante de las farolas de gas, el crujido de la madera podrida y el frío salitre).
3. **Adaptar al Tono de la Historia**: Mantener coherencia con el estado narrativo establecido en la sinopsis y el contexto de la historia.
4. **Redactar Elecciones Activas**: El texto de las opciones debe redactarse desde la perspectiva del dilema del personaje, dejando claras las intenciones detrás de cada camino (ej: *"Aprovechas tu agilidad para trepar por el tragaluz oxidado"*).
5. **Convención de Nombres de Imagen**: Si se asigna una imagen, asegurar que el nombre del archivo sea descriptivo, en minúsculas y con guiones bajos entre palabras (ej: `callejon-oscuro-niebla.jpg`, `elena-camara-fuelle.jpg`). El nombre debe reflejar fielmente el contenido visual de la página. **El nombre de la imagen describe la situación concreta de la escena y debe tenerse muy en cuenta al redactar el `text` descriptivo**: cada elemento nombrado en el archivo (lugar, criatura, objeto, estado atmosférico) debe estar presente o resonar en la narrativa de la página.
6. **Regla de Longitud Narrativa por Página**: El límite de palabras del `text` se aplica según el contenido de la propia página:
   * **Página con imagen** (declara `mapData.backgroundImage`): máximo **30 palabras** en su `text`.
   * **Página con elecciones o path selector** (`pageOptions` no vacío): máximo **60 palabras** en su `text`.
   * Si una página tiene imagen **y** elecciones a la vez, aplicar el límite más estricto (**30 palabras**).

---

## 🛡️ PASO 4: Control de Calidad y Enlaces (PageAuditor)
*Antes de dar la página por finalizada, el agente ejecutará el test de cierre técnico:*

1. **Integridad de Rutas**: Verificar que todas las `optionLink` declaradas apunten a un ID de página existente o planificado dentro de la estructura de spreads.
2. **Evitar Deadlocks**: Validar que la página no sea un callejón sin salida narrativo, a menos que sea un final de historia explícito (Fin o Muerte).
3. **Validación de Imagen**: Si la página declara un campo `mapData`, verificar que el nombre de la imagen está listado en `/stories/[story-name]/images/[story-name]-image-names.txt` y que el archivo existe en `/stories/[story-name]/images/`. Si no se cumple, eliminar el campo `mapData` de la página (no dejar referencias rotas).
4. **Validación de Longitud Narrativa por Página**: Contar las palabras del `text` de cada página según su contenido:
   * Página con imagen (`mapData.backgroundImage`): máximo **30 palabras**.
   * Página con elecciones o path selector (`pageOptions` no vacío): máximo **60 palabras**.
   Si no se cumple, devolver la página al ScribeAgent para redacción.
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

* `docs/images.md` — Convención del catálogo de imágenes: `stories/[story-name]/images/[story-name]-image-names.txt`.

---

## 📖 Estructura de Datos

### Unidad Básica: StorySpread
Cada spread contiene **2 páginas** con roles diferentes:

| Página | Rol | Contenido | Opciones |
|--------|-----|-----------|----------|
| **leftPage** | Visual | Imágenes, mapas, fichas, inventario, pistas visuales | **NUNCA** |
| **rightPage** | Narrativo | 2 párrafos de narrativa + decisiones | SÍ |

### StoryPage (Página Individual)
```json
{
  "id": "string",
  "pageNumber": 1,
  "title": "string (opcional)",
  "text": "string (narrativa principal - SOLO en rightPage)",
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
  "leftPage": "StoryPage (visual - NUNCA opciones)",
  "rightPage": "StoryPage (narrativo + decisiones)"
}
```

### Reglas de Contenido
* **leftPage.pageOptions**: Siempre `[]` (vacío)
* **leftPage.text**: Máximo **30 palabras** cuando la página declara imagen (`mapData.backgroundImage`); vacío o mínimo si no hay imagen
* **leftPage.mapData**: Imagen de fondo, posición del jugador, posición objetivo
* **rightPage.text**: Máximo **60 palabras** — es la página de decisiones/path selector (`pageOptions`)
* **rightPage.pageOptions**: 2-4 opciones con `optionLink` a siguiente spread o gameover
* **Path selector (página de decisiones)**: Página cuyo `pageOptions` no está vacío; el jugador elige el camino a seguir. Límite de `text`: **60 palabras**. Si además declara imagen, el límite baja a **30 palabras**

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
        "pageOptions": []
      },
      "rightPage": {
        "id": "page-2",
        "pageNumber": 1,
        "text": "Narrative text for the right page.",
        "pageOptions": [
          {
            "optionText": "Choice A",
            "optionLink": "spread2"
          },
          {
            "optionText": "Choice B",
            "optionLink": "spread3"
          }
        ]
      }
    }
  ]
}
