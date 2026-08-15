# 🖼️ Catálogo de Imágenes por Historia

Este documento define la convención del archivo markdown que actúa como **catálogo de imágenes** de cada historia interactiva. Es el punto de referencia único para saber qué imágenes están disponibles, qué representan y dónde se usan dentro de la historia.

---

## 📍 Ubicación y Nombre

* **Archivo:** `stories/[story-name]/image-names.md`
* **Ejemplo:** `stories/reporter-horror/image-names.md`

---

## 📄 Formato

El catálogo es un archivo markdown con dos secciones:

### 1. Portada / Magazine Cover
Tabla que documenta la portada del libro/magazine de la historia.

```markdown
## Portada / Magazine Cover

| Archivo | Sentido | Lugar |
|---------|---------|-------|
| `/images/cover-reporter-trapped-horror.png` | Portada del magazine "The Reporter Trapped in Horror". | `cover.coverImage` |
```

### 2. Imágenes de Página
Una entrada por imagen, indicando su **sentido** (qué muestra) y su **lugar** (spread → página → campo donde se usa).

```markdown
## Imágenes de Página

### reporter-trapped-under-bed-cenital-view.png
- **Sentido:** Vista cenital de la habitación: Elena oculta bajo la cama mientras el Profundo rastrea la oscuridad.
- **Lugar:** `gameover-001` → `leftPage.illustration` (Game Over por esconderse bajo la cama).
```

---

## 🔄 Uso en el Pipeline

1. **PASO 1 (LoreMaster):** Leer el `.md` y registrar el catálogo de imágenes disponibles de la historia.
2. **PASO 2 (PagePlotter):** Al vincular una imagen a un spread, elegir únicamente entre los nombres listados en el `.md`.
3. **PASO 4 (PageAuditor):** Validar que `mapData.backgroundImage` **o** `illustration` estén listados en el `.md`. Si no se cumple, eliminar el campo correspondiente de la página (no dejar referencias rotas).

---

## ✅ Reglas

* Solo se referencia una imagen si **está listada en el `.md`**.
* La imagen se referencia vía **`mapData.backgroundImage`** (imagen de mapa con posiciones de jugador/objetivo) **o** `illustration` (imagen simple de página, sin posiciones). El catálogo `.md` aplica a ambos campos por igual.
* Si ninguna imagen del catálogo encaja naturalmente con la escena, **omitir el campo correspondiente** (`mapData` o `illustration`) — no forzar una imagen que no represente fielmente la narrativa.
* Al añadir una imagen nueva a la historia, **registrarla en el `.md`** con su entrada de sentido y lugar.
* El archivo físico de la imagen puede estar **pendiente de generación**: basta con que esté listado en el `.md` para poder referenciarlo en la historia.
* La portada del libro (`cover.coverImage`) se documenta en la sección **Portada / Magazine Cover** del `.md`.
* **Convención de nombres:** descriptivo, en minúsculas y con guiones bajos entre palabras (ej: `callejon-oscuro-niebla.jpg`, `elena-camara-fuelle.jpg`). Los nombres ya existentes en el catálogo se respetan tal cual.
