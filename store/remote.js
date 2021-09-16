const request = require('request');

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  function list(table){
    return req('GET', table)
  }
  function get(table, id){
    return req('GET', table, id)
  }
  function upsert(table, data){
    return req('PUT', table, data)
  }
  function query(table, query, join){
    return req('POST', table, {query, join})
  }

  function req(method, table, data) {
    let url = `${URL}/${table}`;
    let body = '';

    return new Promise((resolve, reject) => {
      request({
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        url,
        body
      }, (error, request, body) => {
        if (error) {
          console.error(`Error con la base de datos remota: ${error}`)
          reject(error.message);
        } else {
          resolve(JSON.parse(body));
        }
      })
    })
  }
  return {
    list,
    get,
    upsert,
    query
  }
}

module.exports = createRemoteDB;