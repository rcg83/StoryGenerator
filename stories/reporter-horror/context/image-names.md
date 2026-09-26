# 🖼️ Catálogo de Imágenes — reporter-horror

Este catálogo es la **fuente de verdad** de las imágenes de la historia. Cada entrada indica el **sentido** de la imagen (qué muestra) y su **lugar** (dónde se usa dentro de la historia). Solo se referencian en la historia imágenes listadas aquí.

**Nota:** Este catálogo es para el **Act I** (escapada vertical del hotel de 5 plantas, plantas 0-4). Las ventanas de las plantas 0, 1 y 2 tienen barrotes; las de las plantas 3 y 4 no.

---

## Portada / Magazine Cover

| Archivo | Sentido | Lugar |
|---------|---------|-------|
| `/images/cover-reporter-trapped-horror.png` | Portada del magazine "The Reporter Trapped in Horror". | `cover.coverImage` |

---

## Imágenes de Página

### Elena-floor-crashdoor-deep-one.png
- **Sentido:** Elena en el suelo de la habitación mientras un Profundo derriba la puerta. El suelo huele a fango abisal.
- **Lugar:** `spread-001` → `leftPage.illustration` (página inicial, elección crítica).

### reporter-trapped-under-bed-cenital-view.png
- **Sentido:** Vista cenital de la habitación del ático: Elena oculta bajo la cama mientras la criatura rastrea la oscuridad con sus ojos sin párpados.
- **Lugar:** `gameover-001` → `rightPage.illustration` (Game Over por esconderse bajo la cama; imagen `full` de página entera).

### acceso-cornisa-noche.jpg
- **Sentido:** Cornisa de la fachada del ático del hotel (planta 4): Elena deslizándose por el borde de piedra hacia la ventana de la alcoba contigua, con la ciudad en sombras muy abajo.
- **Lugar:** `spread-002` → `leftPage.illustration` (decisión de huir por la cornisa).

### pozo-luz-montacargas.jpg
- **Sentido:** Pozo del montacargas visto desde el rellano de la planta 3: boca oscura con cable grasiento que baja hasta la planta baja.
- **Lugar:** `spread-003` → `leftPage.illustration` (decisión de bajar por el montacargas).

### sala-comun-radio.jpg
- **Sentido:** Sala común del hotel en semipenumbra, con ventanas de barrotes y una radio de onda corta escupiendo estática.
- **Lugar:** `spread-004` → `leftPage.illustration` (decisión de la radio).

### pasillo-servicio-humo.jpg
- **Sentido:** Pasillo de servicio del hotel con el humo colándose entre las rendijas de la madera.
- **Lugar:** `spread-005` → `leftPage.illustration` (decisión de distracción con fósforos).

### cocina-hotel-puerta-servicio.jpg
- **Sentido:** Cocina del hotel con la puerta de servicio cerrada por una cerradura gorda y oxidada.
- **Lugar:** `spread-006` → `leftPage.illustration` (decisión de la llave de la puerta de servicio).

### cerradura-puerta-servicio.jpg
- **Sentido:** Primer plano de la cerradura oxidada de la puerta de servicio del hotel.
- **Lugar:** `spread-006b` → `leftPage.illustration` (forzar la cerradura, arriesgado).

### gameover-puerta-captura.jpg
- **Sentido:** La criatura agarrando a Elena junto a la puerta de servicio del hotel.
- **Lugar:** `gameover-003` → `rightPage.illustration` (Game Over por embestir la puerta a lo bruto; imagen `full` de página entera).

### escalera-servicio-captura.jpg
- **Sentido:** Escalera de servicio del hotel entre P3 y P4: la criatura escamosa arrastrando a Elena por los peldaños que crujen, con la balaustrada rota y la boca oscura del pozo del montacargas al fondo del descansillo.
- **Lugar:** `gameover-002` → `rightPage.illustration` (Game Over por cruzar el descansillo de P3 corriendo; imagen `full` de página entera).

### almacen-trastos-penumbra.jpg
- **Sentido:** Almacén del piso bajo del hotel en penumbra: cajas apiladas y un maniquí sin cabeza entre polvo y botellas vacías.
- **Lugar:** `spread-007` → `leftPage.illustration` (decisión de explorar el almacén).

### rellano-escaleras-noche.jpg
- **Sentido:** Caja de la escalera principal del hotel de noche, con los barrotes de las ventanas bajas dibujando rayas de luz de gas.
- **Lugar:** `spread-008` → `leftPage.illustration` (decisión de comprobar antes de bajar).

### vestibulo-puerta-calle.jpg
- **Sentido:** Vestíbulo del hotel (Gilman House): mosaico roto, mostrador de caoba y la puerta de calle con cristales tras la que asoma la noche.
- **Lugar:** `spread-009` → `leftPage.illustration` (decisión del vestíbulo).

### calle-destrozos-bloqueada.jpg
- **Sentido:** Calle principal ante el hotel en sombras: un tranvía volcado, escombros, humo quieto y calles bloqueadas.
- **Lugar:** `end-001` → `rightPage.illustration` (Fin: La Calle; imagen `full` de página entera).

### callejon-trasero-noche.jpg
- **Sentido:** Callejón trasero del hotel de noche, con charcos de agua de mar y farolas apagadas.
- **Lugar:** `end-002` → `rightPage.illustration` (Fin: El Callejón; imagen `full` de página entera).

---

## ✅ Reglas

* Solo se referencia una imagen si **está listada en el `.md`**.
* La imagen se referencia vía el campo **`illustration`** como objeto `{ name, description, size }`: `name` es el archivo listado en este catálogo, `size` es opcional (`small` = 1 zona, `medium` = 2, `large` = 3, `full` = 4; default `large` en `leftPage`, `small` en `rightPage`) y `description` (un único párrafo de máximo **100 palabras** que describe la escena e incluye pistas para la decisión) es el contenido alternativo por accesibilidad o cuando la imagen no está disponible. El front puede mostrar la imagen o la descripción.
* **Gameover y finales:** la imagen va **siempre en la `rightPage`** con `size: "full"` (página entera) y la `leftPage` queda **solo con texto**.
* Si ninguna imagen del catálogo encaja naturalmente con la escena, **omitir el campo `illustration`** — no forzar una imagen que no represente fielmente la narrativa.
* Al añadir una imagen nueva a la historia, **registrarla en el `.md`** con su entrada de sentido y lugar.
* El archivo físico de la imagen puede estar **pendiente de generación**: basta con que esté listado en el `.md` para poder referenciarlo en la historia.
* La portada del libro (`cover.coverImage`) se documenta en la sección **Portada / Magazine Cover** del `.md`.
* **Convención de nombres:** descriptivo, en minúsculas y con guiones bajos entre palabras (ej: `callejon-trasero-noche.jpg`, `vestibulo-puerta-calle.jpg`). Los nombres ya existentes en el catálogo se respetan tal cual.