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