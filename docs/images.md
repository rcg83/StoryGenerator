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
- **Sentido:** Vista cenital de la habitación del ático: Elena oculta bajo la cama mientras la criatura rastrea la oscuridad con sus ojos sin párpados.
- **Lugar:** `gameover-001` → `rightPage.illustration` (Game Over por esconderse bajo la cama; imagen `full` de página entera).
```

---

## 🔄 Uso en el Pipeline

1. **PASO 1 (LoreMaster):** Leer el `.md` y registrar el catálogo de imágenes disponibles de la historia.
2. **PASO 2 (PagePlotter):** Al vincular una imagen a un spread, elegir únicamente entre los nombres listados en el `.md` y asignar su `size` según la zona que ocupará (ver Regla de las 4 Zonas en `story-guide.md`). En spreads de gameover y finales, la imagen se asigna a la `rightPage` con `size: "full"`.
3. **PASO 4 (PageAuditor):** Validar que `illustration.name` esté listado en el `.md`, que `illustration.description` exista (un único párrafo en tercera persona, máximo 60-70 palabras, descripción pura de la imagen) y que `illustration.size` sea uno de `small`/`medium`/`large`/`full`. Si no se cumple, eliminar el campo `illustration` de la página (no dejar referencias rotas).

---

## ✅ Reglas

* Solo se referencia una imagen si **está listada en el `.md`**.
* `illustration.name` debe coincidir **carácter a carácter** con el nombre del archivo físico publicado en el front, **incluidas erratas y extensión**: es la clave con la que el front resuelve la URL de la imagen, así que un nombre "corregido" devuelve 404. Al documentar una imagen, copiar el nombre del archivo real en lugar de escribirlo de memoria (ej: `Elena-grabbed-by-deepone-from-behind.png` está publicado con `behing`).
* La imagen se referencia vía el campo **`illustration`** como objeto `{ name, size, description }`: `name` es el archivo listado en el catálogo, `size` es opcional (`small` = 1 zona, `medium` = 2, `large` = 3, `full` = 4; default `large` en `leftPage`, `small` en `rightPage`) y `description` (un único párrafo en **tercera persona**, máximo **60-70 palabras**, descripción pura y precisa de lo que la imagen muestra: encuadre, luz, atmósfera, figuras y objetos) es el contenido alternativo por accesibilidad o cuando la imagen no está disponible. Las pistas de decisión pueden venir del `text` o de la imagen: si vienen de la imagen, sus elementos se describen fielmente para **deducirse** de la descripción, nunca se entregan como consejo explícito. El front puede mostrar la imagen o la descripción.
* **Gameover y finales:** la imagen va **siempre en la `rightPage`** con `size: "full"` (página entera, 4 zonas) y la `leftPage` queda **solo con texto**. El `Lugar` de la entrada del catálogo se anota como `rightPage.illustration`.
* Si ninguna imagen del catálogo encaja naturalmente con la escena, **omitir el campo `illustration`** — no forzar una imagen que no represente fielmente la narrativa.
* Al añadir una imagen nueva a la historia, **registrarla en el `.md`** con su entrada de sentido y lugar.
* Cuando una imagen deja de usarse en una historia, **no se borra a ciegas ni se deja su `Lugar` mintiendo**: cambiar su línea `Lugar` a `No usada en esta versión` (indicando el reemplazo, si lo hay). Así el PagePlotter no la reasigna al regenerar, y si algún requisito fijo del `[story-name]-background.md` depende de esa imagen, se actualiza en el mismo cambio. Si se borra del `.md` y después se quiere reasignar a otro spread, hay que volver a documentarla.
* El archivo físico de la imagen puede estar **pendiente de generación**: basta con que esté listado en el `.md` para poder referenciarlo en la historia.
* La portada del libro (`cover.coverImage`) se documenta en la sección **Portada / Magazine Cover** del `.md`.
* **Convención de nombres:** descriptivo, en minúsculas y con guiones bajos entre palabras (ej: `callejon-oscuro-niebla.jpg`, `elena-camara-fuelle.jpg`). Los nombres ya existentes en el catálogo se respetan tal cual.
* El `size` de la imagen determina cuántas zonas ocupa en la página y, por tanto, cuántos párrafos de narrativa admite (Regla de las 4 Zonas en `story-guide.md`).
