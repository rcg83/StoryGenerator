# 🤖 PIPELINE DE AGENTES: HISTORIAS INTERACTIVAS POR CUALIDADES NARRATIVAS

Este documento define el algoritmo de ejecución estricto que cada agente de Inteligencia Artificial debe seguir para co-crear, estructurar, escribir y validar los nodos de la historia. El sistema elimina por completo los números y las estadísticas cuantitativas, sustituyéndolos por un diseño basado en **rasgos de personaje, lógica de deducción y evolución del estado psicológico**.

---

## 🗺️ PASO 1: Sincronización del Contexto Global (LoreMaster)
*Cada vez que se inicie la creación o edición de un nodo, el agente asumirá el rol de LoreMaster y ejecutará los siguientes pasos en orden:*

1. **Leer `/docs/world-setting-1938.md`**: Asimilar el entorno de 1938, las limitaciones tecnológicas reales de la época y el estado de la ciudad según la Fase de la Invasión activa (Fases 1 a 4).
2. **Leer `/stories/[story-name]/README.md`**: Extraer el prompt inicial, el enfoque del protagonista y los objetivos globales del relato.
3. **Escanear `/characters/[character].json`**: Analizar el archivo de datos del personaje (ubicado en la raíz del proyecto, compartido entre historias). Registrar sus `traits` (rasgos cualitativos), el `status` actual de sus herramientas en el `inventory` y su `psychological_state` (estado mental de texto plano).
4. **Validar Coherencia Histórica**: Asegurar que ningún elemento introducido rompa la tecnología o el tono de 1938 (prohibir anacronismos o magia de alta fantasía).

---

## 📐 PASO 2: Diseño Arquitectural del Nodo (NodePlotter)
*Con el contexto fijado, el agente asumirá el rol de NodePlotter para calcular el esqueleto del mapa interactivo y sus ramificaciones:*

1. **Alinear el Peligro con la Fase Horaria**: Diseñar los obstáculos del nodo en base a la Fase de la Noche activa en la cronología oficial.
2. **Cruzar Obstáculos con Rasgos (`traits`)**: 
   * Si el personaje posee un rasgo idóneo (ej: *"Atlética y ágil"*), habilitar una opción de resolución física que tenga éxito natural, a menos que intervenga una deidad o fuerza mayor inevitable.
   * Si el jugador no posee un rasgo adecuado para la situación, la opción correspondiente debe implicar un riesgo narrativo evidente o el desgaste de un objeto.
3. **Estructurar las Opciones**: Generar un mínimo de 2 y un máximo de 4 elecciones. Al menos una debe apelar a la profesión/deducción del personaje (ej: *"Tomar fotografía"*, *"Investigar la estática de la radio"*) y otra a la autopreservación.
4. **Definir Pre-requisitos Cualitativos**: Rellenar las condiciones de acceso de las opciones basándose en si el jugador tiene un rasgo específico, un objeto útil en su inventario o una pista descubierta.

---

## ✍️ PASO 3: Redacción Literaria e Inmersión (ScribeAgent)
*El agente asumirá el rol de ScribeAgent para transformar el esqueleto técnico en prosa literaria de terror psicológico:*

1. **Perspectiva Narrativa**: Escribir estrictamente en segunda persona del singular ("Tú") para forzar la inmersión del jugador.
2. **Filtro Atmosférico Lovecraftiano**: Describir los entornos utilizando estímulos sensoriales de la época (el olor fétido a fango abisal, el parpadeo titilante de las farolas de gas, el crujido de la madera podrida y el frío salitre).
3. **Reflejar el Deterioro Mental**: Adaptar los adjetivos del texto al `psychological_state` del personaje. Si el personaje está *"Paranoico"*, el entorno debe describirse de forma más hostil y distorsionada que si estuviera *"Alerta y racional"*.
4. **Redactar Elecciones Activas**: El texto de las opciones debe redactarse desde la perspectiva del dilema del personaje, dejando claras las intenciones detrás de cada camino (ej: *"Aprovechas tu agilidad para trepar por el tragaluz oxidado"*).

---

## 📊 PASO 4: Auditoría de Estados y Consecuencias (StateTracker)
*El agente asumirá el rol de StateTracker para calcular el impacto sistémico de la decisión elegida por el jugador:*

1. **Degradación del Estado Psicológico**: Si el nodo expone al personaje a un horror innombrable, reescribir contractualmente su `psychological_state` avanzando en una escala literaria (ej: de *"Alerta y racional"* ➡️ *"Perturbada y tensa"* ➡️ *"Paranoica"* ➡️ *"Al borde del colapso catatónico"*).
2. **Consumo y Desgaste de Inventario**: Modificar el campo `status` de las herramientas si el jugador las ha utilizado (ej: cambiar el estado de la cámara de *"Cargada"* a *"Sin película disponible"*).
3. **Registro de Pistas y Banderas**: Si el jugador deduce algo relevante o encuentra un objeto clave, añadirlo textualmente a la lista `clues_found` y activar las `narrative_flags` correspondientes en el JSON del personaje.
4. **Inyectar Mutaciones**: Escribir los resultados en el bloque `player_state_mutation` del nodo para que el sistema operativo sepa qué cambiar en el JSON del personaje.

---

## 🛡️ PASO 5: Control de Calidad y Enlaces (GraphAuditor)
*Antes de dar el nodo por finalizado, el agente ejecutará el test de cierre técnico:*

1. **Integridad de Rutas**: Verificar que todos los `target_node` declarados apunten a un ID de archivo existente o planificado dentro de la estructura de carpetas.
2. **Evitar Deadlocks**: Validar que el nodo no sea un callejón sin salida narrativo, a menos que sea un final de historia explícito (Fin o Muerte).
3. **Firma de Verificación**: Añadir la propiedad `"status": "verified"` en los metadatos del JSON del nodo una vez comprobado que se han seguido correctamente los Pasos 1 a 4.

---

## 🔄 PASO 6: Persistencia entre Nodos (StatePersistence)
*Después de que el jugador elija una opción, el sistema operativo ejecuta este paso para mantener la continuidad:*

1. **Leer el JSON del personaje actual:** Cargar `/characters/[character].json` y obtener su estado vigente (`psychological_state`, `inventory`, `clues_found`, `narrative_flags`).
2. **Aplicar Mutaciones:** Fusionar los campos del bloque `player_state_mutation` del nodo seleccionado en el JSON del personaje:
   * `psychological_state`: Reemplazar el valor de texto completo.
   * `inventory_updates`: Actualizar el `status` de cada objeto afectado.
   * `flags_added`: Añadir o sobreescribir las banderas narrativas en `narrative_flags`.
   * `clues_added`: Añadir pistas nuevas a la lista `clues_found`.
3. **Guardar el JSON actualizado:** Escribir el archivo `/characters/[character].json` con los cambios aplicados.
4. **Cargar el Siguiente Nodo:** Leer el archivo del nodo destino (`target_node`) y presentar su `narrative` y `choices` al jugador.

**Formato del bloque `player_state_mutation`:**
```json
{
  "psychological_state": "Perturbada y tensa",
  "inventory_updates": {
    "camera": { "status": "Sin película disponible" }
  },
  "flags_added": {
    "sobrevivió_asalto_habitación": true
  },
  "clues_added": ["El culto marca los hogares con grasa de ballena"]
}
```

> **Nota:** Todos los campos del bloque `player_state_mutation` son opcionales. Si un campo no está presente, no se modifica el estado del personaje para ese aspecto.
