const express = require("express");
const app = express();
const config = require('../config')
const router = require('./network')


app.use(express.urlencoded({extended: true}))
app.use(express.json())

//* RUTAS
app.use('/', router)

app.listen(config.mysqlService.port, () => {
  console.log(`Servidor MySQL escuchando en el puerto ${config.mysqlService.port}`);
})