const store = require('../../../store/mysql')
const controller = require('./controller')

//* Al controlador le inyectamos el store
module.exports = controller(store)