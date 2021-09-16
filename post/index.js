const express = require('express')
const config = require('../config')
const post = require('./components/post/network')
const errors = require('../network/errors')

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => res.send('Hola mundo desde Node JS'))
app.use('/api/post', post)

app.use(errors)

const port = config.post.port
app.listen(port, () => console.log(`Servicio posts escuchando en el puerto ${port}`))