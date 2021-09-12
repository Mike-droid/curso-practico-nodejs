//* Debe tener acceso a network

const nanoid = require('nanoid')

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

  function upsert(data) {
    const user = {
      name: body.name
    }

    if (body.id) {
      user.id = body.id
    } else {
      user.id = nanoid()
    }

    return store.upsert(TABLA, user)
  }

  function remove(id) {
    return store.remove(TABLA, id)
  }

  return {
    list,
    get,
    upsert
  }
}