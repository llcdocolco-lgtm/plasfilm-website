# /variacion
Crea una nueva variación del proyecto actual en una rama git limpia.

Pasos:
1. Pregunta el nombre de la variación (ej: hero-3d, dark-mode, cultui)
2. Ejecuta: git checkout -b feat/{nombre}
3. Crea carpeta: variaciones/{nombre}/
4. Copia index.html actual: cp index.html variaciones/{nombre}/index.html
5. Crea variaciones/{nombre}/README.md con:
   - Nombre de la variación
   - Descripción del cambio
   - Stack añadido
   - Estado: En prueba
   - Fecha: hoy
   - Comando preview: npx serve variaciones/{nombre} -p 3001
6. Imprime: "✅ Variación '{nombre}' lista — edita variaciones/{nombre}/index.html"
