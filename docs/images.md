# 🖼️ Catálogo de Imágenes por Historia

Este documento define la convención del archivo markdown que actúa como **catálogo de imágenes** de cada historia interactiva. Es el punto de referencia único para saber qué imágenes están disponibles, qué representan y dónde se usan dentro de la historia.

---

## 📍 Ubicación y Nombre

* **Archivo:** `stories/[story-name]/context/image-names.md`
* **Ejemplo:** `stories/reporter-horror/context/image-names.md`

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
2. **PASO 2 (PagePlotter):** Al vincular una imagen a un spread, elegir únicamente entre los nombres listados en el `.md` y asignar su `size` según la zona que ocupará (ver Regla de las 4 Zonas en `story-guide.md`).
3. **PASO 4 (PageAuditor):** Validar que `illustration.name` esté listado en el `.md`, que `illustration.description` exista (un único párrafo de máximo 100 palabras) y que `illustration.size` sea uno de `small`/`medium`/`large`/`full`. Si no se cumple, eliminar el campo `illustration` de la página (no dejar referencias rotas).

---

## ✅ Reglas

* Solo se referencia una imagen si **está listada en el `.md`**.
* La imagen se referencia vía el campo **`illustration`** como objeto `{ name, size, description }`: `name` es el archivo listado en el catálogo, `size` es opcional (`small` = 1 zona, `medium` = 2, `large` = 3, `full` = 4; default `large` en `leftPage`, `small` en `rightPage`) y `description` (un único párrafo de máximo **100 palabras** que describe la escena e incluye pistas para la decisión) es el contenido alternativo por accesibilidad o cuando la imagen no está disponible. El front puede mostrar la imagen o la descripción.
* Si ninguna imagen del catálogo encaja naturalmente con la escena, **omitir el campo `illustration`** — no forzar una imagen que no represente fielmente la narrativa.
* Al añadir una imagen nueva a la historia, **registrarla en el `.md`** con su entrada de sentido y lugar.
* El archivo físico de la imagen puede estar **pendiente de generación**: basta con que esté listado en el `.md` para poder referenciarlo en la historia.
* La portada del libro (`cover.coverImage`) se documenta en la sección **Portada / Magazine Cover** del `.md`.
* **Convención de nombres:** descriptivo, en minúsculas y con guiones bajos entre palabras (ej: `callejon-oscuro-niebla.jpg`, `elena-camara-fuelle.jpg`). Los nombres ya existentes en el catálogo se respetan tal cual.
* El `size` de la imagen determina cuántas zonas ocupa en la página y, por tanto, cuántos párrafos de narrativa admite (Regla de las 4 Zonas en `story-guide.md`).
