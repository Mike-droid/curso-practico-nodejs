const express = require("express");
const config = require('../config')
const router = require('./network')

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//* RUTAS
app.use('/', router)

const port = config.mysqlService.port
app.listen(port, () => {
  console.log(`Servidor MySQL escuchando en el puerto ${port}`);
})