
# Chatbot utilizado

Claude Sonnet 4.6 con pensamiento extendido

# Prompt enviado

```md
# Tu objetivo

Crear una página web con lógica en javascript plano que invierta el orden de una cadena de texto.

Ejemplo: si introduzco "AI4Devs" devuelve "sveD4IA".

Devuelve únicamente el index.html y el script.js como artefactos.

# Contenido de la página

- Título: Reserse String
- Input: Aquí el usuario introducirá el texto que quiera
- Botón primario: Reverse. Ejecuta la lógica al ser presionado por el usuario.
- Texto invertido: Muestra el texto del input invertido al presionar el botón primario.
- Botón secundario: Aparece cuando existe el texto invertido. Cuando el usuario lo presiona, se copia el texto invertido en el portapapeles.

# UI

- Fondo blanco
- Tipografía Arial de 14px en todo si no se indica otro tamaño.
- Título en negrita y de 24px
- Input con borde gris oscuro y esquinas ligeramente redondeadas. Fondo blanco. Con hover y focus el borde es negro.
- Botón primario con fondo azul y esquinas ligeramente redondeadas, igual que el input. Al hacer hover se oscurece ligeramenta, al hacer clic se oscurece el azul un poco más. Letra blanca. Procura respeta accesibilidad con los contrastes de color. 
- Texto invertido de color negro.
- Botón secundario gris. Mismo comportamiento que el botón primario oscureciéndose en hover y más al hacer clic pero en color gris. Texto blanco. Respeta accesibilidad.
- Todo alineado a la izquierda

# Resultado esperado

Espero que me devuelvas el index.html y el script.js listos para copiar y pegar. Revisa el código para asegurarte de que cumple con todos los puntos que te he dicho y que no va a fallar en producción.
```

# Respuesta del bot

```md
Aquí tienes los dos archivos. Un resumen de las decisiones tomadas:

**`index.html`**

- Estilos inline en `<style>` — sin dependencias externas, listo para producción.
- El botón secundario y el texto de resultado están ocultos por defecto (`display: none`) y se hacen visibles añadiendo la clase `.visible`.
- `aria-live="polite"` en la sección de resultado para accesibilidad con lectores de pantalla.
- Colores accesibles verificados: azul `#1a56db` y gris `#4b5563` tienen ratio de contraste > 4.5:1 sobre blanco con texto blanco (cumple WCAG AA).
- `focus-visible` para navegación por teclado sin afectar al estilo al hacer clic.

**`script.js`**

- Envuelto en IIFE para no contaminar el scope global.
- `reverseString` usa `Array.from()` en lugar de `split("")` para manejar correctamente caracteres Unicode y emojis (ej. `"😀AI"` → `"IA😀"`).
- La copia al portapapeles usa la **Clipboard API moderna** como primera opción y cae en `execCommand("copy")` como fallback para entornos sin contexto seguro (HTTP).
- El feedback "¡Copiado!" se oculta automáticamente a los 2 segundos, con cancelación del timer si se vuelve a pulsar antes.
- También responde a `Enter` en el input.
```
