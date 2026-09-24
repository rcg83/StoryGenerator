# 🏨 Escenario: Gilman House

Escenario compartido en `world/scenarios/` (recurso reutilizable entre historias). Define la **verdad física del edificio**: plantas, habitaciones, elementos y conexiones. Toda página de historia que transcurra aquí debe ser coherente con este plano: ubicación, transiciones y elementos deben respetarlo.

---

## 📋 Datos del Escenario

| Campo | Valor |
|-------|-------|
| **id** | `gilman-house` |
| **Nombre** | Gilman House |
| **Tipo** | Hotel pequeño de 5 plantas, junto al mar |
| **Homónimo real** | Ficticia Gilman House (*The Shadow Over Innsmouth*) |
| **Estado (1938)** | Decrépito: madera podrida, baldosas rotas, luces de gas, olor a salitre. Luz eléctrica muerta. |
| **Ocupantes** | El edificio está tomado por las criaturas de la noche; no quedan huéspedes vivientes. |

---

## 🚪 Regla de Acceso y Escapatoria (barrotes)

| Plantas | Ventanas | Implicación |
|---------|----------|-------------|
| **P0, P1, P2** | Con **barrotes** | No hay salida por ventana; cualquier escape es por puertas, escaleras o el montacargas. |
| **P3, P4** | **Sin barrotes** | Desde aquí son posibles las maniobras de cornisa / fachada / ventana a ventana. |

Regla derivada: **el ático solo se comunica con el resto del hotel por la escalera de servicio.** La escalera principal termina en P3; el ascensor de viajeros está muerto desde hace años.

---

## 🏗️ Distribución Vertical

```
P4  Ático (habitaciones + escalera de servicio)
P3  Descansillo del montacargas (+ escalera principal hacia abajo)
P2  Planta común (sala común + pasillo de servicio)
P1  Planta de servicio (cocina/comedor + almacén + escalera principal)
P0  Vestíbulo / recepción (+ salidas a la calle y al callejón)
```

---

## 🛏️ P4 — Ático

**Pasillo del ático:** corredor estrecho con balaustrada, hilera de habitaciones de huéspedes. Casi todas están **clausuradas con tablas**. En el extremo opuesto a la habitación de Elena arranca la **escalera de servicio** (angosta, cruje, baja a P3).

**Habitación de Elena (al fondo del pasillo):** puerta al pasillo (la de la fachada del marco), ventana **sin barrotes** que da a la cornisa de piedra que bordea toda la fachada del ático. Suelo frío, ropa de cama, la cámara y el mobiliario de una huésped cualquiera.

**Cornisa de la fachada:** borde de piedra húmeda, estrecho, que recorre la fachada y conecta la ventana de la habitación de Elena con la de la **alcoba contigua**.

**Alcoba contigua (P4):** habitación vacía que huele a alcanfor y humedad; su ventana también está **sin barrotes** y conecta con la misma cornisa. Elementos: cajones con trastos (despertador, cepillo, naipes), un **revólver de tambor vacío** bajo la almohada, el hueco de un barrote antiguo junto a la ventana.

---

## ⚙️ P3 — Descansillo del Montacargas

Rellano amplio en penumbra, desembocadura de la **escalera de servicio** (viene de P4). Elementos:

- **Pozo del montacargas:** boca rectangular de metal oxidado en la pared del fondo, **sin cabina**: solo un **cable grasiento** y un contrapeso. El hueco desciende hasta el sótano de servicio bajo P0 y tiene una **abertura por rellano de servicio**: P2 (junto al pasillo de servicio), P1 (tras la puerta de servicio de la cocina) y P0 (fondo, bloqueado). Deslizarse por el cable permite bajar **por tramos** y salir por la abertura elegida.
- **Arcones apilados** y trastos junto a las paredes, donde alguien puede ocultarse.
- Aquí pasa la **escalera principal** (descansillo intermedio P3→P2→P1→P0).

---

## 🛋️ P2 — Planta Común

**Sala común:** ventanales **con barrotes**, sillones raídos, lámpara de gas moribunda. Sobre una consola, una **radio de onda corta** que escupe estática (el cántico se repite entre interferencias). Puerta lateral que comunica con el pasillo de servicio.

**Pasillo de servicio (P2):** estrecho, paredes de madera, **humo de cocinas** colándose por las rendijas. Conecta la sala común con la **escalera de los criados**, que baja a P1.

---

## 🍳 P1 — Planta de Servicio

**Cocina / comedor:** mesas de estaño untadas de grasa rancia, olor a sal. Elementos: un **cuchillo sin mango**, una **barra de hierro**, el **cajón de los útiles** (guarda la llave de la puerta de servicio). La **puerta de servicio** está cerrada con una **cerradura gorda y oxidada**: abre a un corto descansillo de servicio donde está la abertura del montacargas (P1) y un tramo que desciende al almacén.

**Almacén (P1):** espacio bajo y polvoriento contiguo a la **escalera principal**: cajas apiladas hasta el techo, un **maniquí sin cabeza**, estanterías de botellas vacías, y entre los trastos un **plano enrollado del hotel** con las salidas de servicio marcadas. Junto a la caja de la escalera se abre el **hueco del ascensor de viajeros, muerto**, con un goteo que mide el silencio.

**Escalera principal:** desciende de P3 a P0 con descansillos en P2 y P1; los barrotes de las ventanas bajas dibujan rayas de luz de gas sobre los peldaños.

---

## 🪑 P0 — Vestíbulo / Recepción

- **Mosaico roto** y **mostrador de caoba** descascarillado: detrás cuelga el **llavero de habitaciones oxidado** y el **libro de registro** abierto.
- **Puerta principal acristalada** a la calle principal.
- **Pasillo de servicio trasero** hacia el **callejón trasero** (salida de servicio).
- Ventanales con barrotes enmarcando la noche; el letrero **"Gilman House"** cuelga oscuro sobre la recepción.

---

## 🔗 Red de Conexiones (adyacencia válida)

| Desde | Hasta | Vía |
|-------|-------|-----|
| Habitación de Elena (P4) | Alcoba contigua (P4) | **Cornisa** exterior (por las ventanas) |
| Habitación de Elena (P4) | Pasillo del ático (P4) | Puerta de la habitación |
| Pasillo del ático (P4) | Descansillo del montacargas (P3) | **Escalera de servicio** |
| Descansillo del montacargas (P3) | Salida de servicio de P2 | **Pozo del montacargas** (por tramo, por el cable) |
| Descansillo del montacargas (P3) | P2 / P1 / P0 | **Escalera principal** |
| Sala común (P2) | Pasillo de servicio (P2) | Puerta lateral |
| Pasillo de servicio (P2) | Cocina/comedor (P1) | **Escalera de los criados** |
| Cocina/comedor (P1) | Descansillo de servicio (P1) | **Puerta de servicio** (cerradura oxidada) |
| Descansillo de servicio (P1) | Almacén (P1) | Tramo corto de escalera |
| Almacén (P1) | Vestíbulo (P0) | **Escalera principal** |
| Vestíbulo (P0) | Calle principal | Puerta principal acristalada |
| Vestíbulo (P0) | Callejón trasero | Pasillo de servicio |

---

## 📏 Reglas de Continuidad Espacial

1. Toda transición entre páginas debe conectar dos espacios **adyacentes** según la tabla anterior. Una opción no puede llevar a un espacio al que el físico del edificio no da acceso.
2. El **montacargas** se desciende **por tramos**: bajar de P3 a P2 es viajar un tramo y salir por la abertura de servicio de P2; no es caer hasta el sótano.
3. Cada página debe anclar dónde está el personaje (planta + zona), por dónde llegó y qué conexión queda delante.
4. Los **elementos de cada zona** son estables: si una página los menciona, deben existir en el plano de esa planta (radio en P2, llave y barra en P1, plano y maniquí en el almacén, registro en P0...).
5. El ático (P4) no se abandona por otro camino que la escalera de servicio o la maniobra de cornisa entre habitaciones.