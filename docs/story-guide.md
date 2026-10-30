# 📖 Guía de Estructura del Libro Interactivo

Documento genérico de referencia válido para todas las historias. Cada historia vive en `stories/[story-name]/` y sigue esta estructura común. Los escenarios físicos (edificios y espacios reutilizables) viven en `world/scenarios/<scenario-id>.md` y se enlazan desde el contexto de cada historia.

---

## ⚙️ Estructura del Libro Interactivo

### Unidad de Progresión: Capítulo (Chapter)
Cada historia se divide en **capítulos** (dominio `Chapter`). Un capítulo es un **archivo JSON autocontenido** en `stories/[story-name]/generated/[story-name]-chapter-NN.json` con su propio `id`, `startPageId`, `spreadIds` y `cover` opcional.

* **Tamaño fijo:** cada capítulo contiene **exactamente entre 6 y 8 spreads en total**, contando spreads de decisión, gameovers y finales. Ni más ni menos.
* **Composición:** 4-6 spreads de decisión + 1-2 gameovers + **exactamente 1 spread `end-*`** de cierre.
* **Autocontenido:** todos los `optionLink` viven dentro del capítulo; los `gameover-*` reinician el capítulo ("Reiniciar" → `startPageId`); el `end-*` cierra el capítulo y el front desbloquea el siguiente.
* **Título:** el `titleEn`/`titleEs` de nivel superior es el **título del relato (magazine)**. Todas las `leftPage` del capítulo llevan `title` = **título del relato**; todas las `rightPage` (decisión, gameovers y finales) llevan `title` = **título del capítulo**, idéntico en todo el capítulo. Prohibidos los títulos propios por spread.
* **Límite:** si el contenido no cabe en 8 spreads, se abre un capítulo nuevo (`-chapter-NN+1`).

### Unidad Básica: StorySpread
Cada spread contiene **2 páginas**:

| Página | Contenido | Opciones |
|--------|-----------|----------|
| **leftPage** | Narrativa: texto de la escena. En gameovers: **imagen `full` sin texto** (o solo texto en el fallback); en finales, **texto + imagen** (nunca `full`) | **NUNCA** |
| **rightPage** | Decisiones: elecciones (`pageOptions`) + párrafos de contexto que completan las 4 zonas. En gameovers: causa + "Reiniciar"; en finales: **reservada a componentes de estado del front** | SÍ |

### 🔢 Regla de las 4 Zonas
Cada página se estructura en **exactamente 4 zonas**. Todo componente ocupa un número fijo de zonas:

| Componente | Zonas | Límite |
|------------|-------|--------|
| Párrafo de narrativa | 1 | máx. **32 palabras** |
| Opción (`pageOption`) | 1 | máx. **24 palabras** |
| Imagen `small` | 1 | — |
| Imagen `medium` | 2 | — |
| Imagen `large` | 3 | — |
| Imagen `full` | 4 (página entera, sin texto) | — |
| `illustration.description` | no ocupa zona (accesibilidad) | 1 párrafo en **tercera persona**, máx. **48 palabras**, descripción pura de la imagen (sus elementos permiten deducir la decisión, no se dan como pistas) |

**leftPage (narrativa, nunca opciones):**
* Sin imagen → **4 párrafos** de máx. 32 palabras.
* Con imagen según `size`: `small` → 3 párrafos · `medium` → 2 · `large` → 1 · `full` → 0.
* `size` default en leftPage: `large`.

**rightPage (path selector):**
* Cada opción ocupa 1 zona; el resto de zonas se rellena con párrafos de contexto (máx. 32 palabras):
  * 2 opciones → 2 párrafos + 2 opciones.
  * 3 opciones → 1 párrafo + 3 opciones.
  * 4 opciones → 0 párrafos + 4 opciones.
* Opcionalmente, 1 imagen `small` (1 zona) puede sustituir a uno de esos párrafos.
* `size` default en rightPage: `small`. La rightPage **no** tiene `text` vacío obligatorio en páginas de decisión: su `text` contiene los párrafos de contexto (salvo en `end-*`, donde queda reservada al front).

**Gameover y finales (exentos de la regla de opciones):**

| Página | Gameover (`gameover-*`) | Final (`end-*`) |
|--------|--------------------------|------------------|
| **leftPage** | **Imagen `full`** (4 zonas), `text` `""`, `title` = título del relato; nunca opciones | **Texto + ilustración** (`small` → 3 párrafos, `medium` → 2, `large` → 1; nunca `full`) o **solo texto** con 4 párrafos si no hay imagen; `title` = título del relato; nunca opciones |
| **rightPage** | Sin `illustration`; `text` con **1 párrafo** (máx. 32 palabras) de causa; **una sola** opción "Reiniciar" → `startPageId`; `title` = título del capítulo | **Reservada a los componentes de estado del front** (rango, registro y opción de seguir): `text` `""`, sin `illustration`, sin opciones; `title` = título del capítulo; opcional `warning` |

Fallback: si el catálogo no tiene imagen para un `gameover-*`, se omite `illustration` y la `leftPage` queda **solo texto** con 4 párrafos; la `rightPage` mantiene `text` `""` + "Reiniciar". Si no hay imagen para un `end-*`, la `leftPage` queda **solo texto** con 4 párrafos y la `rightPage` sigue reservada al front.

### Estructura de Archivos
```
stories/[story-name]/
├── README.md                          (opcional - sinopsis y decisiones)
├── context/
│   ├── [story-name]-background.md     (Sinopsis y notas narrativas)
│   ├── timeline.md                    (Cronología y fases horarias)
│   └── image-names.md                 (Catálogo de imágenes)
└── generated/
    ├── [story-name]-chapter-01.json   (Capítulo 1: 6-8 spreads autocontenidos)
    ├── [story-name]-chapter-02.json   (Capítulo 2: 6-8 spreads autocontenidos)
    └── ...
```

Cada archivo `chapter-NN.json` es un capítulo del dominio `Chapter` (ver `schemas/Chapter.ts`): sus `optionLink` nunca salen del propio archivo y su spread `end-*` es el único cierre válido del capítulo.

---

## 🏢 Escenarios Compartidos

* **Ubicación:** `world/scenarios/<scenario-id>.md` (prosa) y `world/scenarios/<scenario-id>.json` (modelo máquina-legible) — recursos físicos compartidos entre historias (ej: `gilman-house.md` + `gilman-house.json`).
* **Declaración:** cada historia declara sus escenarios en `stories/[story-name]/context/[story-name]-background.md` mediante la sección `**Escenario(s):** <scenario-id>`.
* **Carga:** el pipeline (PASO 1) lee los escenarios declarados y los trata como la verdad física del espacio.

### 🧭 Modelo de Zonas (`<scenario-id>.json`)

* **`zones`**: cada zona tiene un **`id` canónico** (ej: `p4-pasillo`, `p4-habitacion-elena`), un `name`, unas `notes` y unos `elements` estables.
* **`connections`**: cada arista une dos zonas adyacentes e indica `via`, `direction` y `constraints` (barrotes, montacargas por tramos, cerradura…). Una arista con `status: "pending"` apunta a una zona aún no modelada.
* Los spreads **declaran su zona de origen** (el `id` canónico) y solo pueden enlazar a una **zona adyacente** del grafo.

## 📏 Continuidad Espacial

* Cada página ancla al personaje usando el **`id` canónico de zona**: el personaje sabe dónde está (planta + zona), de dónde llegó y qué conexión queda delante.
* Las transiciones entre spreads son continuas: la salida de un spread enlaza de forma natural con la llegada del siguiente (puerta, escalera, cornisa o montacargas por tramos).
* Cada `optionLink` debe corresponder a una **arista del grafo** del escenario (zonas adyacentes), respetando sus `constraints`; se descarta toda transición que no sea una arista o que sea físicamente imposible.
* Toda zona usada debe **existir en el `.json`** del escenario; una zona inexistente o una arista inventada es un error.
* Los **elementos de cada zona son estables** y se toman del escenario, no se inventan fuera de él.

---

## 🎯 Cierre de Capítulo (Hito de Convergencia)

* **Ubicación:** punto del capítulo donde convergen todas las rutas correctas.
* **Páginas:** spreads de decisión del propio capítulo con ramificación letal.
* **Cierre:** exactamente **1 spread `end-*`** por capítulo. El front lo usa para desbloquear el capítulo siguiente (o dar por terminada la historia si es el último).
* **Reinicio:** cada `gameover-*` reinicia **su capítulo** con la opción "Reiniciar" → `startPageId` del capítulo.

---

## 📊 Reglas de Decisiones

* **Primer spread del capítulo:** el spread de arranque (`startPageId`) de cada capítulo tiene **exactamente 2 opciones**, y **una de ellas es letal** (enlaza a un `gameover-*` del propio capítulo).
* **Elección correcta:** Deducible leyendo el perfil del personaje (attributes, skills, items)
* **Elección letal:** Obvia si prestas atención al contexto narrativo
* **Consecuencia:** Game Over directo (muerte o captura), reiniciando el capítulo desde su `startPageId`
* **Capítulo 1:** en el primer capítulo de la historia, **todo spread de decisión** incluye al menos una opción letal hacia un `gameover-*` del propio capítulo (los gameovers pueden compartirse entre spreads)

---

## 🔗 Enlaces entre Spreads

Cada opción en `rightPage` apunta a:
* **Siguiente spread** (elección correcta): `spread-XX`
* **Game Over** (elección letal): `gameover-XX`
* Toda transición debe corresponder a una **arista del grafo de zonas** (`world/scenarios/<scenario-id>.json`): la zona destino debe ser **adyacente** a la zona del spread (ver Continuidad Espacial).

**Flujo (dentro de un capítulo):**
```
Capítulo NN (6-8 spreads en total):
spread-001 → spread-002 → spread-003 → ... → end-001 (cierre → capítulo siguiente)
    ↓ (letal)    ↓ (letal)    ↓ (letal)
gameover-001  gameover-002  gameover-003
```

* Los tres tipos de spread (decisión, gameover y `end-*`) **cuentan** en el límite de 6-8 por capítulo.
* Ningún `optionLink` cruza de un capítulo a otro: la progresión entre capítulos la gestiona el front al alcanzar el `end-*`.
