# 🐙 Contexto de la Historia: The Reporter Trapped in Horror

## Sinopsis
El jugador toma el rol de **Elena Bancroft** (detallada en `characters/elena-bancroft.json`). El objetivo es documentar la verdad con la cámara, sobrevivir al Culto de Dagón, esquivar la invasión de los Profundos y escapar antes del amanecer con las pruebas y la cordura intactas.

## El Conflicto Específico de esta Historia
Elena es una periodista de investigación del Boston Globe que ha llegado a la ciudad siguiendo la pista de cargamentos ilegales de oro y extrañas desapariciones. Lo que descubre supera cualquier historia que pudiera imaginar.

## 🕒 Punto de Arranque de la Historia (Hito de Inicio)
* **Spread Inicial:** `spread-001` (en `generated/reporter-horror-act1.json`)
* **Fase Horaria:** Fase 3 (La Cacería: 02:30 AM). Las criaturas ya asaltan los hogares.
* **Situación Crítica:** Elena lleva unas horas investigando en la ciudad y ha quedado atrapada en la habitación de su pensión. Las luces se han apagado. Los pasos pesados y húmedos de un Profundo se han detenido ante su puerta. La madera vieja está crujiendo y cediendo bajo la fuerza de la criatura.

## 🎯 Savepoint 1: Puerta Trasera del Edificio

* **Ubicación:** Salida de emergencia / puerta trasera de la pensión
* **Páginas 1-10:** 10 spreads de decisión con ramificación letal
* **Convergencia:** Todas las rutas correctas convergen en la puerta trasera
* **Narrativa:** Elena navega por el edificio esquivando a un Profundo que persigue activamente. Cada decisión incorrecta lleva a muerte directa (Game Over).

## 📊 Decisiones Letales (Spreads 1-10)

### Mapa de Decisiones

| # | Escenario | Correcta (deducible) | Letal (obvia si lees) |
|---|-----------|---------------------|----------------------|
| 1 | Habitación rota | Saltar ventana (atlética) | Esconderse (sin sigilo) |
| 2 | Tejado/Pasillo | Trepar faro (atlética) | Correr tejado (resbaladizo) |
| 3 | Habitación Vecino | Salir ventana (atlética) | Esperar (captura) |
| 4 | Escalera Principal | Disparar (revólver) | Esperar (bloqueado) |
| 5 | Salón | Escuchar radio (deducción) | Salir corriendo (oscuro) |
| 6 | Cocina | Buscar llave (deducción) | Ventana (clavada) |
| 7 | Almacén | Explorar (periodista) | Salir sin saber |
| 8 | Puerta Trasera | Forzar (atlética) | Otra ruta (única salida) |
| 9 | Callejón | Salir rápido (supervivencia) | Frenar (visto) |
| 10 | Salvación | Huir (escape) | Ayudar (carga imposible) |

## Notas de Narrativa para el Desarrollador

### Pistas Históricas Ambientales (Foreshadowing):
1. Monedas de oro con grabados de monstruos marinos circulando en los bares locales en lugar de los dólares legítimos de la época.
2. Titulares de periódicos locales que hablan de "extrañas perturbaciones en las brújulas" de los barcos comerciales de 1938.
3. El sonido constante de las radios de onda corta del pueblo emitiendo estática distorsionada que imita cánticos guturales durante las tormentas.

---

> Estructura genérica del libro interactivo (spreads, decisiones y enlaces): [`docs/story-guide.md`](../../../docs/story-guide.md)
