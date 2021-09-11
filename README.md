# Curso práctico de Node.js

## Introducción al proyecto del curso y su arquitectura

### Arquitectura de un backend complejo

Es muy importante primero pensar en la arquitectura del proyecto antes de empezar a programar.

Tendremos servicios públicos y privados.

Piezas:

1. Peticiones, las cuales pasarán por -> [Capa de red, Capa de controlador] [Capa de datos (Store)]
2. Tenemos que definir las carpetas. Store, Network, Config deben ser globales y estar en el primer nivel de carpetas.
3. Microservicios
   - Network
   - Controller
   - Secure
   - `index.js` -> Definimos cómo un componente interactura con el microservicio

### Estructuras de datos para nuestro proyecto

En este curso crearemos una red social sencilla.

1. Tendremos usuarios que publican posts.
2. Un usuario puede seguir a otro usuario.
3. Un usuario puede dar like a posts.
