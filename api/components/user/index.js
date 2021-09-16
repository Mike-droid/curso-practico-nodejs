const config = require('../../../config')

let store;

config.remoteDB ? store = require('../../../store/remote-mysql') : store = require('../../../store/mysql')

const controller = require('./controller')

//* Al controlador le inyectamos el store
module.exports = controller(store)