# Design Thinking · V3

Versión 3 del prototipo web.

## Cambio principal
Las aportaciones ya no pertenecen a un único tema. Cada aportación puede tener **varios temas simultáneamente**.

Ejemplo:
- PDM / Documentación
- CAD / Diseño
- Ofertas
- Revisión y calidad

Todos esos temas pueden apuntar a la misma aportación, sin duplicarla.

## Tema vs grupo
En V3 se separan dos conceptos:

- **Temas**: etiquetas múltiples que describen qué áreas toca una aportación.
- **Grupo / cluster**: agrupación conceptual que reúne aportaciones relacionadas durante el análisis.

Una aportación puede tener 4 temas y pertenecer a un único cluster como “Gestión de cambios”.

## Nuevas funciones
- Selector multitema con chips.
- Filtro por tema.
- Vista “Temas”: una misma aportación aparece bajo cada tema asociado, manteniendo un único registro.
- Vista “Grupos”.
- Aportaciones iniciales actualizadas con relaciones transversales.
- Migración automática de datos de versiones anteriores almacenados en `localStorage`.
- Eliminadas las referencias visibles a BerriKide.
- Exportación JSON con el nuevo esquema `topicIds`.

## Archivos
- `index.html`
- `styles.css`
- `app.js`

Para GitHub Pages sustituye los tres archivos anteriores por estos.
