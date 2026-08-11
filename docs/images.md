# 🖼️ Catálogo de Imágenes por Historia

Este documento define la convención del archivo de texto que actúa como **índice de imágenes** de cada historia interactiva. Es el punto de referencia único para saber qué imágenes están disponibles y poder asignarlas a los spreads.

---

## 📍 Ubicación y Nombre

* **Carpeta:** `stories/[story-name]/images/`
* **Archivo:** `[story-name]-image-names.txt`
* **Ejemplo:** `stories/reporter-horror/images/reporter-horror-image-names.txt`

---

## 📄 Formato

* El archivo contiene **un nombre de archivo de imagen por línea**.
* Cada nombre debe coincidir exactamente con un archivo presente en la carpeta `images/` de la historia.

```
Elena-floor-knife-crash-door-deep-one.png
gameover-captura-cueva.jpg
gameover-ahogamiento.jpg
```

---

## 🔄 Uso en el Pipeline

1. **PASO 1 (LoreMaster):** Leer el txt y registrar el catálogo de imágenes disponibles de la historia.
2. **PASO 2 (PagePlotter):** Al vincular una imagen a un spread, elegir únicamente entre los nombres listados en el txt.
3. **PASO 4 (PageAuditor):** Validar que `mapData.backgroundImage` esté listado en el txt y que el archivo exista en `images/`. Si no se cumple, eliminar el campo `mapData` de la página (no dejar referencias rotas).

---

## ✅ Reglas

* Solo se referencia una imagen si **está listada en el txt** **y** el archivo existe en `images/`.
* Si ninguna imagen del catálogo encaja naturalmente con la escena, **omitir el campo `mapData`** — no forzar una imagen que no represente fielmente la narrativa.
* Al añadir una imagen nueva a la historia, **registrarla en el txt** (añadir su línea).
* La portada del libro (`cover.coverImage`) se gestiona aparte y no se lista en este txt.
* **Convención de nombres:** descriptivo, en minúsculas y con guiones bajos entre palabras (ej: `callejon-oscuro-niebla.jpg`, `elena-camara-fuelle.jpg`). Los nombres ya existentes en el txt se respetan tal cual.
