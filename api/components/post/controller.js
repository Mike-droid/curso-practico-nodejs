const TABLA = 'post';

module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/mysql');
  }

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  function upsert({id = null, user, text}) {
    const newPost = {
      id,
      user,
      text
    }
    return store.upsert(TABLA, newPost);
  }

  function getByUser(userId) {
    return store.query(TABLA, {
      user: userId
    })
  }

  return {
    list,
    get,
    upsert,
    getByUser
  }
}

