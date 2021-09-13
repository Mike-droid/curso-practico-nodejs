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

## Creando la estructura principal

### Estructura inicial del proyecto: API y rutas

Debemos tener instalado express en nuestro proyecto.

`npm init -y` & `npm i express`

También debemos tener nodemon isntalado: `npm i -g nodemon`

Creamos la carepta 'API' y es para extraer los microservicios.

Archivo `index.js`:

```javascript
//* Creamos el servidor en este archivo

const express = require('express')

const config = require('../config')
const user = require('./components/user/network')

const app = express()
const port = config.api.port

//* ROUTER
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/user', user)

app.listen(port, () => console.log(`API escuchando en el puerto ${port}`))
```

También la raíz tenemos un archivo `config.js`:

```javascript
module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  }
}
```

Dentro de 'API' haremos una carpeta 'components' y 'user', y tendremos un archivo `network.js`:

```javascript
const express = require('express')

const response = require('../../../network/response')

const router = express.Router()

router.get('/', (req, res) => {
  response.success(req, res, 'Todo funciona', 200)
})

module.exports = router
```

Y en la raíz del proyecto tendremos una carpeta 'network' y un archivo `response.js`:

```javascript
//*Todas las respuestas en el mismo archivo

exports.success = function(req, res, message, status){
  let statusCode = status || 200;
  let statusMessage = message || '';

  res.status(status).send({
    error: false,
    status: status,
    body: message
  })
}

exports.error = function(req, res, message, status){
  let statusCode = status || 500;
  let statusMessage = message || 'Internal Server Error';

  res.status(statusCode).send({
    error: false,
    status: status,
    body: message
  })
}
```

Con todo esto, si hacemos `nodemon api/index.js` en el navegador podremos ir a la ruta `http://localhost:3000/api/user`

Y tendremos como respuesta un json:

```json
{
  "error": false,
  "status": 200,
  "body": "Todo funciona"
}
```

### Aislar el código de la base de datos

Ahora una base de datos de prueba por el momento. Creamos una carpeta 'store' en la raíz y dentro un archivo `dummy.js`:

```javascript
const db = {
  'user': [
    { id: 1, name: 'Miguel' }
  ]
}

function list(table) {
  return db[table]
}

function get(table, id) {
  let collection = list(table)
  return collection.filter(item => item.id === id)[0] || null
}

function upsert(table, data) {
  db[collection].push(data)
}

function remove(table, id) {
  return true
}

module.exports = {
  list,
  get,
  upsert,
  remove
}
```

Dentro de 'components/user/' creamos `controller.js`:

```javascript
//* Debe tener acceso a network

const store = require('../../../store/dummy')

const TABLA = 'user'

function list() {
  return store.list(TABLA)
}

module.exports = {
  list
}
```

Actualizamos `network.js`:

```javascript
const express = require('express')

const response = require('../../../network/response')
const Controller = require('./controller')

const router = express.Router()

router.get('/', (req, res) => {
  const lista = Controller.list()
  response.success(req, res, lista, 200)
})

module.exports = router
```

Y si ahora vamos a `http://localhost:3000/api/user` tendremos este json:

```json
{
  "error": false,
  "status": 200,
  "body": [
    {
      "id": 1,
      "name": "Miguel"
    }
  ]
}
```

### Rutas para usuarios

Creamos un `index.js` en 'api/components/user/':

```javascript
const store = require('../../../store/dummy')
const controller = require('./controller')

//* Al controlador le inyectamos el store
module.exports = controller(store)
```

Actualizamos el `controller.js`:

```javascript
//* Debe tener acceso a network
const TABLA = 'user'

module.exports = function(injectedStore) {
  let store = injectedStore
  if (!store) {
    store = require('../../../store/dummy')
  }

  function list() {
    return store.list(TABLA)
  }

  function get(id) {
    return store.get(TABLA, id)
  }

  return {
    list,
    get
  }
}
```

Actualizamos `network.js`:

```javascript
const express = require('express')

const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

router.get('/', (req, res) => {
  Controller.list()
    .then(lista => {
      response.success(req, res, lista, 200)
    })
    .catch(error => {
      response.error(req, res, error.message, 500)
    })
})

router.get('/:id', (req, res) => {
  Controller.get(req.params.id)
    .then(user => {
      response.success(req, res, user, 200)
    })
    .catch(error => {
      response.error(req, res, error.message, 500)
    })
})

module.exports = router
```

Actualizamos `dummy.js`:

```javascript
const db = {
  'user': [
    { id: '1', name: 'Miguel' },
    { id: '2', name: 'Ángel' },
  ]
}

async function list(table) {
  return db[table]
}

async function get(table, id) {
  let collection = await list(table)
  return collection.filter(item => item.id === id)[0] || null
}

async function upsert(table, data) {
  db[collection].push(data)
}

async function remove(table, id) {
  return true
}

module.exports = {
  list,
  get,
  upsert,
  remove
}
```

Ahora si consultamos `http://localhost:3000/api/user` tendremos un JSON:

```json
{
  "error": false,
  "status": 200,
  "body": [
    {
      "id": 1,
      "name": "Miguel"
    },
    {
      "id": 2,
      "name": "Ángel"
    }
  ]
}
```

Y si vamos a consultar un id específico, solo vamos a `http://localhost:3000/api/user/2`

Y tendremos un JSON:

```json
{
  "error": false,
  "status": 200,
  "body": {
    "id": "2",
    "name": "Ángel"
  }
}
```

### Documentación de nuestra API

[Swagger](https://editor.swagger.io/) es una página para documentar nuestra API.

Podemos descargar la documentación como un JSON y guardarlo en la carpeta 'api'.

Para poder usar esta documentación con express debemos instalar `npm i swagger-ui-express`

Lo usamos en el index.js:

```javascript
//* Creamos el servidor en este archivo

const express = require('express')

const swaggerUi = require('swagger-ui-express')

const config = require('../config')
const user = require('./components/user/network')

const app = express()
const port = config.api.port
app.use(express.urlencoded({extended: true})) //* Así ya no tenemos que instalar body-parser

const swaggerDoc = require('./swagger.json')

//* ROUTER
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/user', user)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.listen(port, () => console.log(`API escuchando en el puerto ${port}`))
```

Y si vamos a `localhost:3000/api-docs` tendremos una interfaz de documentación de la API.

## Autenticación basada en tokens

### JWT: Gestión de acceso

- Autenticación -> Va a decir quién eres tú. Es genérica y global.
- Gestión de permisos -> Va a decir qué puedes hacer. Depende del componente, archivo, contexto, etc.

> Especialmente en seguridad: NO reinventes la rueda.

[JWT](https://jwt.io/) es un estándar de la industria que nos permite manejar demandas de información entre dos clientes.

Un JSON Web Token es un estandar que nos permite generar demandas entre 2 clientes de manera segura.
Un JWT está encriptado, pero tiene 3 partes principales divididas por “.” (punto).

1. Header: Contiene los archivos de configuración (el tipo y el algoritmo de encriptación)
2. Payload: Guarda la información de nuestros usuarios
3. Signature: es la firma que contiene el header códificado más el payload códificado, para poder dar acceso a un contenido, éste deberá de ser firmado con un secret, que es la clave secreta con la que se firman los tokens, misma que sólo la deberá de conocer el backend.
Dentro del payload tenemos información que puede ser relevante para la autorización tal como:

- La expiración
- Id’s
- Nombres
- etc

Es importante saber que los JWT acabarán firmando mucha parte de la comunicación, por lo que no es recomendable que mucha información viaje, ésto puede acabar alentando tu aplicación.

### Autenticación: registro

No se recomienda guardar las contraseñas con los usuarios. Deben estar en diferentes entidades.

### Autenticación: login

***NUNCA*** debemos guardar la contraseña como texto plano. Siempre deben estar encriptadas.
