# 📖 Guía de Estructura del Libro Interactivo

Documento genérico de referencia válido para todas las historias. Cada historia vive en `stories/[story-name]/` y sigue esta estructura común. Los escenarios físicos (edificios y espacios reutilizables) viven en `world/scenarios/<scenario-id>.md` y se enlazan desde el contexto de cada historia.

---

## ⚙️ Estructura del Libro Interactivo

### Unidad Básica: StorySpread
Cada spread contiene **2 páginas**:

| Página | Contenido | Opciones |
|--------|-----------|----------|
| **leftPage** | Visual + Narrativa: imagen (`illustration`, si aplica) con su descripción + texto de la escena | **NUNCA** |
| **rightPage** | Decisiones: elecciones (`pageOptions`) + párrafos de contexto que completan las 4 zonas | SÍ |

### 🔢 Regla de las 4 Zonas
Cada página se estructura en **exactamente 4 zonas**. Todo componente ocupa un número fijo de zonas:

| Componente | Zonas | Límite |
|------------|-------|--------|
| Párrafo de narrativa | 1 | máx. **40 palabras** |
| Opción (`pageOption`) | 1 | máx. **30 palabras** |
| Imagen `small` | 1 | — |
| Imagen `medium` | 2 | — |
| Imagen `large` | 3 | — |
| Imagen `full` | 4 (página entera, sin texto) | — |
| `illustration.description` | no ocupa zona (accesibilidad) | 1 párrafo, máx. **100 palabras** |

**leftPage (narrativa, nunca opciones):**
* Sin imagen → **4 párrafos** de máx. 40 palabras.
* Con imagen según `size`: `small` → 3 párrafos · `medium` → 2 · `large` → 1 · `full` → 0.
* `size` default en leftPage: `large`.

**rightPage (path selector):**
* Cada opción ocupa 1 zona; el resto de zonas se rellena con párrafos de contexto (máx. 40 palabras):
  * 2 opciones → 2 párrafos + 2 opciones.
  * 3 opciones → 1 párrafo + 3 opciones.
  * 4 opciones → 0 párrafos + 4 opciones.
* Opcionalmente, 1 imagen `small` (1 zona) puede sustituir a uno de esos párrafos.
* `size` default en rightPage: `small`. La rightPage **no** tiene `text` vacío obligatorio: su `text` contiene los párrafos de contexto.

**Gameover y finales (exentos de la regla de opciones):** con imagen → 1 párrafo de máx. 40 palabras; sin imagen → hasta 4 párrafos. La opción "Reiniciar" es control de UI, no computa como zona.

### Estructura de Archivos
```
stories/[story-name]/
├── README.md                          (opcional - sinopsis y decisiones)
├── context/
│   ├── [story-name]-background.md     (Sinopsis y notas narrativas)
│   ├── timeline.md                    (Cronología y fases horarias)
│   └── image-names.md                 (Catálogo de imágenes)
└── generated/
    └── [story-name]-act1.json         (Historia generada: spreads y spreadIds)
```

---

## 🏢 Escenarios Compartidos

* **Ubicación:** `world/scenarios/<scenario-id>.md` — recursos físicos compartidos entre historias (ej: `gilman-house.md`).
* **Declaración:** cada historia declara sus escenarios en `stories/[story-name]/context/[story-name]-background.md` mediante la sección `**Escenario(s):** <scenario-id>`.
* **Carga:** el pipeline (PASO 1) lee los escenarios declarados y los trata como la verdad física del espacio.

## 📏 Continuidad Espacial

* Cada página ancla al personaje: **planta + zona**, de dónde llegó y qué conexión queda delante.
* Las transiciones entre spreads son continuas: la salida de un spread enlaza de forma natural con la llegada del siguiente (puerta, escalera, cornisa o montacargas por tramos).
* Cada `optionLink` debe conectar espacios **adyacentes** según el escenario; se descarta toda transición físicamente imposible.
* Los **elementos de cada zona son estables** y se toman del escenario, no se inventan fuera de él.

---

## 🎯 Savepoint (Hito de Convergencia)

* **Ubicación:** punto de la historia donde convergen todas las rutas correctas.
* **Páginas:** un tramo de spreads de decisión con ramificación letal.
* **Narrativa:** cada decisión incorrecta lleva a muerte directa (Game Over).

---

## 📊 Reglas de Decisiones

* **Elección correcta:** Deducible leyendo el perfil del personaje (attributes, skills, items)
* **Elección letal:** Obvia si prestas atención al contexto narrativo
* **Consecuencia:** Game Over directo (muerte o captura)

---

## 🔗 Enlaces entre Spreads

Cada opción en `rightPage` apunta a:
* **Siguiente spread** (elección correcta): `spread-XX`
* **Game Over** (elección letal): `gameover-XX`
* Toda transición debe conectar espacios **adyacentes** según el escenario de la historia (ver Continuidad Espacial).

**Flujo:**
```
spread-001 → spread-002 → spread-003 → ... → spread-010 → (Savepoint)
    ↓ (letal)    ↓ (letal)    ↓ (letal)
gameover-001  gameover-002  gameover-003
```
