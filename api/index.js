//* Creamos el servidor en este archivo

const express = require('express')

const swaggerUi = require('swagger-ui-express')

const config = require('../config')
const auth = require('./components/auth/network')
const user = require('./components/user/network')
const errors = require('../network/errors')

const app = express()
app.use(express.urlencoded({extended: true})) //* Así ya no tenemos que instalar body-parser
app.use(express.json()) //! Pero es importante usar esta línea también

const swaggerDoc = require('./swagger.json')

//* ROUTER
app.get('/', (req, res) => res.send('Hola mundo desde Node JS'))
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

//! Es importante colocar esta línea al final de las de ROUTER
app.use(errors)

const port = config.api.port
app.listen(port, () => console.log(`API escuchando en el puerto ${port}`))