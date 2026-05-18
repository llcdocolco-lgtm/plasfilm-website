# /commit
Hace un commit git con mensaje descriptivo automático en Conventional Commits.

Pasos:
1. Ejecuta: git diff --stat para ver qué cambió
2. Analiza los archivos modificados
3. Genera mensaje según tipo:
   - feat:  nueva funcionalidad o sección
   - fix:   corrección de bug o error visual
   - style: cambios de paleta, fuentes, espaciado
   - chore: archivos de config, CLAUDE.md, estructura
   Ejemplo: "style: reemplaza paleta naranja por verde oliva SR.DEV"
4. Ejecuta: git add -A && git commit -m "{mensaje}"
5. Imprime: "✅ Commit listo: {mensaje}"
