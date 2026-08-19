# Design Thinking · V4

## Correcciones respecto a V3

### 1. Catálogo de temas
V3 podía conservar únicamente los temas existentes en el `localStorage` del navegador.
V4 **fusiona siempre** los temas base nuevos con los existentes, sin borrar los temas creados por el usuario.

Incluye dos niveles útiles como etiquetas:
- Dominios de problema: Seguridad/Ergonomía, Máquinas/Mantenimiento, Método/Proceso,
  Coste/Financiero, Materiales/Almacén, Personas/Organización,
  Trazabilidad/Digitalización, Comercial/Oportunidad e Infraestructura/Espacio/Layout.
- Temas técnicos transversales: CAD, PDM, Ofertas, Gestión de tareas, Alcance,
  Comunicación, Know-how, Revisiones, Costes/Tiempos, Materiales/Tratamientos,
  Fabricación/Montaje, Tolerancias, Máquinas/Medios, Automatización e Integraciones ERP.

### 2. Contenido Miro
Se incorporan decenas de aportaciones reconstruidas de las capturas facilitadas del tablero Miro.
Las tarjetas importadas aparecen con la marca `MIRO`.

Áreas/cluster precargados:
- CAD
- PDM
- Revisiones automatizadas
- Alcance
- Comunicación
- Gestión de tareas / equipo
- Generador de ofertas
- Calculadora de costes y tiempos
- Configurador de diseño adaptable

### 3. Migración
Al abrir V4:
- conserva las aportaciones creadas por el usuario;
- conserva temas personalizados;
- añade los nuevos temas que falten;
- añade las aportaciones Miro que falten;
- no duplica elementos ya migrados gracias a IDs estables.

## GitHub Pages
Sustituye `index.html`, `styles.css` y `app.js` por los de esta versión.
No debería ser necesario borrar datos del navegador.
