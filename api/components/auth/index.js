const store = require('../../../store/dummy')
const controller = require('./controller')

//* Al controlador le inyectamos el store
module.exports = controller(store)