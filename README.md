# BerriKide Design Thinking · V1

Prototipo web autónomo para sesiones de Design Thinking.

## Qué incluye
- 5 fases: Empatizar, Definir, Idear, Prototipar y Probar.
- Roles configurables por fase.
- Formato de frase recomendado en cada fase.
- Registro de autor, rol, prioridad y grupo temático.
- Recuperación de aportaciones de fases anteriores.
- Trazabilidad entre aportaciones (`sourceIds`).
- Vista por tarjetas o agrupada por temas.
- Persistencia local mediante `localStorage`.
- Exportación del proyecto a JSON.
- Interfaz responsive para móvil y escritorio.

## Ejecutar
Abre `index.html` en un navegador moderno.

Para desarrollo local también puedes usar:
`python -m http.server 8000`

y abrir `http://localhost:8000`.

## Próximos pasos recomendados
1. Multiusuario real con login.
2. Backend (Supabase/Firebase/PostgreSQL).
3. Sesiones/proyectos y permisos.
4. Votación y priorización.
5. IA para sugerir agrupaciones, detectar duplicados y transformar aportaciones entre fases.
6. Historial/versionado y exportación de informe.
