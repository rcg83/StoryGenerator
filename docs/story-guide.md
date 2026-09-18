# 📖 Guía de Estructura del Libro Interactivo

Documento genérico de referencia válido para todas las historias. Cada historia vive en `stories/[story-name]/` y sigue esta estructura común.

---

## ⚙️ Estructura del Libro Interactivo

### Unidad Básica: StorySpread
Cada spread contiene **2 páginas**:

| Página | Contenido | Opciones |
|--------|-----------|----------|
| **leftPage** | Visual + Narrativa: imagen (`illustration`/`mapData`, si aplica) + texto de la escena | **NUNCA** |
| **rightPage** | Decisiones: solo elecciones (`pageOptions`); `text` vacío (`""`) | SÍ |

**Narrativa:** vive siempre en la `leftPage`. Con imagen: máximo **30 palabras**. Sin imagen: **3–4 párrafos breves**, cada uno de máximo **30 palabras**. Cada opción de la `rightPage` debe ser **detallada y justificada**: expresa qué hace el personaje y con qué intención.

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

**Flujo:**
```
spread-001 → spread-002 → spread-003 → ... → spread-010 → (Savepoint)
    ↓ (letal)    ↓ (letal)    ↓ (letal)
gameover-001  gameover-002  gameover-003
```
