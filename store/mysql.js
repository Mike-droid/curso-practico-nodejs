const mysql = require('mysql');

const config = require('../config');

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};


let connection;

function handleConnection() {
  connection = mysql.createConnection(dbconf);

  connection.connect((error) => {
    if (error) {
      console.log(error);
      setTimeout(handleConnection, 2000);
    } else {
      console.log('Connected to MySQL');
    }
  });

  connection.on('error', (error) => {
    console.error(`[db error]: ${error}`);
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      handleConnection();
    } else {
      throw error;
    }
  })
}

handleConnection();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, data) => {
      error ? reject(error) : resolve(data);
    });
  })
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (error, data) => {
      error ? reject(error) : resolve(data);
    });
  })
}

/* const get = async (table, where) => {
  new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, where, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  })
} */

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (error, result) => {
      error ? reject(error) : resolve(result);
    });
  })
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (error, result) => {
      error ? reject(error) : resolve(result);
    });
  })
}

async function upsert(table, data) {
  let row = [];
  if (data.id) {
    row = await get(table, data.id);
  }

  return row.length === 0 ? insert(table, data) : update(table, data);
}

function query(table, query, join) {
  let joinQuery = '';
  if (join) {
    const key = Object.keys(join)[0];
    const value = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${value} = ${key}.id`;
  }
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (error, result) => {
      error ? reject(error) : resolve(result[0] || null);
    });
  })
}

module.exports = {
  list,
  get,
  insert,
  upsert,
  update,
  query,
};