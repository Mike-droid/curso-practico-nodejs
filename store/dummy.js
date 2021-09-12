const db = {
  'user': [
    { id: '1', name: 'Miguel' },
    { id: '2', name: 'Ángel' },
  ]
}

async function list(table) {
  return db[table]
}

async function get(table, id) {
  let collection = await list(table)
  return collection.filter(item => item.id === id)[0] || null
}

async function upsert(table, data) {
  db[collection].push(data)
}

async function remove(table, id) {
  db[collection].splice(id,1)
}

module.exports = {
  list,
  get,
  upsert,
  remove
}