# Reglas de Desarrollo Frontend 📏

Este documento establece los estándares y preferencias de desarrollo para mantener el código de este proyecto limpio, escalable y profesional.

## 1. Separación de Responsabilidades (Separation of Concerns)
- **No mezclar código:** El código HTML, CSS y JavaScript debe mantenerse estrictamente separado.
- **Archivos dedicados:** Toda regla de estilo debe vivir en archivos `.css` dentro de la carpeta `/css/`. Toda la lógica y manipulación del DOM debe ubicarse en archivos `.js` dentro de la carpeta `/js/`. 
- **Cero código inline:** Está prohibido el uso de estilos (`style=""`) o eventos estáticos de JavaScript (`onclick=""`) directamente sobre las etiquetas HTML, salvo casos estrictamente necesarios e inyectados por JS dinámicamente.

## 2. Código Limpio y Principio DRY (Don't Repeat Yourself)
- **Generación dinámica del DOM:** Evitar bloques HTML repetitivos (como listas sucesivas de `<p>`, `<li>`, etc.). En su lugar, se debe inicializar un contenedor vacío en el HTML y generar los elementos dinámicamente usando bucles estructurales en JavaScript (ej. `forEach` o `map`).
- **Semántica:** Utilizar etiquetas HTML5 semánticas de ser posible.

## 3. Estilos y Diseño
- **Estética profesional:** Emplear y mantener estilos pulcros. Los márgenes (padding, margin), y las transparencias suaves (superposiciones o sobrecapas, degradados) deben aplicarse controladamente.
- **Unidades:** Priorizar el uso de unidades relativas (`vh`, `vw`, `em`, `rem`, `%`) y Flexbox/Grid para hacer el proyecto adaptable.
- **Efectos y Transiciones:** Hacer uso de aceleración por hardware (`transform`, `opacity`) para las animaciones y las interacciones 3D con el fin de garantizar una fluidez del lado del cliente.

## 4. Estructura de Directorios
Se debe respetar la siguiente jerarquía estrictamente:
- `/css/` -> Exclusivamente para hojas de estilo estéticas del DOM y animaciones visuales base.
- `/js/` -> Lógica operativa, iteradores, interactividad general y dependencias externas.
- `/resources/` -> Assets estáticos globales (videos, imágenes, audios, logos).
- `/photo/` -> Submódulos o endpoints paralelos para propósitos adicionales.

Aplicando y velando por estas directrices se asegura que nuestro proyecto sea mantenible en el tiempo, intuitivo de expandir para cualquier desarrollador y un fiel reflejo de nuestra profesionalidad técnica.