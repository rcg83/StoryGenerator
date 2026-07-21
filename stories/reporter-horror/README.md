# 🐙 The Reporter Trapped in Horror (1938)

## 📝 Sinopsis del Proyecto
El jugador toma el rol de **Elena Bancroft** (detallada en `characters/elena-bancroft.json`). El objetivo es documentar la verdad con la cámara, sobrevivir al Culto de Dagón, esquivar la invasión de los Profundos y escapar antes del amanecer con las pruebas y la cordura intactas.

---

## 🕒 Punto de Arranque de la Historia (Hito de Inicio)
* **Spread Inicial:** `spread-001.json`
* **Fase Horaria:** Fase 3 (La Cacería: 02:30 AM). Las criaturas ya asaltan los hogares.
* **Situación Crítica:** Elena lleva unas horas investigando en la ciudad y ha quedado atrapada en la habitación de su pensión. Las luces se han apagado. Los pasos pesados y húmedos de un Profundo se han detenido ante su puerta. La madera vieja está crujiendo y cediendo bajo la fuerza de la criatura.

---

## ⚙️ Estructura del Libro Interactivo

### Unidad Básica: StorySpread
Cada spread contiene **2 páginas**:

| Página | Contenido | Opciones |
|--------|-----------|----------|
| **leftPage** | Visual: imágenes, mapas, fichas, inventario, pistas visuales | **NUNCA** |
| **rightPage** | Narrativa: 2 párrafos + decisiones | SÍ |

### Estructura de Archivos
```
stories/reporter-horror/spreads/
├── spread-001.json   (Spread inicial)
├── spread-002.json   (Segunda decisión)
├── ...
├── spread-010.json   (Décima decisión)
├── gameover-001.json (Muerte/Captura - spread derrota)
├── gameover-002.json (Muerte/Captura - spread derrota)
└── ...
```

---

## 🎯 Savepoint 1: Puerta Trasera del Edificio

* **Ubicación:** Salida de emergencia / puerta trasera de la pensión
* **Páginas 1-10:** 10 spreads de decisión con ramificación letal
* **Convergencia:** Todas las rutas correctas convergen en la puerta trasera
* **Narrativa:** Elena navega por el edificio esquivando a un Profundo que persigue activamente. Cada decisión incorrecta lleva a muerte directa (Game Over).

---

## 📊 Decisiones Letales (Spreads 1-10)

### Regla de Decisiones
* **Elección correcta:** Deducible leyendo el perfil de Elena (attributes, skills, items)
* **Elección letal:** Obvia si prestas atención al contexto narrativo
* **Consecuencia:** Game Over directo (muerte o captura)

### Mapa de Decisiones

| # | Escenario | Correcta (deducible) | Letal (obvia si lees) |
|---|-----------|---------------------|----------------------|
| 1 | Habitación rota | Saltar ventana (atlética) | Esconderse (sin sigilo) |
| 2 | Tejado/Pasillo | Trepar faro (atlética) | Correr tejado (resbaladizo) |
| 3 | Habitación Vecino | Salir ventana (linterna) | Esperar (captura) |
| 4 | Escalera Principal | Disparar (revólver) | Esperar (bloqueado) |
| 5 | Salón | Buscar linterna (dínamo) | Salir corriendo (oscuro) |
| 6 | Cocina | Buscar llave (deducción) | Ventana (clavada) |
| 7 | Almacén | Explorar (periodista) | Salir sin saber |
| 8 | Puerta Trasera | Forzar (atlética) | Otra ruta (única salida) |
| 9 | Callejón | Salir rápido (supervivencia) | Frenar (visto) |
| 10 | Salvación | Huir (escape) | Ayudar (carga imposible) |

---

## 🔗 Enlaces entre Spreads

Cada opción en `rightPage` apunta a:
* **Siguiente spread** (elección correcta): `spread-XX`
* **Game Over** (elección letal): `gameover-XX`

**Flujo:**
```
spread-001 → spread-002 → spread-003 → ... → spread-010 → (Savepoint 1)
    ↓ (letal)    ↓ (letal)    ↓ (letal)
gameover-001  gameover-002  gameover-003
```
