const db = {
  'user': [
    { id: '1', name: 'Miguel' },
    { id: '2', name: 'Ángel' },
  ]
}

async function list(table) {
  return db[table] || [];
}

async function get(table, id) {
  let collection = await list(table);
  return collection.filter(item => item.id === id)[0] || null;
}

async function upsert(table, data) {
  if (!db[table]) {
    db[table] = []
  }
  db[table].push(data);

  console.log(db);
}

async function remove(table, id) {
  db[table].splice(id,1)
}

async function query(table, queryParam) {
  let collection = await list(table);
  let keys = Object.keys(queryParam);
  let key = keys[0];
  return collection.filter(item => item[key] === queryParam[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
}